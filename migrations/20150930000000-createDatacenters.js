var dbm = global.dbm || require('db-migrate');
var type = dbm.dataType;

exports.up = function(db, callback) {
  db.createTable('datacenters',{
    id:         { type: 'int', autoIncrement: true, primaryKey: true },
    name:       { type: 'text' },
    location:   { type: 'text' },
    defaults:   { type: 'jsonb', default: "'{}'" },
    notes:      { type: 'text' },
    created_at: { type: 'timestamp', default: 'now()'},
    updated_at: { type: 'timestamp', default: 'now()'},
  }, () => {
    db.runSql("create trigger timestamps_on_datacenters before insert or update on datacenters for each row execute procedure timestamp_on_change();")
  })
};

exports.down = function(db, callback) {
  db.runSql("drop trigger if exists timestamps_on_datacenters on datacenters;", () => {
    db.dropTable('datacenters',callback);
  });
};
