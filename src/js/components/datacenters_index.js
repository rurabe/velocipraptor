const React = require('react');

const {Row,Col} = require('react-bootstrap');

const DatacentersTable = require('./datacenters_table');

const DatacentersIndex = React.createClass({
  render: function(){
    return (
      <div id="datacenters-index">
        <h1>Datacenters</h1>
        <DatacentersTable datacenters={this.props.datacenters} />
      </div>
    );
  }
});

module.exports = DatacentersIndex;