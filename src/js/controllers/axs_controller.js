'use strict';

const AXS = require('../models/axs');

const AXSController = {
  create: function(req,res){
    AXS.randomize(req.params.id,req.body.axs_proxies).then(update => {
      res.json(Object.assign({},req.query,update));
    }).catch( e => res.status(500).json({error: e.message}) );
  },
  destroy: function(req,res){
    AXS.unassign(req.params.id,req.params.range_id).then(update => {
      res.json(Object.assign({},req.query,update));
    }).catch( e => res.status(500).json({error: e.message}) );
  }
};

module.exports = AXSController;