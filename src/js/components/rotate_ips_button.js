'use strict'

const React = require('react');
const {Popover,OverlayTrigger,FormControl} = require('react-bootstrap');
const RotationsActions = require('../actions/rotations_actions');
const moment = require('moment-timezone');

const RoateIpsButton = React.createClass({
  getInitialState: function(){
    return {
      value: '',
    }
  },
  componentWillReceiveProps: function(nextProps){
    if(!this.state.value && nextProps.rotation){
      this.setState({value: nextProps.rotation.map(r => r.get('ip')).sort().join("\n")})
    }
  },
  render: function(){
    const count = (this.state.value.match(/\n./g) || []).length
    const popover = (
      <Popover id="rotatePopover" title="Rotate IPs">
        <div id="rotatePopverInner">
          <span>{count} /24s</span>
          <FormControl componentClass="textarea" value={this.state.value} onChange={this._onChange} />
          <br />
          <button className="btn btn-warning" onClick={this._submit}>Upload</button>
        </div>
      </Popover>
    );

    return (
      <OverlayTrigger trigger="click" placement="right" overlay={popover} onEnter={this._onEnter} rootClose={true}>
        <button className="btn btn-warning">Rotate IPs</button>
      </OverlayTrigger>
    );
  },
  _onEnter: function(){
    this.setState({value: ''});
    RotationsActions.index(this.props.datacenterId);
  },
  _onChange: function(e){
    this.setState({value: e.target.value});
  },
  _submit: function(){
    RotationsActions.create(this.props.datacenterId,this.state.value);
  }
});

module.exports = RoateIpsButton;