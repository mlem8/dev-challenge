import React, { Component, PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Movies.css';

// Child components
import Description from './Description';
import Cast from './Cast';
import Awards from './Awards';

class MovieDetails extends Component {

  static propTypes = {
    selectedMovie: PropTypes.shape({
      TitleId: PropTypes.number,
      TitleName: PropTypes.string,
      ReleaseYear: PropTypes.number,
      Description: PropTypes.string,
    }),
  };

  render() {
    return (
      <div className="details-view">
        <h2>{this.props.selectedMovie.TitleName} ({this.props.selectedMovie.ReleaseYear})</h2>
        <Description description={this.props.selectedMovie.Description}/>
        <h3>Starring</h3>
        <Cast titleId={this.props.selectedMovie.TitleId}/>
        <h3>Awards</h3>
        <Awards titleId={this.props.selectedMovie.TitleId}/>
      </div>
    );
  }

}

export default withStyles(s)(MovieDetails);
