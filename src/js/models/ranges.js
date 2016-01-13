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
  update: function(id,update){
    let u = QueryHelpers.set(squel.update().table("ranges").where("id = ?",id).returning(_fields),update);
    return DB.query(u.toParam()).then(_jsonize);
  }
};

module.exports = Ranges;