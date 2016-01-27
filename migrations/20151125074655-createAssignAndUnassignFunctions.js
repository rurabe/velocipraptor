'use strict';

var dbm = global.dbm || require('db-migrate');
var type = dbm.dataType;

var funcs = `CREATE OR REPLACE FUNCTION assign(int,inet) RETURNS server_assignments AS $$
  DECLARE
    server_id int;
    address_id int;
    assignment server_assignments;
  BEGIN
    select id into address_id from addresses where ip = $2;
    IF address_id IS NULL THEN
      insert into ranges(ips,datacenter_id) values (network($2),(select datacenter_id from servers where id = $1));
      select id into address_id from addresses where ip = $2;
    END IF;
    insert into server_assignments(address_id,server_id,assigned,active,created_at) values (address_id,$1,true,true,now()) returning * into assignment;
    RETURN assignment;
  END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION unassign(int,inet) RETURNS SETOF server_assignments AS $$
  DECLARE
    address addresses;
    assignment server_assignments;
  BEGIN
    FOR address IN SELECT * FROM addresses INNER JOIN servers on addresses.server_id = servers.id WHERE servers.datacenter_id = $1 AND addresses.ip <<= $2 LOOP
      INSERT INTO server_assignments(address_id,server_id,assigned,active,created_at) VALUES (address.id,address.server_id,FALSE,FALSE,now()) RETURNING * INTO assignment;
      RETURN NEXT assignment;
    END LOOP;
    RETURN;
  END;
$$ LANGUAGE plpgsql;`

exports.up = function(db, callback) {
  db.runSql(funcs,callback);
};

exports.down = function(db, callback) {
  db.runSql("DROP FUNCTION IF EXISTS assign(int,inet); DROP FUNCTION IF EXISTS unassign(int,inet);",callback);
};
