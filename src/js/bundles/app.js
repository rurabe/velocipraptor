const React = require('react');
const ReactDOM = require('react-dom');

const AppRouter = require('../components/app_router');

document.addEventListener("DOMContentLoaded", event => {
  ReactDOM.render(<AppRouter/>,document.getElementById('main'));
});
