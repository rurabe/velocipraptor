const React = require('react');

const {Cell} = require('fixed-data-table');

const TableActions = require('../actions/table_actions');

const TableHeaderCell = React.createClass({
  getInitialState: function(){
    return this._getSortState(this.props);
  },
  componentWillReceiveProps: function(nextProps){
    this.setState(this._getSortState(nextProps));
  },
  render: function(){
    return (
      <div onClick={this._onClick} className="table-header" >
        <Cell>
          {this.props.label}{this._getSortIcon()}
        </Cell>
      </div>
    );
  },
  _onClick: function(e){
    TableActions.sort(this.props.attribute,!this.state.sort_direction);
  },
  _getSortState: function(props){
    let st = {};
    if(props.attribute === props.sort_column){ st['sort_direction'] = props.sort_direction }
    return st;
  },
  _getSortIcon: function(){
    if(this.props.sort_column === this.props.attribute){
      if(this.props.sort_direction){
        return <i className="fa fa-sort-asc" />
      } else {
        return <i className="fa fa-sort-desc" />
      }
    }
  }
});

module.exports = TableHeaderCell;