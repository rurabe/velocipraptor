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
      .field("max(servers.id)","sid")
      .field("max(host(servers.ip))","sip")
      .field("max(servers.datacenter)","sd")
      .field("json_agg(json_build_object('id',pulls.id,'t',extract(epoch from pulls.search_date),'s',pulls.success))","pulls")
      .from("addresses")
      .join("pulls",null,"addresses.id = pulls.address_id")
      .left_join("servers",null,"addresses.server_id = servers.id")
      .where("pulls.search_date >= ?",startTime)
      .where("pulls.search_date <= ?",endTime)
      .group("addresses.id,servers.id")
      console.log(q.toString())
    return DB.query(q.toParam())
  }
};

module.exports = Addresses;