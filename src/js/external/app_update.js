'use strict';

const Promise = require('bluebird');
const mysql = require('mysql');

const pool = mysql.createPool({
  host     : '68.168.209.186',
  user     : 'javery',
  password : 'Cody8855',
  database : 'javery_appupdate',
});

const _query = function(query,values){
  return new Promise(function(resolve,reject){
    pool.query(query,values,function(err,results){
      if(err){ console.log(query,values,err); reject(err) }
      resolve(results);
    });
  });
};

const AppUpdate = {
  updateDatacenter: function(dcCode){
    const q = `UPDATE thupdate SET autoupdate = "TRUE" where PC LIKE "%${dcCode}%"`;
    if(process.env.NODE_ENV === 'production'){
      return _query(q);
    } else {
      console.log(`wanted to send to mysql to appupdate: "${q}"`);
      return Promise.resolve();
    }
    
  }
};

module.exports = AppUpdate;