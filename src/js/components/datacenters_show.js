const React = require('react');

const {Row,Col,PanelGroup,Panel} = require('react-bootstrap');

const Dialog = require('./dialog')
const Breadcrumbs = require('./breadcrumbs');
const RangesTable = require('./ranges_table');
const ServersTable = require('./servers_table');

const ServersActions = require('../actions/servers_actions');
const PageActions = require('../actions/page_actions');

const DatacentersShow = React.createClass({
  render: function(){
    let dc = this.props.datacenter.toJSON();
    return (
      <div id="datacenters-show">
        <Row>
          <Col md={12}>
            <Breadcrumbs path={[{label: dc.name, link: `/datacenters/${dc.id}/`}]}/>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <h1>{dc.name}</h1>
            <h4>{dc.location}</h4>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <h4>Ranges</h4>
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
  }
});

module.exports = DatacentersShow;