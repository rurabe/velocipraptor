var dbm = global.dbm || require('db-migrate');
var type = dbm.dataType;

// CREATE OR REPLACE FUNCTION update_address_from_server_assignment() RETURNS trigger AS
// $$
//   BEGIN
//     UPDATE addresses SET server_id = (CASE WHEN NEW.assigned THEN NEW.server_id ELSE NULL END) WHERE id = NEW.address_id;
//     RETURN NULL;
//   END;
// $$ LANGUAGE plpgsql;

// CREATE TRIGGER trigger_update_address_from_server_assignment
//   AFTER INSERT OR UPDATE ON server_assignments
//   FOR EACH ROW
//   EXECUTE PROCEDURE update_address_from_server_assignment();

var func = "CREATE OR REPLACE FUNCTION update_address_from_server_assignment() RETURNS trigger AS\n$$\n  BEGIN\n    UPDATE addresses SET server_id = (CASE WHEN NEW.assigned THEN NEW.server_id ELSE NULL END) WHERE id = NEW.address_id;\n  RETURN NULL;\n  END;\n$$ LANGUAGE plpgsql;\n\nCREATE TRIGGER trigger_update_address_from_server_assignment\n  AFTER INSERT OR UPDATE ON server_assignments\n  FOR EACH ROW\n  EXECUTE PROCEDURE update_address_from_server_assignment();\n";

exports.up = function(db, callback) {
  db.runSql(func,callback);
};

exports.down = function(db, callback) {
  db.runSql("DROP TRIGGER IF EXISTS trigger_update_address_from_server_assignment ON server_assignments; DROP FUNCTION IF EXISTS update_address_from_server_assignment();",callback);
};
