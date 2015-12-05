'use strict';

const React = require('react');
const Dispatcher = require('../dispatcher');

const Container = require('./container');

const AddressesStore = require('../stores/addresses_store');

const Navbar = require('./navbar');
const AddressesTable = require('./addresses_table');

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
        <Navbar user={this.state.user} />
        <div className="container">
          <h1>Addresses</h1>
          <AddressesTable addresses={this.state.addresses} />
        </div>
      </div>
    );
  }
}

module.exports = AddressesContainer;