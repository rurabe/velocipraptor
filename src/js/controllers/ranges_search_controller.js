'use strict';

const Ranges = require('../models/ranges');

const RangesSearchController = {
  index: function(req,res){
    return Ranges.search(req.query.q).then(ranges => {
      res.json({
        ranges: ranges
      });
    });
  }
};

module.exports = RangesSearchController;