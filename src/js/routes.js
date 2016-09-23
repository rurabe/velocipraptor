'use strict';
var express = require('express');

const IndexController = require('./controllers/index_controller');
const AddressesController = require('./controllers/addresses_controller');
const DatacentersController = require('./controllers/datacenters_controller');
const RangesController = require('./controllers/ranges_controller');
const RangesRotationController = require('./controllers/ranges_rotation_controller');
const ServersController = require('./controllers/servers_controller');
const ServerAssignmentsController = require('./controllers/server_assignments_controller');

const Passport = require('./config/passport');

const bp = require('body-parser');

const _authenticate = function(req,res,next){
  if(req.isAuthenticated()){
    return next();
  } else {
    res.status(401).json({error: 'Unauthorized'});
  }
}

const Routes = {
  init: function(app){
    app.use(bp.json({ type: 'application/json' }))
    // passport login functions: 
    //   /auth/google
    //   /auth/google/callback
    //   /logout
    Passport.routes(app);

    app.get("/",IndexController.index);


    let pages = express.Router();
    pages.use(_authenticate);

    pages.get("/datacenters/:datacenter_id/servers/:id",IndexController.index);
    pages.get("/datacenters/:datacenter_id/ranges/:id",IndexController.index);
    pages.get("/datacenters/:id/axs",IndexController.index);
    pages.get("/datacenters/:id/",IndexController.index);

    app.use('/',pages);



    let api = express.Router();
    api.use(_authenticate);

    api.get('/addresses',AddressesController.index);
    api.put('/addresses/:id',AddressesController.update);

    api.get('/datacenters',DatacentersController.index);
    api.post('/datacenters',DatacentersController.create);
    api.put('/datacenters/:id',DatacentersController.update);
    api.delete('/datacenters/:id',DatacentersController.destroy);

    api.get('/datacenters/:id/rotation',RangesRotationController.index);
    api.post('/datacenters/:id/rotation',RangesRotationController.create);
    
    api.get('/ranges',RangesController.index);
    api.post('/ranges',RangesController.create);
    api.put('/ranges/:id',RangesController.update);
    api.delete('/ranges/:id',RangesController.destroy);


    
    api.get('/servers',ServersController.index);
    api.post('/servers',ServersController.create);
    api.put('/servers/:id',ServersController.update);
    api.delete('/servers/:id',ServersController.destroy);

    api.post('/datacenters/:datacenter_id/server_assignments',ServerAssignmentsController.create);

    app.use('/api',api);
  }
};

module.exports = Routes;