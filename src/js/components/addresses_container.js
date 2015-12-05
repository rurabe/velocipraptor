'use strict';

const React = require('react');
const Dispatcher = require('../dispatcher');

const Container = require('./container');

const AddressesStore = require('../stores/addresses_store');

const Navbar = require('./navbar');

class AddressesContainer extends Container {

  stores() {
    return [AddressesStore];
  }

  componentDidMount() {
    super.componentDidMount()
    Dispatcher.dispatch({ type: 'addresses/query', params: {} });
  }

  render(){
    return (
      <div id="addressesPage">
        <Navbar user={this.props.user} />
        <div className="container">
          <h1>Addresses</h1>
          <p>{JSON.stringify(this.state.addresses.toJSON())}</p>
        </div>
      </div>
    );
  }
}

module.exports = AddressesContainer;