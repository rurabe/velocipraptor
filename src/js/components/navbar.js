'use strict';

const React = require('react');
const B = require('react-bootstrap');

const Navbar  = React.createClass({
	render: function(){
    return (
      <B.Navbar inverse>
        <B.Navbar.Header>
          <B.Navbar.Brand>
            <a>Velocipraptor</a>
          </B.Navbar.Brand>
          <B.Navbar.Toggle />
        </B.Navbar.Header>
        <B.Navbar.Collapse>
          <B.Nav>
            
          </B.Nav>
          <B.Nav pullRight>
            <B.MenuItem eventKey={3.3} onSelect={this._logout}>Logout</B.MenuItem>
          </B.Nav>
        </B.Navbar.Collapse>
      </B.Navbar>
    );
	},
  _logout: function(){
    let form = document.createElement("form");
    form.setAttribute("method", 'POST');
    form.setAttribute("action", '/logout');
     document.body.appendChild(form);
    form.submit();
  }
});

module.exports = Navbar;