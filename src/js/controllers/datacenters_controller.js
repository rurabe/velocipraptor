const Datacenters = require('../models/datacenters');

const DatacentersController = {
  index: function(req,res){
    Datacenters.where(req.query).then( datacenters => {
      res.json(Object.assign({},req.query,{datacenters: datacenters}));
    });
  },
  get: function(req,res){
    Datacenters.find(req.params.id).then( datacenters => {
      res.json(Object.assign({datacenters: datacenters}));
    })
  }
};

module.exports = DatacentersController;