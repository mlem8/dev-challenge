import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Movies.css';

// Child components
import MovieDescription from './MovieDescription';
import Cast from './Cast';
import Awards from './Awards';

const MovieDetails = React.createClass({

  render: function() {

    return (

      <div className="details-view">
        <h2>{this.props.selectedMovie.TitleName} ({this.props.selectedMovie.ReleaseYear})</h2>
        <MovieDescription description={this.props.selectedMovie.Description}/>
        <h3>Starring</h3>
        <Cast titleId={this.props.selectedMovie.TitleId}/>
        <h3>Awards</h3>
        <Awards titleId={this.props.selectedMovie.TitleId}/>
      </div>

    );

  }

});

export default withStyles(s)(MovieDetails);
