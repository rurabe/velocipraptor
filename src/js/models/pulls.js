'use strict';
const squel = require('squel').useFlavour('postgres');
const DB = require('../db');
const moment = require('moment-timezone');

const QueryHelpers = require('../helpers/query_helpers');

const Pulls = {
  where: function(params,mutator){
    return DB.query(this.select(params,mutator).toParam()).then(rows => rows[0].json);
  },
  select: function(params,mutator){
    let q = squel.select()
      .field("pulls.id,pulls.server_id,pulls.address_id,pulls.success,extract(epoch from pulls.search_date) as search_date")
      .from("pulls")
      QueryHelpers.filter(q,params);
      if(mutator){ mutator(q) };
    return squel.select().field("coalesce(json_object_agg(a.id,a),'{}'::json)",'json').from(q,'a');
  }
};

module.exports = Pulls;