'use strict';

var dbm = global.dbm || require('db-migrate');
var type = dbm.dataType;

var DATA = [
  ['Colo@','185.59/16'],
  ['Colo@','46.244/16'],
  ['Colo@','130.185/16'],
  ['Colo@','195.5/16'],
  ['Colo@','81.24/16'],
  ['Colo@','185.21/16'],
  ['Colo@','85.203/16'],
  ['Colo@','37.148/16'],
  ['Colo@','212.124/16'],
  ['Colo@','185.51/16'],
  ['Colo@','98.159/16'],
  ['Colo@','173.239/16'],
  ['Colo@','196.52/16'],
  ['Colo@','196.53/16'],
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
