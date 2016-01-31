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
    
    let server;
    if(this.props.server){
      let label = this.props.server.get('role') === 'proxy' ? 'proxy' : this.props.server.get('code')
      server = (
        <td>
          <Link to={`/datacenters/${this.props.datacenterId}/servers/${this.props.server.get('id')}`} >
            {label}
          </Link>
        </td>
      )
    }

    let range;
    if(this.props.range){
      range = (
        <td>
          <Link to={`/datacenters/${this.props.datacenterId}/ranges/${this.props.range.get('id')}`} >
            {this.props.range.get('ips')}
          </Link>
        </td>
      )
    }
    return (
      <tr data-id={a.id}>
        <td>{this.props.i}</td>
        <td>{SubnetHelpers.host(a.ip)}</td>
        <td>{SubnetHelpers.inetToMask(a.ip)}</td>
        <td>{a.pulls_count}</td>
        <td>{a.successes_count}</td>
        <td>{rate ? (rate * 100).toFixed(1)  : null }</td>
        {server}
        {range}
        <EditableTableCell value={a.notes} attr='notes' onUpdate={onUpdate}/>
        <td className="addresses-table-actions table-actions">
        </td>
      </tr>
    )
  }
});

module.exports = AddressesTableRow;