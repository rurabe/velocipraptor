'use strict';

const React = require('react');
const Dispatcher = require('../dispatcher');
const {Container} = require('flux/utils');
const Select = require('react-select');
const { browserHistory } = require('react-router');

const RangesSearchStore = require('../stores/ranges_search_store');

const RangesSearchActions = require('../actions/ranges_search_actions');

let currentRequest = undefined;

class RangeSearch extends React.Component {
  static getStores(){
    return [RangesSearchStore];
  }

  static calculateState(prevState){
    return {
      results: RangesSearchStore.getState(),
    };
  }

  render(){
    let options = this.state.results.map(r => {
      return {label: [r.get('ips'),r.get('datacenter')].join(' '), value: r.get('id'), datacenter_id: r.get('datacenter_id')};
    }).toJSON();
    return (
      <Select options={options} placeholder="Search ranges" searchable={true} onInputChange={this._onSearch} isLoading={this.state.loading} onChange={this._onChange} width={200}/>
    );
  }

  _onSearch(val){
    let v = val;
    clearTimeout(currentRequest);
    currentRequest = setTimeout(() => {
      if(v && v.length > 1){
        RangesSearchActions.index(v);
      }
    },250);
  }

  _onChange(value){
    browserHistory.push(`/datacenters/${value.datacenter_id}/ranges/${value.value}`);
  }


}

module.exports = Container.create(RangeSearch);