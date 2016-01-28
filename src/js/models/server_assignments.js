'use strict';
const squel = require('squel').useFlavour('postgres');
const DB = require('../db');
const Promise = require('bluebird');

const QueryHelpers = require('../helpers/query_helpers');

const ServerAssignments = {
  create: function(serverCode,ip){
    return DB.query({text: 'select id from assign($1,$2)', values: [serverCode,ip]});
  },
  destroy: function(datacenterId,range){
    return DB.query({
      text: 'with u as (select id from unassign($1,$2)) delete from ranges where datacenter_id = $1 and ips = $2 returning *; ',
      values: [datacenterId,range]
    }).then(QueryHelpers.jsonize);
  }
};

module.exports = ServerAssignments;
