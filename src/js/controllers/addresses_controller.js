const Addresses = require('../models/Addresses');

const AddressesController = {
  index: function(req,res){
    console.log(req.query)
    Addresses.where(req.query).then( addresses => {
      res.json(Object.assign({},req.query,{addresses: addresses}));
    });
  },
};

module.exports = AddressesController;