'use strict';

const React = require('react');
const Router = require('react-router').Router
const Route = require('react-router').Route

const AddressesPage = require('./addresses_page');


const App = React.createClass({
  render: function(){
    return (
      <Router>
        <Route path="/" component={AddressesPage}/>
      </Router>
    );
  }
});

module.exports = App;