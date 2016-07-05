import React, { PropTypes } from 'react';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import FormControl from 'react-bootstrap/lib/FormControl';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Movies.css';

function MovieSearch({ searchString, handleInput }) {
  return (
    <div>
      <h2>Find Movies</h2>
      <form>
        <FormGroup>
          <ControlLabel>Search by title</ControlLabel>
          <FormControl
            type="text"
            value={searchString}
            placeholder="Type here"
            onChange={handleInput}
          />
          <FormControl.Feedback />
        </FormGroup>
      </form>
    </div>
  );
}

MovieSearch.propTypes = {
  handleInput: PropTypes.func.isRequired,
  searchString: PropTypes.string,
};

export default withStyles(s)(MovieSearch);
