const React = require('react');
const {Link} = require('react-router');

const ServersTableRow = React.createClass({
  render: function(){
    let s = this.props.server.toJSON();
    return (
      <tr data-id={s.id}>
        <td>{s.id}</td>
        <td>{s.code}</td>
        <td>{s.ip}</td>
      </tr>
    )
  }
});

module.exports = ServersTableRow;