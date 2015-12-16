
const MathHelpers = {
  op: function(operator,a,b){
    switch(operator){
      case ">=":
      case "=>":
        return this.gte(a,b);
      case ">":
        return this.gt(a,b);
      case "<=":
      case "=<":
        return this.lte(a,b);
      case "<":
        return this.lt(a,b);
      default:
        return this.eq(a,b);
    }
  },
  eq: function(a,b){
    return a == b;
  },
  gte: function(a,b){
    return a >= b;
  },
  gt: function(a,b){
    return a > b;
  },
  lte: function(a,b){
    return a <=  b;
  },
  lt: function(a,b){
    return a < b;
  }
};

module.exports = MathHelpers;