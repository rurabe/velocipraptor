'use strict';
const React = require('react');
const Dispatcher = require('../dispatcher');
const {Container} = require('flux/utils');

const DatacentersStore = require('../stores/datacenters_store');
const RangesStore = require('../stores/ranges_store');
const ServersStore = require('../stores/servers_store');

const DatacentersActions = require('../actions/datacenters_actions');
const RangesActions = require('../actions/ranges_actions');
const ServersActions = require('../actions/servers_actions');

const DatacentersShow = require('./datacenters_show');

class DatacentersShowContainer extends React.Component {
  static getStores(){
    return [DatacentersStore,RangesStore,ServersStore];
  }

  static calculateState(prevState,props){
    let datacenter_id = parseInt(props.routeParams.datacenter_id);
    let datacenter = DatacentersStore.get(datacenter_id.toString());
    let ranges = RangesStore.getState().filter(range => range.get('datacenter_id') === datacenter_id).toIndexedSeq();
    let servers = ServersStore.getState().filter(server => server.get('datacenter_id') === datacenter_id).toIndexedSeq();
    return {
      datacenter: datacenter,
      ranges: ranges,
      servers: servers,
      user: props.user
    };
  }

  componentDidMount(){
    let datacenter_id = this.props.routeParams.datacenter_id;
    DatacentersActions.index({id: datacenter_id});
    RangesActions.index({datacenter_id: datacenter_id});
    ServersActions.index({datacenter_id: datacenter_id});
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

module.exports = Container.create(DatacentersShowContainer,{withProps: true});