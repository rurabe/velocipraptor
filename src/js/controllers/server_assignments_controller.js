'use strict';

const Promise = require('bluebird');

const Servers = require('../models/servers');
const Addresses = require('../models/addresses');
const ServerAssignments = require('../models/server_assignments');

const ServerAssignmentsController = {
  create: function(req,res){
    let data = req.body;
    return Promise.all([
      _assignServerIps(data.servers),
      _assignProxyIps(req.params.datacenter_id,'proxy',data.proxies),
      _assignAXS(data.axs),
    ]).then(() => {
      let serverIps = data.servers.map( assignment => assignment.split(',')[1] );
      let ipMap = serverIps.concat(data.proxies);
      return Addresses.where({'ip': ipMap});
    }).then(addresses => {
      res.json({addresses: addresses});
    });
  },
  destroy: function(req,res){

  },
};

const _assignServerIps = function(ips){
  return Promise.map(ips,(ip) => {
    let assignment = ip.split(',');
    return ServerAssignments.create(assignment[0],assignment[1]);
  });
};

const _assignProxyIps = function(datacenter_id,role,ips){
  return Servers.where({datacenter_id: datacenter_id, role: role}).then( servers => {
    if(servers.length > 0){
      let nper = Math.max(Math.floor(ips.length / servers.length),1);
      return Promise.map(ips,(ip,i) => {
        let serverIndex = Math.min(Math.floor(i/nper),servers.length - 1);
        return ServerAssignments.create(servers[serverIndex].code,ip);
      });
    } else {
      return Promise.resolve();
    }

  });
};

const _assignAXS = function(ips){
  return Addresses.updateAll({role: 'axs'},{ip: ips});
};


module.exports = ServerAssignmentsController;