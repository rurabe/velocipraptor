const React = require('react');
const {Link} = require('react-router');

const EditableTableCell = require('./editable_table_cell');
const ServersActions = require('../actions/servers_actions');

const ServersTableRow = React.createClass({
  render: function(){
    let s = this.props.server.toJSON();
    let onUpdate = ServersActions.update.bind(this,s.id);
    return (
      <tr data-id={s.id}>
        <td>{s.id}</td>
        <EditableTableCell value={s.code} attr='code' onUpdate={onUpdate}/>
        <EditableTableCell value={s.ip} attr='ip' onUpdate={onUpdate}/>
        <EditableTableCell value={s.notes} attr='notes' onUpdate={onUpdate}/>
      </tr>
    );
  }
});

module.exports = ServersTableRow;