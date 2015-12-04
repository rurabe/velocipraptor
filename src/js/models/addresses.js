'use strict';
const squel = require('squel');
const DB = require('../db');

const Addresses = {
  fetch: function(params){
    let startTime = params.startTime || '7 days';
    let endTime   = params.endTime   || '0 hours';
    let q = squel.select().field("addresses.*")
      .from('addresses').join('pulls',null,'addresses.id = pulls.address_id')
      .where('pulls.search_date >= now() - ?',startTime)
      .where('pulls.search_date <= now() - ?',endTime)
      .group('addresses.id')
    return DB.query(q.toParam())
  }
};

module.exports = Addresses;