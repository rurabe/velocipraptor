'use strict';
const EventEmitter = require('events').EventEmitter;

const changeEvent = 'change';

class BaseStore extends EventEmitter {
  constructor(dispatcher) {
    super()
    this.token = dispatcher.register( action => {
      this.reduce(action,this.emitChange.bind(this));
    });
  }

  emitChange() {
    this.emit(changeEvent);
  }

  subscribe(cb) {
    this.on(changeEvent,cb);
  }

  unsubscribe(cb){
    this.removeListener(changeEvent,cb);
  } 
}

module.exports = BaseStore;