const React = require('react');
const _ = require('lodash');
const Dispatcher = require('../dispatcher');
const {Row,Col} = require('react-bootstrap');

const Breadcrumbs = require('./breadcrumbs');
const AXSRanges = require('./axs_ranges');
const AXSAddresses = require('./axs_addresses');

const SubnetHelpers = require('../helpers/subnet_helpers');

const DatacentersActions = require('../actions/datacenters_actions');

const ServersShow = React.createClass({
  render: function(){
    let dc = this.props.datacenter.toJSON();
    let s = this.props.server.toJSON();

    let addressesData = this.props.addresses.reduce((r,add) => {
      let a = add.toJSON();
      a.host = SubnetHelpers.host(a.ip);
      a.axs_server = _.findIndex(dc.axs_proxies_wip,s => s.indexOf(a.host) > -1) ;
      r[a.id] = a;
      return r;
    },{});

    return (
      <div id="axs-edit">
        <Row>
          <Col md={12}>
            <Breadcrumbs path={[{label: dc.name, link: `/datacenters/${dc.id}/`},{label: 'AXS Proxies'}]}/>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <h1 className="axs-title">AXS Proxies</h1>
            <div className="axs-actions">
              <button className="btn btn-warning btn-sm" onClick={this._randomize}>Randomize</button>
              <button className="btn btn-info btn-sm" onClick={this._addServer}>Add Server</button>
            </div>
          </Col>
        </Row>
        <Row id="axs-edit-body">
          <Col md={12} id="axs-edit-body-inner">
            <AXSRanges datacenter_id={this.props.datacenter.get('id')} ranges={this.props.ranges} addresses={addressesData} />
            <AXSAddresses addresses={addressesData} datacenter={this.props.datacenter} />
          </Col>
        </Row>

      </div>
    );
  },
  _addServer: function(){
    Dispatcher.dispatch({type: 'datacenters.axs_wip_servers_create', datacenter_id: this.props.datacenter.get('id')});
  },
  _randomize: function(){
    DatacentersActions.axsRandomize(this.props.datacenter.get('id'),this.props.datacenter.get('axs_proxies_wip').toJSON());
  }
});

module.exports = ServersShow;