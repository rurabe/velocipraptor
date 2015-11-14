var dbm = global.dbm || require('db-migrate');
var type = dbm.dataType;

exports.up = function(db, callback) {
  db.createTable('addresses',{
    id:         { type: 'int', primaryKey: true, autoIncrement: true },
    ip:         { type: 'inet' },
    created_at: { type: 'timestamp', default: 'now()'},
    updated_at: { type: 'timestamp', default: 'now()'},
    server_id:  { type: 'int' }
  },callback);
};

exports.down = function(db, callback) {
  db.dropTable('addresses',callback);
};
