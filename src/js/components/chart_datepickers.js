const React = require('react');
const moment = require('moment');
const Datepicker = require('react-datepicker');
const {Row,Col} = require('react-bootstrap');

const AddressesActions = require('../actions/addresses_actions');

const ChartDatepickers = React.createClass({
  render: function(){
    return (
      <Row className="chart-datepickers">
        <Col md={6}>
          <Datepicker selected={moment(this.props.startDate)} onChange={this._changeStartDate} />
        </Col>
        <Col md={6}>
          <Datepicker selected={moment(this.props.endDate)} onChange={this._changeEndDate} />
        </Col>
      </Row>

    );
  },
  _changeStartDate: function(date){
    AddressesActions.index({
      start_date: date.format("YYYY-MM-DD"),
      end_date: this.props.endDate
    });
  },
  _changeEndDate: function(date){
    AddressesActions.index({
      start_date: this.props.startDate,
      end_date: date.format("YYYY-MM-DD")
    });
  }
});

module.exports = ChartDatepickers;