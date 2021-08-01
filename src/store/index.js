import language from './ducks/language';
import {createStore, combineReducers} from 'redux';

const reducers = combineReducers({
  language,
});

export const Store = createStore(reducers);