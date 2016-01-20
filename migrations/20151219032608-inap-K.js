'use strict';

var dbm = global.dbm || require('db-migrate');
var type = dbm.dataType;

var DATA = [
  ['Internap','76.191/16'],
];

var unassign = function(arr){
  return arr.map(function(un){
  	return `SELECT id FROM unassign((select id from datacenters where name = '${un[0]}'),'${un[1]}');`
  }).join(" ");
}

exports.up = function(db, callback) {
  db.runSql(unassign(DATA),callback);
};

exports.down = function(db, callback) {
  callback();
};
