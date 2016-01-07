var dbm = global.dbm || require('db-migrate');
var type = dbm.dataType;

exports.up = function(db, callback) {
  db.runSql("CREATE INDEX index_gist_ip_on_addresses ON addresses USING gist (ip inet_ops);",function(){
    db.runSql("CREATE INDEX index_server_id_on_addresses ON addresses (server_id);",function(){
      db.runSql("CREATE UNIQUE INDEX index_ip_on_addresses ON addresses(host(ip));",callback)
    });
  });
};

exports.down = function(db, callback) {
  db.runSql("DROP INDEX IF EXISTS index_gist_ip_on_addresses;",function(){
    db.runSql("DROP INDEX IF EXISTS index_server_id_on_addresses;",function(){
      db.runSql("DROP INDEX IF EXISTS index_ip_on_addresses;",callback)
    });
  });
};
