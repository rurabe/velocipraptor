const Ranges = require('../models/ranges');

const RangesRotationController = {
  index: function(req,res){
    return Ranges.rotate(req.params.id).then(ranges => {
      res.json({rotation: ranges});
    }).catch( e => {
      res.status(500).json({error: e.message})
    });
  }
};

module.exports = RangesRotationController;