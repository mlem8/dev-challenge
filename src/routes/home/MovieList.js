import React, { PropTypes } from 'react';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import FormControl from 'react-bootstrap/lib/FormControl';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import Table from 'react-bootstrap/lib/Table';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Home.css';

var MovieList = React.createClass({

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
        { movies.map(function(m, index){
          let movieItemClass = s.movieItem;
          {if (this.props.selectedMovie === m) {movieItemClass = s.selected}}
          var boundClick = this.handleClick.bind(this, m);
          return <tr key={index} className={movieItemClass}><td onClick={boundClick}>{m.TitleName}</td><td>{m.ReleaseYear}</td></tr>}, this) }
        </tbody>
      </Table>
    </div>;

  }
});

export default withStyles(s)(MovieList);
