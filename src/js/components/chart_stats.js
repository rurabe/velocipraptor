const React = require('react');
const PureRenderMixin = require('react-addons-pure-render-mixin');
const {Row,Col} = require('react-bootstrap');

const ChartStats = React.createClass({
  render: function(){
    let stats = this.props.pulls.reduce( (r,pull) => {
      r.pulls++;
      pull.get('success') ? r.successes++ : null;
      return r;
    },{pulls: 0, successes: 0});

    console.log(stats)

    return (
      <div className="stats">
        <Row>
          <Col md={12}>
            <h2>{(stats.successes * 100/stats.pulls).toFixed(2)}%</h2>
            <p>Success rate</p>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <h2>{stats.pulls}</h2>
            <p>Threads</p>
          </Col>
        </Row>
      </div>
    );
  }
});

module.exports = ChartStats