'use strict';

const React = require('react');
const Immutable = require('immutable');

const TableHead = require('./table_head');
const AddressesTableRow = require('./addresses_table_row');

const AddressesTable = React.createClass({
  render: function(){

    let rows = this.props.addresses.map( a => {
      let id = a.get('id');
      return <AddressesTableRow key={id} address={a} />
    });

    return (
      <table className="table table-condensed table-striped">
        <TableHead columns={['ip','threads','successes','success rate','notes','server']} />
        <tbody>
          {rows}
        </tbody>
      </table>
    )
  }
});

module.exports = AddressesTable;