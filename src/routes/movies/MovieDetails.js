import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Movies.css';

// Child components
import Description from './Description';
import Cast from './Cast';
import Awards from './Awards';

function MovieDetails({ selectedMovie }) {
  return (
    <div>
      <h2>{selectedMovie.TitleName} ({selectedMovie.ReleaseYear})</h2>
      <Description description={selectedMovie.Description} />
      <h3>Starring</h3>
      <Cast titleId={selectedMovie.TitleId} />
      <h3>Awards</h3>
      <Awards titleId={selectedMovie.TitleId} />
    </div>
  );
}

MovieDetails.propTypes = {
  selectedMovie: PropTypes.shape({
    TitleId: PropTypes.number,
    TitleName: PropTypes.string,
    ReleaseYear: PropTypes.number,
    Description: PropTypes.string,
  }),
};

export default withStyles(s)(MovieDetails);
