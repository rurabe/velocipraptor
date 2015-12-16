const React = require('react');

const {Cell} = require('fixed-data-table');
const {Input} = require('react-bootstrap');
const TableActions = require('../actions/table_actions');

const TableHeaderInput = React.createClass({
  render: function(){
    return (
      <Cell>
        <Input type="text" defaultValue="" onChange={this._onChange} className="table-filter"/>
      </Cell>
    );
  },
  _onChange: function(e){
    TableActions.filter(this.props.attribute,e.target.value.toLowerCase());
  }
});

module.exports = TableHeaderInput;