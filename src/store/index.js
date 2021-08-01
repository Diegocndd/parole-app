import themes from './ducks/themes';
import {createStore, combineReducers} from 'redux';

const reducers = combineReducers({
  themes,
});

export const Store = createStore(reducers);