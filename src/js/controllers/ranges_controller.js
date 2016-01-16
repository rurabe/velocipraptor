const Ranges = require('../models/ranges');

const RangesController = {
  index: function(req,res){
    Ranges.where(req.query).then( ranges => {
      res.json(Object.assign({},req.query,{ranges: ranges}));
    });
  },
  create: function(req,res){
    Ranges.create(req.body.range).then( ranges => {
      res.json(Object.assign({},req.query,{ranges: ranges}));
    });    
  },
  update: function(req,res){
    Ranges.update(req.params.id,req.body.update).then( ranges => {
      res.json(Object.assign({},req.query,{ranges: ranges}));
    })
  }
};

module.exports = RangesController;