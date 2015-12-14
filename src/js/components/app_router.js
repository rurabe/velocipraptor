'use strict';

const React = require('react');
const {Router,Route,IndexRoute} = require('react-router');

const browserHistory = require('history/lib/createBrowserHistory');


const AppLayout = require('./app_layout');
const AddressesIndexContainer = require('./addresses_index_container');


const AppRouter = React.createClass({
  render: function(){
    return (
      <Router history={browserHistory()} >
        <Route path="/" component={AppLayout} >
          <IndexRoute component={AddressesIndexContainer} />
        </Route>
      </Router>
    );
  }
});

module.exports = AppRouter;