const Servers = require('../models/servers');

const ServersController = {
  index: function(req,res){
    Servers.where(req.query).then( servers => {
      res.json(Object.assign({},req.query,{servers: servers}));
    });
  },
};

module.exports = ServersController;