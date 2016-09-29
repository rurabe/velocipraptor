const React = require('react');
const PRM = require('react-addons-pure-render-mixin');
const Dispatcher = require('../dispatcher');

const {FormControl} = require('react-bootstrap');

const h = 'Address:Port\n';

const AXSAddressesField = React.createClass({
  mixins: [PRM],
  render: function(){
    const header = this.props.i || 'Resting';
    const close = this.props.i ? <button className="addresses-field-close btn btn-xs btn-danger" onClick={this._deleteServer} tabIndex="-1">&times;</button> : null;
    const text = `${h}${this.props.text}`;
    const count = this.props.text.split(/\r?\n/i).filter(x => x).length;
    return (
      <div className="axs-addresses-field">
        <h3>{header} <span className="axs-field-count">({count})</span> {close}</h3>
        <FormControl componentClass="textarea" value={text} readOnly={!this.props.i} onChange={this._updateServer}/>
      </div>
    );
  },
  _updateServer: function(e){
    Dispatcher.dispatch({
      type: 'datacenters.axs_wip_servers_update', 
      datacenter_id: this.props.datacenter_id,
      server_index: (this.props.i - 1),
      text: e.target.value.replace(h,''),
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