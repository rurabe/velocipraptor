'use strict';
const React = require('react');
const Dispatcher = require('../dispatcher');
const {Container} = require('flux/utils');

const DatacentersStore = require('../stores/datacenters_store');

const DatacentersActions = require('../actions/datacenters_actions');

const DatacentersIndex = require('./datacenters_index');

const MathHelpers = require('../helpers/math_helpers');

class DatacentersIndexContainer extends React.Component {
  static getStores(){
    return [DatacentersStore];
  }

  static calculateState(prevState,props){

    let datacenters = DatacentersStore.getState();

    return {
      datacenters: datacenters.toIndexedSeq(),
      user: props.user
    }
  }

  componentDidMount(){
    DatacentersActions.index();
  }

  render(){
    return (<DatacentersIndex {...this.state} />);
  }
}

window.DatacentersStore = DatacentersStore;

module.exports = Container.create(DatacentersIndexContainer,{withProps: true});