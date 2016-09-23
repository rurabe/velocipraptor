'use strict';
const {MapStore} = require('flux/utils');
const Dispatcher = require('../dispatcher');
const Immutable = require('immutable');
const _ = require('lodash');
const { Netmask } = require('netmask');

class DatacentersStore extends MapStore {
  reduce(state, action){
    switch (action.type) {
    case 'datacenters.state':
      return Immutable.fromJS(action.datacenters);
    case 'datacenters.merge':
      return state.mergeDeep(Immutable.fromJS(action.datacenters));
    case 'datacenters.remove':
      return Object.keys(action.datacenters).reduce( (s,k) => { return s.delete(k); },state);
    case 'datacenters.axs_wip_servers_create': {
      let dcid = action.datacenter_id.toString();
      let currentWIP = state.getIn([dcid,'axs_proxies_wip']);
      return state.setIn([dcid,'axs_proxies_wip'],currentWIP.push(''));
    }
    case 'datacenters.axs_wip_servers_update': {
      let dcid = action.datacenter_id.toString();
      let si = action.server_index;
      return state.setIn([dcid,'axs_proxies_wip',si],action.text);
    }
    case 'datacenters.axs_wip_servers_delete': {
      let dcid = action.datacenter_id.toString();
      let si = action.server_index;
      return state.deleteIn([dcid,'axs_proxies_wip',si]);
    }
    case 'datacenters.axs_range_toggle': {
      let dcid = action.datacenter_id.toString();
      let newWIP = state.getIn([dcid,'axs_proxies_wip']).toJSON();
      if(action.enable){
        _.reverse(action.addresses).forEach((a,i) => {
          let index = i % newWIP.length;
          newWIP[index] = `${a.host}:49872\r\n${newWIP[index]}`;
        });
      } else {
        let r = new Netmask(action.range);
        newWIP = newWIP.map(s => {
          return s.split(/\r?\n/).filter(a => a && !r.contains(a)).join('\r\n');
        });
      }
      return state.setIn([dcid,'axs_proxies_wip'],Immutable.fromJS(newWIP));
    }
    default:
      return state;
    }
  }
}

module.exports = new DatacentersStore(Dispatcher);

