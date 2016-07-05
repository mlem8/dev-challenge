import React, { Component } from 'react';
import Table from 'react-bootstrap/lib/Table';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Movies.css';

const MovieTable = React.createClass({

  handleClick: function (obj) {
    this.props.handleClick(obj);
  },

  render: function() {

    var movies = this.props.movies,
      searchString = this.props.searchString.trim().toLowerCase();

    if(searchString.length > 0){

      movies = movies.filter(function(m){
        return m.TitleName.toLowerCase().match( searchString );
      });
    }

    return (

      <div>
        <Table responsive>
          <thead>
          <tr>
            <th>Title</th>
            <th>Released</th>
          </tr>
          </thead>
          <tbody>
          { movies.map(function(m, index){
            let movieItemClass = s.movieItem;
            {if (this.props.selectedMovie === m) {movieItemClass = s.selected}}
            var boundClick = this.handleClick.bind(this, m);
            return <tr key={index} className={movieItemClass}><td onClick={boundClick}>{m.TitleName}</td><td>{m.ReleaseYear}</td></tr>}, this) }
          </tbody>
        </Table>
      </div>

    );

  }
});

export default withStyles(s)(MovieTable);
