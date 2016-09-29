'use strict';
const _ = require('lodash');
const { Netmask } = require('netmask');
const SubnetHelpers = require('../helpers/subnet_helpers');

const AXSHelpers = {
  randomize: function(wip){
    let all = _.flatMap(wip,s => s.split(/\r?\n/).filter(a => a) );
    let final = [];
    for(let i=0;i < wip.length;i++){ final.push([]); }
    _.shuffle(all).forEach((a,i) => final[i % final.length].push(a) );
    return final.map(s => s.join('\r\n'));
  },
  // proxies in the form of text[] and range a string in 'a.b.c.d/y' format
  removeRange: function(proxies,range){
    let r = new Netmask(range);
    return proxies.map(s => {
      return s.split(/\r?\n/).filter(a => {
        return a && !r.contains(SubnetHelpers.stripPort(a));
      }).join('\r\n');
    });
  }
};

module.exports = AXSHelpers;