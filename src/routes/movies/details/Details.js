import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from '../Movies.css';

// Child components
import Description from './Description';
import Cast from './Cast';
import Awards from './Awards';

function Details({ selectedMovie }) {
  return (
    <div>
      <h2>{selectedMovie.TitleName} ({selectedMovie.ReleaseYear})</h2>
      <Description description={selectedMovie.Storylines[0].Description} />
      <h3>Starring</h3>
      <Cast titleId={selectedMovie.TitleId} cast={selectedMovie.Participants} />
      <h3>Awards</h3>
      <Awards titleId={selectedMovie.TitleId} awards={selectedMovie.Awards} />
    </div>
  );
}

Details.propTypes = {
  selectedMovie: PropTypes.shape({
    TitleId: PropTypes.number,
    TitleName: PropTypes.string,
    ReleaseYear: PropTypes.number,
    Storylines: PropTypes.array,
  }),
};

export default withStyles(s)(Details);
