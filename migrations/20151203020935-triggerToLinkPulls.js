'use strict';

var dbm = global.dbm || require('db-migrate');
var type = dbm.dataType;

var func = `CREATE OR REPLACE FUNCTION link_pulls() RETURNS trigger AS $$
  DECLARE
    address_id int;
    server_id  int;
  BEGIN
    select addresses.id into address_id from addresses where host(addresses.ip) = NEW.ip;
    select servers.id into server_id from servers where host(servers.ip) = substring(NEW.server,'\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}');
    NEW.address_id = address_id;
    NEW.server_id = server_id;
    NEW.created_at = now();
    NEW.updated_at = now();
    RETURN NEW;
  END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_link_pulls
  BEFORE INSERT OR UPDATE ON pulls FOR EACH ROW EXECUTE PROCEDURE link_pulls();`

exports.up = function(db, callback) {
  db.runSql(func,callback);
};

exports.down = function(db, callback) {
  db.runSql("DROP TRIGGER IF EXISTS trigger_link_pulls ON pulls; DROP FUNCTION IF EXISTS link_pulls();",callback);
};
