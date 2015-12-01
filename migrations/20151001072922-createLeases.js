var dbm = global.dbm || require('db-migrate');
var type = dbm.dataType;

exports.up = function(db, callback) {
  db.createTable('leases',{
    id:         { type: 'int', autoIncrement: true, primaryKey: true },
    range:      { type: 'inet' },
    isp:        { type: 'text' },
    start_date: { type: 'date' },
    end_date:   { type: 'date' },
    notes:      { type: 'text' },
    created_at: { type: 'timestamp', default: 'now()'},
    updated_at: { type: 'timestamp', default: 'now()'},
  },callback)
};

exports.down = function(db, callback) {
  db.dropTable('leases',callback);
};
