const React = require('react');
const Navbar = require('./navbar');

const RangesSearchStore = require('../stores/ranges_search_store');

const AppLayout = React.createClass({
  getInitialState: function(){
    return JSON.parse(document.getElementById("main").attributes['data-props'].value);
  },
  render: function(){
    return (
      <div id="layout">
        <Navbar user={this.state.user}/>
        <div className="container-fluid">
          {React.cloneElement(this.props.children,this.state)}
        </div>
      </div>
    )
  }
});

module.exports = AppLayout;
