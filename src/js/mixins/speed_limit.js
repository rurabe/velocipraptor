const SpeedLimit = {
  getInitialState: function(){
    return {};
  },
  speedLimit: function(f,timeout){
    clearTimeout(this.state.speedLimitTimeout);
    var t = timeout || 750;
    this.setState({speedLimitTimeout: setTimeout(f,t)});
  },
};

module.exports = SpeedLimit;