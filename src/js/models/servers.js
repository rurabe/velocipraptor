'use strict';
const squel = require('squel').useFlavour('postgres');
const DB = require('../db');

const QueryHelpers = require('../helpers/query_helpers');

const Servers = {
  where: function(params,mutator){
    return DB.query(this.select(params,mutator).toParam()).then(rows => rows[0].json);
  },
  select: function(params,mutator){
    let q = squel.select()
      .field("servers.id,servers.ip,servers.code,servers.notes,servers.datacenter_id")
      .from("servers");
      QueryHelpers.filter(q,params);
      if(mutator){ mutator(q) }
    return squel.select().field("coalesce(json_object_agg(d.id,d),'{}'::json)",'json').from(q,'d');
  }
};

module.exports = Servers;