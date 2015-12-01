var dbm = global.dbm || require('db-migrate');
var type = dbm.dataType;

exports.up = function(db, callback) {
  db.createTable('servers',{
    id:         { type: 'int', primaryKey: true, autoIncrement: true},
    ip:         { type: 'inet' },
    port:       { type: 'int' },
    username:   { type: 'text' },
    password:   { type: 'text' },
    datacenter: { type: 'text' },
    location:   { type: 'text' },
    code:       { type: 'text' },
    role:       { type: 'text' },
    notes:      { type: 'text' },
    created_at: { type: 'timestamp', default: 'now()'},
    updated_at: { type: 'timestamp', default: 'now()'},
  },callback);
};

exports.down = function(db, callback) {
  db.dropTable('servers',callback);
};
