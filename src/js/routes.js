'use strict';

const IndexController = require('./controllers/index_controller');
const AddressesController = require('./controllers/addresses_controller');
const DatacentersController = require('./controllers/datacenters_controller');
const RangesController = require('./controllers/ranges_controller');
const ServersController = require('./controllers/servers_controller');
const RangesAssignmentsControler = require('./controllers/ranges_assignments_controller');

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

    app.get("/datacenters/:datacenter_id/servers/:id",IndexController.index);
    app.get("/datacenters/:datacenter_id/ranges/:id",IndexController.index);
    app.get("/datacenters/:id/",IndexController.index)
    app.get("/",IndexController.index);


    app.get('/api/addresses',AddressesController.index);
    app.put('/api/addresses/:id',AddressesController.update);

    app.get('/api/datacenters',DatacentersController.index);
    app.post('/api/datacenters',DatacentersController.create);
    app.put('/api/datacenters/:id',DatacentersController.update);
    app.delete('/api/datacenters/:id',DatacentersController.destroy);
    
    app.get('/api/ranges',RangesController.index);
    app.post('/api/ranges',RangesController.create);
    app.put('/api/ranges/:id',RangesController.update);
    
    app.get('/api/servers',ServersController.index);
    app.post('/api/servers',ServersController.create);
    app.put('/api/servers/:id',ServersController.update);
    app.delete('/api/servers/:id',ServersController.destroy);

    app.post('/api/datacenters/:datacenter_id/range_assignments',RangesAssignmentsControler.create);
  }
};

module.exports = Routes;