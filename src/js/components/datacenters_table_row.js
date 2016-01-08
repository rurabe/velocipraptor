const React = require('react');
const {Link} = require('react-router');

const DatacentersTableRow = React.createClass({
  render: function(){
    let dc = this.props.datacenter.toJSON();
    return (
      <tr data-id={dc.id}>
        <td><Link to={`/datacenters/${dc.id}/`}>{dc.name}</Link></td>
        <td>{dc.location}</td>
      </tr>
    )
  }
});

module.exports = DatacentersTableRow;