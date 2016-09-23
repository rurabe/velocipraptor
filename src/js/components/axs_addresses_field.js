const React = require('react');
const PRM = require('react-addons-pure-render-mixin');
const Dispatcher = require('../dispatcher');

const {FormControl} = require('react-bootstrap');

const AXSAddressesField = React.createClass({
  mixins: [PRM],
  render: function(){
    const header = this.props.i || 'Resting';
    const close = this.props.i ? <button className="addresses-field-close btn btn-xs btn-danger" onClick={this._deleteServer} tabIndex="-1">&times;</button> : null;
    return (
      <div className="axs-addresses-field">
        <h3>{header} {close}</h3>
        <FormControl componentClass="textarea" value={this.props.text} readOnly={!this.props.i} onChange={this._updateServer}/>
      </div>
    );
  },
  _updateServer: function(e){
    Dispatcher.dispatch({
      type: 'datacenters.axs_wip_servers_update', 
      datacenter_id: this.props.datacenter_id,
      server_index: (this.props.i - 1),
      text: e.target.value,
    });
  },
  _deleteServer: function(e){
    Dispatcher.dispatch({
      type: 'datacenters.axs_wip_servers_delete', 
      datacenter_id: this.props.datacenter_id,
      server_index: (this.props.i - 1),
    });
  }
});

module.exports = AXSAddressesField;