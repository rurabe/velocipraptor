'use strict';
const React = require('react');
const Dispatcher = require('../dispatcher');
const {Container} = require('flux/utils');
const Immutable = require('immutable');

const DatacentersStore = require('../stores/datacenters_store');
const ServersStore = require('../stores/servers_store');
const AddressesStore = require('../stores/addresses_store');
const RangesStore = require('../stores/ranges_store');

const DatacentersActions = require('../actions/datacenters_actions');
const ServersActions = require('../actions/servers_actions');
const RangesActions = require('../actions/ranges_actions');
const AddressesActions = require('../actions/addresses_actions');

const AXSEdit = require('./axs_edit');
const SubnetHelpers = require('../helpers/subnet_helpers');

class AXSEditContainer extends React.Component {
  static getStores(){
    return [DatacentersStore,ServersStore,AddressesStore,RangesStore];
  }

  static calculateState(prevState,props){
    let datacenter_id = parseInt(props.routeParams.datacenter_id);
    let datacenter = DatacentersStore.get(datacenter_id.toString());
    let server = ServersStore.getState().find(s => {
      return s.get('role') === 'proxy' && s.get('datacenter_id') === datacenter_id;
    });
    let server_id;
    if(server){ server_id = server.get('id'); }
    let ranges = RangesStore.getState()
      .filter(range => range.get('datacenter_id') === datacenter_id);
    let addresses = AddressesStore.getState()
      .filter( a => a.get('server_id') === server_id && (a.get('role') === 'axs') )
      .sort(SubnetHelpers.sort( a => a.get('ip') ));

    return {
      datacenter: datacenter,
      server: server,
      ranges: ranges,
      addresses: addresses.toIndexedSeq(),
      user: props.user,
    };
  }

  componentDidMount(){
    let datacenter_id = this.props.routeParams.datacenter_id;
    DatacentersActions.index({id: datacenter_id}).then(response => {
      let update = {type: 'datacenters.merge', datacenters: {}};
      update.datacenters[datacenter_id] = {axs_proxies_wip: response.datacenters[datacenter_id].axs_proxies};
      Dispatcher.dispatch(update);
    });
    RangesActions.index({datacenter_id: datacenter_id});
    ServersActions.index({datacenter_id: datacenter_id, role: 'proxy'}).then(response => {
      return AddressesActions.index({server_id: Object.keys(response.servers), role: ['axs','axsresting']});
    });
    
    
  }

  render(){
    if(this.state.datacenter && this.state.datacenter.get('axs_proxies_wip') && this.state.ranges.size > 0 && this.state.addresses.size > 0){
      return <AXSEdit {...this.state} />;
    } else {
      return <h1>loading</h1>;
    }
  }
}

module.exports = Container.create(AXSEditContainer,{withProps: true});