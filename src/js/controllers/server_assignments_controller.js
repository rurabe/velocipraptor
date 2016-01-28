'use strict';

const Promise = require('bluebird');
const DB = require('../db');

const Servers = require('../models/servers');
const Addresses = require('../models/addresses');
const ServerAssignments = require('../models/server_assignments');

const QueryHelpers = require('../helpers/query_helpers');

const ServerAssignmentsController = {
  create: function(req,res){
    let data = req.body;
    return Promise.all([
      _assignServerIps(data.servers),
      _assignProxyIps(req.params.datacenter_id,data.proxies),
    ]).then((queries) => {
      let serverIps = data.servers.map( assignment => assignment.split(",")[1] )
      let ipMap = serverIps.concat(data.proxies);
      return Addresses.where({'ip': ipMap});
    }).then(addresses => {
      res.json({addresses: addresses});
    });
  },
  destroy: function(req,res){

  },
};

const _getProxyServers = function(datacenter_id){
  let serversQuery = Servers.select({datacenter_id: datacenter_id, role: 'proxy'}).order("servers.number");
  return DB.query(serversQuery.toParam())
};

const _assignServerIps = function(ips){
  return Promise.map(ips,(ip) => {
    let assignment = ip.split(",");
    return ServerAssignments.create(assignment[0],assignment[1]);
  });
};

const _assignProxyIps = function(datacenter_id,ips){
  return _getProxyServers(datacenter_id).then( servers => {
    if(servers.length > 0){
      let nper = Math.max(Math.floor(ips.length / servers.length),1);
      return Promise.map(ips,(ip,i) => {
        let serverIndex = Math.min(Math.floor(i/nper),servers.length - 1);
        return ServerAssignments.create(servers[serverIndex].code,ip);
      });
    } else {
      return Promise.resolve();
    }

  })
}


module.exports = ServerAssignmentsController;