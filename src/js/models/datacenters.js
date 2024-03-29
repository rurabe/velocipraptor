'use strict';
const squel = require('squel').useFlavour('postgres');
const DB = require('../db');

const QueryHelpers = require('../helpers/query_helpers');
const _jsonize = QueryHelpers.jsonize;
const _fields = 'id,name,location,axs_code,axs_proxies,axs_proxies_updated_at,defaults,notes'.split(',').map(c => `datacenters.${c}`).join(',');

const Datacenters = {
  find: function(id){
    return DB.query(this.select({id: id}).toParam()).then(_jsonize);
  },
  where: function(params){
    return DB.query(this.select(params).toParam()).then(_jsonize);
  },
  select: function(params){
    let q = squel.select().field(_fields).from('datacenters');
    return QueryHelpers.filter(q,params);
  },
  create: function(params){
    params = Object.assign({created_at: 'now()'},params);
    let i = squel.insert().into('datacenters').setFields(params).returning(_fields);
    return DB.query(i.toParam()).then(_jsonize);
  },
  update: function(id,update){
    let u = QueryHelpers.set(squel.update().table('datacenters').where('id = ?',id).returning(_fields),update);
    return DB.query(u.toParam()).then(_jsonize);
  },
  destroy: function(id){
    let q = squel.delete().from('datacenters').where('id = ?',id).returning(_fields);
    return DB.query(q.toParam()).then(_jsonize);
  }
};

module.exports = Datacenters;