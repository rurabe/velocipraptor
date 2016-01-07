const React = require('react');

const {Row,Col} = require('react-bootstrap');

const DatacentersShow = React.createClass({
  render: function(){
    let dc = this.props.datacenter.toJSON();
    return (
      <div id="datacenters-show">
        <h1>{dc.name}</h1>
      </div>
    );
  }
});

module.exports = DatacentersShow;