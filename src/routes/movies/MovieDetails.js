import React, { PropTypes } from 'react';
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

var MovieDetails = React.createClass({

  render: function() {

    return <div className="details-view">
      <h2>{this.props.selectedMovie.TitleName} ({this.props.selectedMovie.ReleaseYear})</h2>
      <MovieDescription description={this.props.selectedMovie.Description}/>
      <h3>Starring</h3>
      <ul>
        { this.props.selectedMovie.cast.map(function(item, index){
          return <li key={index}>{item.Name}</li>
        }, this) }
      </ul>
      <h3>Awards</h3>
      <ul>
        { this.props.selectedMovie.awards.map(function(item, index){
          {if (item.AwardWon) return <li key={index}>{item.Award}</li>}
        }, this) }
      </ul>
    </div>;

  }

});

export default withStyles(s)(MovieDetails);
