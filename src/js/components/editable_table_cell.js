const React = require('react');
const {Link} = require('react-router');

const EditableTableCell = React.createClass({
  getInitialState: function(){
    return { 
      editing: false,
      val: this.props.value,
    };
  },
  componentWillReceiveProps: function(nextProps){
    this.setState({val: nextProps.value});
  },
  render: function(){
    if(this.state.editing){
      return <td className="editable-table-cell" onDoubleClick={this._toggleEditing} onBlur={this._onBlur}><textarea ref="input" onChange={this._onChange} onKeyDown={this._onKeyDown} value={this.state.val} rows="3"/></td>
    } else if(this.props.link) {
      return <td className="editable-table-cell" onDoubleClick={this._toggleEditing}><Link to={this.props.link}>{this.state.val}</Link></td>
    } else {
      return <td className="editable-table-cell" onDoubleClick={this._toggleEditing}>{this.state.val}</td>
    }
  },
  _toggleEditing: function(e){
    this.setState({editing: !this.state.editing});
    if(!this.state.editing){ setTimeout(() => this.refs.input.focus() ,0) }
  },
  _onChange: function(e){
    this.setState({val: e.target.value});
  },
  _onKeyDown: function(e){
    if(!(e.altKey || e.shiftKey || e.ctrlKey) && e.keyCode === 13){ this.refs.input.blur() }
  },
  _onBlur: function(e){
    let update = {};
    update[this.props.attr] = this.state.val;
    this.props.onUpdate(update);
    this._toggleEditing();
  },
});

module.exports = EditableTableCell;