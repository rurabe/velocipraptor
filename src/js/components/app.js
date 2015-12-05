'use strict';

const React = require('react');
const Router = require('react-router').Router
const Route = require('react-router').Route

const AddressesContainer = require('./addresses_container');


const App = React.createClass({
  render: function(){
    return (
      <Router>
        <Route path="/" component={AddressesContainer}/>
      </Router>
    );
  }
});

module.exports = App;