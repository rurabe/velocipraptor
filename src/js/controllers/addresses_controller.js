const Addresses = require('../models/addresses');

const AddressesController = {
  index: function(req,res){
    Addresses.where(req.query).then( addresses => {
      res.json(Object.assign({},req.query,{addresses: addresses}));
    });
  },
  update: function(req,res){
    Addresses.update(req.params.id,req.body.update).then( addresses => {
      res.json(Object.assign({},req.query,{addresses: addresses}));
    });
  },
};

module.exports = AddressesController;