'use strict';

const React = require('react');

const Navbar = require('./Navbar');

const AddressesPage = React.createClass({
	getInitialState: function(){
		return {
			user: {},
		}
	},
	componentDidMount: function(){
		this.setState(JSON.parse(document.getElementById("main").attributes['data-props'].value))
	},
  render: function(){
    return (
      <div id="addressesPage">
        <Navbar user={this.state.user} />
        <div className="container">
          <h1>Addresses</h1>
        </div>
      </div>
    );
  }
});

module.exports = AddressesPage;