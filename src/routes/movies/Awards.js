import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Movies.css';

function Awards({ awards }) {
  return (
    <ul>
      {awards.map((item, index) => <li key={index}>{item.Award}</li>)}
    </ul>
  );
}

Awards.propTypes = {
  awards: PropTypes.arrayOf(
    PropTypes.shape({
      Award: PropTypes.string,
    }),
  ),
};

export default withStyles(s)(Awards);

