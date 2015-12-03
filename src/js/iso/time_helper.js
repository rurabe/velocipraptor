'use strict';

const TimeHelper = {
  parseHour: function(hours,meridian){
    let h = parseInt(hours);
    if(h === 12){
      return (meridian.match(/am/i) ? (h - 12) : h);
    } else {
      return (meridian.match(/pm/i) ? (h + 12) : h);
    }
  }
};

module.exports = TimeHelper;