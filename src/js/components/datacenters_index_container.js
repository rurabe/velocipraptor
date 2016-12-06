'use strict';
const React = require('react');
const Dispatcher = require('../dispatcher');
const {Container} = require('flux/utils');

const DatacentersStore = require('../stores/datacenters_store');
const ServersStore = require('../stores/servers_store');
const AddressesStore = require('../stores/addresses_store');

const DatacentersActions = require('../actions/datacenters_actions');
const ServersActions = require('../actions/servers_actions');
const AddressesActions = require('../actions/addresses_actions');

const DatacentersIndex = require('./datacenters_index');

const MathHelpers = require('../helpers/math_helpers');

class DatacentersIndexContainer extends React.Component {
  static getStores(){
    return [DatacentersStore,AddressesStore,ServersStore];
  }

  static calculateState(prevState,props){

    let datacenters = DatacentersStore.getState();
    let proxyServerIds = ServersStore.getState().filter(s => s.get('role') === 'proxy').map(s => s.get("id")).toArray();
    let proxies = AddressesStore.getState().filter(a => proxyServerIds.indexOf(a.get('server_id')) > -1 );

    return {
      datacenters: datacenters.toIndexedSeq(),
      proxies: proxies,
      user: props.user,
    };
  }

  componentDidMount(){
    DatacentersActions.index();
    ServersActions.index({role: 'proxy'}).then(response => {
      return AddressesActions.index({server_id: Object.keys(response.servers)}).then(response => {
        this.setState({proxiesLoaded: true});
      });
    });
  }

  render(){
    return (<DatacentersIndex {...this.state} />);
  }
}

window.DatacentersStore = DatacentersStore;

module.exports = Container.create(DatacentersIndexContainer,{withProps: true});