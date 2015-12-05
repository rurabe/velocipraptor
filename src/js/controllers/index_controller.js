const IndexController = {
  index: function(req,res){
    try{
      if(req.isAuthenticated()){
        res.render('app',{props: {user: req.user}})
      } else {
        res.render('index')
      }
    } catch (e) {
      res.render('index')
    }
  }
};

module.exports = IndexController;