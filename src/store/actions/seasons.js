import axios from '../../axios/axios';
import {
  GET_CHARACTER_IMG_START,
  GET_CHARACTER_IMG_SUCCESS,
  GET_SEASONS_SUCCESS,
  GET_SEASONS_START,
} from './action-types';

export function getSeasons(episode, isLoading) {
  return async (dispatch, getState) => {
    if (isLoading) {
      dispatch(getSeasonsStart());
    }

    try {
      const response = await axios.get(`/episodes/${episode}`);
      const data = response.data;
      const currentSeason = `Season_${data[0]?.season}`;
      const currentState = [...getState().seasons.seasons];

      if (episode < 63) {
        if (!currentState.find((item) => item.season.trim() === data[0]?.season.trim())) {
          currentState.push({
            season: data[0].season,
            list: [
              {
                characters: data[0]?.characters,
                title: data[0]?.title,
                episode: data[0]?.episode,
              }
            ]
          })
        } else {
          const index = currentState.findIndex((item) => item.season.trim() === data[0].season.trim());
          currentState[index].list.push({
            characters: data[0]?.characters,
            title: data[0]?.title,
            episode: data[0]?.episode,
          })
        }
      } else {
        if (!currentState.find((item) => item.season === +data[0]?.season.trim() + 5)) {
          currentState.push({
            season: +data[0].season + 5,
            list: [
              {
                characters: data[0]?.characters,
                title: data[0]?.title,
                episode: data[0]?.episode,
              }
            ]
          })
        } else {
          const index = currentState.findIndex((item) => item.season === +data[0].season.trim() + 5);
          currentState[index].list.push({
            characters: data[0]?.characters,
            title: data[0]?.title,
            episode: data[0]?.episode,
          })
        }
      }

      currentState.forEach((item) => item.list.sort((a, b) => a.episode - b.episode));
      dispatch(getSeasonsSuccess(currentState));
    } catch (e) {
      console.log(e);
    }
  }
}

export function getSeasonsStart() {
  return {
    type: GET_SEASONS_START,
  }
}

export function getSeasonsSuccess(seasons) {
  return {
    type: GET_SEASONS_SUCCESS,
    seasons,
  }
}

export function getCharacterImg(character) {
  return async (dispatch) => {
    dispatch(getCharacterImgStart());

    try {
      const response = await axios.get(`/characters?name=${character}`);

      dispatch(getCharacterImgSuccess(response.data[0].img));
    } catch (e) {
      console.log(e);
    }
  }
}

export function getCharacterImgStart() {
  return {
    type: GET_CHARACTER_IMG_START,
  }
}

export function getCharacterImgSuccess(src) {
  return {
    type: GET_CHARACTER_IMG_SUCCESS,
    src,
  }
}
