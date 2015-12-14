const React = require('react');
const Navbar = require('./navbar');

const AppLayout = React.createClass({
  getInitialState: function(){
    return JSON.parse(document.getElementById("main").attributes['data-props'].value);
  },
  render: function(){
    return (
      <div id="layout">
        <Navbar user={this.state.user}/>
        <div className="container">
          {React.cloneElement(this.props.children,this.state)}
        </div>
      </div>
    )
  }
});

module.exports = AppLayout;
