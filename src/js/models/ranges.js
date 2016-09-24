'use strict';
const squel = require('squel').useFlavour('postgres');
const DB = require('../db');
const _ = require('lodash');

const QueryHelpers = require('../helpers/query_helpers');
const AXSHelpers = require('../helpers/axs_helpers');
const _jsonize = QueryHelpers.jsonize;
const _fields = "ranges.id,ranges.ips,ranges.notes,ranges.datacenter_id";

const Ranges = {
  find: function(id){
    console.log(id)
    return DB.query(this.select().where("ranges.id = ?",id).toParam()).then(_jsonize);
  },
  where: function(params){
    return DB.query(this.select(params).toParam()).then(_jsonize);
  },
  select: function(params){
    let q = squel.select().field(_fields).from("ranges")
      .join('addresses',null,'ranges.id = addresses.range_id').group('ranges.id')
      .left_join('pulls',null,'pulls.address_id = addresses.id')
      .field('max(pulls.search_date)','last_used')
      .field('count(pulls)::int','pulls_count')
      .field("count(CASE WHEN pulls.search_date > now() - interval '1 month' THEN 1 END)::int",'recent_pulls')
      .field('count(CASE WHEN success THEN 1 END)::int','successes')
      .field("count(CASE WHEN pulls.search_date > now() - interval '1 month' AND pulls.success THEN 1 END)::int",'recent_successes');
    return QueryHelpers.filter(q,params);
  },
  create: function(params){
    let ips = params.ips.replace(/\s+/g,"");
    let text = `INSERT INTO ranges (datacenter_id,ips) VALUES ($1,$2) ON CONFLICT(ips) DO UPDATE set datacenter_id = $1 RETURNING *`;
    return DB.query({text: text, values: [params.datacenter_id,ips]}).then(inserted => this.where({'ranges.id': inserted[0].id}) );
  },
  update: function(id,update){
    let u = QueryHelpers.set(squel.update().table("ranges").where("id = ?",id).returning('*'),update);
    return DB.query(u.toParam()).then(updated => this.where({'ranges.id': updated[0].id}));
  },
  destroy: function(id){
    return DB.query({text: 'select datacenters.*,ranges.ips as deleted_range from datacenters inner join ranges on ranges.datacenter_id = datacenters.id where ranges.id = $1;', values: [id]}).then(rows => {
      let dc = rows[0];
      let updatedProxies = AXSHelpers.removeRange(dc.axs_proxies,dc.deleted_range);
      return DB.query({text: 'update datacenters set axs_proxies=$1 where id=$2;', values: [JSON.stringify(updatedProxies),dc.id]});
    }).then(() => {
      let unassign = 'select * from unassign((select datacenter_id from ranges where id = $1),(select ips from ranges where id = $1))'
      let q = squel.update().table("ranges").where("id = ?",id).setFields({datacenter_id: null}).returning(_fields);
      return DB.query({text: unassign, values: [id]}).then( unassigns => DB.query(q.toParam()) ).then(_jsonize)
    });
  },
  rotate: function(datacenter_id){
    let text = `
      with
      ips_count as (
        select (count(*) * 350) as count from servers where datacenter_id = $1 and role is null
      ), 
      all_ranges as (
        ${this.select({datacenter_id: datacenter_id}).toParam().text}
      ),
      rested_addresses as (
        select * from addresses 
        inner join all_ranges on all_ranges.id = addresses.range_id
        where deactivated_at is null
        order by case when last_used is null then 0 else 1 end, last_used asc,addresses.ip
        limit (select count from ips_count)
      )
      select distinct regexp_replace((ip & inet '255.255.255.0')::text,'\\.0/\\d\\d','') as ip,last_used from rested_addresses;
    `;
    return DB.query({text: text, values: [datacenter_id]}).then(rows => {
      return rows.sort((a,b) => a && a.last_used > b.last_used ? -1 : 1 )
    });
  }
};

module.exports = Ranges;