'use strict';
const React = require('react');
const Dispatcher = require('../dispatcher');
const {Container} = require('flux/utils');

const DatacentersStore = require('../stores/datacenters_store');
const RangesStore = require('../stores/ranges_store');
const ServersStore = require('../stores/servers_store');
const AddressesStore = require('../stores/addresses_store');
const PageStore = require('../stores/page_store');
const RotationsStore = require('../stores/rotations_store');

const DatacentersActions = require('../actions/datacenters_actions');
const RangesActions = require('../actions/ranges_actions');
const ServersActions = require('../actions/servers_actions');
const AddressesActions = require('../actions/addresses_actions');

const DatacentersShow = require('./datacenters_show');

const SubnetHelpers = require('../helpers/subnet_helpers');

class DatacentersShowContainer extends React.Component {
  static getStores(){
    return [DatacentersStore,RangesStore,ServersStore,AddressesStore,PageStore,RotationsStore];
  }

  static calculateState(prevState,props){
    let datacenter_id = parseInt(props.routeParams.datacenter_id);
    let datacenter = DatacentersStore.get(datacenter_id.toString());
    let ranges = RangesStore.getState()
      .filter(range => range.get('datacenter_id') === datacenter_id)
      .sort(SubnetHelpers.sort(r => r.get('ips')))
      .toIndexedSeq();
    let servers = ServersStore.getState()
      .filter(server => server.get('datacenter_id') === datacenter_id)
      .sortBy(s => s.get('code'));
    let addresses = AddressesStore.getState()
      .filter( address => {
        let server_id = address.get('server_id')
        return server_id ? servers.has( server_id.toString() ) : false
      });
    let page = PageStore.getState();

    let datacenter_ips_function = function(){
      let servers = ServersStore.getState().filter(server => server.get('datacenter_id') === datacenter_id);

      return AddressesStore.getState().filter( a => {
        if(!a.get('deactivated_at') && a.get('server_id')){
          let server_id = a.get('server_id').toString();
          return !servers.getIn([server_id,'role']);
        }
      }).sortBy( a => {
        let server_id = a.get('server_id').toString();
        return servers.getIn([server_id,'code']);
      }).map( a => {
        let server_id = a.get('server_id').toString();
        return [servers.getIn([server_id,'code']),SubnetHelpers.inetToMask(a.get('ip'))].join(",");
      }).join("\n") || "no ips";
    };

    let rotation = RotationsStore.getState().get('rotation');

    return {
      datacenter: datacenter,
      ranges: ranges,
      servers: servers,
      addresses: addresses,
      page: page,
      user: props.user,
      datacenter_ips_function: datacenter_ips_function,
      rotation: rotation,
    };
  }

  componentDidMount(){
    let datacenter_id = this.props.routeParams.datacenter_id;
    DatacentersActions.index({id: datacenter_id});
    RangesActions.index({datacenter_id: datacenter_id});
    ServersActions.index({datacenter_id: datacenter_id}).then( response => {
      return AddressesActions.index({server_id: Object.keys(response.servers)});
    });
  }

  render(){
    if(this.state.datacenter){
      return <DatacentersShow {...this.state} />
    } else {
      return <h1>loading</h1>
    };
  }
}

window.DatacentersStore = DatacentersStore;
window.RangesStore = RangesStore;
window.AddressesStore = AddressesStore;
window.ServersStore = ServersStore;

module.exports = Container.create(DatacentersShowContainer,{withProps: true});