'use strict';

const React = require('react');
const Promise = require('bluebird');
const Immutable = require('immutable');

const {Row,Col,Modal,Input} = require('react-bootstrap');

const TableHead = require('./table_head');

const SubnetHelpers = require('../helpers/subnet_helpers');

const RangesActions = require('../actions/ranges_actions');
const ServerAssignmentsActions = require('../actions/server_assignments_actions');

const DialogAddRanges = React.createClass({
  getInitialState: function(){
    return {
      servers: '',
      proxies: '',
      axs: '',
      ranges: [],
      addedAddresses: {},
    }
  },
  render: function(){
    let results = [];
    for(let id in this.state.addedAddresses){
      let address = this.state.addedAddresses[id];
      let server = address.server_id ? this.props.servers.get(address.server_id.toString()) : new Immutable.Map();
      results.push(
        <tr key={address.id}>
          <td>{address.ip}</td>
          <td>{server.get("number")}</td>
          <td>{server.get("id")}</td>
          <td>{server.get("role")}</td>
        </tr>
      );
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
              <Input type="textarea" label="Ranges" placeholder="e.g. 192.168.1.0/24" rows="3" ref="ranges"/>
              <button className="btn btn-sm btn-primary" onClick={this._split}>Add</button>
            </Col>
          </Row>
          <hr />
          <Row>
            <Col md={12}>
              <h4>Assign ips</h4>
            </Col>
          </Row>
          <Row>
            <Col md={4}>
              <div>
                <Input type="textarea" label={`Servers (${this._count(this.state.servers)})`} rows="5" ref="servers" value={this.state.servers} onChange={this._updateState.bind(this,'servers')}/>
              </div>
            </Col>
            <Col md={4}>
              <div>
                <Input type="textarea" label={`Proxies (${this._count(this.state.proxies)})`} rows="5" ref="proxies" value={this.state.proxies} onChange={this._updateState.bind(this,'proxies')}/>
              </div>
            </Col>
            <Col md={4}>
              <div>
                <Input type="textarea" label={`AXS (${this._count(this.state.axs)})`} rows="5" ref="axs" value={this.state.axs} onChange={this._updateState.bind(this,'axs')}/>
              </div>
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              <button className="btn btn-sm btn-primary" onClick={this._assign}>Assign</button>
            </Col>
          </Row>
          <hr />
          <Row>
            <Col md={12}>
              <table className="table table-condensed table-bordered table-striped" >
                <TableHead columns={['ip','server number','server id','server role']} />
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
    let splits = SubnetHelpers.split(this.refs.ranges.refs.input.value);
    this.setState({
      servers: splits.servers.join("\n"),
      proxies: splits.proxies.join("\n"),
      axs: splits.axs.join("\n"),
      ranges: splits.ranges,
    });
  },
  _assign: function(){
    let dcid = this.props.datacenter.get('id');
    Promise.map(this.state.ranges,r => RangesActions.create({datacenter_id: dcid, ips: r})).then( (res) => {
      return ServerAssignmentsActions.create(dcid,{
        servers: this.state.servers.split("\n").filter( ip => ip ).map(SubnetHelpers.maskToInet),
        proxies: this.state.proxies.split("\n").filter( ip => ip ).map(SubnetHelpers.maskToInet),
        axs: this.state.axs.split("\n").filter( ip => ip ).map(SubnetHelpers.maskToInet)
      });
    }).then( payload => {
      this.setState({addedAddresses: payload.addresses });
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