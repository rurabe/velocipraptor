const React = require('react');

const {Row,Col} = require('react-bootstrap');

const Breadcrumbs = require('./breadcrumbs');
const AddressesTable = require('./addresses_table');
const TableHead = require('./table_head');
const EditableTableCell = require('./editable_table_cell');
const ClipboardButton = require('./clipboard_button');

const ServersActions = require('../actions/servers_actions');
const SubnetHelpers = require('../helpers/subnet_helpers');

const ServersShow = React.createClass({
  render: function(){
    let dc = this.props.datacenter.toJSON();
    let s = this.props.server.toJSON();
    let onUpdate = ServersActions.update.bind(this,s.id);

    return (
      <div id="datacenters-show">
        <Row>
          <Col md={12}>
            <Breadcrumbs path={[{label: dc.name, link: `/datacenters/${dc.id}/`},{label: `Server ${s.id}`, link: `/datacenters/${dc.id}/servers/${s.id}/`}]}/>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <h1>Server {s.id}</h1>
            <ClipboardButton label="Copy IPs" text={this._copyAddresses} className="btn btn-primary" />
            <table className="table table-condensed table-bordered server-table">
              <tbody>
                <tr>
                  <td>number</td>
                  <EditableTableCell value={s.number} attr='number' onUpdate={onUpdate}/>
                </tr>
                <tr>
                  <td>code</td>
                  <EditableTableCell value={s.code} attr='code' onUpdate={onUpdate}/>
                </tr>
                <tr>
                  <td>ip</td>
                  <EditableTableCell value={s.ip} attr='ip' onUpdate={onUpdate}/>
                </tr>
                <tr>
                  <td>role</td>
                  <EditableTableCell value={s.role} attr='role' onUpdate={onUpdate}/>
                </tr>
              </tbody>
            </table>
            <p>{s.notes}</p>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <AddressesTable addresses={this.props.addresses}/>
            <ClipboardButton label="Copy IPs" text={this._copyAddresses} className="btn btn-primary" />
          </Col>
        </Row>

      </div>
    );
  },
  _copyAddresses: function(trigger){
    return this.props.addresses.map(a => SubnetHelpers.inetToMask(a.get('ip')) ).join("\n");
  }
});

module.exports = ServersShow;