/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { Component } from 'react';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Movies.css';
import MovieDetails from './MovieDetails';
import MovieList from './MovieList';

const EXAMPLEMOVIE = {
  TitleName: 'Major Payne', ReleaseYear: 1995, TitleId: 0,
  Description:
    'Major Benson Winifred Payne is being discharged from the Marines. Payne ' +
    'is a killin\' machine, but the wars of the world are no longer fought on the ' +
    'battlefield. A career Marine, he has no idea what to do as a civilian, so his ' +
    'commander finds him a job - commanding officer of a local school\'s JROTC ' +
    'program, a bunch or ragtag losers with no hope. Using such teaching tools as ' +
    'live grenades and real bullets, Payne starts to instill the corp with some hope. ' +
    'But when Payne is recalled to fight in Bosnia, will he leave the corp that has just ' +
    'started to believe in him, or will he find out that killin\' ain\'t much of a livin\'?',
  // cast: [{Name:'Damon Wayans'}], awards: []
};

const Movies = React.createClass({

  getInitialState: function(){
    return { selectedMovie: EXAMPLEMOVIE };
  },

  handleSelect: function(e){

    var self = this;

    if (self.state.selectedMovie.TitleId == e.TitleId) return;

    self.setState({selectedMovie:e});

  },

  render: function() {

    return (

      <div className={s.root}>
        <div className={s.container}>
            <Grid>
              <Row className="show-grid">
                <Col md={6}>
                  <Col md={12}>
                    <MovieList
                      items={this.props.movies}
                      handleSelect={this.handleSelect}
                      selectedMovie={this.state.selectedMovie}
                    />
                  </Col>
                </Col>
                <Col md={6}>
                  <Col md={12}>
                    <MovieDetails selectedMovie={this.state.selectedMovie}/>
                  </Col>
                </Col>
              </Row>
            </Grid>
        </div>
      </div>

    );
  }

});

export default withStyles(s)(Movies);

