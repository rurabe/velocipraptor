const React = require('react');

const TableHead = require('./table_head');
const AddressesTableRow = require('./addresses_table_row');

const AddressesTable = React.createClass({
  render: function(){

    let rows = this.props.addresses.map( a => {
      return <AddressesTableRow address={a} key={a.get('id')} />
    });

    return (
      <table className="table table-condensed table-striped">
        <TableHead columns={['ip','notes']} />
        <tbody>
          {rows}
        </tbody>
      </table>
    )
  }
});

module.exports = AddressesTable;