var dbm = global.dbm || require('db-migrate');
var type = dbm.dataType;

exports.up = function(db, callback) {
  db.runSql("create index index_address_id_on_pulls on pulls (address_id);",function(){
    db.runSql("create index index_server_id_on_pulls on pulls (server_id);",function(){
      db.runSql("create unique index index_thread_log_id_on_pulls on pulls (thread_log_id);",function(){
        db.runSql("create index index_server_on_pulls on pulls (server);",function(){
          db.runSql("create index index_search_date_on_pulls on pulls (search_date);",function(){
            db.runSql("create index index_event_link_on_pulls on pulls (event_link);",callback);
          });
        });
      });
    });
  });
};

exports.down = function(db, callback) {
  db.runSql("drop index if exists index_gist_ip_on_pulls;",function(){
    db.runSql("drop index if exists index_server_id_on_pulls",function(){
      db.runSql("drop index if exists index_thread_log_id_on_pulls;",function(){
        db.runSql("drop index if exists index_server_on_pulls;",function(){
          db.runSql("drop index if exists index_search_date_on_pulls;",function(){
            db.runSql("drop index if exists index_event_link_on_pulls;",callback);
          });
        });
      });
    });
  });
};
