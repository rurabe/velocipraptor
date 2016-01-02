var dbm = global.dbm || require('db-migrate');
var type = dbm.dataType;

exports.up = function(db, callback) {
  db.createTable('addresses',{
    id:         { type: 'int', primaryKey: true, autoIncrement: true },
    ip:         { type: 'inet' },
    notes:      { type: 'text' },
    server_id:  { type: 'int' },
    created_at: { type: 'timestamp', default: 'now()'},
    updated_at: { type: 'timestamp', default: 'now()'},
  },() => {
    db.runSql("create trigger timestamps_on_addresses before insert or update on addresses for each row execute procedure timestamp_on_change();")
  });
};

exports.down = function(db, callback) {
  db.runSql("drop trigger if exists timestamps_on_addresses on addresses;",() => {
    db.dropTable('addresses',callback);
  });
};
