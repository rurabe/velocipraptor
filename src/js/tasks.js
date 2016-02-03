const ThreadLog = require('./external/thread_log');
const moment = require('moment-timezone');

const Tasks = {
  init: function(){
    // Recurring tasks
    for (var interval in this.recurringTasks){
      setInterval(this.recurringTasks[interval],(interval * 1000));
    }
    // Scheduled tasks
    setInterval(function(){
      var now = moment().tz('America/Los_Angeles');
      for (var time in this.scheduledTasks){
        var t = time.split(':').map(function(s){ return s === '**' ? '**' : parseInt(s) });
        if( (t[0] ===  now.hours() || t[0] === '**') && t[1] === now.minutes()){
          if(process.env.NODE_ENV !== 'development'){
            this.scheduledTasks[time](now);
          }
          console.log("[Tasks] running",time,"tasks");
        }
      }
    }.bind(this),60000);
  },
  recurringTasks: { // in seconds
    180: function(){
      ThreadLog.importLatest()
    },
  },
  scheduledTasks: { // Pacific time, 24hr time
  },
};

module.exports = Tasks;