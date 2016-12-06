'use strict';

const request = require('superagent');
const Dispatcher = require('../dispatcher');
const _dr = Dispatcher.dispatchRequest;

const RangesSearchActions = {
  index: function(string){
    return new Promise((resolve,reject) => {
      request.get('/api/ranges/search').query({q: string}).end(_dr.bind(this,'ranges_search.state',resolve,reject));
    });
  }
};

module.exports = RangesSearchActions;