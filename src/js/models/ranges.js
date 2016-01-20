'use strict';
const squel = require('squel').useFlavour('postgres');
const DB = require('../db');

const QueryHelpers = require('../helpers/query_helpers');
const _jsonize = QueryHelpers.jsonize;
const _fields = "ranges.id,ranges.ips,ranges.notes,ranges.datacenter_id";

const Ranges = {
  find: function(id){
    return DB.query(this.select().where("id = ?",id).toParam()).then(_jsonize);
  },
  where: function(params){
    return DB.query(this.select(params).toParam()).then(_jsonize);
  },
  select: function(params){
    let q = squel.select().field(_fields).from("ranges");
    return QueryHelpers.filter(q,params);
  },
  create: function(params){
    params = Object.assign({created_at: 'now()'},params)
    let i = squel.insert().into("ranges").setFields(params).returning(_fields);
    return DB.query(i.toParam()).then(_jsonize);
  },
  update: function(id,update){
    let u = QueryHelpers.set(squel.update().table("ranges").where("id = ?",id).returning(_fields),update);
    return DB.query(u.toParam()).then(_jsonize);
  },
  destroy: function(id){
    let unassign = 'select * from unassign((select datacenter_id from ranges where id = $1),(select ips from ranges where id = $1))'
    let q = squel.update().table("ranges").where("id = ?",id).setFields({datacenter_id: null}).returning(_fields);
    return DB.query({text: unassign, values: [id]}).then( unassigns => DB.query(q.toParam()) ).then(_jsonize);
  }
};

module.exports = Ranges;