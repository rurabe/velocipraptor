'use strict';
const Promise = require('bluebird');

const DB = require('../db');
const ThreadLog = require('../external/thread_log');

const Pulls = {
  reparse: function(){
    return DB.query({text: "select * from pulls where created_at > now() - interval '90 days'"}).then(rows => {
      return Promise.map(rows,row => {
        let newStatus = ThreadLog.parseSuccess(row.final_status,(row.refresh_time || '').toString(),row.price);
        console.log(".")
        if(newStatus !== row.success){
          console.log("u")
          return DB.query({
            text: 'update pulls set success=$1 where id=$2',
            values: [newStatus,row.id],
          });
        }
      },{concurrency: 20});
    });
  }
};

module.exports = Pulls;