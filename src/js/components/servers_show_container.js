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
const RangesActions = require('../actions/ranges_actions');
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
    let ranges = RangesStore.getState()
      .filter(range => range.get('datacenter_id') === datacenter_id)
    let addresses = AddressesStore.getState()
      .filter( a => a.get('server_id') === server_id )
      .sort(SubnetHelpers.sort( a => a.get("ip") ));

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
    let server_id = this.props.routeParams.server_id;
    DatacentersActions.index({id: datacenter_id});
    RangesActions.index({datacenter_id: datacenter_id});
    ServersActions.index({'servers.id': server_id});
    AddressesActions.index({server_id: server_id});
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