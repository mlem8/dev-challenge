import React, { Component, PropTypes } from 'react';

function Details({ items, filter }) {
  return (
    <ul>
      {items.map(filter)}
    </ul>
  );
}

Details.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
    }),
  ),
  filter: PropTypes.func,
};

export default Details;
