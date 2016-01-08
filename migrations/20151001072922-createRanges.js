'use strict';

var dbm = global.dbm || require('db-migrate');
var type = dbm.dataType;

exports.up = function(db, callback) {
  db.createTable('ranges',{
    id:            { type: 'int', autoIncrement: true, primaryKey: true },
    ips:           { type: 'inet' },
    notes:         { type: 'text' },
    datacenter_id: { type: 'int' },
    created_at:    { type: 'timestamp', default: 'now()'},
    updated_at:    { type: 'timestamp', default: 'now()'},
  }, () => {
    db.runSql("create trigger timestamps_on_ranges before insert or update on ranges for each row execute procedure timestamp_on_change();",callback)
  })
};

exports.down = function(db, callback){
  db.runSql("drop trigger if exists timestamps_on_ranges on ranges;",() => {
    db.dropTable('ranges',callback);
  });
};
