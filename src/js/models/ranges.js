'use strict';
const squel = require('squel').useFlavour('postgres');
const DB = require('../db');

const QueryHelpers = require('../helpers/query_helpers');
const _fields = "ranges.id,ranges.ips,ranges.notes,ranges.datacenter_id";

const _jsonize = function(q){
  return squel.select().field("coalesce(json_object_agg(t.id,t),'{}'::json)",'json').from(q,'t');
}

const Ranges = {
  find: function(id){
    return DB.query(this.select().where("id = ?",id).toParam()).then(rows => rows[0].json);
  },
  where: function(params){
    return DB.query(this.select(params).toParam()).then(rows => rows[0].json);
  },
  select: function(params){
    let q = squel.select().field(_fields).from("ranges");
    QueryHelpers.filter(q,params);
    return _jsonize(q);
  },
  update: function(id,update){
    let q = squel.update().table("ranges").where("id = ?",id).returning(_fields);
    QueryHelpers.set(q,update);
    return DB.query(QueryHelpers.cte([
      ['u',q],[null,_jsonize('u')]]
    )).then(rows => rows[0].json);
  }
};

module.exports = Ranges;