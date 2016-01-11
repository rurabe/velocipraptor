const React = require('react');
const {Link} = require('react-router');

const AddressesTableRow = React.createClass({
  render: function(){
    let a = this.props.address.toJSON();
    return (
      <tr data-id={a.id}>
        <td>{a.ip}</td>
        <td>{a.notes}</td>
        <td>{a.server_id}</td>
      </tr>
    )
  }
});

module.exports = AddressesTableRow;