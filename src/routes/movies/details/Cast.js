import React, { PropTypes } from 'react';

const filter = (actor, index) => {
  if (actor.IsKey) return (<li key={index}>{actor.Name}</li>);
  return null;
};

function Cast({ cast }) {
  return (
    <ul>
      {cast.map(filter)}
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

export default Cast;
