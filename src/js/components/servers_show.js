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
    let copyButton;
    if(this.props.server.get('role')){
      copyButton = <ClipboardButton label="Copy IPs" text={this._copyAddresses} className="btn btn-primary" />;
    }

    return (
      <div id="datacenters-show">
        <Row>
          <Col md={12}>
            <Breadcrumbs path={[{label: dc.name, link: `/datacenters/${dc.id}/`},{label: `Server ${s.id}`, link: `/datacenters/${dc.id}/servers/${s.id}/`}]}/>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <h1>Server {s.code}</h1>
            <h4>{this.props.addresses.size} ips assigned</h4>
            {copyButton}
            <table className="table table-condensed table-bordered server-table">
              <tbody>
                <tr>
                  <td>code</td>
                  <EditableTableCell value={s.code} attr='code' onUpdate={onUpdate}/>
                </tr>
                <tr>
                  <td>ip</td>
                  <EditableTableCell value={s.ip} attr='ip' onUpdate={onUpdate}/>
                </tr>
                <tr>
                  <td>notes</td>
                  <EditableTableCell value={s.notes} attr='notes' onUpdate={onUpdate}/>
                </tr>
              </tbody>
            </table>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <AddressesTable addresses={this.props.addresses} ranges={this.props.ranges} datacenterId={dc.id}/>
          </Col>
        </Row>

      </div>
    );
  },
  _copyAddresses: function(){
    return this.props.addresses.sort(SubnetHelpers.sort(a => a.get('ip'))).map(a => SubnetHelpers.inetToMask(a.get('ip')) ).join("\n");
  }
});

module.exports = ServersShow;