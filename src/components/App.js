import React from "react";
import { data } from "../data";
import {Navbar, MovieCard} from './';
import {addMovies} from '../actions';

class App extends React.Component{
  componentDidMount(){
    const {store} = this.props;
    store.subscribe(()=>{
      this.forceUpdate();
    })
    // after dispatch subscribe is called, to subscribe to the new state changes, and then the later code is executed
    store.dispatch(addMovies(data))
  }

  render(){
    const {list} = this.props.store.getState();
    return (
      <div className="App">
        <Navbar />
        <div className="main">
          <div className="tabs">
            <div className="tab">Movies</div>
            <div className="tab">Favourite</div>
          </div>
          <div className="list">
            {list.map((movie, index) =>(
              <MovieCard movie={movie} key={`movie-${index}`}/>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
