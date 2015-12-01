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
  },callback);
};

exports.down = function(db, callback) {
  db.dropTable('addresses',callback);
};
