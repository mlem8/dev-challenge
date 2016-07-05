import React, { Component } from 'react';
import fetch from '../../core/fetch';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Movies.css';

// TODO: Refactor to share inheritance w/ MovieAwards
class Cast extends Component {

  state = {
    cast: [],
  };

  componentWillReceiveProps(newProps) {
    const url = `/api/movies/${newProps.titleId}/cast`;

    (async() => {
      const response = await fetch(url);
      const data = await response.json();

      this.setState({ cast: data });
    })();
  }

  render() {
    return (
      <ul>
        {this.state.cast.map((item, index) => <li key={index}>{item.Name}</li>)}
      </ul>
    );
  }

}

export default withStyles(s)(Cast);
