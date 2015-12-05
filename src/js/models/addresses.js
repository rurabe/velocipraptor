'use strict';
const squel = require('squel').useFlavour('postgres');
const DB = require('../db');
const moment = require('moment-timezone');

const Addresses = {
  query: function(params){
    let startTime = params.startTime || moment().subtract(7,'days').toISOString();
    let endTime   = params.endTime   || new Date().toISOString();
    let q = squel.select()
      .field("addresses.id")
      .field("addresses.ip")
      .field("addresses.notes","no")
      .field("json_agg(json_build_object('id',servers.id,'ip',servers.ip,'dc',servers.datacenter))","servers")
      .field("sum(pulls.success::int)","successes")
      .field("count(pulls.success)","pulls")
      .from("addresses")
      .join("pulls",null,"addresses.id = pulls.address_id")
      .left_join("servers",null,"addresses.server_id = servers.id")
      .where("pulls.search_date >= ?",startTime)
      .where("pulls.search_date <= ?",endTime)
      .group("addresses.id")
    return DB.query(q.toParam())
  }
};

module.exports = Addresses;