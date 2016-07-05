import React, { Component } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Movies.css';

// TODO: Refactor to share inheritance w/ MovieAwards
function Cast ({ cast }) {
  return (
    <ul>
      {cast.map((item, index) => { if (item.IsKey) return <li key={index}>{item.Name}</li>})}
    </ul>
  );
}

export default withStyles(s)(Cast);
