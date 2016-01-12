const React = require('react');

const {Row,Col} = require('react-bootstrap');

const Breadcrumbs = require('./breadcrumbs');
const DatacentersTable = require('./datacenters_table');

const DatacentersIndex = React.createClass({
  render: function(){
    return (
      <div id="datacenters-index">
        <Row>
          <Col md={12}>
            <Breadcrumbs path={[]}/>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <h1>Datacenters</h1>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <DatacentersTable datacenters={this.props.datacenters} />
          </Col>
        </Row>
      </div>
    );
  }
});

module.exports = DatacentersIndex;