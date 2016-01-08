const Ranges = require('../models/ranges');

const RangesController = {
  index: function(req,res){
    Ranges.where(req.query).then( ranges => {
      res.json(Object.assign({},req.query,{ranges: ranges}));
    });
  }
};

module.exports = RangesController;