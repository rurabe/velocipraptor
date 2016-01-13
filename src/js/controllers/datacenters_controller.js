const Datacenters = require('../models/datacenters');

const DatacentersController = {
  index: function(req,res){
    Datacenters.where(req.query).then( datacenters => {
      res.json(Object.assign({},req.query,{datacenters: datacenters}));
    });
  },
  create: function(req,res){
    Datacenters.create().then( datacenters => {
      res.json(Object.assign({},req.query,{datacenters: datacenters}));
    });
  },
  update: function(req,res){
    Datacenters.update(req.params.id,req.body.update).then(datacenters => {
      res.json(Object.assign({},req.query,{datacenters: datacenters}));
    })
  }
};

module.exports = DatacentersController;