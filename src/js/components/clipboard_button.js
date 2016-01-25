const React = require('react');
const Clipboard = require('clipboard');

const ClipboardButton = React.createClass({
  componentDidMount: function(){
    this.clipboard = new Clipboard(this.refs.trigger,{
      text: this.props.text,
    });
  },
  componentWillUnmount: function(){
    this.clipboard.destroy()
  },
  render: function(){
    return (
      <button ref="trigger" className={this.props.className}>
        {this.props.label}
      </button>
    );
  }
});

module.exports = ClipboardButton;