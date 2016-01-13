const React = require('react');
const {Link} = require('react-router');

const EditableTableCell = require('./editable_table_cell');
const ActionIcon = require('./action_icon');

const DatacentersActions = require('../actions/datacenters_actions');

const DatacentersTableRow = React.createClass({
  render: function(){
    let dc = this.props.datacenter.toJSON();
    let onUpdate = DatacentersActions.update.bind(this,dc.id);
    return (
      <tr data-id={dc.id}>
        <td>{dc.id}</td>
        <EditableTableCell value={dc.name} attr='name' onUpdate={onUpdate} link={`/datacenters/${dc.id}/`} />
        <EditableTableCell value={dc.location} attr='location' onUpdate={onUpdate}/>
        <EditableTableCell value={dc.notes} attr='notes' onUpdate={onUpdate}/>
        <td className="datacenters-table-actions table-actions">
          <ActionIcon icon="times" onClick={this._destroy.bind(this,dc.id,dc.name)}/>
        </td>
      </tr>
    )
  },
  _destroy: function(id,name,e){
    if(confirm(`Are you sure you want to delete ${name}(${id})?`)){
      DatacentersActions.destroy(id);
    }
  }
});

module.exports = DatacentersTableRow;