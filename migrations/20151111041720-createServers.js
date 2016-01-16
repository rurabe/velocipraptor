var dbm = global.dbm || require('db-migrate');
var type = dbm.dataType;

exports.up = function(db, callback) {
  db.createTable('servers',{
    id:            { type: 'int', primaryKey: true, autoIncrement: true},
    ip:            { type: 'inet' },
    port:          { type: 'int' },
    username:      { type: 'text' },
    password:      { type: 'text' },
    code:          { type: 'text' },
    number:        { type: 'int'  },
    role:          { type: 'text' },
    notes:         { type: 'text' },
    datacenter_id: { type: 'int' },
    created_at:    { type: 'timestamp', default: 'now()'},
    updated_at:    { type: 'timestamp', default: 'now()'},
  },() => {
    db.runSql("create trigger timestamps_on_servers before insert or update on servers for each row execute procedure timestamp_on_change();",callback)
  });
};

exports.down = function(db, callback) {
  db.runSql("drop trigger if exists timestamps_on_servers on servers;",() => {
    db.dropTable('servers',callback);
  });
};
