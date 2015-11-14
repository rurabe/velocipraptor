var dbm = global.dbm || require('db-migrate');
var type = dbm.dataType;

exports.up = function(db, callback) {
  db.runSql("create index index_address_id_on_server_assignments on server_assignments (address_id);",function(){
    db.runSql("create index index_server_id_on_server_assignments on server_assignments (server_id);",callback)
  })
};

exports.down = function(db, callback) {
  db.runSql("drop index if exists index_address_id_on_server_assignments;",function(){
    db.runSql("drop index if exists index_server_id_on_server_assignments;",callback)
  })
};
