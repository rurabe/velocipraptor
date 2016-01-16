const React = require('react');

const {Modal} = require('react-bootstrap');

const DialogAddRanges = require('./dialog_add_ranges');

const PageActions = require('../actions/page_actions');

const Dialog = React.createClass({
  render: function(){
    return (
      <Modal show={!!this.props.mode} onHide={this.close}>
        {this._content(this.props.mode)}
      </Modal>
    );
  },
  _content: function(mode){
    switch(mode){
      case 'add_ranges':
        return <DialogAddRanges {...this.props} />;
      default:
        return null;
    }
  },
  close: function(){
    PageActions.dispatch({type: 'dialog.deactivate'});
  }
});

module.exports = Dialog;