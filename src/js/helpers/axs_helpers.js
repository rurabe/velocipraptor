'use strict';
const _ = require('lodash');

const AXSHelpers = {
  randomize: function(wip){
    let all = _.flatMap(wip,s => s.split(/\r?\n/).filter(a => a) );
    let final = [];
    for(let i=0;i < wip.length;i++){ final.push([]); }
    _.shuffle(all).forEach((a,i) => final[i % final.length].push(a) );
    return final.map(s => s.join('\r\n'));
  }
};

module.exports = AXSHelpers;