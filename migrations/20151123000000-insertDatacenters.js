'use strict';

var dbm = global.dbm || require('db-migrate');
var type = dbm.dataType;

var DATA = [
  ['PhoenixNapPhx','Phoenix'],
  ['PhoenixNapAsh','Ashburn'],
  ['VPS','Ashburn'],
  ['VPS','Phoenix'],
  ['VPS Colo@','Ashburn'],
  ['VPS Colo@','Phoenix'],
  ['Colo@','Phoenix'],
  ['Level 3','Ashburn'],
  ['Internap','Ashburn'],
];

var e = function(v){
  if(v){
    return "'"+v+"'";
  } else {
    return 'NULL';
  }
}

var insertDatacenters = function(datacenters){
  var values = datacenters.map(function(datacenter){
    return `(${e(datacenter[0])},${e(datacenter[1])},now(),now())`;
  }).join(",");
  return `insert into datacenters(name,location,created_at,updated_at) values ${values};`;
};

exports.up = function(db, callback) {
  db.runSql(insertDatacenters(DATA),callback);
};

exports.down = function(db, callback) {
  db.runSql("delete from datacenters;",callback);
};
