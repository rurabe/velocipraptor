'use strict';

const React = require('react');
const {Cell} = require('fixed-data-table');

class AddressesTableFnCell extends React.Component {
  render(){
    return (
      <Cell>
        {this.props.fn(this.props)}
      </Cell>
    );
  }
}

module.exports = AddressesTableFnCell;