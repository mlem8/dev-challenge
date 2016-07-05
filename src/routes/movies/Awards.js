import React, { Component } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Movies.css';

function Awards ({ awards }) {
  return (
    <ul>
      {awards.map((item, index) => <li key={index}>{item.Award}</li>)}
    </ul>
  );
}

export default withStyles(s)(Awards);

