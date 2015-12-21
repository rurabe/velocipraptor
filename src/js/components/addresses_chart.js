const React = require('react');
const moment = require('moment');
const d3 = require('d3');
const rfd = require('react-faux-dom');

const TimeHelpers = require('../helpers/time_helpers');

const AddressesChart = React.createClass({
  render: function(){
    console.log(this.props)
    let svg = rfd.createElement('svg');

    let margin = {top: 10, right: 50, bottom: 20, left: 50};
    let width = 877 - margin.left - margin.right;
    let height = 400 - margin.top - margin.bottom;

    let data = this.props.pulls
      .groupBy( (pull) => moment(pull.get("search_date") * 1000).startOf('day') )
      .map( (pulls,date) => { 
        return pulls.reduce( (obj,pull) => {
          obj.pulls++;
          if( pull.get('success') ){ obj.successes++ }
          return obj;
        },{pulls: 0, successes: 0});
      }).map( (pulls,date) => {
        pulls.date = date.toDate();
        pulls.success_rate = (pulls.successes/pulls.pulls) * 100;
        return pulls;
      }).sortBy( (pulls) => pulls.date ).toArray();

    console.log(data)

    let chart = d3.select(svg)
      .attr('width',width + margin.left + margin.right)
      .attr('height',height + margin.top + margin.bottom)
    .append("g")
      .attr("class","viewport")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    let format = "M/D"
    let startDate = moment(this.props.startDate);
    let endDate = moment(this.props.endDate);
    let xDomain = TimeHelpers.ordinalDates(startDate,endDate,format);

    let x = d3.scale.ordinal().domain(xDomain).rangeRoundBands([0, width], 0.5);
    let xAxis = d3.svg.axis().scale(x).orient('bottom');

    chart.append("g").attr("class","axis x")
      .attr("transform",`translate(0,${height})`)
      .call(xAxis);

    let ySucc = d3.scale.linear().domain([0, 100]).range([height,0]);
    let ySuccAxis = d3.svg.axis().scale(ySucc).orient("right")

    chart.append("g").attr("class","axis y success-rate")
      .attr("transform",`translate(${width},0)`)
      .call(ySuccAxis);

    let yCount = d3.scale.linear().domain([0,d3.max(data,d => d.pulls)]).range([height,0]);
    let yCountAxis = d3.svg.axis().scale(yCount).orient("left");

    chart.append("g").attr("class","axis y count")
      .call(yCountAxis);

    let succRateData = d3.svg.line()
      .x( d => x(moment(d.date).format(format) ) + x.rangeBand()/2 )
      .y( d => ySucc(d.success_rate) )
      .interpolate("linear");
                         

    let date = chart.selectAll("g.date")
      .data(data)
      .enter().append("g").attr("class","date")

    date.append("circle")
      .attr("r", 5)
      .attr("cx", (d,i) => x( moment(d.date).format(format) ) + x.rangeBand()/2 )
      .attr("cy", (d,i) => ySucc(d.success_rate) )
      .attr("data-rate", (d,i) => d.success_rate )
      // .attr("height", function(d) { return height - y(d.value); })

    date.append("rect")
      .attr('width',x.rangeBand())
      .attr('x', d => x( moment(d.date).format(format) ))
      .attr('y', d => yCount(d.pulls) )
      .attr('height', d => height - yCount(d.pulls) )

    chart.append("path")
      .attr("d", succRateData(data))
      .attr("stroke", "blue")
      .attr("fill", "none");

    return (
      <div id="chart" ref="chart">
        {svg.toReact()}
      </div>
    );
  }
});

window.d3 = d3

module.exports = AddressesChart;