'use strict';
const squel = require('squel').useFlavour('postgres');
const DB = require('../db');

const QueryHelpers = require('../helpers/query_helpers');
const _fields = "datacenters.id,datacenters.name,datacenters.location,datacenters.defaults,datacenters.notes";

const Datacenters = {
  find: function(id){
    return DB.query(this.select({id: id}).toParam()).then(QueryHelpers.jsonize);
  },
  where: function(params){
    return DB.query(this.select(params).toParam()).then(QueryHelpers.jsonize);
  },
  select: function(params){
    let q = squel.select().field(_fields).from("datacenters");
    return QueryHelpers.filter(q,params);
  },
  create: function(params){
    params = Object.assign({created_at: 'now()'},params)
    let i = squel.insert().into("datacenters").setFields(params).returning(_fields);
    return DB.query(i.toParam()).then(QueryHelpers.jsonize);
  },
  update: function(id,update){
    let u = QueryHelpers.set(squel.update().table("datacenters").where("id = ?",id).returning(_fields),update);
    return DB.query(u.toParam()).then(QueryHelpers.jsonize);
  },
  destroy: function(id){
    let q = squel.delete().from("datacenters").where("id = ?",id).returning(_fields);
    return DB.query(q.toParam()).then(QueryHelpers.jsonize);
  }
};

module.exports = Datacenters;