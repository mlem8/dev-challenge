/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

// FIND MOVIES AKA REGISTER

var TITLES = [{"TitleId":610,"TitleName":"Casablanca","TitleNameSortable":"Casablanca","ReleaseYear":1942,"ProcessedDateTimeUTC":"2013-06-15T02:01:55.153"},{"TitleId":2761,"TitleName":"Ben-Hur (Part 1)","TitleNameSortable":"Ben-Hur (Part 1)","ReleaseYear":1959,"ProcessedDateTimeUTC":"2013-06-03T08:03:20"},{"TitleId":12708,"TitleName":"A Man for All Seasons","TitleNameSortable":"Man for All Seasons, A","ReleaseYear":1966,"ProcessedDateTimeUTC":"2013-06-03T08:03:20"},{"TitleId":14798,"TitleName":"Cimarron","TitleNameSortable":"Cimarron","ReleaseYear":1931,"ProcessedDateTimeUTC":"2013-06-03T08:03:20"},{"TitleId":16636,"TitleName":"Annie Hall","TitleNameSortable":"Annie Hall","ReleaseYear":1977,"ProcessedDateTimeUTC":"2013-06-22T02:00:57.283"},{"TitleId":23093,"TitleName":"Amadeus (Part 1)","TitleNameSortable":"Amadeus (Part 1)","ReleaseYear":1984,"ProcessedDateTimeUTC":"2013-07-06T02:00:48.510"},{"TitleId":27628,"TitleName":"All the King's Men","TitleNameSortable":"All the King's Men","ReleaseYear":1949,"ProcessedDateTimeUTC":"2013-06-03T08:03:20"},{"TitleId":67044,"TitleName":"All About Eve","TitleNameSortable":"All About Eve","ReleaseYear":1950,"ProcessedDateTimeUTC":"2013-06-03T08:03:20"},{"TitleId":67079,"TitleName":"All Quiet On The Western Front","TitleNameSortable":"All Quiet On The Western Front","ReleaseYear":1930,"ProcessedDateTimeUTC":"2013-06-03T08:03:20"},{"TitleId":67241,"TitleName":"An American in Paris","TitleNameSortable":"American in Paris, An","ReleaseYear":1951,"ProcessedDateTimeUTC":"2013-06-03T08:03:20"},{"TitleId":67646,"TitleName":"Around The World In 80 Days","TitleNameSortable":"Around The World In 80 Days","ReleaseYear":1956,"ProcessedDateTimeUTC":"2013-07-06T02:00:48.510"},{"TitleId":69593,"TitleName":"Braveheart","TitleNameSortable":"Braveheart","ReleaseYear":1995,"ProcessedDateTimeUTC":"2013-06-22T02:00:57.283"},{"TitleId":70523,"TitleName":"Cavalcade","TitleNameSortable":"Cavalcade","ReleaseYear":1933,"ProcessedDateTimeUTC":"2013-06-15T02:01:55.153"},{"TitleId":70646,"TitleName":"Chariots Of Fire","TitleNameSortable":"Chariots Of Fire","ReleaseYear":1981,"ProcessedDateTimeUTC":"2013-06-03T08:03:20"},{"TitleId":72152,"TitleName":"Dances With Wolves","TitleNameSortable":"Dances With Wolves","ReleaseYear":1990,"ProcessedDateTimeUTC":"2013-06-03T08:03:20"},{"TitleId":72723,"TitleName":"Deer Hunter, The (Part 1)","TitleNameSortable":"Deer Hunter, The (Part 1)","ReleaseYear":1978,"ProcessedDateTimeUTC":"2013-06-03T08:03:20"},{"TitleId":73676,"TitleName":"Driving Miss Daisy","TitleNameSortable":"Driving Miss Daisy","ReleaseYear":1989,"ProcessedDateTimeUTC":"2013-06-08T02:01:41.823"},{"TitleId":75434,"TitleName":"Forrest Gump","TitleNameSortable":"Forrest Gump","ReleaseYear":1994,"ProcessedDateTimeUTC":"2013-06-15T02:01:55.153"},{"TitleId":308675,"TitleName":"Amadeus (Part 2)","TitleNameSortable":"Amadeus (Part 2)","ReleaseYear":1984,"ProcessedDateTimeUTC":"2013-07-06T02:00:48.510"},{"TitleId":341476,"TitleName":"American Beauty","TitleNameSortable":"American Beauty","ReleaseYear":1999,"ProcessedDateTimeUTC":"2013-06-15T02:02:38.233"},{"TitleId":415095,"TitleName":"Ben-Hur","TitleNameSortable":"Ben-Hur","ReleaseYear":1959,"ProcessedDateTimeUTC":"2013-07-02T19:00:04.327"},{"TitleId":446310,"TitleName":"2 Fast 2 Furious","TitleNameSortable":"2 Fast 2 Furious","ReleaseYear":2003,"ProcessedDateTimeUTC":"2013-06-08T02:03:05.027"},{"TitleId":612695,"TitleName":"Four Brothers","TitleNameSortable":"Four Brothers","ReleaseYear":2005,"ProcessedDateTimeUTC":"2013-06-15T02:03:39.377"},{"TitleId":641735,"TitleName":"Disturbia","TitleNameSortable":"Disturbia","ReleaseYear":2007,"ProcessedDateTimeUTC":"2013-06-03T08:03:20"},{"TitleId":729224,"TitleName":"Angels & Demons","TitleNameSortable":"Angels & Demons","ReleaseYear":2009,"ProcessedDateTimeUTC":"2013-06-03T08:03:20"}];

import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Register.css';

const title = 'Find Movies';

var TitlesView = React.createClass({

  getInitialState: function(){
    return { searchString: '' };
  },

  handleChange: function(e){

    // If you comment out this line, the text box will not change its value.
    // This is because in React, an input cannot change independently of the value
    // that was assigned to it. In our case this is this.state.searchString.

    this.setState({searchString:e.target.value});
  },

  handleClick: function (obj) {
    // this.props.onClick(obj);
    console.info(obj); // this is what we want to pass to details
    console.log('omg you clicked something');

    // this.setState({selectedTitle:myTitle});
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
        wakka wakka
      </div>
      <div className="panel-body">Info!!!</div>
    </div>;
  }
  // return <div className="details-view">
  //   <div className="panel-heading">
  //     {this.props.selectedTitle}
  //   </div>
  //   <div className="panel-body">Info!!!</div>
  // </div>;
});

function Register(props, context) {
  context.setTitle(title);
  return (
    <div className={s.root}>
      <div className={s.container}>
        <h1>{title}</h1>
        <p>...</p>
        <div>
          <TitlesView items={ TITLES } />
          <DetailsView />
        </div>
      </div>
    </div>
  );
}

Register.contextTypes = { setTitle: PropTypes.func.isRequired };

export default withStyles(s)(Register);
