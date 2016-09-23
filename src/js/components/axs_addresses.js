const React = require('react');
const PRM = require('react-addons-pure-render-mixin');
const _ = require('lodash');

const AXSAddressesField = require('./axs_addresses_field');

const SubnetHelpers = require('../helpers/subnet_helpers');

const _port = 49872;

const AXSAddresses = React.createClass({
  mixins: [PRM],
  render: function(){
    const dc = this.props.datacenter.toJSON();

    const restingText = _.reduce(this.props.addresses,(arr,add) => {
      if(add.axs_server === -1){ arr.push(`${add.host}:${_port}`); }
      return arr;
    },[]).join('\r\n');

    const resting = <AXSAddressesField i={0} text={restingText} datacenter_id={this.props.datacenter.get('id')}/>;

    const lives = dc.axs_proxies_wip.map((text,i) => {
      return <AXSAddressesField i={i+1} text={text} key={i} datacenter_id={this.props.datacenter.get('id')}/>;
    });

    return (
      <div id="axs-addresses">
        {resting}
        {lives}
      </div>
    );
  }
});

module.exports = AXSAddresses;