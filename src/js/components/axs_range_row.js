'use strict';
const React = require('react');
const PRM = require('react-addons-pure-render-mixin');
const _ = require('lodash');
const moment = require('moment-timezone');
const Dispatcher = require('../dispatcher');

const {Checkbox} = require('react-bootstrap');

const AXSActions = require('../actions/axs_actions');

const AXSRangeRow = React.createClass({
  mixins: [PRM],
  render: function(){
    let range = this.props.range.toJSON();
    let date = range.axs_last_active_at ? moment(range.axs_last_active_at).format('MM-DD-YY') : 'never used';
    let liveCount = _.filter(this.props.addresses,a => a.axs_server > -1).length;
    return (
      <tr key={range.id} data-live={liveCount} data-count={this.props.addresses.length}>
        <td><Checkbox checked={liveCount > 0} onChange={this._checkboxChange}/></td>
        <td>
          {this.props.range.get('ips')} 
          <span className="range-last-used">{date}</span>
        </td>
        <td>
          <span className="btn btn-xs btn-default axs-range-unassign" onClick={this._unassign}>&times;</span>
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
  },
  _unassign: function(){
    if(confirm(`Are you sure you want to remove all axs proxies from ${this.props.range.get('ips')}?`)){
      AXSActions.destroy(this.props.datacenter_id,this.props.range.get('id'));
    }
  }
});

module.exports = AXSRangeRow;