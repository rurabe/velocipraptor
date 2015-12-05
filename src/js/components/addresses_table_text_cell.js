'use strict';

const React = require('react');
const {Cell} = require('fixed-data-table');

class AddressesTableTextCell extends React.Component {
  render(){
    return (
      <Cell>
        {this.props.data.getIn([this.props.rowIndex,this.props.field])}
      </Cell>
    );
  }
}

module.exports = AddressesTableTextCell;