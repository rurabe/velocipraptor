const React = require('react');
const {Link} = require('react-router');

const AddressesTableRow = React.createClass({
  render: function(){
    let a = this.props.address.toJSON();
    let rate = (a.successes_count/a.pulls_count)
    return (
      <tr data-id={a.id}>
        <td>{a.ip}</td>
        <td>{a.pulls_count}</td>
        <td>{a.successes_count}</td>
        <td>{rate ? (rate * 100).toFixed(1)  : null }</td>
        <td>{a.notes}</td>
        <td>{a.server_id}</td>
      </tr>
    )
  }
});

module.exports = AddressesTableRow;