const React = require('react');
const {Link} = require('react-router');

const EditableTableCell = require('./editable_table_cell');

const RangesActions = require('../actions/ranges_actions');

const RangesTableRow = React.createClass({
  render: function(){
    let r = this.props.range.toJSON();
    let onUpdate = RangesActions.update.bind(this,r.id);
    return (
      <tr data-id={r.id}>
        <td><Link to={`/datacenters/${this.props.datacenterId}/ranges/${r.id}/`}>{r.ips}</Link></td>
        <EditableTableCell value={r.notes} attr='notes' onUpdate={onUpdate}/>
      </tr>
    );
  }
});

module.exports = RangesTableRow;