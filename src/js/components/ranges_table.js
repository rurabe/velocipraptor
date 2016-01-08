const React = require('react');

const TableHead = require('./table_head');
const RangesTableRow = require('./ranges_table_row');

const RangesTable = React.createClass({
  render: function(){
    let rows = this.props.ranges.map( r => {
      return <RangesTableRow range={r} key={r.get('id')}/>
    });

    return (
      <table className="table table-condensed table-striped">
        <TableHead columns={['Ranges']} />
        <tbody>
          {rows}
        </tbody>
      </table>
    )
  }
});

module.exports = RangesTable;