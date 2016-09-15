'use strict';

const React = require('react');
const {Popover,OverlayTrigger,FormControl,Button} = require('react-bootstrap');
const RotationsActions = require('../actions/rotations_actions');

const _buttonStyle = function(status){
  switch(status){
  case undefined:
  case 'processing':
    return 'warning';
  case 'succeeded':
    return 'success';
  case 'failed':
    return  'danger';
  }
};

const RoateIpsButton = React.createClass({
  getInitialState: function(){
    return {
      value: '',
    };
  },
  componentWillReceiveProps: function(nextProps){
    if(!this.state.value && nextProps.rotation){
      this.setState({value: nextProps.rotation.map(r => r.get('ip')).sort().join('\n')});
    }
  },
  render: function(){
    let icon;
    const status = this.props.page.get('rotate_create_status');
    if(status === 'processing'){
      icon = <i className="fa fa-refresh fa-spin"/>;
    }

    const text = status === 'succeeded' ? 'uploaded' : 'upload';
    const count = (this.state.value.match(/\n./g) || []).length;
    const popover = (
      <Popover id="rotatePopover" title="Rotate IPs">
        <div id="rotatePopverInner">
          <span>{count} /24s</span>
          <FormControl componentClass="textarea" value={this.state.value} onChange={this._onChange} />
          <br />
          <Button bsStyle={_buttonStyle(status)} onClick={this._submit}>{text} {icon}</Button>
          <br />
        </div>
      </Popover>
    );



    return (
      <OverlayTrigger trigger="click" placement="right" overlay={popover} onEnter={this._onEnter} rootClose={true}>
        <Button bsStyle="warning">Rotate IPs</Button>
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