const Servers = require('../models/servers');
const QueryHelpers = require('../helpers/query_helpers');
const _jsonize = QueryHelpers.jsonize;

const _respond = function(promise,req,res){
  return promise.then(_jsonize).then(servers => {
    res.json(Object.assign({},req.query,{servers: servers}));
  }).catch( e => {
    res.status(500).json({error: e.message});
  });
};


const ServersController = {
  index: function(req,res){
    return _respond(Servers.where(req.query),req,res);
  },
  create: function(req,res){
    return _respond(Servers.create(req.body.server),req,res);
  },
  update: function(req,res){
    return _respond(Servers.update(req.params.id,req.body.update),req,res);
  },
  destroy: function(req,res){
    return _respond(Servers.destroy(req.params.id),req,res);
  }
};

module.exports = ServersController;