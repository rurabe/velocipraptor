'use strict';
const squel = require('squel').useFlavour('postgres');
const DB = require('../db');
const moment = require('moment-timezone');

const _calculateStatistics = function(addresses){
  let r = {};
  for(let id in addresses){
    let address  = addresses[id];
    address.pulls_count = countObj(address.pulls);
    address.successes_count = countObj(address.pulls,( p => p.success ));
    address.success_rate = (address.successes_count / address.pulls_count).toFixed(3);
    r[id] = address;
  }
  return r;
};

const countObj = function(obj,criteria){
  let i = 0;
  for(let key in obj){
    if(!criteria || criteria(obj[key])){ i++ }
  }
  return i;
};

const Addresses = {
  where: function(params){
    return DB.query(this.select(params).toParam()).then( rows => _calculateStatistics(rows[0].json) )
  },
  select: function(params){
    let startTime = params.startTime || moment().subtract(7,'days').toISOString();
    let endTime   = params.endTime   || new Date().toISOString();
    let q = squel.select()
      .field("addresses.id")
      .field("addresses.ip")
      .field("addresses.notes")
      .field("max(servers.id)","server_id")
      .field("max(host(servers.ip))","server_ip")
      .field("max(servers.datacenter)","datacenter")
      .field("json_object_agg(pulls.id,json_build_object('id',pulls.id,'search_date',extract(epoch from pulls.search_date),'success',pulls.success))","pulls")
      .from("addresses")
      .join("pulls",null,"addresses.id = pulls.address_id")
      .left_join("servers",null,"addresses.server_id = servers.id")
      .where("pulls.search_date >= ?",startTime)
      .where("pulls.search_date <= ?",endTime)
      .group("addresses.id,servers.id")
    return squel.select().field("coalesce(json_object_agg(a.id,a),'{}'::json)",'json').from(q,'a');
  }
};

module.exports = Addresses;