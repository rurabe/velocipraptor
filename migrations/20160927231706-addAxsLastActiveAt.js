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
  db.addColumn('ranges','axs_last_active_at',{type: 'timestamp'},callback);
};

exports.down = function(db,callback) {
  db.removeColumn('ranges','axs_last_active_at',callback);
};
