import { combineReducers } from 'redux';

import { seasonsReducer } from './seasons';

const rootReducer = combineReducers({
  seasons: seasonsReducer,
});

export default rootReducer;
