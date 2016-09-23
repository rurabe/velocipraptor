const React = require('react');
const PRM = require('react-addons-pure-render-mixin');
const _ = require('lodash');

const AXSRangeRow = require('./axs_range_row');

const SubnetHelpers = require('../helpers/subnet_helpers');

const AXSRanges = React.createClass({
  mixins: [PRM],
  render: function(){

    const groupedAddresses = _.groupBy(this.props.addresses,a => a.range_id);

    const rows = this.props.ranges.toIndexedSeq().sort((a,b) => {
      if(!a.get('last_used')){ return 1 }
      return a.get('last_used') < b.get('last_used') ? 1 : -1;
    }).map(r => {
      let range = r.toJSON();
      let liveCount = 0;
      let restingCount = 0;

      if(groupedAddresses[range.id]){
        _.forEach(groupedAddresses[range.id],a => {
          if(a.axs_server > -1){ liveCount += 1; }
          else { restingCount += 1; }
        });
      }
      return <AXSRangeRow 
        key={range.id}
        datacenter_id={this.props.datacenter_id}
        range={r} 
        liveCount={liveCount} 
        restingCount={restingCount}
        addresses={groupedAddresses[range.id] || []}
      />;
    });

    return (
      <div id="axs-ranges">
        <table className="table table-striped table-condensed">
          <tbody>
            {rows}
          </tbody>
        </table>
      </div>
    );
  }
});

module.exports = AXSRanges;