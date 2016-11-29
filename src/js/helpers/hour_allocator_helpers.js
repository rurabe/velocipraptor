'use strict';
const _ = require('lodash');

const SubnetHelpers = require('./subnet_helpers');

const ideals = [0.40,0.23,0.11,0.22,0.04];

const _calculateProportions = function(arr){
  let total = arr.reduce((t,adds) => {return t += adds.length},0);
  if(total > 0){
    return arr.map(adds => adds.length / total);
  } else {
    return [0,0,0,0,0];
  }
};

const _leastIdeal = function(arr){
  let props = _calculateProportions(arr);
  let diffs = props.map((p,i) => ideals[i] - p );
  let max = _.max(diffs);
  return diffs.indexOf(max);
};

const HourAllocatorHelpers = {
  randomize: function(proxies){
    let rProxies = proxies.toList()
      .filter(a => SubnetHelpers.size(a.get('ip')) > 255 )
      .groupBy(a => a.get('range_id'))
      .toList()
      .sortBy(() => Math.random() )
      .sortBy(range => range.length )
      .reduce((r,addresses) => {
        let leastIdealIndex = _leastIdeal(r);
        let as = addresses.map(a => `${SubnetHelpers.host(a.get('ip'))}:49872`).toJSON();
        r[leastIdealIndex] = r[leastIdealIndex].concat(as);
        
        return r;
      },[[],[],[],[],[]]);

    console.log(rProxies)
    console.log(_calculateProportions(rProxies))

    return ['7:00','8:00','9:00','10:00','OTHER'].map((hr,i) => {
      let proxyText = _.shuffle(rProxies[i]).join('\n');
      return `${hr}|HR\n${proxyText}`;
    }).join('\n');
  }
};

module.exports = HourAllocatorHelpers;