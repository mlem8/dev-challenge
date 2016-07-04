import React, { PropTypes } from 'react';
import fetch from '../../core/fetch';
import Well from 'react-bootstrap/lib/Well';
import classNames from 'classnames/bind';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Movies.css';

let cx = classNames.bind(s);

var MovieDescription = React.createClass( {

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

var MovieAwards = React.createClass( {

  getInitialState: function(){
    return { awards: [] };
  },

  componentWillReceiveProps : function(newProps) {

    var self = this;
    var url = '/api/movies/' + newProps.titleId;

    fetch(url + '/awards').then(function(response) {
      return response.json();
    }).then(function(awards) {
      self.setState({awards:awards});
    });
  },

  render: function() {

    return (
      <ul>
        { this.state.awards.map(function(item, index){
          return <li key={index}>{item.Award}</li>
        }, this) }
      </ul>
    );

  }

});

var MovieCast = React.createClass( {

  getInitialState: function(){
    return { cast: [] };
  },

  componentWillReceiveProps : function(newProps) {

    var self = this;
    var url = '/api/movies/' + newProps.titleId;

    fetch(url + '/cast').then(function(response) {
      return response.json();
    }).then(function(cast) {
      self.setState({cast:cast});
    });
  },

  render: function() {

    return (
      <ul>
        { this.state.cast.map(function(item, index){
          return <li key={index}>{item.Name}</li>
        }, this) }
      </ul>
    );

  }

});

var MovieDetails = React.createClass({

  render: function() {

    return (

      <div className="details-view">
        <h2>{this.props.selectedMovie.TitleName} ({this.props.selectedMovie.ReleaseYear})</h2>
        <MovieDescription description={this.props.selectedMovie.Description}/>
        <h3>Starring</h3>
        <MovieCast titleId={this.props.selectedMovie.TitleId}/>
        <h3>Awards</h3>
        <MovieAwards titleId={this.props.selectedMovie.TitleId}/>
      </div>

    );

  }

});

export default withStyles(s)(MovieDetails);
