const React = require('react');

const {Row,Col} = require('react-bootstrap');
const AddressesChart = require('./addresses_chart');
const ChartStats = require('./chart_stats');

const AddressesChartModule = React.createClass({
  render: function(){
    let pulls = this.props.addresses.flatMap( add => add.get("pulls").values() );

    return (
      <Row>
        <Col md={10}>
          <AddressesChart pulls={pulls} startDate={this.props.startDate} endDate={this.props.endDate} />
        </Col>
        <Col md={2}>
          <ChartStats pulls={pulls} />
          <Row>
            <Col md={12}>
            </Col>
          </Row>
        </Col>
      </Row>
    );
  }
});

module.exports = AddressesChartModule;