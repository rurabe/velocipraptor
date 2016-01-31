const React = require('react');

const TableHead = require('./table_head');
const RangesTableRow = require('./ranges_table_row');

const RangesTable = React.createClass({
  render: function(){
    let datacenterId = this.props.datacenter.get('id');

    let rows = this.props.ranges.map( (r,i) => {
      return <RangesTableRow range={r} key={r.get('id')} datacenterId={datacenterId} i={i+1}/>
    });

    return (
      <table className="table table-condensed table-striped table-bordered ranges-table">
        <TableHead columns={['no','range','notes']} actions={true}/>
        <tbody>
          {rows}
        </tbody>
      </table>
    )
  }
});

module.exports = RangesTable;