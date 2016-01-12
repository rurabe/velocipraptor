const React = require('react');

const {Row,Col} = require('react-bootstrap');

const AddressesTable = require('./addresses_table');
const AddressesChartModule = require('./addresses_chart_module');

const RangesShow = React.createClass({
  render: function(){
    let r = this.props.range.toJSON();
    return (
      <div id="datacenters-show">
        <Row>
          <Col md={12}>
            <h1>{r.ips}</h1>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <AddressesChartModule addresses={this.props.addresses}/>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <AddressesTable addresses={this.props.addresses}/>
          </Col>
        </Row>
      </div>
    );
  }
});

module.exports = RangesShow;