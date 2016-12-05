'use strict';
const squel = require('squel').useFlavour('postgres');
const DB = require('../db');
const moment = require('moment-timezone');

const QueryHelpers = require('../helpers/query_helpers');
const _jsonize = QueryHelpers.jsonize;
const _fields = 'addresses.id,addresses.ip,addresses.role,addresses.server_id,addresses.range_id,addresses.notes,addresses.deactivated_at';

const _pulls = squel.select().from("pulls")
  .field("coalesce(json_object_agg(pulls.id,json_build_object('id',pulls.id,'search_date',extract(epoch from pulls.search_date),'success',pulls.success)),'{}'::json)")
  .where("pulls.address_id = addresses.id");

const _calculateStatistics = function(addresses){
  let r = {};
  for(let id in addresses){
    let address  = addresses[id];
    address.pulls_count = countObj(address.pulls);
    address.successes_count = countObj(address.pulls,( p => p.success ));
    address.success_rate = Math.round(address.successes_count * 100 / address.pulls_count);
    r[id] = address;
  }
  return r;
};

const countObj = function(obj,criteria){
  let i = 0;
  for(let key in obj){
    if(!criteria || criteria(obj[key])){ i++; }
  }
  return i;
};


const Addresses = {
  where: function(params){
    return DB.query(this.select(params).toParam()).then(_jsonize).then(_calculateStatistics);
  },
  select: function(params){
    let q = squel.select().from("addresses").field(_fields).field(_pulls,"pulls")
    return QueryHelpers.filter(q,params);
  },
  update: function(id,update){
    let u = QueryHelpers.set(squel.update().table("addresses").where("id = ?",id).returning(_fields),update);
    return DB.query(u.toParam()).then(_jsonize);
  },
  assign: function(ip,serverCode){
    return DB.query({text: 'SELECT address_id FROM assign($1,$2)', values:[serverCode,ip]});
  },
  updateAll: function(sets,criteria){
    let q =  QueryHelpers.set(QueryHelpers.filter(squel.update().table('addresses').returning(_fields),criteria),sets);
    return DB.query(q.toParam()).then(_jsonize);
  },
};

module.exports = Addresses;