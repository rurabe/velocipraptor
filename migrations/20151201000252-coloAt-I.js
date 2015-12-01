var dbm = global.dbm || require('db-migrate');
var type = dbm.dataType;

var DATA = [['Colo@','66.187/16']];

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
