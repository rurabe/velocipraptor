'use strict';

const React = require('react');
const {Table, Column, Cell} = require('fixed-data-table');

const AddressesTableTextCell = require('./addresses_table_text_cell');
const AddressesTableFnCell = require('./addresses_table_fn_cell');

const pullsFn = function(props){
  console.log(props)
  return props.data.getIn([props.rowIndex,'pulls']).size
};

const successFn = function(props){
  return props.data.getIn([props.rowIndex,'pulls']).filter(p => p.get('s')).size;
}

const AddressesTable = React.createClass({
  render: function() {
    let data = this.props.addresses;
    return (
      <Table
        rowsCount={data.size}
        rowHeight={35}
        headerHeight={50}
        width={1170}
        height={800}>
        <Column
          header={<Cell>Datacenter</Cell>}
          cell={
            <AddressesTableTextCell field="datacenter" data={data} />
          }
          width={200} />
        <Column
          header={<Cell>Server</Cell>}
          cell={
            <AddressesTableTextCell field="server_ip" data={data} />
          }
          width={200} />
        <Column
          header={<Cell>IP</Cell>}
          cell={
            <AddressesTableTextCell field="ip" data={data} />
          }
          width={200} />
        <Column
          header={<Cell>Successes</Cell>}
          cell={
            <AddressesTableTextCell field="successes_count" data={data} />
          }
          width={100} />
        <Column
          header={<Cell>Pulls</Cell>}
          cell={
            <AddressesTableTextCell field="pulls_count" data={data} />
          }
          width={100} />
        <Column
          header={<Cell>Success Rate</Cell>}
          cell={
            <AddressesTableTextCell field="success_rate" data={data} />
          }
          width={100} />
      </Table>
    );
  },

});

module.exports = AddressesTable;
