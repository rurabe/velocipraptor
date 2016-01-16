const React = require('react');

const TableHead = React.createClass({
  render: function(){
    let columns = this.props.columns.map( col => {
      let k = col.split(" ").join("-");
      return <th key={k} className={k}>{col}</th>
    });

    let actions = this.props.actions ? <th className="actions"></th> : null;

    return (
      <thead>
        <tr>
          {columns}
          {actions}
        </tr>
      </thead>
    );
  }
});

module.exports = TableHead;