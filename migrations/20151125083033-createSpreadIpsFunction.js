var dbm = global.dbm || require('db-migrate');
var type = dbm.dataType;

var func = `CREATE OR REPLACE FUNCTION spread_ips(range inet) RETURNS SETOF inet AS $$
  DECLARE
    current_ip inet;
    masklen int;
  BEGIN
    masklen := masklen(range);
    current_ip := host(network(range));
    WHILE current_ip <<= range LOOP
      RETURN NEXT set_masklen(current_ip,masklen);
      current_ip := current_ip + 1;
    END LOOP;
    RETURN;
  END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION populate_addresses() RETURNS trigger AS $$
  DECLARE 
    ip inet;
  BEGIN
    FOR ip IN SELECT * from spread_ips(NEW.ips) LOOP
      BEGIN
        INSERT INTO addresses(ip,range_id) VALUES (ip,NEW.id);
      EXCEPTION WHEN unique_violation THEN
        -- nothing, address already exists
      END;
    END LOOP;

    RETURN NULL;
  END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_populate_addresses
  AFTER INSERT ON ranges FOR EACH ROW
  EXECUTE PROCEDURE populate_addresses();`

exports.up = function(db, callback) {
  db.runSql(func,callback);
};

exports.down = function(db, callback) {
  db.runSql("DROP TRIGGER IF EXISTS trigger_populate_addresses ON ranges;", function(){
    db.runSql("DROP FUNCTION IF EXISTS populate_addresses();",function(){
      db.runSql("DROP FUNCTION IF EXISTS spread_ips(inet);",callback)
    })
  })
};
