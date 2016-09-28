const request = require('superagent');
const Dispatcher = require('../dispatcher');

const AXSActions = {
  create: function(id,axs_proxies){
    return new Promise(function(resolve,reject){
      request.post(`/api/datacenters/${id}/axs`).send({axs_proxies: axs_proxies}).end((err,res) => {
        Dispatcher.dispatch({type: 'datacenters.merge', datacenters: res.body.datacenters});
        Dispatcher.dispatch({type: 'ranges.merge', ranges: res.body.ranges});
        resolve(res.body);
      });
    });
  },
  destroy: function(id,rangeId){
    return new Promise(function(resolve,reject){
      request.del(`/api/datacenters/${id}/axs/${rangeId}`).end((err,res) => {
        res.body.datacenters[id].axs_proxies_wip = res.body.datacenters[id].axs_proxies;
        Dispatcher.dispatch({type: 'datacenters.merge', datacenters: res.body.datacenters});
        Dispatcher.dispatch({type: 'addresses.merge', addresses: res.body.addresses});
        resolve(res.body);
      });
    });
  }
};

module.exports = AXSActions;