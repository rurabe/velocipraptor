'use strict';

var dbm;
var type;
var seed;


var f = `
  CREATE FUNCTION to_iso(timestamp) RETURNS text AS $$
    SELECT to_char($1,'YYYY-MM-DD"T"HH24:MI:SS.MSZ')
  $$ LANGUAGE SQL IMMUTABLE;
`;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function(db) {
  return db.runSql(f)
};

exports.down = function(db) {
  return db.runSql('DROP FUNCTION to_iso(timestamp);')
};
