const React = require('react');

const TableHead = React.createClass({
  render: function(){
    let columns = this.props.columns.map( col => {
      let k = col.split(" ").join("-");
      return <th key={k} className={k}>{col}</th>
    });

    return (
      <thead>
        <tr>
          {columns}
          <th className="actions"></th>
        </tr>
      </thead>
    );
  }
});

module.exports = TableHead;