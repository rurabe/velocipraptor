'use strict';

const IndexController = require('./controllers/index_controller');
const AddressesController = require('./controllers/addresses_controller');
const DatacentersController = require('./controllers/datacenters_controller');

const Passport = require('./config/passport');

const Routes = {
  init: function(app){
    // passport login functions: 
    //   /auth/google
    //   /auth/google/callback
    //   /logout
    Passport.routes(app);

    app.get("/datacenters/:id/",IndexController.index)
    app.get("/",IndexController.index);


    app.get('/api/addresses',AddressesController.index);
    app.get('/api/datacenters',DatacentersController.index);
    app.get('/api/datacenters/:id',DatacentersController.get);
  }
};

module.exports = Routes;