import React from 'react';
import fetch from '../../core/fetch';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Movies.css';

// TODO: Refactor to share inheritance w/ MovieAwards
const Cast = React.createClass({

  getInitialState: function(){
    return { cast: [] };
  },

  componentWillReceiveProps : function(newProps) {

    var self = this;
    var url = '/api/movies/' + newProps.titleId;

    fetch(url + '/cast').then(function(response) {
      return response.json();
    }).then(function(cast) {
      self.setState({cast:cast});
    });
  },

  render: function() {

    return (

      <ul>
        { this.state.cast.map(function(item, index){
          return <li key={index}>{item.Name}</li>
        }, this) }
      </ul>

    );

  }

});

export default withStyles(s)(Cast);
