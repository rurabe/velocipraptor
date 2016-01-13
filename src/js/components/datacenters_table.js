const React = require('react');

const TableHead = require('./table_head');
const DatacentersTableRow = require('./datacenters_table_row');

const DatacentersTable = React.createClass({
  render: function(){
    let rows = this.props.datacenters.map( dc => {
      return <DatacentersTableRow datacenter={dc} key={dc.get('id')}/>
    });

    return (
      <table className="table table-condensed table-striped table-bordered datacenters-table">
        <TableHead columns={['id','name','location','notes']} />
        <tbody>
          {rows}
        </tbody>
      </table>
    )
  }
});

module.exports = DatacentersTable;