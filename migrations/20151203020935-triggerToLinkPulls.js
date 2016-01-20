'use strict';

var dbm = global.dbm || require('db-migrate');
var type = dbm.dataType;

// CREATE OR REPLACE FUNCTION link_pulls() RETURNS trigger AS $$
//   DECLARE
//     address_id int;
//     server_id  int;
//   BEGIN
//     select addresses.id into address_id from addresses where host(addresses.ip) = NEW.ip;
//     select servers.id into server_id from servers where host(servers.ip) = substring(NEW.server,'\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}');
//     NEW.address_id = address_id;
//     NEW.server_id = server_id;
//     NEW.created_at = now();
//     NEW.updated_at = now();
//     RETURN NEW;
//   END;
// $$ LANGUAGE plpgsql;

// CREATE TRIGGER trigger_link_pulls
//   BEFORE INSERT OR UPDATE ON pulls FOR EACH ROW EXECUTE PROCEDURE link_pulls();

var funcs = "CREATE OR REPLACE FUNCTION link_pulls() RETURNS trigger AS $$\n  DECLARE\n    address_id int;\n    server_id  int;\n  BEGIN\n    select addresses.id into address_id from addresses where host(addresses.ip) = NEW.ip;\n    select servers.id into server_id from servers where host(servers.ip) = substring(NEW.server,'d{1,3}.d{1,3}.d{1,3}.d{1,3}');\n    NEW.address_id = address_id;\n    NEW.server_id = server_id;\n    NEW.created_at = now();\n    NEW.updated_at = now();\n    RETURN NEW;\n  END;\n$$ LANGUAGE plpgsql;\n\nCREATE TRIGGER trigger_link_pulls\n  BEFORE INSERT OR UPDATE ON pulls FOR EACH ROW EXECUTE PROCEDURE link_pulls();\n\n";

exports.up = function(db, callback) {
  db.runSql(funcs,callback);
};

exports.down = function(db, callback) {
  db.runSql("DROP TRIGGER IF EXISTS trigger_link_pulls ON pulls; DROP FUNCTION IF EXISTS link_pulls();",callback);
};
