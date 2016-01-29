'use strict';

           require('dotenv').load();
const pg = require('pg');
const Promise = require('bluebird');
const squel = require('squel').useFlavour('postgres');

const pgAddress = process.env.DATABASE_URL;
const DBError = require('./errors/db_error');

const _query = function(preparedStatement){
  console.log(preparedStatement)
  return new Promise(function(resolve,reject){
    pg.connect(pgAddress,function(err,client,done){
      client.query(preparedStatement,function(e,r){
        done();
        if(e){ console.log(e,preparedStatement); reject(new DBError(e)) }
        else { resolve(r.rows); }
      });
    });
  });
};

const DB = {
  query: _query,
};

module.exports = DB;