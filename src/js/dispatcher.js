const Flux = require('flux');

const Dispatcher = new Flux.Dispatcher();

Dispatcher.dispatchRequest = function(type,resolve,reject,err,res){
  if(!err){
    let payload = Object.assign({},res.body,{type: type});
    Dispatcher.dispatch(payload); resolve(payload);
  } else { 
    alert(err.response.body.error); reject(err) 
  }
};

module.exports = Dispatcher;