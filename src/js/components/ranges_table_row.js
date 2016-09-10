const React = require('react');
const {Link} = require('react-router');
const moment = require('moment-timezone');

const EditableTableCell = require('./editable_table_cell');
const ActionIcon = require('./action_icon');

const RangesActions = require('../actions/ranges_actions');

const RangesTableRow = React.createClass({
  render: function(){
    let r = this.props.range.toJSON();
    let onUpdate = RangesActions.update.bind(this,r.id);
    let lastUsed = r.last_used ? moment(r.last_used).format('MM-DD-YY') : 'never';
    let rate = r.pulls_count ? (r.successes * 100 / r.pulls_count).toFixed(2) : null;
    let recentRate = r.recent_pulls ? (r.recent_successes * 100 / r.recent_pulls).toFixed(2) : null;
    return (
      <tr data-id={r.id}>
        <td>{this.props.i}</td>
        <td><Link to={`/datacenters/${this.props.datacenterId}/ranges/${r.id}/`}>{r.ips}</Link></td>
        <td>{rate}</td>
        <td>{recentRate}</td>
        <td>{lastUsed}</td>
        <EditableTableCell value={r.notes} attr='notes' onUpdate={onUpdate}/>
        <td className="ranges-table-actions table-actions">
          <ActionIcon icon="times" onClick={this._unassign.bind(this,r.id)} />
        </td>
      </tr>
    );
  },
  _unassign: function(rangeId){
    if(confirm(`Are you sure you want to delete range ${this.props.range.get('ips')}?`)){
      RangesActions.destroy(rangeId);
    }
  }
});

module.exports = RangesTableRow;