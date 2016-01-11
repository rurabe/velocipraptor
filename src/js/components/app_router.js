'use strict';

const React = require('react');
const {Router,Route,IndexRoute} = require('react-router');

const browserHistory = require('history/lib/createBrowserHistory');


const AppLayout = require('./app_layout');
const DatacentersIndexContainer = require('./datacenters_index_container');
const DatacentersShowContainer = require('./datacenters_show_container');
const RangesShowContainer = require('./ranges_show_container');


const AppRouter = React.createClass({
  render: function(){
    return (
      <Router history={browserHistory()} >
        <Route path="/" component={AppLayout} >
          <IndexRoute component={DatacentersIndexContainer} />
          <Route path="datacenters/:datacenter_id" component={DatacentersShowContainer}/>
          <Route path="datacenters/:datacenter_id/ranges/:range_id" component={RangesShowContainer} />
        </Route>
      </Router>
    );
  }
});

module.exports = AppRouter;