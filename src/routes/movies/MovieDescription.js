import React from 'react';
import Well from 'react-bootstrap/lib/Well';
import classNames from 'classnames/bind';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Movies.css';

let cx = classNames.bind(s);

const MovieDescription = React.createClass( {

  getInitialState: function(){
    return { collapsed: true };
  },

  // collapse when new movie selected
  componentWillReceiveProps : function() {
    this.setState({collapsed: true});
  },

  handleClick: function() {
    this.setState({collapsed:!this.state.collapsed});
  },

  render: function() {

    let descriptionClass = cx({
      movieDescription: true,
      collapsed: this.state.collapsed
    });
    let collapseClass = cx({
      readMore: true,
      hidden: this.props.description.length < 292
    });
    let linkText = this.state.collapsed ? "More" : "Less";

    return (
      <Well bsSize="large">
        <p className={descriptionClass}>{this.props.description}</p>
        <a href="javascript:void(0)" className={collapseClass} onClick={this.handleClick}>{linkText}</a>
      </Well>
    );

  }

});

export default withStyles(s)(MovieDescription);
