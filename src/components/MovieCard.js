import React from "react";
import { connect } from "react-redux";
import { addFavourite, removeFavourite } from "../actions";

class MovieCard extends React.Component {
  handleAddFavourite = () => {
    const { movie } = this.props;
    this.props.dispatch(addFavourite(movie));
  };

  handleRemoveFavourite = () => {
    const { movie } = this.props;
    this.props.dispatch(removeFavourite(movie));
  };

  isMovieFavourite = (movie) => {
    const { movies } = this.props;
    const { favourites } = movies;
    const index = favourites.indexOf(movie);
    if (index !== -1) {
      return true;
    }
    return false;
  };

  render() {
    const { movie } = this.props;
    return (
      <div className="movie-card">
        <div className="left">
          <img src={movie.Poster} alt="" />
        </div>
        <div className="right">
          <div className="title">{movie.Title}</div>
          <div className="plot">{movie.Plot}</div>
          <div className="footer">
            <div className="rating">{movie.imdbRating}</div>
            { this.isMovieFavourite(movie) ? (
              <button
                className="unfavourite-btn"
                onClick={this.handleRemoveFavourite}
              >
                Unfavourite
              </button>
            ) : (
              <button
                className="favourite-btn"
                onClick={this.handleAddFavourite}
              >
                Favourite
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    movies: state.movies,
  };
}

const connectedMovieCardComponent = connect(mapStateToProps)(MovieCard);

export default connectedMovieCardComponent;
