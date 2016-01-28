'use strict';
const React = require('react');
const Dispatcher = require('../dispatcher');
const {Container} = require('flux/utils');
const Immutable = require('immutable');

const DatacentersStore = require('../stores/datacenters_store');
const ServersStore = require('../stores/servers_store');
const AddressesStore = require('../stores/addresses_store');

const DatacentersActions = require('../actions/datacenters_actions');
const ServersActions = require('../actions/servers_actions');
const AddressesActions = require('../actions/addresses_actions');

const ServersShow = require('./servers_show');
const SubnetHelpers = require('../helpers/subnet_helpers');



class ServersShowContainer extends React.Component {
  static getStores(){
    return [DatacentersStore,ServersStore,AddressesStore];
  }

  static calculateState(prevState,props){
    let datacenter_id = parseInt(props.routeParams.datacenter_id);
    let server_id = parseInt(props.routeParams.server_id);
    let datacenter = DatacentersStore.get(datacenter_id.toString());
    let server = ServersStore.get(server_id.toString());
    let addresses = AddressesStore.getState()
      .filter( a => a.get('server_id') === server_id )
      .sort(SubnetHelpers.sort( a => a.get("ip") ))

    let datacenter_ips_function = function(){
      let servers = ServersStore.getState().filter(server => server.get('datacenter_id') === datacenter_id);

      return AddressesStore.getState().filter( a => {
        let server_id = a.get('server_id').toString();
        return servers.getIn([server_id,'role']) !== 'proxy';
      }).sortBy( a => {
        let server_id = a.get('server_id').toString();
        return servers.getIn([server_id,'number']);
      }).map( a => {
        let server_id = a.get('server_id').toString();
        return [servers.getIn([server_id,'code']),SubnetHelpers.inetToMask(a.get('ip'))].join(",");
      }).join("\n");
    };

    return {
      datacenter: datacenter,
      server: server,
      addresses: addresses.toIndexedSeq(),
      user: props.user,
      datacenter_ips_function: datacenter_ips_function,
    }
  }

  componentDidMount(){
    let datacenter_id = this.props.routeParams.datacenter_id;
    let server_id = this.props.routeParams.server_id;
    DatacentersActions.index({id: datacenter_id});
    ServersActions.index({datacenter_id: datacenter_id}).then( response => {
      return AddressesActions.index({server_id: Object.keys(response.servers)});
    })
  }

  render(){
    if(this.state.server && this.state.datacenter){
      return <ServersShow {...this.state} />
    } else {
      return <h1>loading</h1>
    };
  }
}

module.exports = Container.create(ServersShowContainer,{withProps: true});