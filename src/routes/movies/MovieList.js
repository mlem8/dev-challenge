import React, { Component, PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Movies.css';

// Child components
import MovieSearch from './MovieSearch';
import MovieTable from './MovieTable';

class MovieList extends Component {

  static propTypes = {
    items: PropTypes.arrayOf(
      PropTypes.shape({
        TitleId: PropTypes.number,
        TitleName: PropTypes.string,
        ReleaseYear: PropTypes.number,
        Description: PropTypes.string,
      }),
    ),
    selectedMovie: PropTypes.shape({
      TitleId: PropTypes.number,
      TitleName: PropTypes.string,
      ReleaseYear: PropTypes.number,
      Description: PropTypes.string,
    }),
    handleClick: PropTypes.func.isRequired,
  };

  state = {
    searchString: '',
  };

  handleInput = (e) => {
    this.setState({ searchString: e.target.value });
  };

  handleClick = (e) => {
    this.props.handleClick(e);
  };

  render() {
    return (
      <div>
        <MovieSearch
          handleInput={this.handleInput}
          searchString={this.state.searchString}
        />
        <MovieTable
          items={this.props.items}
          selectedMovie={this.props.selectedMovie}
          searchString={this.state.searchString}
          handleClick={this.handleClick}
        />
      </div>
    );
  }
}

export default withStyles(s)(MovieList);
