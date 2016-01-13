const React = require('react');

const {Row,Col,PanelGroup,Panel} = require('react-bootstrap');

const RangesForm = require('./ranges_form');
const Breadcrumbs = require('./breadcrumbs');
const RangesTable = require('./ranges_table');
const ServersTable = require('./servers_table');

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
            <PanelGroup defaultActiveKey="0" accordion className="ranges-actions">
              <Panel header="Add Ranges" eventKey="1">
                <RangesForm datacenter={this.props.datacenter} />
              </Panel>
            </PanelGroup>
            <RangesTable ranges={this.props.ranges} datacenter={this.props.datacenter}/>
          </Col>
          <Col md={6}>
            <h4>Servers</h4>
            <div className="servers-actions">
            </div>
            <ServersTable servers={this.props.servers} datacenter={this.props.datacenter}/>
          </Col>
        </Row>
      </div>
    );
  }
});

module.exports = DatacentersShow;