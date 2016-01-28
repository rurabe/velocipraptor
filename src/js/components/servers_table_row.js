const React = require('react');
const {Link} = require('react-router');

const EditableTableCell = require('./editable_table_cell');
const ActionIcon = require('./action_icon');
const ServersActions = require('../actions/servers_actions');

const ServersTableRow = React.createClass({
  render: function(){
    let s = this.props.server.toJSON();
    let onUpdate = ServersActions.update.bind(this,s.id);
    return (
      <tr data-id={s.id}>
        <EditableTableCell value={s.code} attr='code' onUpdate={onUpdate} link={`/datacenters/${this.props.datacenterId}/servers/${s.id}`}/>
        <EditableTableCell value={s.ip} attr='ip' onUpdate={onUpdate}/>
        <EditableTableCell value={s.notes} attr='notes' onUpdate={onUpdate}/>
        <td className="servers-table-actions table-actions">
          <ActionIcon icon="times" onClick={this._destroy.bind(this,s.id)} />
        </td>
      </tr>
    );
  },
  _destroy: function(id,name,e){
    if(confirm(`Are you sure you want to delete server ${id}?`)){
      ServersActions.destroy(id);
    }
  }
});

module.exports = ServersTableRow;