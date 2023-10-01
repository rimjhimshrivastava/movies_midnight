// reducer functions should be pure functions
import { ADD_MOVIES, ADD_FAVOURITE, REMOVE_FAVOURITE,SHOW_FAVOURITES } from "../actions";

const initialMoviesState = {
    list: [],
    favourites: [],
    showFavourites: false,
}


export default function movies(state = initialMoviesState, action){

    switch (action.type){
        case ADD_MOVIES:
            return {
                ...state,
                list: action.movies
            }
        case ADD_FAVOURITE:
            return {
                ...state,
                favourites: [action.movie, ...state.favourites]
            }
        case REMOVE_FAVOURITE: 
        return {
            ...state,
            favourites: state.favourites.filter((movie)=>{
                return movie !== action.movie;
            })
        }
        case SHOW_FAVOURITES:
            return{
                ...state,
                showFavourites: action.val
            }
        default:
            return state;

    }
}
