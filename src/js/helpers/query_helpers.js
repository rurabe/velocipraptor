'use strict';

const QueryHelpers = {
  filter: function(query,filters){
    for(var col in filters){
      let filter = filters[col];
      let op = (Array.isArray(filter) ? 'IN' : '=');
      query.where(`${col} ${op} ?`,filter);
    }
    return query;
  }
};

module.exports = QueryHelpers;