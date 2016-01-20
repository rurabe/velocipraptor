const React = require('react');
const {Link} = require('react-router');

const EditableTableCell = require('./editable_table_cell');
const ActionIcon = require('./action_icon');

const RangesActions = require('../actions/ranges_actions');
const ServerAssignmentsActions = require('../actions/server_assignments_actions');

const RangesTableRow = React.createClass({
  render: function(){
    let r = this.props.range.toJSON();
    let onUpdate = RangesActions.update.bind(this,r.id);
    return (
      <tr data-id={r.id}>
        <td>{r.id}</td>
        <td><Link to={`/datacenters/${this.props.datacenterId}/ranges/${r.id}/`}>{r.ips}</Link></td>
        <EditableTableCell value={r.notes} attr='notes' onUpdate={onUpdate}/>
        <td className="ranges-table-actions table-actions">
          <ActionIcon icon="times" onClick={this._unassign.bind(this,this.props.datacenterId,r.ips)} />
        </td> 
      </tr>
    );
  },
  _unassign: function(datacenterId,ips){
    ServerAssignmentsActions.destroy({datacenter_id: datacenterId, ips: ips})
  }
});

module.exports = RangesTableRow;