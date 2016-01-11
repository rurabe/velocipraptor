'use strict';
const squel = require('squel').useFlavour('postgres');
const DB = require('../db');

const QueryHelpers = require('../helpers/query_helpers');

const Datacenters = {
  find: function(id){
    return DB.query(this.select().where("id = ?",id).toParam()).then(rows => rows[0].json);
  },
  where: function(params){
    return DB.query(this.select(params).toParam()).then(rows => rows[0].json);
  },
  select: function(params){
    let q = squel.select()
      .field("datacenters.id,datacenters.name,datacenters.location,datacenters.defaults,datacenters.notes")
      .from("datacenters");
      QueryHelpers.filter(q,params);
    return squel.select().field("coalesce(json_object_agg(d.id,d),'{}'::json)",'json').from(q,'d');
  }
};

module.exports = Datacenters;