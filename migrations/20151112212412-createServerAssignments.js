var dbm = global.dbm || require('db-migrate');
var type = dbm.dataType;

exports.up = function(db, callback) {
  db.createTable('server_assignments',{
    id:         {type: 'int', primaryKey: true, autoIncrement: true},
    address_id: {type: 'int'},
    server_id:  {type: 'int'},
    assigned:   {type: 'boolean'},
    active:     {type: 'boolean'},
    created_at: {type: 'timestamp', default: 'now()'},
  },callback)
};

exports.down = function(db, callback) {
  db.dropTable('server_assignments',callback);
};
