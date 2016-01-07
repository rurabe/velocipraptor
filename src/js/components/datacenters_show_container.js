'use strict';
const React = require('react');
const Dispatcher = require('../dispatcher');
const {Container} = require('flux/utils');

const DatacentersStore = require('../stores/datacenters_store');

const DatacentersActions = require('../actions/datacenters_actions');

const DatacentersShow = require('./datacenters_show');

class DatacentersShowContainer extends React.Component {
  static getStores(){
    return [DatacentersStore];
  }

  static calculateState(prevState,props){
    console.log(props)
    let datacenter = DatacentersStore.get(props.routeParams.datacenter_id);
    console.log(datacenter)
    return {
      datacenter: datacenter,
      user: props.user
    }
  }

  componentDidMount(){
    DatacentersActions.get(this.props.routeParams.datacenter_id);
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

module.exports = Container.create(DatacentersShowContainer,{withProps: true});