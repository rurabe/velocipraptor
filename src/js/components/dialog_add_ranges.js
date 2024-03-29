'use strict';

const React = require('react');
const ReactDOM = require('react-dom');
const Promise = require('bluebird');
const Immutable = require('immutable');

const {Row,Col,Modal,FormControl} = require('react-bootstrap');

const TableHead = require('./table_head');

const SubnetHelpers = require('../helpers/subnet_helpers');

const RangesActions = require('../actions/ranges_actions');
const ServerAssignmentsActions = require('../actions/server_assignments_actions');

const _formatServerAssignment = function(assignment){
  let a = assignment.split(",");
  return [a[0],[a[1],SubnetHelpers.bits(a[2])].join("/")].join(",");
}

const DialogAddRanges = React.createClass({
  getInitialState: function(){
    return {
      servers: '',
      proxies: '',
      axs: '',
      ranges: [],
      addedAddresses: {},
      added: false,
      submitted: false,
    }
  },
  render: function(){
    let results = [];
    for(let id in this.state.addedAddresses){
      let address = this.state.addedAddresses[id];
      let server = address.server_id ? this.props.servers.get(address.server_id.toString()) : new Immutable.Map();
      results.push(
        <tr key={address.id}>
          <td>{SubnetHelpers.inetToMask(address.ip)}</td>
          <td>{server.get("code")}</td>
        </tr>
      );
    }

    let proxyCount = this.props.servers.count(s => s.get('role') === 'proxy');
    let serverCount = this.props.servers.count(s => s.get('role') !== 'proxy');
    let formStyle = this.state.submitted ? 'success' : 'warning'

    let addMessage;
    let assignMessage;

    if(this.state.added && !this.state.submitted){
      addMessage = <span className="warning btn-message">Don't forget to assign!</span>
    }

    if(this.state.submitted){
      assignMessage = <span className="success btn-message">{Object.keys(this.state.addedAddresses).length} ips assigned.</span>
    }

    return (
      <div className="dialog-add-ranges">
        <Modal.Header closeButton>
          <Modal.Title>Add ranges</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col md={12}>
              <h4>Add ranges</h4>
              <FormControl componentClass="textarea" label="Ranges" placeholder="e.g. 192.168.1.0/24" rows="3" ref="ranges"/>
              <button className="btn btn-sm btn-primary" onClick={this._split}>Add</button>
              {addMessage}
            </Col>
          </Row>
          <hr />
          <Row>
            <Col md={12}>
              <h4>Assign ips ({serverCount} servers, {proxyCount} proxy servers)</h4>
            </Col>
          </Row>
          <Row>
            <Col md={4}>
              <div>
                <FormControl componentClass="textarea" label={`TM (${this._count(this.state.servers)})`} rows="5" ref="servers" value={this.state.servers} onChange={this._updateState.bind(this,'servers')} bsStyle={formStyle}/>
              </div>
            </Col>
            <Col md={4}>
              <div>
                <FormControl componentClass="textarea" label={`Proxies (${this._count(this.state.proxies)})`} rows="5" ref="proxies" value={this.state.proxies} onChange={this._updateState.bind(this,'proxies')} bsStyle={formStyle}/>
              </div>
            </Col>
            <Col md={4}>
              <div>
                <FormControl componentClass="textarea" label={`AXS (${this._count(this.state.axs)})`} rows="5" ref="axs" value={this.state.axs} onChange={this._updateState.bind(this,'axs')} bsStyle={formStyle}/>
              </div>
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              <button className="btn btn-sm btn-primary" onClick={this._assign}>Assign</button>
              {assignMessage}
            </Col>
          </Row>
          <hr />
          <Row>
            <Col md={12}>
              <table className="table table-condensed table-bordered table-striped" >
                <TableHead columns={['ip','code']} />
                <tbody>
                  {results}
                </tbody>
              </table>
            </Col>
          </Row>
        </Modal.Body>
      </div>
    );
  },
  _split: function(){
    let servers = this.props.servers.groupBy(s => s.get('role'));
    let ranges = ReactDOM.findDOMNode(this.refs.ranges).value
    let splits = SubnetHelpers.split(ranges,servers.get(null),servers.get('proxy'));
    this.setState({
      servers: splits.servers.join("\n"),
      proxies: splits.proxies.join("\n"),
      axs: splits.axs.join("\n"),
      ranges: splits.ranges,
      added: true,
    });
  },
  _assign: function(){
    let dcid = this.props.datacenter.get('id');
    let proxiesExist = this.props.servers.count(s => s.get('role') === 'proxy') > 0;
    Promise.map(this.state.ranges,r => RangesActions.create({datacenter_id: dcid, ips: r})).then( (res) => {
      return ServerAssignmentsActions.create(dcid,{
        servers: this.state.servers.split("\n").filter( ip => ip ).map(_formatServerAssignment),
        proxies: (proxiesExist ? this.state.proxies.split("\n").filter( ip => ip ).map(SubnetHelpers.maskToInet) : []),
        axs: this.state.axs.split("\n").filter( ip => ip ).map(SubnetHelpers.maskToInet)
      });
    }).then( payload => {
      this.setState({addedAddresses: payload.addresses, submitted: true });
    });
  },
  _updateState: function(attr,e){
    let update = {};
    update[attr] = e.target.value
    this.setState(update)
  },
  _count: function(collection){
    return collection.split("\n").filter(ip => ip).length
  }
});

module.exports = DialogAddRanges;