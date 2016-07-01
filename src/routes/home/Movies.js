/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Home.css';
import Table from 'react-bootstrap/lib/Table';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';

var EXAMPLEMOVIE = {
  TitleName: 'Major Payne', ReleaseYear: 1995, TitleId: 0,
  cast: [], awards: []
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
      <input type="text" value={this.state.searchString} onChange={this.handleChange} placeholder="Type here" />
      <Table responsive>
        <thead>
          <tr>
            <th>Title</th>
          </tr>
        </thead>
        <tbody>
        { movies.map(function(m){
          let movieItemClass = s.movieItem;
          {if (this.props.selectedMovie === m) {movieItemClass = s.selected}}
          var boundClick = this.handleClick.bind(this, m);
          return <tr><td onClick={boundClick} className={movieItemClass}>{m.TitleName} ({m.ReleaseYear})</td></tr>}, this) }
        </tbody>
      </Table>
    </div>;

  }
});

var DetailsView = React.createClass({

  render: function() {

    return <div className="details-view">
      <h2>{this.props.selectedMovie.TitleName} ({this.props.selectedMovie.ReleaseYear})</h2>
      <h3>Starring</h3>
      <ul>
        { this.props.selectedMovie.cast.map(function(o){
          return <li>{o.Name}</li>
        }, this) }
      </ul>
      <h3>Awards</h3>
      <ul>
        { this.props.selectedMovie.awards.map(function(o){
          {if (o.AwardWon) return <li>{o.Award}</li>}
        }, this) }
      </ul>
    </div>;
  }

});

var Movies = React.createClass({

  getInitialState: function(){
    return { selectedMovie: EXAMPLEMOVIE, movies: [] };
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
                  <TitlesView items={this.state.movies} handleSelect={this.handleSelect} selectedMovie={this.state.selectedMovie} />
                </Col>
              </Col>
              <Col md={6}>
                <Col md={12}>
                  <DetailsView selectedMovie={this.state.selectedMovie} />
                </Col>
              </Col>
            </Row>
          </Grid>
      </div>
    </div>
  }

});

export default withStyles(s)(Movies);
