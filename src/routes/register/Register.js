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
import s from './Register.css';
import Button from 'react-bootstrap/lib/Button';
import SplitPane from 'react-split-pane/lib/SplitPane';

// import Grid from 'react-bootstrap/lib/Grid';
// import Col from 'react-bootstrap/lib/Col';
// import Row from 'react-bootstrap/lib/Row';

const title = 'Find Movies';

var EXAMPLEMOVIE = {
  TitleName: 'Major Payne', ReleaseYear: 1997, TitleId: -1,
  cast: []
};

var TitlesView = React.createClass({

  getInitialState: function(){
    return { searchString: '' };
  },

  handleChange: function(e){
    this.setState({searchString:e.target.value});
  },

  handleClick: function (obj) {
    console.log('omg you clicked something');

    this.props.handleSelect(obj);
  },

  render: function() {

    var libraries = this.props.items,
      searchString = this.state.searchString.trim().toLowerCase();

    if(searchString.length > 0){

      libraries = libraries.filter(function(l){
        return l.TitleName.toLowerCase().match( searchString );
      });

    }

    return <div>
      <h2>Find Movies</h2>
      <input type="text" value={this.state.searchString} onChange={this.handleChange} placeholder="Type here" />
      <ul>
        { libraries.map(function(l){
          var boundClick = this.handleClick.bind(this, l);
          return <li onClick={boundClick}>{l.TitleName} ({l.ReleaseYear})</li>
        }, this) }
      </ul>
    </div>;

  }
});

var DetailsView = React.createClass({

  render: function() {

    return <div className="details-view">
      <h2>{this.props.selectedMovie.TitleName} ({this.props.selectedMovie.ReleaseYear})</h2>
      <h3>Starring</h3>
      <ul>
        { this.props.selectedMovie.cast.map(function(l){
          return <li>{l.Name}</li>
        }, this) }
      </ul>
    </div>;
  }

});

var MovieView = React.createClass({

  getInitialState: function(){
    return { selectedMovie: EXAMPLEMOVIE, movies: [] };
  },

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

      var url = '/api/movies/' + e.TitleId + '/cast';
    fetch(url).then(function(response) {
      return response.json();
    }).then(function(obj) {
      e.cast = obj;
      self.setState({selectedMovie:e});
      console.info(e);
    });
  },

  render: function() {
    return <div className={s.root}>
      <div className={s.container}>
        <SplitPane split="vertical" minSize={50} defaultSize={1000}>
          <TitlesView items={this.state.movies} handleSelect={this.handleSelect} />
          <DetailsView selectedMovie={this.state.selectedMovie} />
        </SplitPane>
      </div>
    </div>
  }

});

export default withStyles(s)(MovieView);
