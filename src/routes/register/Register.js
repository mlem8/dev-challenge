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

var EXAMPLEMOVIE = { TitleName: 'Major Payne', ReleaseYear: 1997 };

var TitlesView = React.createClass({

  getInitialState: function(){
    return { searchString: '' };
  },

  handleChange: function(e){
    this.setState({searchString:e.target.value});
  },

  handleClick: function (obj) {
    console.info(obj);
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
      <input type="text" value={this.state.searchString} onChange={this.handleChange} placeholder="Type here" />
      <ul>
        { libraries.map(function(l){
          var boundClick = this.handleClick.bind(this, l);
          return <li onClick={boundClick}>{l.TitleName} <a href="http://localhost:3000">{l.ReleaseYear}</a></li>
        }, this) }
      </ul>
    </div>;

  }
});

var DetailsView = React.createClass({

  render: function() {

    return <div className="details-view">
      <div className="panel-heading">
        {this.props.selectedMovie.TitleName}
      </div>
      <div className="panel-body">
        {this.props.selectedMovie.ReleaseYear}
      </div>
      <div>{this.props.selectedMovie.ProcessedDateTimeUTC}</div>
      <Button>Default</Button>
    </div>;
  }

});

var MovieView = React.createClass({

  getInitialState: function(){
    return { selectedMovie: EXAMPLEMOVIE, movies: [] };
  },

  componentDidMount: function() {
    var self = this;
    fetch('/api').then(function(response) {
      return response.json();
    }).then(function(obj) {
      console.info(obj);
      self.setState({movies:obj});
    });
  },

  handleSelect: function(e){
    this.setState({selectedMovie:e});
  },

  render: function() {
    return <div className={s.root}>
      <div className={s.container}>
        <h1>{title}</h1>
        <SplitPane split="vertical" minSize={50} defaultSize={1000}>
          <TitlesView items={this.state.movies} handleSelect={this.handleSelect} />
          <DetailsView selectedMovie={this.state.selectedMovie} />
        </SplitPane>
      </div>
    </div>
  }

});

export default withStyles(s)(MovieView);
