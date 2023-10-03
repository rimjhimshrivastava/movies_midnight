import React from "react";
import { connect } from 'react-redux';
import { data } from "../data";
import { Navbar, MovieCard } from "./";
import { addMovies, showFavouritesTab } from "../actions";

class App extends React.Component {
  componentDidMount() {
    // after dispatch subscribe is called, to subscribe to the new state changes, and then the later code is executed
    this.props.dispatch(addMovies(data));
  }

  onChangeTab = (val) => {
    this.props.dispatch(showFavouritesTab(val));
  };

  render() {
    const { movies } = this.props;
    const { list, favourites, showFavourites } = movies;
    const displayMovies = showFavourites ? favourites : list;
    return (
      <div className="App">
        <Navbar />
        <div className="main">
          <div className="tabs">
            <div
              className={`tab ${showFavourites ? "" : "active-tabs"} `}
              onClick={() => this.onChangeTab(false)}
            >
              Movies
            </div>
            <div
              className={`tab ${showFavourites ? "active-tabs" : ""} `}
              onClick={() => this.onChangeTab(true)}
            >
              Favourite
            </div>
          </div>
          <div className="list">
            {displayMovies.map((movie, index) => (
              <MovieCard
                movie={movie}
                key={`movie-${index}`}
              />
            ))}
          </div>
          {displayMovies.length === 0 ? (
            <div className="no-movies">No movies to display</div>
          ) : null}
        </div>
      </div>
    );
  }
}

// class AppWrapper extends React.Component{
//   render(){
//     return(
//       <StoreContext.Consumer>
//         {(store) => <App store={store} />}
//       </StoreContext.Consumer>
//     )
//   }
// }

function mapStateToProps(state) {
  return {
    movies: state.movies,
  };
}

const connectedAppComponent = connect(mapStateToProps)(App);

export default connectedAppComponent;
