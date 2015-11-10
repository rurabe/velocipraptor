import React from "react"
import ReactDOM from "react-dom"

class App extends React.Component {
  render(){
    return <h1>Ips</h1>;
  }
};

document.addEventListener("DOMContentLoaded", event => {
  ReactDOM.render(<App/>,document.getElementById('main'));
});
