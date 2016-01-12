const React = require('react');
const {Link} = require('react-router');
const {Breadcrumb,BreadcrumbItem} = require('react-bootstrap');

const Breadcrumbs = React.createClass({
  render: function(){
    let crumbs = [(<li key={-1}><Link to="/">Datacenters</Link></li>)]

    this.props.path.forEach( (crumb,i) => {
      if(i === (this.props.path.length - 1)){
        crumbs.push(<li key={i}>{crumb.label}</li>);
      } else {
        crumbs.push(<li className="active" key={i}><Link to={crumb.link}>{crumb.label}</Link></li>);
      }
    });

    return (
      <Breadcrumb>
        {crumbs}
      </Breadcrumb>
    );
  }
});

module.exports = Breadcrumbs;