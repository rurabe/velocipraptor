'use strict';

const Promise = require('bluebird');
const DB = require('../db');

const Servers = require('../models/servers');
const Addresses = require('../models/addresses');
const ServerAssignments = require('../models/server_assignments');

const QueryHelpers = require('../helpers/query_helpers');

const RangesAssignmentsController = {
  create: function(req,res){
    let ips = req.body.ips;
    return Promise.all([
      _assignIps(req.params.datacenter_id,ips.servers,_getTicketServers),
      _assignIps(req.params.datacenter_id,ips.proxies,_getProxyServers),
    ]).then((queries) => {
      let ipMap = ips.servers.concat(ips.proxies);
      return Addresses.where({'ip': ipMap})
    }).then(addresses => {
      res.json({addresses: addresses})
    });
  },
  destroy: function(req,res){

  },
};

const _getTicketServers = function(datacenter_id){
  let serversQuery = Servers.select({datacenter_id: datacenter_id}).where("role IS NULL").order("servers.number");
  return DB.query(serversQuery.toParam())
};

const _getProxyServers = function(datacenter_id){
  let serversQuery = Servers.select({datacenter_id: datacenter_id, role: 'proxy'}).order("servers.number");
  return DB.query(serversQuery.toParam())
};

const _assignIps = function(datacenter_id,ips,serversFunction){
  return serversFunction(datacenter_id).then(servers => {
    let nper = Math.floor(ips.length / servers.length);
    return Promise.map(ips,(ip,i) => {
      let serverIndex = Math.min(Math.floor(i/nper),servers.length - 1);
      return ServerAssignments.create(servers[serverIndex].code,ip)
    },{concurrency: 10});
  })
};

module.exports = RangesAssignmentsController;