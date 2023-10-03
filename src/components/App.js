import React from "react";
import { data } from "../data";
import {Navbar, MovieCard} from './';
import {addMovies, showFavouritesTab} from '../actions';

class App extends React.Component{
  componentDidMount(){
    const {store} = this.props;
    store.subscribe(()=>{
      this.forceUpdate();
    })
    // after dispatch subscribe is called, to subscribe to the new state changes, and then the later code is executed
    store.dispatch(addMovies(data))
  }
  
  isMovieFavourite = (movie) =>{
    const {movies} = this.props.store.getState();
    const {favourites} = movies;
    const index = favourites.indexOf(movie);
    if(index !== -1){
      return true;
    }
    return false;
  }

  onChangeTab = (val) =>{
    this.props.store.dispatch(showFavouritesTab(val));
  }

  render(){
    const {movies, search} = this.props.store.getState();
    const {list, favourites, showFavourites} = movies;
    const displayMovies = showFavourites?  favourites: list;
    return (
      <div className="App">
        <Navbar 
        dispatch = {this.props.store.dispatch}
        search = {search}
        />
        <div className="main">
          <div className="tabs">
            <div className={`tab ${showFavourites? '': 'active-tabs'} ` } onClick={() => this.onChangeTab(false)}>Movies</div>
            <div className={`tab ${showFavourites? 'active-tabs': ''} ` } onClick={() => this.onChangeTab(true)}>Favourite</div>
          </div>
          <div className="list">
            {displayMovies.map((movie, index) =>(
              <MovieCard 
              movie={movie} 
              key={`movie-${index}`}
              dispatch = {this.props.store.dispatch}
              isMovieFavourite = {this.isMovieFavourite}
              />
            ))}
          </div>
          {displayMovies.length === 0 ? <div className="no-movies">No movies to display</div>: null}
        </div>
      </div>
    );
  }
}

export default App;
