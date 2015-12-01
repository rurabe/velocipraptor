var dbm = global.dbm || require('db-migrate');
var type = dbm.dataType;

var DATA = [
  ['Colo@','66.242'],
  ['Colo@','68.169'],
  ['Colo@','89.167'],
  ['Colo@','91.222'],
  ['Colo@','91.244'],
  ['Colo@','91.247'],
  ['Colo@','178.216'],
];

var unassign = function(arr){
  return arr.map(function(un){
    return "SELECT id FROM unassign('"+un[0]+"','"+un[1]+"');";
  }).join(" ");
}

exports.up = function(db, callback) {
  db.runSql(unassign(DATA),callback);
};

exports.down = function(db, callback) {
  callback();
};
