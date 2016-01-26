'use strict';

const React = require('react');
const {Input} = require('react-bootstrap');

const SpeedLimit = require('../mixins/speed_limit');

const SpeedLimitInput = React.createClass({
  mixins: [SpeedLimit],
  getInitialState: function(){
    return { value: this.props.value };
  },
  render: function(){
    return (
      <Input {...this.props} value={this.state.value} onChange={this._onChange}/>
    );
  },
  _onChange: function(e){
    this.setState({value: e.target.value});
    this.speedLimit(() => {
      this.props.onChange(e)
    },(this.props.speedLimit || 500))
  }
});

module.exports = SpeedLimitInput;