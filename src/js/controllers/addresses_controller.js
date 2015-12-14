const Addresses = require('../models/Addresses');

const AddressesController = {
  index: function(req,res){
    Addresses.where(req.params).then( addresses => {
      res.json({addresses: addresses});
    });
  },
};

module.exports = AddressesController;