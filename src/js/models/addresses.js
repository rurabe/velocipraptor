'use strict';
const squel = require('squel').useFlavour('postgres');
const DB = require('../db');
const moment = require('moment-timezone');

const QueryHelpers = require('../helpers/query_helpers');

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
    if(!criteria || criteria(obj[key])){ i++ }
  }
  return i;
};


const Addresses = {
  withPulls: function(params){
    return this.where(params, q => {
      let pulls = squel.select().from("pulls")
        .field("coalesce(json_object_agg(pulls.id,json_build_object('id',pulls.id,'search_date',extract(epoch from pulls.search_date),'success',pulls.success)),'{}'::json)")
        .where("pulls.address_id = addresses.id")
      q.field(pulls,"pulls")
    }).then( json => _calculateStatistics(json) );
  },
  where: function(params,mutator){
    return DB.query(this.select(params,mutator).toParam()).then(rows => rows[0].json);
  },
  select: function(params,mutator){
    let q = squel.select()
      .field("addresses.id,addresses.ip,addresses.server_id,addresses.range_id")
      .from("addresses")
      QueryHelpers.filter(q,params);
      if(mutator){ mutator(q) }
    return squel.select().field("coalesce(json_object_agg(a.id,a),'{}'::json)",'json').from(q,'a');
  }
};

module.exports = Addresses;