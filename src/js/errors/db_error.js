'use strict';

class DBError extends Error {
  constructor(params) {
    super(params.detail);
    this.name = this.constructor.name;
    Object.assign(this,params);
    this.message = params.detail; 
    Error.captureStackTrace(this, this.constructor.name)
  }
};

module.exports = DBError;