import api from './services/api';
import {Store} from '../store';

export const getWordInfos = word => {
  const language = Store.getState().language.language;
  return api.get(language + '/' + word);
};
