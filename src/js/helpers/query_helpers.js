'use strict';

const QueryHelpers = {
  filter: function(query,filters){
    for(var col in filters){
      let filter = filters[col];
      let op = (Array.isArray(filter) ? 'IN' : '=');
      query.where(`${col} ${op} ?`,filter);
    }
    return query;
  },
  set: function(query,attributes){
    for(var col in attributes){
      query.set(col,attributes[col])
    }
    return query;
  },
  cte: function(clauses){
    let final = clauses.pop();
    let a = clauses.map( c => {
      return `${c[0]} as (${c[1].toString()})`
    }).join(", ");
    return `with ${a} ${final[1].toString()};`;
  }
};

module.exports = QueryHelpers;