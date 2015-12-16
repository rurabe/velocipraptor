const React = require('react');

const AddressesTable = require('./addresses_table');

const AddressesIndex = React.createClass({
  render: function(){
    return (
      <div id="addressesPage">
        <h1>Addresses</h1>
        <AddressesTable {...this.props}/>
      </div>
    );
  }
});

module.exports = AddressesIndex;