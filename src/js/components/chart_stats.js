const React = require('react');
const moment = require('moment-timezone');
const _ = require('lodash');
const PureRenderMixin = require('react-addons-pure-render-mixin');
const {Row,Col} = require('react-bootstrap');

const RateHelpers = require('../helpers/rate_helpers');

const ChartStats = React.createClass({
  render: function(){
    let dates = this.props.pulls.reduce((r,pull) => {
      let date = moment(pull.get('search_date') * 1000).format('YYYY-MM-DD');
      r[date] = true;
      return r;
    },{});

    let threshold = moment.utc(_.reverse(_.keys(dates).sort())[1]);

    let stats = this.props.pulls.reduce( (r,pull) => {
      let succ = pull.get('success');
      if(succ !== null){
        r.pulls++;
        succ ? r.successes++ : null;
        if(new Date(pull.get('search_date')*1000) > threshold){
          r.recent_pulls++;
          succ ? r.recent_successes++ : null;
        }
      }
      return r;
    },{pulls: 0, successes: 0, recent_pulls: 0, recent_successes: 0});

    console.log(stats)

    let recentClass = RateHelpers.format(stats.recent_successes,stats.recent_pulls);
    let historicalClass = RateHelpers.format(stats.successes,stats.pulls);

    return (
      <div className="stats">
        <Row>
          <Col md={12}>
            <h2 className={`rate ${recentClass}`}>{(stats.recent_successes * 100/stats.recent_pulls).toFixed(2)}% <span className="fraction">({stats.recent_successes}/{stats.recent_pulls})</span></h2>
            <p>Success rate from {threshold.format('MM-DD-YYYY')}</p>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <h2 className={`rate ${historicalClass}`}>{(stats.successes * 100/stats.pulls).toFixed(2)}% <span className="fraction">({stats.successes}/{stats.pulls})</span></h2>
            <p>Historical success rate</p>
          </Col>
        </Row>
      </div>
    );
  }
});

window.u = _;

module.exports = ChartStats