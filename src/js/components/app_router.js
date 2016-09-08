'use strict';

const React = require('react');
const {Router,Route,IndexRoute,browserHistory} = require('react-router');


const AppLayout = require('./app_layout');
const DatacentersIndexContainer = require('./datacenters_index_container');
const DatacentersShowContainer = require('./datacenters_show_container');
const RangesShowContainer = require('./ranges_show_container');
const ServersShowContainer = require('./servers_show_container');


const AppRouter = React.createClass({
  render: function(){
    return (
      <Router history={browserHistory} >
        <Route path="/" component={AppLayout} >
          <IndexRoute component={DatacentersIndexContainer} />
          <Route path="datacenters/:datacenter_id" component={DatacentersShowContainer}/>
          <Route path="datacenters/:datacenter_id/ranges/:range_id" component={RangesShowContainer} />
          <Route path="datacenters/:datacenter_id/servers/:server_id" component={ServersShowContainer} />
        </Route>
      </Router>
    );
  }
});

module.exports = AppRouter;