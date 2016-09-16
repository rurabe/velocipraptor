'use strict';
const squel = require('squel').useFlavour('postgres');
const DB = require('../db');

const QueryHelpers = require('../helpers/query_helpers');
const _fields = 'servers.id,servers.ip,servers.code,servers.number,servers.role,servers.notes,servers.datacenter_id';

const Servers = {
  where: function(params){
    return DB.query(this.select(params).toParam());
  },
  select: function(params){
    let q = squel.select().field(_fields).from('servers');
    return QueryHelpers.filter(q,params);
  },
  create: function(params){
    let i = squel.insert().into('servers').setFields(params).returning(_fields);
    return DB.query(i.toParam());
  },
  update: function(id,update){
    let u = QueryHelpers.set(squel.update().table('servers').where('id = ?',id).returning(_fields),update);
    return DB.query(u.toParam());
  },
  destroy: function(id){
    let q = squel.delete().from('servers').where('id = ?',id).returning(_fields);
    return DB.query(q.toParam());
  }
};

module.exports = Servers;