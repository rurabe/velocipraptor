'use strict';

var dbm;
var type;
var seed;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function(db,callback) {
  db.addColumn('addresses','deactivated_at',{type: 'timestamp'},() => {
    db.addIndex('addresses','index_deactivated_at_on_addresses','deactivated_at',callback);
  });
};

exports.down = function(db) {
  db.removeIndex('addresses','index_deactivated_at_on_addresses',() => {
    db.removeColumn('addresses','deactivated_at',callback);
  });
};
