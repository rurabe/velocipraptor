'use strict';

const RateHelpers = {
  format: function(suc,pulls){
    if(pulls){
      let rate = suc / pulls;
      if(rate > 0.8){
        return 'rate-high';
      } else if (rate > 0.7){
        return 'rate-med';
      } else {
        return 'rate-low';
      }
    } else {
      return 'rate-na';
    }
    
  }
};

module.exports = RateHelpers;