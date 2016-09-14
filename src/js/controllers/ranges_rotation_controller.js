'use strict';
const Promise = require('bluebird');

const Datacenters = require('../models/datacenters');
const Ranges = require('../models/ranges');
const AveryTrips = require('../external/avery_trips');
const AppUpdate = require('../external/app_update');

const RangesRotationController = {
  index: function(req,res){
    return Ranges.rotate(req.params.id).then(ranges => {
      res.json({rotation: ranges});
    }).catch( e => {
      res.status(500).json({error: e.message});
    });
  },
  create: function(req,res){
    return Promise.props({
      sftp: AveryTrips.thupdate(req.body.iplist),
      datacenter: Datacenters.find(req.params.id),
    }).then(props => {
      const datacenter = props.datacenter[req.params.id];
      return AppUpdate.updateDatacenter(datacenter.axs_code);
    }).then(() => {
      res.json({status: 'ok'});
    }).catch(e => {
      res.status(500).json({error: e.message});
    });
  }
};

module.exports = RangesRotationController;