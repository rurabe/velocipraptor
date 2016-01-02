var dbm = global.dbm || require('db-migrate');
var type = dbm.dataType;

var create = "create or replace function timestamp_on_change() returns trigger as $$ begin new.created_at = coalesce(new.created_at,now()); new.updated_at = now(); return new; end $$ language plpgsql;";

exports.up = function(db, callback) {
  db.runSql(create,callback);
};

exports.down = function(db, callback) {
  db.runSql("drop function if exists timestamp_on_change();",callback);
};
