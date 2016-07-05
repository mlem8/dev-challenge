import React, { PropTypes } from 'react';
import Table from 'react-bootstrap/lib/Table';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Movies.css';

function MovieTable({ items, selectedMovie, searchString, handleClick }) {
  let movies = items;
  const searchStr = searchString.trim().toLowerCase();

  if (searchStr.length > 0) {
    movies = movies.filter((m) => m.TitleName.toLowerCase().match(searchStr));
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
        {movies.map(function (m, index) {
          let movieItemClass = s.movieItem;
          if (selectedMovie.TitleId === m.TitleId) { movieItemClass = s.selected; }
          const boundClick = handleClick.bind(this, m);
          return (
            <tr key={index} className={movieItemClass}>
              <td onClick={boundClick}>{m.TitleName}</td><td>{m.ReleaseYear}</td>
            </tr>
          );
        }, this)}
        </tbody>
      </Table>
    </div>

  );
}

MovieTable.propTypes = {
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
  searchString: PropTypes.string,
  handleClick: PropTypes.func.isRequired,
};

export default withStyles(s)(MovieTable);
