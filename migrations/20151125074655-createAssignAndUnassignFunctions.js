var dbm = global.dbm || require('db-migrate');
var type = dbm.dataType;

// CREATE OR REPLACE FUNCTION assign(text,inet) RETURNS server_assignments AS $$
//   DECLARE
//     server_id int;
//     address_id int;
//     assignment server_assignments;
//   BEGIN
//     select id into server_id from servers where code = $1;
//     insert into addresses(ip,created_at,updated_at) values ($2,now(),now()) RETURNING id INTO address_id;
//     insert into server_assignments(address_id,server_id,assigned,active,created_at) values (address_id,server_id,true,true,now()) returning * into assignment;
//     RETURN assignment;
//   END;
// $$ LANGUAGE plpgsql;

// CREATE OR REPLACE FUNCTION unassign(text,inet) RETURNS SETOF server_assignments AS $$
//   DECLARE
//     address addresses;
//     assignment server_assignments;
//   BEGIN
//     FOR address IN SELECT * FROM addresses INNER JOIN servers on addresses.server_id = servers.id WHERE servers.datacenter = $1 AND addresses.ip << $2 LOOP
//       INSERT INTO server_assignments(address_id,server_id,assigned,active) VALUES (address.id,address.server_id,FALSE,FALSE) RETURNING * INTO assignment;
//       RETURN NEXT assignment;
//     END LOOP;
//     RETURN;
//   END;
// $$ LANGUAGE plpgsql;

var funcs = "CREATE OR REPLACE FUNCTION assign(text,inet) RETURNS server_assignments AS $$\n  DECLARE\n    server_id int;\n    address_id int;\n    assignment server_assignments;\n  BEGIN\n    select id into server_id from servers where code = $1;\n    insert into addresses(ip,created_at,updated_at) values ($2,now(),now()) RETURNING id INTO address_id;\n    insert into server_assignments(address_id,server_id,assigned,active,created_at) values (address_id,server_id,true,true,now()) returning * into assignment;\n    RETURN assignment;\n  END;\n$$ LANGUAGE plpgsql;\n\nCREATE OR REPLACE FUNCTION unassign(text,inet) RETURNS SETOF server_assignments AS $$\n  DECLARE\n    address addresses;\n    assignment server_assignments;\n  BEGIN\n    FOR address IN SELECT * FROM addresses INNER JOIN servers on addresses.server_id = servers.id WHERE servers.datacenter = $1 AND addresses.ip << $2 LOOP\n      INSERT INTO server_assignments(address_id,server_id,assigned,active) VALUES (address.id,address.server_id,FALSE,FALSE) RETURNING * INTO assignment;\n      RETURN NEXT assignment;\n    END LOOP;\n    RETURN;\n  END;\n$$ LANGUAGE plpgsql;";

exports.up = function(db, callback) {
  db.runSql(funcs,callback);
};

exports.down = function(db, callback) {
  db.runSql("DROP FUNCTION IF EXISTS assign(text,inet); DROP FUNCTION IF EXISTS unassign(text,inet);",callback);
};
