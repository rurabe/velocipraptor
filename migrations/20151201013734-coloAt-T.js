var dbm = global.dbm || require('db-migrate');
var type = dbm.dataType;

var DATA = [
  ['Colo@','66.242/16'],
  ['Colo@','68.169/16'],
  ['Colo@','89.167/16'],
  ['Colo@','91.222/16'],
  ['Colo@','91.244/16'],
  ['Colo@','91.247/16'],
  ['Colo@','178.216/16'],
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
