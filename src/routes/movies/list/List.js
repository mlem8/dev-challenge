import React, { Component, PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from '../Movies.css';

// Child components
import Search from './Search';
import Titles from './Titles';

class List extends Component {

  static propTypes = {
    items: PropTypes.arrayOf(
      PropTypes.shape({
        TitleId: PropTypes.number,
        TitleName: PropTypes.string,
        ReleaseYear: PropTypes.number,
        Storylines: PropTypes.array,
      }),
    ),
    selectedMovie: PropTypes.shape({
      TitleId: PropTypes.number,
      TitleName: PropTypes.string,
      ReleaseYear: PropTypes.number,
      Storylines: PropTypes.array,
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
        <Search
          handleInput={this.handleInput}
          searchString={this.state.searchString}
        />
        <Titles
          items={this.props.items}
          selectedMovie={this.props.selectedMovie}
          searchString={this.state.searchString}
          handleClick={this.handleClick}
        />
      </div>
    );
  }
}

export default withStyles(s)(List);
