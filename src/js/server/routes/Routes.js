var _root = '<!DOCTYPE html><html><head><script type="text/javascript" src="app.js"></script><head><body><div id="main"></div></body></html>';

var Routes = {
  init: function(app){
    app.get("/",function(req,res){ res.send(_root) });
  }
};

module.exports = Routes;