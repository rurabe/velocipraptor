'use strict';

const React = require('react');
const Immutable = require('immutable');

const TableHead = require('./table_head');
const AddressesTableRow = require('./addresses_table_row');

const AddressesTable = React.createClass({
  render: function(){

    let headers = ['no','ip','formatted','threads','successes','success rate'];

    if(this.props.servers){
      headers.push('server');
    }

    if(this.props.ranges){
      headers.push('range');
    }

    headers.push('notes')

    let rows = this.props.addresses.map( (a,i) => {
      let props = {
        key: a.get('id'),
        i: (i+1),
        address: a,
        datacenterId: this.props.datacenterId
      };

      if(this.props.servers){ 
        let server_id = a.get('server_id') ? a.get('server_id').toString() : undefined;
        props.server = this.props.servers.get(server_id);
      }

      if(this.props.ranges){
        let range_id = a.get('range_id') ? a.get('range_id').toString() : undefined;
        props.range = this.props.ranges.get(range_id);
      }

      return React.createElement(AddressesTableRow,props);
    });

    return (
      <table className="table table-condensed table-striped table-bordered addresses-table">
        <TableHead columns={headers} actions={true}/>
        <tbody>
          {rows}
        </tbody>
      </table>
    )
  }
});

module.exports = AddressesTable;