'use strict';

const React = require('react');
const B = require('react-bootstrap');
const {Link} = require('react-router');

const RangeSearch = require('./range_search');

const Navbar  = React.createClass({
	render: function(){
    return (
      <B.Navbar fluid={true} >
        <B.Navbar.Header>
          <B.Navbar.Brand>
            <Link to="/">Velocipraptor</Link>
          </B.Navbar.Brand>
          <B.Navbar.Toggle />
        </B.Navbar.Header>
        <B.Navbar.Collapse>
          <B.Nav>
            
          </B.Nav>

          <B.Navbar.Form pullLeft>
            <RangeSearch />
          </B.Navbar.Form>
          <B.Nav pullRight>
            <B.NavItem eventKey={1} onClick={this._logout}>Logout</B.NavItem>
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