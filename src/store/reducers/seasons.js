import {
  GET_CHARACTER_IMG_START,
  GET_CHARACTER_IMG_SUCCESS, GET_SEASONS_START,
  GET_SEASONS_SUCCESS,
} from '../actions/action-types';

const initState = {
  seasons: [],
  seasonsLoading: false,
  characterImgSrc: '',
  loading: false,
}

export const seasonsReducer = (state = initState, action) => {
  switch (action.type) {
    case GET_SEASONS_START:
      return {...state, seasonsLoading: true}
    case GET_SEASONS_SUCCESS:
      return {...state, seasons: action.seasons, seasonsLoading: false};
    case GET_CHARACTER_IMG_START:
      return {...state, loading: true}
    case GET_CHARACTER_IMG_SUCCESS:
      return {...state, characterImgSrc: action.src, loading: false};
    default:
      return {...state}
  }
}
