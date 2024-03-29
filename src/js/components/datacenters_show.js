const React = require('react');

const {Row,Col,PanelGroup,Panel,Input} = require('react-bootstrap');
const {Link} = require('react-router');

const Dialog = require('./dialog')
const Breadcrumbs = require('./breadcrumbs');
const RangesTable = require('./ranges_table');
const ServersTable = require('./servers_table');
const SpeedLimitInput = require('./speed_limit_input');
const ClipboardButton = require('./clipboard_button');
const RotateIPsButton = require('./rotate_ips_button');

const DatacentersActions = require('../actions/datacenters_actions');
const ServersActions = require('../actions/servers_actions');
const PageActions = require('../actions/page_actions');

const SubnetHelpers = require('../helpers/subnet_helpers');

const DatacentersShow = React.createClass({
  render: function(){
    let dc = this.props.datacenter.toJSON();
    const size = this.props.ranges.map(r => SubnetHelpers.size(r.get('ips'))).toJSON().reduce((s,n) => {return s += n},0);
    const twentyfours = Math.round(size / 128) / 2;

    return (
      <div id="datacenters-show">
        <Row>
          <Col md={12}>
            <Breadcrumbs path={[{label: dc.name, link: `/datacenters/${dc.id}/`}]}/>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <h1>{dc.name}</h1>
            <h4>{dc.location}</h4>
            <ClipboardButton label="Copy IPs" text={this.props.datacenter_ips_function} className="btn btn-primary" />
            <RotateIPsButton datacenterId={dc.id} rotation={this.props.rotation} page={this.props.page}/>
            <Link to={`/datacenters/${dc.id}/axs`}><button className="btn btn-info">AXS Proxies</button></Link>
          </Col>
          <Col md={6}>
            <SpeedLimitInput value={dc.notes} rows="5" componentClass="textarea" placeholder="notes" onChange={this._onNotesChange}/>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <h4>Ranges ({twentyfours} total)</h4>
            <div className="ranges-actions">
              <button className="btn btn-sm btn-success" onClick={this._addRange}>Add Ranges</button>
            </div>
            <RangesTable ranges={this.props.ranges} datacenter={this.props.datacenter}/>
          </Col>
          <Col md={6}>
            <h4>Servers</h4>
            <div className="servers-actions">
              <button className="btn btn-sm btn-success" onClick={this._createServer}>Add Server</button>
            </div>
            <ServersTable servers={this.props.servers.toIndexedSeq()} datacenter={this.props.datacenter}/>
          </Col>
        </Row>
        <Dialog mode={this.props.page.get('dialog')} {...this.props} />
      </div>
    );
  },
  _createServer: function(){
    ServersActions.create({datacenter_id: this.props.datacenter.get('id')});
  },
  _addRange: function(){
    PageActions.dispatch({type: 'dialog.activate', mode: 'add_ranges'});
  },
  _onNotesChange: function(e){
    DatacentersActions.update(this.props.datacenter.get('id'),{notes: e.target.value})
  }
});

module.exports = DatacentersShow;