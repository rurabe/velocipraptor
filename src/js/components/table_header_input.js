const React = require('react');

const {Cell} = require('fixed-data-table');
const {Input} = require('react-bootstrap');
const TableActions = require('../actions/table_actions');
const SpeedLimit = require('../mixins/speed_limit');

const TableHeaderInput = React.createClass({
  mixins: [SpeedLimit],
  render: function(){
    return (
      <Cell>
        <Input type="text" defaultValue="" onChange={this._onChange} className="table-filter"/>
      </Cell>
    );
  },
  _onChange: function(e){
    this.speedLimit( () => { 
      TableActions.filter(this.props.attribute,e.target.value.toLowerCase()) 
    },500);
  }
});

module.exports = TableHeaderInput;