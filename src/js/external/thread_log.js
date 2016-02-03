'use strict';

const Promise = require('bluebird');
const mysql = require('mysql');
const squel = require('squel');
const moment = require('moment-timezone');

const DB = require('../db');

const TimeHelpers = require('../helpers/time_helpers');

const pool = mysql.createPool({
  host     : '68.168.209.186',
  user     : 'javery',
  password : 'Cody8855',
  database : 'javery_LogView',
});

const _query = function(query,values){
  return new Promise(function(resolve,reject){
    pool.query(query,values,function(err,results){
      if(err){ console.log(query,values,err); reject(err) }
      resolve(results);
    });
  });
};

const _parse = function(row){
  return {
    ip: _parseStr(row.Thread),
    thread_log_id: row.id,
    server: _parseStr(row.Server),
    quantity: _parseStr(row.Qty),
    price: _parseDec(row.Price),
    section: _parseStr(row.Section),
    row: _parseStr(row.Row),
    seats: _parseStr(row.Seats),
    delivery: _parseStr(row.Delivery),
    notes: _parseStr(row.Notes),
    final_status: _parseStr(row['Final Status']),
    account: _parseStr(row.Account),
    pw: _parseStr(row.PW),
    ticket_type_id: _parseStr(row.TicketTypeID),
    refresh_time: _parseDec(row['Refresh Time']),
    sale_type: _parseStr(row['Sale Type']),
    search_criteria: _parseStr(row['Search Criteria']),
    search_date: _parseDate(row['Search Date']),
    event_name: _parseStr(row['Event Name']),
    event_link: _parseStr(row['Event Link']),
    success: _parseSuccess(row),
  }
};

const _parseStr = function(string){
  return string && string.length > 0 ? string : null;
}

const _parseDec = function(pricestring){
  if(!pricestring){ return null; }
  let price = pricestring.match(/[\d\.]+/);
  return price ? parseFloat(price) : null;
};

const _parseDate = function(datestring){
  if(!datestring){ return null; }
  let m = datestring.match(/(\d+)\/(\d+)\/(\d+) at (\d+)\:(\d+) (am|pm)/i)
  if(m){
    let hour = TimeHelpers.parseHour(m[4],m[6]);
    return moment.tz([m[3],(m[1] - 1),m[2],hour,m[5]],'America/Los_Angeles').toISOString();
  }
};

const _parseSuccess = function(row){
  let status = row['Final Status'];
  if(status.match(/refresh/i) || status.match(/stopped/i)){ return false }
  return true;
}

const ThreadLog = {
  getLatest: function(){
    return DB.query('select thread_log_id from pulls order by thread_log_id desc limit 1').then(results => {
      return results[0] ? results[0].thread_log_id : 0; 
    }).then( lastId => {
      let q = squel.select('*').from('ThreadLog').where('id > ?',lastId).order('id').limit(100);
      return _query(q.toParam().text,q.toParam().values);
    }).then(results => {
      return results.map(_parse);
    });
  },
  importLatest: function(){
    return this.getLatest().then( (latest) => {
      if(latest[0]){ console.log("fetched",latest[0].thread_log_id,"to",latest[latest.length - 1].thread_log_id); }
      return Promise.map(latest, (row) => {
        return DB.query(squel.useFlavour('postgres').insert().into("pulls").setFields(row).toParam()).catch(e => {
          console.log("[ThreadLog] Insert failed:",row)
        });
      }).then( () => {        
        if(latest.length === 100){ return this.importLatest() }
        else { return latest; }
      })
    })
  }
};

module.exports = ThreadLog;