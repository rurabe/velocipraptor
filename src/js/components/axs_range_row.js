const React = require('react');
const PRM = require('react-addons-pure-render-mixin');
const moment = require('moment-timezone');
const Dispatcher = require('../dispatcher');

const {Checkbox} = require('react-bootstrap');

const AXSRangeRow = React.createClass({
  mixins: [PRM],
  render: function(){
    let range = this.props.range.toJSON();
    let date = range.last_used ? moment(range.last_used).format('MM-DD-YY') : 'never used';
    return (
      <tr key={range.id}>
        <td><Checkbox checked={this.props.liveCount > 0} onChange={this._checkboxChange}/></td>
        <td>
          {this.props.range.get('ips')} 
          <span className="range-last-used">{date}</span>
          <span className="range-live-count">{this.props.liveCount}</span>:<span className="range-resting-count">{this.props.restingCount}</span>
          </td>
      </tr>
    );
  },
  _checkboxChange: function(e){
    Dispatcher.dispatch({
      type: 'datacenters.axs_range_toggle',
      datacenter_id: this.props.datacenter_id,
      range: this.props.range.get('ips'),
      addresses: this.props.addresses,
      enable: e.target.checked,
    });
  }
});

module.exports = AXSRangeRow;