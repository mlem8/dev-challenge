import React, { PropTypes } from 'react';
import fetch from '../../core/fetch';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Movies.css';

var MovieAwards = React.createClass( {

  getInitialState: function(){
    return { awards: [] };
  },

  componentWillReceiveProps : function(newProps) {

    var self = this;
    var url = '/api/movies/' + newProps.titleId;

    fetch(url + '/awards').then(function(response) {
      return response.json();
    }).then(function(awards) {
      self.setState({awards:awards});
    });
  },

  render: function() {

    return (
      <ul>
        { this.state.awards.map(function(item, index){
          return <li key={index}>{item.Award}</li>
        }, this) }
      </ul>
    );

  }

});

export default withStyles(s)(MovieAwards);

