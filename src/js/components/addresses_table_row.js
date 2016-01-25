const React = require('react');
const {Link} = require('react-router');

const EditableTableCell = require('./editable_table_cell');
const AddressesActions = require('../actions/addresses_actions');

const SubnetHelpers = require('../helpers/subnet_helpers');

const AddressesTableRow = React.createClass({
  render: function(){
    let a = this.props.address.toJSON();
    let rate = (a.successes_count/a.pulls_count)
    let onUpdate = AddressesActions.update.bind(this,a.id);
    return (
      <tr data-id={a.id}>
        <td>{SubnetHelpers.host(a.ip)}</td>
        <td>{SubnetHelpers.inetToMask(a.ip)}</td>
        <td>{a.pulls_count}</td>
        <td>{a.successes_count}</td>
        <td>{rate ? (rate * 100).toFixed(1)  : null }</td>
        <td>{a.server_id}</td>
        <EditableTableCell value={a.notes} attr='notes' onUpdate={onUpdate}/>
        <td className="addresses-table-actions table-actions">
        </td>
      </tr>
    )
  }
});

module.exports = AddressesTableRow;