import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Movies.css';

// Child components
import MovieDescription from './MovieDescription';
import MovieCast from './MovieCast';
import MovieAwards from './MovieAwards';

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
