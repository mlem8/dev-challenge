/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { Component, PropTypes } from 'react';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Movies.css';
import exampleMovie from './exampleMovie.json';

// Child components
import Details from './details/Details';
import List from './list/List';


class Movies extends Component {

  static propTypes = {
    movies: PropTypes.arrayOf(
      PropTypes.shape({
        TitleId: PropTypes.number,
        TitleName: PropTypes.string,
        ReleaseYear: PropTypes.number,
        Storylines: PropTypes.array,
      }),
    ),
  };

  state = {
    selectedMovie: exampleMovie,
  };

  handleSelect = (movie) => {
    if (this.state.selectedMovie.TitleId === movie.TitleId) return;
    this.setState({ selectedMovie: movie });
  };

  render() {
    return (
      <div className={s.root}>
        <div className={s.container}>
          <Grid>
            <Row className="show-grid">
              <Col md={6}>
                <Col md={12}>
                  <List
                    items={this.props.movies}
                    handleClick={this.handleSelect}
                    selectedMovie={this.state.selectedMovie}
                  />
                </Col>
              </Col>
              <Col md={6}>
                <Col md={12}>
                  <Details selectedMovie={this.state.selectedMovie} />
                </Col>
              </Col>
            </Row>
          </Grid>
        </div>
      </div>
    );
  }

}

export default withStyles(s)(Movies);

