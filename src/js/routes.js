'use strict';

const IndexController = require('./controllers/index_controller');
const AddressesController = require('./controllers/addresses_controller');
const DatacentersController = require('./controllers/datacenters_controller');
const RangesController = require('./controllers/ranges_controller');
const ServersController = require('./controllers/servers_controller');

const Passport = require('./config/passport');

const bp = require('body-parser');

const Routes = {
  init: function(app){
    app.use(bp.json({ type: 'application/json' }))
    // passport login functions: 
    //   /auth/google
    //   /auth/google/callback
    //   /logout
    Passport.routes(app);

    app.get("/datacenters/:datacenter_id/ranges/:id",IndexController.index);
    app.get("/datacenters/:id/",IndexController.index)
    app.get("/",IndexController.index);


    app.get('/api/addresses',AddressesController.index);

    app.get('/api/datacenters',DatacentersController.index);
    app.put('/api/datacenters/:id',DatacentersController.update);
    
    app.get('/api/ranges',RangesController.index);
    
    app.get('/api/servers',ServersController.index);
  }
};

module.exports = Routes;