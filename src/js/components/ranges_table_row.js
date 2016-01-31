const React = require('react');
const {Link} = require('react-router');

const EditableTableCell = require('./editable_table_cell');
const ActionIcon = require('./action_icon');

const RangesActions = require('../actions/ranges_actions');

const RangesTableRow = React.createClass({
  render: function(){
    let r = this.props.range.toJSON();
    let onUpdate = RangesActions.update.bind(this,r.id);
    return (
      <tr data-id={r.id}>
        <td>{this.props.i}</td>
        <td><Link to={`/datacenters/${this.props.datacenterId}/ranges/${r.id}/`}>{r.ips}</Link></td>
        <EditableTableCell value={r.notes} attr='notes' onUpdate={onUpdate}/>
        <td className="ranges-table-actions table-actions">
          <ActionIcon icon="times" onClick={this._unassign.bind(this,r.id)} />
        </td>
      </tr>
    );
  },
  _unassign: function(rangeId){
    RangesActions.destroy(rangeId);
  }
});

module.exports = RangesTableRow;