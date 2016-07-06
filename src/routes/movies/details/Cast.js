import React, { PropTypes } from 'react';

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

export default Cast;
