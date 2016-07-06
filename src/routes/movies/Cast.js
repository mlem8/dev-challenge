import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Movies.css';

// TODO: Refactor to share inheritance w/ MovieAwards
function Cast({ cast }) {
  return (
    <ul>
      {cast.map((item, index) => { if (item.IsKey) return <li key={index}>{item.Name}</li>; })}
    </ul>
  );
}

Cast.propTypes = {
  cast: PropTypes.arrayOf(
    PropTypes.shape({
      IsKey: PropTypes.boolean,
      Name: PropTypes.string,
    }),
  ),
};

export default withStyles(s)(Cast);
