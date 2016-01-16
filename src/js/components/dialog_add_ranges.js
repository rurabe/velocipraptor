'use strict';

const React = require('react');
const Promise = require('bluebird');

const {Row,Col,Modal,Input} = require('react-bootstrap');

const TableHead = require('./table_head');

const SubnetHelpers = require('../helpers/subnet_helpers');

const RangesActions = require('../actions/ranges_actions');
const RangesAssignmentsActions = require('../actions/ranges_assignments_actions');

const DialogAddRanges = React.createClass({
  getInitialState: function(){
    return {
      ips: {
        servers: [],
        proxies: [],
        axs: [],
      },
      ranges: [],
      addedAddresses: {},
    }
  },
  render: function(){
    let results = [];
    for(let id in this.state.addedAddresses){
      let address = this.state.addedAddresses[id];
      let server = this.props.servers.get(address.server_id.toString());
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
                <Input type="textarea" label={`Servers (${this.state.ips.servers.length})`} rows="5" ref="servers" value={this.state.ips.servers.map(SubnetHelpers.inetToMask).join("\n")}/>
              </div>
            </Col>
            <Col md={4}>
              <div>
                <Input type="textarea" label={`Proxies (${this.state.ips.proxies.length})`} rows="5" ref="proxies" value={this.state.ips.proxies.map(SubnetHelpers.inetToMask).join("\n")}/>
              </div>
            </Col>
            <Col md={4}>
              <div>
                <Input type="textarea" label={`AXS (${this.state.ips.axs.length})`} rows="5" ref="axs" value={this.state.ips.axs.map(SubnetHelpers.inetToMask).join("\n")}/>
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
    let splits = SubnetHelpers.split(this.refs.ranges.refs.input.value)
    this.setState(splits);
  },
  _assign: function(){
    let dcid = this.props.datacenter.get('id');
    Promise.map(this.state.ranges,r => RangesActions.create({datacenter_id: dcid, ips: r})).then( (res) => {
      return RangesAssignmentsActions.create(dcid,{ips: this.state.ips});
    }).then( payload => {
      this.setState({addedAddresses: payload.addresses });
    });
  }
});

module.exports = DialogAddRanges;