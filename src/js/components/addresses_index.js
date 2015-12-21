const React = require('react');

const {Row,Col} = require('react-bootstrap');
const AddressesTable = require('./addresses_table');
const AddressesChartModule = require('./addresses_chart_module');

const AddressesIndex = React.createClass({
  render: function(){
    return (
      <div id="addressesPage">
        <AddressesChartModule 
          addresses={this.props.addresses}
          startDate={this.props.table.get('start_date')} 
          endDate={this.props.table.get('end_date')} />
        <AddressesTable 
          addresses={this.props.addresses} 
          table={this.props.table} />
      </div>
    );
  }
});

module.exports = AddressesIndex;