/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { PropTypes } from 'react';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import FormControl from 'react-bootstrap/lib/FormControl';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import Table from 'react-bootstrap/lib/Table';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Home.css';
import MovieDetails from './MovieDetails';

var EXAMPLEMOVIE = {
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
  cast: [{Name:'Damon Wayans'}], awards: []
};

var TitlesView = React.createClass({

  getInitialState: function(){
    return { searchString: '' };
  },

  handleChange: function(e){
    this.setState({searchString:e.target.value});
  },

  handleClick: function (obj) {
    this.props.handleSelect(obj);
  },

  render: function() {

    var movies = this.props.items,
      searchString = this.state.searchString.trim().toLowerCase();

    if(searchString.length > 0){

      movies = movies.filter(function(l){
        return l.TitleName.toLowerCase().match( searchString );
      });
    }

    return <div>
      <h2>Find Movies</h2>
      <form>
        <FormGroup>
          <ControlLabel>Search by title</ControlLabel>
          <FormControl
            type="text"
            value={this.state.searchString}
            placeholder="Type here"
            onChange={this.handleChange}
          />
          <FormControl.Feedback />
        </FormGroup>
      </form>
      <Table responsive>
        <thead>
          <tr>
            <th>Title</th>
            <th>Released</th>
          </tr>
        </thead>
        <tbody>
        { movies.map(function(m){
          let movieItemClass = s.movieItem;
          {if (this.props.selectedMovie === m) {movieItemClass = s.selected}}
          var boundClick = this.handleClick.bind(this, m);
          return <tr key={m.TitleId} className={movieItemClass}><td onClick={boundClick}>{m.TitleName}</td><td>{m.ReleaseYear}</td></tr>}, this) }
        </tbody>
      </Table>
    </div>;

  }
});

var Movies = React.createClass({

  getInitialState: function(){
    return { selectedMovie: EXAMPLEMOVIE, movies: []};
  },

  //TODO: Move fetch calls to parent (index.js)
  componentDidMount: function() {
    var self = this;
    fetch('/api/movies').then(function(response) {
      return response.json();
    }).then(function(obj) {
      self.setState({movies:obj});
    });
  },

  handleSelect: function(e){

    var self = this;

    if (self.state.selectedMovie.TitleId == e.TitleId) return;

    var url = '/api/movies/' + e.TitleId;
    fetch(url + '/cast').then(function(response) {
      return response.json();
    }).then(function(cast) {
      e.cast = cast;

      fetch(url + '/awards').then(function(response) {
        return response.json();
      }).then(function(awards) {
        e.awards = awards;

        self.setState({selectedMovie:e});
      });

    });
  },

  render: function() {
    return <div className={s.root}>
      <div className={s.container}>
          <Grid>
            <Row className="show-grid">
              <Col md={6}>
                <Col md={12}>
                  <TitlesView
                    items={this.state.movies}
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
  }

});

export default withStyles(s)(Movies);
