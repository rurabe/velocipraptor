'use strict';
const squel = require('squel').useFlavour('postgres');

const QueryHelpers = {
  filter: function(query,filters,not){
    filters = filters || {}; not = not || {};
    for(var col in filters){
      let filter = filters[col];
      let op = (Array.isArray(filter) ? 'IN' : '=');
      query.where(`${col} ${op} ?`,filter);
    }
    for(var col in not){
      let filter = not[col];
      let op = (Array.isArray(filter) ? 'NOT IN' : '!=');
      query.where(`${col} ${op} ?`,filter);
    }
    return query;
  },
  set: function(query,attributes){
    for(var col in attributes){
      query.set(col,this.encode(attributes[col]));
    }
    return query;
  },
  cte: function(clauses){
    let final = clauses.pop();
    let a = clauses.map( c => {
      return `${c[0]} as (${c[1].toString()})`;
    }).join(", ");
    return `with ${a} ${final[1].toString()};`;
  },
  jsonize: function(rows){
    return rows.reduce( (a,r) => { a[r.id] = r; return a; },{});
  },
  arrayize: function(obj){
    let r = [];
    for(let key in obj){
      r.push(obj[key]);
    }
    return r;
  },
  encode: function(value){
    switch(Object.prototype.toString.call(value)){
    case '[object Array]':
    case '[object Object]':
      return JSON.stringify(value);
    default: 
      return value;
    }
  }
};

module.exports = QueryHelpers;