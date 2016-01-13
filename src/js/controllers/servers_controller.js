const Servers = require('../models/servers');

const ServersController = {
  index: function(req,res){
    Servers.where(req.query).then( servers => {
      res.json(Object.assign({},req.query,{servers: servers}));
    });
  },
  create: function(req,res){
    Servers.create(req.body.server).then(servers => {
      res.json(Object.assign({},req.query,{servers: servers}));
    });
  },
  update: function(req,res){
    Servers.update(req.params.id,req.body.update).then( servers => {
      res.json(Object.assign({},req.query,{servers: servers}));
    });
  },
  destroy: function(req,res){
    Servers.destroy(req.params.id).then( servers => {
      res.json(Object.assign({},req.query,{servers: servers}));
    });
  }
};

module.exports = ServersController;