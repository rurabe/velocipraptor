const React = require('react');
const {Link} = require('react-router');

const RangesTableRow = React.createClass({
  render: function(){
    let r = this.props.range.toJSON();
    return (
      <tr data-id={r.id}>
        <td><Link to={`ranges/${r.id}/`}>{r.ips}</Link></td>
      </tr>
    )
  }
});

module.exports = RangesTableRow;