const React = require('react');

const {Row,Col,Input} = require('react-bootstrap');

const RangesForm = React.createClass({
  render: function(){
    return (
      <div className="ranges-form">
        <Input type="textarea" label="Ips" placeholder="e.g. 192.168.1.0/24" rows="5" ref="input"/>
        <button className="btn btn-sm btn-success">Add + Assign</button>
        <button className="btn btn-sm btn-primary">Add</button>
      </div>
    );
  }
});

module.exports = RangesForm;