'use strict';
const squel = require('squel').useFlavour('postgres');
const DB = require('../db');

const QueryHelpers = require('../helpers/query_helpers');

const Ranges = {
  find: function(id){
    return DB.query(this.select().where("id = ?",id).toParam()).then(rows => rows[0].json);
  },
  where: function(params){
    console.log(this.select(params).toParam())
    return DB.query(this.select(params).toParam()).then(rows => rows[0].json);
  },
  select: function(params){
    let q = squel.select()
      .field("ranges.id,ranges.ips,ranges.notes,ranges.datacenter_id")
      .from("ranges");
    QueryHelpers.filter(q,params);
    return squel.select().field("coalesce(json_object_agg(d.id,d),'{}'::json)",'json').from(q,'d');
  }
};

module.exports = Ranges;