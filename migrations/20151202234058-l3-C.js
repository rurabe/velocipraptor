var dbm = global.dbm || require('db-migrate');
var type = dbm.dataType;

var DATA = [
  ['Level 3','104.143/16'],
  ['Level 3','104.244/16'],
  ['Level 3','192.44/16'],
  ['Level 3','185.92/16'],
  ['Level 3','74.126/16'],
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
