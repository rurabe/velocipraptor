'use strict';
const squel = require('squel').useFlavour('postgres');
const DB = require('../db');

const QueryHelpers = require('../helpers/query_helpers');
const _fields = "servers.id,servers.ip,servers.code,servers.notes,servers.datacenter_id";

const _jsonize = function(q){
  return squel.select().field("coalesce(json_object_agg(t.id,t),'{}'::json)",'json').from(q,'t');
}


const Servers = {
  where: function(params,mutator){
    return DB.query(this.select(params,mutator).toParam()).then(rows => rows[0].json);
  },
  select: function(params,mutator){
    let q = squel.select().field(_fields).from("servers");
      QueryHelpers.filter(q,params);
      if(mutator){ mutator(q) }
    return _jsonize(q);
  },
  update: function(id,update){
    let q = squel.update().table("servers").where("id = ?",id).returning(_fields);
    QueryHelpers.set(q,update);
    return DB.query(QueryHelpers.cte([
      ['u',q],[null,_jsonize('u')]]
    )).then(rows => rows[0].json);
  }
};

module.exports = Servers;