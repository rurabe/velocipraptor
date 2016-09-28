'use strict';
const _ = require('lodash');
const Promise = require('bluebird');

const DB = require('../db');
const Ranges = require('./ranges');
const Datacenters = require('./datacenters');
const Addresses = require('./addresses');

const QueryHelpers = require('../helpers/query_helpers');
const SubnetHelpers = require('../helpers/subnet_helpers');
const AXSHelpers = require('../helpers/axs_helpers');

const AXS = {
  randomize: function(datacenter_id,axs_proxies){
    let now = new Date().toISOString();
    let ips = _.flatMap(axs_proxies,s => {
      return s.split(/\r?\n/i).filter(x => x).map(SubnetHelpers.stripPort);
    }).join(',');
    let rangesText = `
      update ranges set axs_last_active_at=now() 
        where ips >>= ANY (string_to_array($1,',')::inet[]) 
        returning id,ips,axs_last_active_at;
    `;
    return Promise.props({
      datacenters: Datacenters.update(datacenter_id,{axs_proxies: axs_proxies, axs_proxies_updated_at: now}),
      ranges: DB.query({text: rangesText, values: [ips]}).then(QueryHelpers.jsonize),
    });
  },
  unassign: function(datacenter_id,range_id){
    return Promise.props({
      addresses: Addresses.updateAll({role: null},{'addresses.range_id': range_id, role: 'axs'}),
      ranges: Ranges.where({'ranges.id': range_id}),
      datacenters: Datacenters.where({'datacenters.id': datacenter_id}),
    }).then(props => {
      let axs_proxies = props.datacenters[datacenter_id].axs_proxies;
      let range = props.ranges[range_id].ips;
      let new_proxies = AXSHelpers.removeRange(axs_proxies,range);
      return Datacenters.update(datacenter_id,{axs_proxies: new_proxies}).then(datacenters => {
        return {
          datacenters: datacenters,
          addresses: props.addresses,
        };
      });
    });
  }
};

module.exports = AXS;