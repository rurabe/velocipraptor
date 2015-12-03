var dbm = global.dbm || require('db-migrate');
var type = dbm.dataType;

exports.up = function(db, callback) {
  db.createTable('pulls',{
    id:              { type: 'int', primaryKey: true, autoIncrement: true},
    ip:              { type: 'text' },
    thread_log_id:   { type: 'int' },
    server:          { type: 'text' },
    quantity:        { type: 'int' },
    price:           { type: 'decimal' },
    section:         { type: 'text' },
    row:             { type: 'text' },
    seats:           { type: 'text' },
    delivery:        { type: 'text' },
    notes:           { type: 'text' },
    final_status:    { type: 'text' },
    account:         { type: 'text' },
    pw:              { type: 'text' },
    ticket_type_id:  { type: 'text' },
    refresh_time:    { type: 'real' },
    sale_type:       { type: 'text' },
    search_criteria: { type: 'text' },
    search_date:     { type: 'timestamp' },
    event_name:      { type: 'text' },
    event_link:      { type: 'text' },
    notes:           { type: 'text' },
    address_id:      { type: 'int' },
    server_id:       { type: 'int' },
    created_at:      { type: 'timestamp', default: 'now()'},
    updated_at:      { type: 'timestamp', default: 'now()'},
  },callback);
};

exports.down = function(db, callback) {
  db.dropTable('pulls',callback);
};
