const React = require('react');

const TableHead = require('./table_head');
const DatacentersTableRow = require('./datacenters_table_row');

const DatacentersTable = React.createClass({
  render: function(){
    let rows = this.props.datacenters.map( (dc,i) => {
      return <DatacentersTableRow datacenter={dc} key={dc.get('id')} i={i+1}/>
    });

    return (
      <table className="table table-condensed table-striped table-bordered datacenters-table">
        <TableHead columns={['no','name','location','notes']} actions={true} />
        <tbody>
          {rows}
        </tbody>
      </table>
    )
  }
});

module.exports = DatacentersTable;