'use strict';
const squel = require('squel').useFlavour('postgres');
const DB = require('../db');

const QueryHelpers = require('../helpers/query_helpers');
const _fields = "datacenters.id,datacenters.name,datacenters.location,datacenters.defaults,datacenters.notes";
const _jsonize = function(q){
  return squel.select().field("coalesce(json_object_agg(t.id,t),'{}'::json)",'json').from(q,'t');
}

const Datacenters = {
  find: function(id){
    return DB.query(this.select().where("id = ?",id).toParam()).then(rows => rows[0].json);
  },
  where: function(params,mutator){
    return DB.query(this.select(params,mutator).toParam()).then(rows => rows[0].json);
  },
  select: function(params,mutator){
    let q = squel.select().field(_fields).from("datacenters");
    QueryHelpers.filter(q,params);
    if(mutator){ mutator(q) }
    return _jsonize(q);
  },
  create: function(){
    let i = squel.insert().into("datacenters").set("created_at","now()").returning(_fields);
    return DB.query(QueryHelpers.cte([
      ['i',i],[null,_jsonize('i')]]
    )).then(rows => rows[0].json);
  },
  update: function(id,update){
    let q = squel.update().table("datacenters").where("id = ?",id).returning(_fields);
    QueryHelpers.set(q,update);
    return DB.query(QueryHelpers.cte([
      ['u',q],[null,_jsonize('u')]]
    )).then(rows => rows[0].json);
  }
};

module.exports = Datacenters;