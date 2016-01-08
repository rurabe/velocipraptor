const React = require('react');

const {Row,Col} = require('react-bootstrap');

const RangesTable = require('./ranges_table');

const DatacentersShow = React.createClass({
  render: function(){
    let dc = this.props.datacenter.toJSON();
    return (
      <div id="datacenters-show">
        <Row>
          <Col md={12}>
            <h1>{dc.name}</h1>
            <h4>{dc.location}</h4>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <RangesTable ranges={this.props.ranges} />
          </Col>
        </Row>
      </div>
    );
  }
});

module.exports = DatacentersShow;