const Ranges = require('../models/ranges');
const AveryTrips = require('../external/avery_trips');

const RangesRotationController = {
  index: function(req,res){
    return Ranges.rotate(req.params.id).then(ranges => {
      res.json({rotation: ranges});
    }).catch( e => {
      res.status(500).json({error: e.message})
    });
  },
  create: function(req,res){
    return AveryTrips.thupdate(req.body.iplist).then(() => {
      res.json({status: 'ok'});
    }).catch(e => {
      res.status(500).json({error: e.message});
    });
  }
};

module.exports = RangesRotationController;