const React = require('react');
const _ = require('lodash');

const {Row,Col} = require('react-bootstrap');

const Breadcrumbs = require('./breadcrumbs');
const DatacentersTable = require('./datacenters_table');
const ClipboardButton = require('./clipboard_button');

const DatacentersActions = require('../actions/datacenters_actions');

const SubnetHelpers = require('../helpers/subnet_helpers');
const HourAllocatorHelpers = require('../helpers/hour_allocator_helpers');

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
              <button className="btn btn-success" onClick={this._createDatacenter}>Add Datacenter</button>
              <ClipboardButton className="btn btn-primary" text={this._formatProxies} label="Copy Proxies" disabled={!this.props.proxiesLoaded}/>
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
  },
  _createDatacenter: function(){
    DatacentersActions.create({});
  },
  _formatProxies: function(){
    let proxies = this.props.proxies.map(p => `${SubnetHelpers.host(p.get('ip'))}:49872` ).toArray();
    return HourAllocatorHelpers.randomize(this.props.proxies);
  }
});

module.exports = DatacentersIndex;