const React = require('react');

const {Row,Col} = require('react-bootstrap');

const Breadcrumbs = require('./breadcrumbs');
const DatacentersTable = require('./datacenters_table');

const DatacentersActions = require('../actions/datacenters_actions');

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
            <div className="datacenters-actions">
              <button className="btn btn-success" onClick={DatacentersActions.create}>Add Datacenter</button>
            </div>
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