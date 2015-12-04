'use strict';

const _authUsers = {
  "115301207027607599453": {id: "115301207027607599453", name: 'Ryan'},
  "117891479597419935772": {id: "117891479597419935772", name: 'Joel'},
};

const Users = {
  authorize: function(googleId){
    for(let key in _authUsers){
      if(key === googleId){ return _authUsers[key] }
    }
    return false;
  }
};

module.exports = Users;