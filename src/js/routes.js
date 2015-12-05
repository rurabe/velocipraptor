'use strict';

const IndexController = require('./controllers/index_controller');
const AddressesController = require('./controllers/addresses_controller');

const Passport = require('./config/passport');

const Routes = {
  init: function(app){
    // passport login functions: 
    //   /auth/google
    //   /auth/google/callback
    //   /logout
    Passport.routes(app);


    app.get("/",IndexController.index);

    app.get('/api/addresses',AddressesController.index)
  }
};

module.exports = Routes;