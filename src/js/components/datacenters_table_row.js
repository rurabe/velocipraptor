const React = require('react');
const {Link} = require('react-router');

const EditableTableCell = require('./editable_table_cell');

const DatacentersActions = require('../actions/datacenters_actions');

const DatacentersTableRow = React.createClass({
  render: function(){
    let dc = this.props.datacenter.toJSON();
    let onUpdate = DatacentersActions.update.bind(this,dc.id);
    return (
      <tr data-id={dc.id}>
        <EditableTableCell value={dc.name} attr='name' onUpdate={onUpdate} link={`/datacenters/${dc.id}/`} />
        <EditableTableCell value={dc.location} attr='location' onUpdate={onUpdate}/>
        <EditableTableCell value={dc.notes} attr='notes' onUpdate={onUpdate}/>
      </tr>
    )
  }
});

module.exports = DatacentersTableRow;