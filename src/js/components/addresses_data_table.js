'use strict';

const React = require('react');
const {Row,Col} = require('react-bootstrap');
const {Table,Column,Cell,ColumnGroup} = require('fixed-data-table');

const TableHeaderCell = require('./table_header_cell');
const TableHeaderInput = require('./table_header_input');

const AddressesTableTextCell = require('./addresses_table_text_cell');
const AddressesTableFnCell = require('./addresses_table_fn_cell');

const AddressesTable = React.createClass({
  render: function() {
    let data = this.props.addresses;
    let tableProps = this.props.table.toJSON();
    return (
      <Row>
        <Col md={12}>
          <Table
            rowsCount={data.size}
            rowHeight={35}
            headerHeight={54}
            groupHeaderHeight={35}
            width={1170}
            height={800}>
            <ColumnGroup header={<TableHeaderCell label="Datacenter" attribute="datacenter" {...tableProps}/>}>
              <Column
                header={<TableHeaderInput attribute="datacenter" {...tableProps}/>}
                cell={
                  <AddressesTableTextCell field="datacenter" data={data} />
                }
                width={200} />
            </ColumnGroup>
            <ColumnGroup header={<TableHeaderCell label="Server" attribute="server_ip" {...tableProps} />}>
              <Column
                header={<TableHeaderInput attribute="server_ip" {...tableProps}/>}
                cell={
                  <AddressesTableTextCell field="server_ip" data={data} />
                }
                width={200} />
            </ColumnGroup>
            <ColumnGroup header={<TableHeaderCell label="IP" attribute="ip" {...tableProps}/>}>
              <Column
                header={<TableHeaderInput attribute="ip" {...tableProps}/>}
                cell={
                  <AddressesTableTextCell field="ip" data={data} />
                }
                width={200} />
            </ColumnGroup>
            <ColumnGroup header={<TableHeaderCell label="Successes" attribute="successes_count" {...tableProps}/>}>
              <Column
                header={<TableHeaderInput attribute="successes_count" {...tableProps}/>}
                cell={
                  <AddressesTableTextCell field="successes_count" data={data} />
                }
                width={100} />
            </ColumnGroup>
            <ColumnGroup header={<TableHeaderCell label="Pulls" attribute="pulls_count" {...tableProps}/>}>
              <Column
                header={<TableHeaderInput attribute="pulls_count" {...tableProps}/>}
                cell={
                  <AddressesTableTextCell field="pulls_count" data={data} />
                }
                width={100} />
            </ColumnGroup>
            <ColumnGroup header={<TableHeaderCell label="Success Rate" attribute="success_rate" {...tableProps}/>}>
              <Column
                header={<TableHeaderInput attribute="success_rate" {...tableProps}/>}
                cell={
                  <AddressesTableTextCell field="success_rate" data={data} />
                }
                width={120} />
            </ColumnGroup>
          </Table>
        </Col>
      </Row>
    );
  },

});

module.exports = AddressesTable;
