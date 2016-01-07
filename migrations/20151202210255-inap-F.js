var dbm = global.dbm || require('db-migrate');
var type = dbm.dataType;

var DATA = [
  ['Internap','162.219/16'],
  ['Internap','162.252/16'],
  ['Internap','204.27/16'],
  ['Internap','198.178/16'],
  ['Internap','199.254/16'],
  ['Internap','181.41/16'],
  ['Internap','8.4/16'],
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
