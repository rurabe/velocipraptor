var dbm = global.dbm || require('db-migrate');
var type = dbm.dataType;

exports.up = function(db, callback) {
  db.runSql("create index index_gist_ip_on_servers on servers using gist (ip inet_ops);",function(){
    db.runSql("create index index_datacenter_id_on_servers on servers (datacenter_id);",function(){
      db.runSql("create index index_code_on_servers on servers (code);",callback);
    });
  });
};

exports.down = function(db, callback) {
  db.runSql("drop index index_gist_ip_on_servers;",function(){
    db.runSql("drop index index_datacenter_id_on_servers;",function(){
      db.runSql("drop index index_code_on_servers;",callback);
    });
  });
};
