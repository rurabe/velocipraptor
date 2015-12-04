const React = require('react');
const ReactDOM = require('react-dom');

const App = require('../components/app');

document.addEventListener("DOMContentLoaded", event => {
  ReactDOM.render(<App/>,document.getElementById('main'));
});
