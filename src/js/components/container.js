const React = require('react');

class Container extends React.Component {
  constructor(){
    super()
    this.state = Object.assign(this.getState(),{user: {}});
  }

  getState() {
    return Object.assign(...this.stores().map(s => s.getState()));
  }

  onChange() {
    this.setState(this.getState());
  }

  componentDidMount() {
    this.setState(JSON.parse(document.getElementById("main").attributes['data-props'].value));
    this.setState(this.getState());
    this.stores().forEach( s => s.subscribe(this.onChange.bind(this)));
  }

  componentWillUnmount() {
    this.stores().forEach( s => s.unsubscribe(this.onChange.bind(this)));
  }
}

module.exports = Container;