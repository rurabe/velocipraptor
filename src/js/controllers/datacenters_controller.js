const Datacenters = require('../models/datacenters');

const DatacentersController = {
  index: function(req,res){
    Datacenters.where(req.query).then( datacenters => {
      res.json(Object.assign({},req.query,{datacenters: datacenters}));
    });
  }
};

module.exports = DatacentersController;