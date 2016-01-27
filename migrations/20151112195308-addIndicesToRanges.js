var dbm = global.dbm || require('db-migrate');
var type = dbm.dataType;

exports.up = function(db, callback) {
  db.runSql("create unique index index_ips_on_ranges on ranges (ips);",function(){
    db.runSql("create index index_datacenter_id_on_ranges on ranges (datacenter_id);",callback);
  });
};

exports.down = function(db, callback) {
  db.runSql("drop index index_ips_on_ranges;",function(){
    db.runSql("drop index index_datacenter_id_on_ranges;",callback);
  });
};
