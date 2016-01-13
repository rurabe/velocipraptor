const React = require('react');

const ActionIcon = React.createClass({
  render: function(){
    return (
      <span className="fa-stack" onClick={this.props.onClick}>
        <i className="fa fa-square fa-stack-2x"></i>
        <i className={`fa fa-${this.props.icon} fa-stack-1x fa-inverse`}></i>
      </span>
    );
  }
});

module.exports = ActionIcon;