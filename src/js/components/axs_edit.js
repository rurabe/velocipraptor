const React = require('react');
const _ = require('lodash');
const Dispatcher = require('../dispatcher');
const {Row,Col} = require('react-bootstrap');
const moment = require('moment-timezone');

const Breadcrumbs = require('./breadcrumbs');
const AXSRanges = require('./axs_ranges');
const AXSAddresses = require('./axs_addresses');

const SubnetHelpers = require('../helpers/subnet_helpers');
const AXSHelpers = require('../helpers/axs_helpers');

const AXSActions = require('../actions/axs_actions');

const AXSEdit = React.createClass({
  render: function(){
    let dc = this.props.datacenter.toJSON();

    let updatedAt = dc.axs_proxies_updated_at ? `Last updated at ${moment(dc.axs_proxies_updated_at).format('h:mma MM-DD-YYYY')}` : 'Never set';

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
              <button className="btn btn-info btn-sm" onClick={this._addServer}>Add Server</button>
              <button className="btn btn-warning btn-sm" onClick={this._randomize}>Randomize</button>
              <span className="axs-updated-at">{updatedAt}</span>
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
    let dcid = this.props.datacenter.get('id');
    let final = AXSHelpers.randomize(this.props.datacenter.get('axs_proxies_wip').toJSON());
    return AXSActions.create(dcid,final).then(() => {
      let action = {type: 'datacenters.merge', datacenters: {}};
      action.datacenters[dcid] = {axs_proxies_wip: final};
      Dispatcher.dispatch(action);
    });
  }
});

module.exports = AXSEdit;