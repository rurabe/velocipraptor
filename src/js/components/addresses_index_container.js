'use strict';
const React = require('react');
const Dispatcher = require('../dispatcher');
const {Container} = require('flux/utils');

const AddressesStore = require('../stores/addresses_store');
const TableStore = require('../stores/table_store');

const AddressesActions = require('../actions/addresses_actions');

const AddressesIndex = require('./addresses_index');

const MathHelpers = require('../helpers/math_helpers');

const sortFunc = function(attribute,direction){
  var m = direction ? 1 : -1;
  return function(a,b){
    return (a.get(attribute) < b.get(attribute)) ? m*1 : m*-1;
  }
};

const numFilter = function(column,criteria){
  let opMatch = criteria.match(/[\<\>\=]+/);
  let bMatch = criteria.match(/[\d\.]+/);
  let operator = opMatch ? opMatch[0] : "=";
  let b = bMatch ? parseFloat(bMatch[0]) : undefined;
  return function(address){
    return MathHelpers.op(operator,parseFloat(address.get(column)),b);
  };
};

const textFilter = function(column,criteria){
  return function(address){
    return (address.get(column).toString().toLowerCase().indexOf(criteria) > -1);
  };
};

const getFilter = function(column,criteria){
  switch(column){
    case 'datacenter':
    case 'server_ip':
    case 'ip':
      return textFilter(column,criteria);
    case 'successes_count':
    case 'pulls_count':
    case 'success_rate':
      return numFilter(column,criteria);
    default:
      return textFilter(column,criteria);
  }
}

class AddressesContainer extends React.Component {
  static getStores(){
    return [AddressesStore,TableStore]
  }

  static calculateState(prevState,props){
    let table = TableStore.getState();

    // run filters
    let addresses = table.get('filters').filter( f => f ).reduce( (set,criteria,column) => {
      return set.filter( getFilter(column,criteria) );
    },AddressesStore.getState())
    // sort
    .sort(sortFunc(table.get('sort_column'),table.get('sort_direction')));

    return {
      table: table,
      addresses: addresses.toIndexedSeq(),
      user: props.user
    }
  }

  componentDidMount(){
    AddressesActions.index({
      start_date: this.state.table.get('start_date'),
      end_date: this.state.table.get('end_date'),
    });
  }

  render(){
    return (<AddressesIndex {...this.state} />);
  }
}

module.exports = Container.create(AddressesContainer,{withProps: true});