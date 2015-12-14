'use strict';
const React = require('react');
const Dispatcher = require('../dispatcher');
const {Container} = require('flux/utils');
const AddressesStore = require('../stores/addresses_store');
const AddressesActions = require('../actions/addresses_actions');

const AddressesIndex = require('./addresses_index');

class AddressesContainer extends React.Component {
  static getStores(){
    return [AddressesStore]
  }
  // stores() {
  //   return [AddressesStore];
  // }

  static calculateState(prevState,props){
    return {
      addresses: AddressesStore.getState().toIndexedSeq(),
      user: props.user
    }
  }

  componentDidMount(){
    AddressesActions.index({})
  }

  // componentDidMount() {
  //   super.componentDidMount()
  //   Dispatcher.dispatch({ type: 'addresses/query', params: {} });
  // }

  render(){
    return (<AddressesIndex {...this.state} />);
  }
}

module.exports = Container.create(AddressesContainer,{withProps: true});