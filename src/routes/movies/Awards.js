import React, { Component } from 'react';
import fetch from '../../core/fetch';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Movies.css';

class Awards extends Component {

  state = {
    awards: [],
  };

  componentWillReceiveProps(newProps) {
    const url = `/api/movies/${newProps.titleId}/awards`;

    (async() => {
      const response = await fetch(url);
      const data = await response.json();

      this.setState({ awards: data });
    })();
  }

  render() {
    return (
      <ul>
        {this.state.awards.map((item, index) => <li key={index}>{item.Award}</li>)}
      </ul>
    );
  }

}

export default withStyles(s)(Awards);

