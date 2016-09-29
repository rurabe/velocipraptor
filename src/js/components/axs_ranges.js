const React = require('react');
const PRM = require('react-addons-pure-render-mixin');
const _ = require('lodash');

const AXSRangeRow = require('./axs_range_row');

const SubnetHelpers = require('../helpers/subnet_helpers');

const c = 'axs_last_active_at';

const AXSRanges = React.createClass({
  mixins: [PRM],
  render: function(){
    const groupedAddresses = _.groupBy(this.props.addresses,a => a.range_id);
    const rows = this.props.ranges.toIndexedSeq()
      .sort(SubnetHelpers.sort(a => a.get('ips')))
      .map( r => {
        let addresses = groupedAddresses[r.get('id')];
        if(addresses){
          return <AXSRangeRow 
            key={r.get('id')}
            datacenter_id={this.props.datacenter_id}
            range={r} 
            addresses={addresses}
          />;
        }
      }).filter(x => x);

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