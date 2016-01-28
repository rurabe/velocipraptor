const React = require('react');

const TableHead = require('./table_head');
const ServersTableRow = require('./servers_table_row');

const ServersTable = React.createClass({
  render: function(){
    let datacenterId = this.props.datacenter.get('id');

    let ticketServers = this.props.servers.filter(s => s.get('role') !== 'proxy').map( s => {
      return <ServersTableRow server={s} key={s.get('id')} datacenterId={datacenterId}/>
    });

    let proxyServers = this.props.servers.filter(s => s.get('role') === 'proxy').map( s => {
      return <ServersTableRow server={s} key={s.get('id')} datacenterId={datacenterId}/>
    });

    return (
      <table className="table table-condensed table-striped table-bordered servers-table">
        <TableHead columns={['code','ip','notes']} actions={true} />
        <tbody>
          {ticketServers}
          {proxyServers}
        </tbody>
      </table>
    )
  }
});

module.exports = ServersTable;