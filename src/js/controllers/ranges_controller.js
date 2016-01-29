const Ranges = require('../models/ranges');

const _respond = function(promise,req,res){
  return promise.then(ranges => {
    res.json(Object.assign({},req.query,{ranges: ranges}));
  }).catch( e => {
    res.status(500).json({error: e.message})
  });
};

const RangesController = {
  index: function(req,res){
    return _respond(Ranges.where(req.query),req,res)
  },
  create: function(req,res){
    return _respond(Ranges.create(req.body.range),req,res)
  },
  update: function(req,res){
    return _respond(Ranges.update(req.params.id,req.body.update),req,res)
  },
  destroy: function(req,res){
    return _respond(Ranges.destroy(req.params.id),req,res)
  }
};

module.exports = RangesController;