import React, { PropTypes } from 'react';

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

export default Awards;

