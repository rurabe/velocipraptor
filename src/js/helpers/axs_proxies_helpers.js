'use strict';

const SubnetHelpers = require('./subnet_helpers');

const AXSProxiesHelpers = {
  encode: function(addresses,text){
    return text.split(/\r?\n/i).map(line => {
      let ip = line.replace(/\:?\d*$/,'')
      let add = addresses.find(a => SubnetHelpers.host(a.get('ip')) === ip );
      return add.get('id');
    });
  },
  decode: function(addresses,arr){
    return arr.map(id => {
      let ip = addresses.get(id).get('ip');
      return `${SubnetHelpers.host(ip)}:49872`;
    }).join('\r\n');
  },
  decodeAddresses: function(addresses){
    return addresses.map(a => {
      return `${SubnetHelpers.host(a.get('ip'))}:49872`;
    }).join('\r\n');
  }
};

module.exports = AXSProxiesHelpers;