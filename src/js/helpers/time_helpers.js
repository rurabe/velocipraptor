'use strict';
const moment = require('moment');

const TimeHelpers = {
  parseHour: function(hours,meridian){
    let h = parseInt(hours);
    if(h === 12){
      return (meridian.match(/am/i) ? (h - 12) : h);
    } else {
      return (meridian.match(/pm/i) ? (h + 12) : h);
    }
  },
  ordinalDates: function(startDate,endDate,format){
    let start = moment(startDate);
    let end = moment(endDate).format(format);
    let r = [start.format(format)];
    while(r[r.length - 1] !== end){
      r.push( start.add(1,'day').format(format) )
    }
    return r;
  }
};

module.exports = TimeHelpers;