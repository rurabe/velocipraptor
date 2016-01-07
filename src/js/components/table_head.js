const React = require('react');

const TableHead = React.createClass({
  render: function(){
    let columns = this.props.columns.map( col => {
      return <th key={col}>{col}</th>
    });

    return (
      <thead>
        <tr>
          {columns}
        </tr>
      </thead>
    );
  }
});

module.exports = TableHead;