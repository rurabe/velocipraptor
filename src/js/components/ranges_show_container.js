'use strict';
const React = require('react');
const Dispatcher = require('../dispatcher');
const {Container} = require('flux/utils');
const Immutable = require('immutable');

const DatacentersStore = require('../stores/datacenters_store');
const RangesStore = require('../stores/ranges_store');
const AddressesStore = require('../stores/addresses_store');

const DatacentersActions = require('../actions/datacenters_actions');
const RangesActions = require('../actions/ranges_actions');
const AddressesActions = require('../actions/addresses_actions');
const PullsActions = require('../actions/pulls_actions');

const RangesShow = require('./ranges_show');



class RangesShowContainer extends React.Component {
  static getStores(){
    return [DatacentersStore,RangesStore,AddressesStore];
  }

  static calculateState(prevState,props){
    let datacenter_id = parseInt(props.routeParams.datacenter_id);
    let range_id = parseInt(props.routeParams.range_id);
    let datacenter = DatacentersStore.get(datacenter_id.toString());
    let range = RangesStore.get(range_id.toString());
    let addresses = AddressesStore.getState().filter( a => a.get('range_id') === range_id ).sortBy(a => a.get('ip'))
    return {
      datacenter: datacenter,
      range: range,
      addresses: addresses.toIndexedSeq(),
      user: props.user
    }
  }

  componentDidMount(){
    let datacenter_id = this.props.routeParams.datacenter_id;
    let range_id = this.props.routeParams.range_id;
    DatacentersActions.index({id: datacenter_id});
    RangesActions.index({id: range_id});
    AddressesActions.index({range_id: range_id});
  }

  render(){
    if(this.state.range && this.state.datacenter){
      return <RangesShow {...this.state} />
    } else {
      return <h1>loading</h1>
    };
  }
}

window.AddressesStore = AddressesStore;

module.exports = Container.create(RangesShowContainer,{withProps: true});