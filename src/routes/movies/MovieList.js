import React, { Component } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Movies.css';

// Child components
import MovieSearch from './MovieSearch';
import MovieTable from './MovieTable';

const MovieList = React.createClass({

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

    return (

      <div>
        <MovieSearch
          handleChange={this.handleChange}
          searchString={this.state.searchString}
        />
        <MovieTable
          movies={this.props.items}
          handleClick={this.handleClick}
          searchString={this.state.searchString}
        />
      </div>

    );

  }
});

export default withStyles(s)(MovieList);
