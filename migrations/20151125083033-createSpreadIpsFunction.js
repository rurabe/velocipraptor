var dbm = global.dbm || require('db-migrate');
var type = dbm.dataType;

// CREATE OR REPLACE FUNCTION spread_ips(range inet) RETURNS SETOF inet AS $$
//   DECLARE
//     current_ip inet;
//     masklen int;
//   BEGIN
//     masklen := masklen(range);
//     current_ip := host(network(range));
//     WHILE current_ip <<= range LOOP
//       RETURN NEXT set_masklen(current_ip,masklen);
//       current_ip := current_ip + 1;
//     END LOOP;
//     RETURN;
//   END;
// $$ LANGUAGE plpgsql;

// CREATE OR REPLACE FUNCTION populate_addresses() RETURNS trigger AS $$
//   DECLARE 
//     ip inet;
//   BEGIN
//     FOR ip IN SELECT * from spread_ips(NEW.range) LOOP
//       BEGIN
//         INSERT INTO addresses(ip) VALUES (ip);
//       EXCEPTION WHEN unique_violation THEN
//         -- nothing, address already exists
//       END;
//     END LOOP;

//     RETURN NULL;
//   END;
// $$ LANGUAGE plpgsql;

// CREATE TRIGGER trigger_populate_addresses
//   AFTER INSERT ON leases FOR EACH ROW
//   EXECUTE PROCEDURE populate_addresses();

var func = "CREATE OR REPLACE FUNCTION spread_ips(range inet) RETURNS SETOF inet AS $$\n  DECLARE\n    current_ip inet;\n    masklen int;\n  BEGIN\n    masklen := masklen(range);\n    current_ip := host(network(range));\n    WHILE current_ip <<= range LOOP\n      RETURN NEXT set_masklen(current_ip,masklen);\n      current_ip := current_ip + 1;\n    END LOOP;\n    RETURN;\n  END;\n$$ LANGUAGE plpgsql;\n\nCREATE OR REPLACE FUNCTION populate_addresses() RETURNS trigger AS $$\n  DECLARE \n    ip inet;\n  BEGIN\n    FOR ip IN SELECT * from spread_ips(NEW.range) LOOP\n      BEGIN\n        INSERT INTO addresses(ip) VALUES (ip);\n      EXCEPTION WHEN unique_violation THEN\n        -- nothing, address already exists\n      END;\n    END LOOP;\n\n    RETURN NULL;\n  END;\n$$ LANGUAGE plpgsql;\n\nCREATE TRIGGER trigger_populate_addresses\n  AFTER INSERT ON leases FOR EACH ROW\n  EXECUTE PROCEDURE populate_addresses();\n";

exports.up = function(db, callback) {
  db.runSql(func,callback);
};

exports.down = function(db, callback) {
  db.runSql("DROP TRIGGER IF EXISTS trigger_populate_addresses ON leases;", function(){
    db.runSql("DROP FUNCTION IF EXISTS populate_addresses();",function(){
      db.runSql("DROP FUNCTION IF EXISTS spread_ips(inet);",callback)
    })
  })
};
