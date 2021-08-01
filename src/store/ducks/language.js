export const Types = {
  SET_LANGUAGE: 'SET_LANGUAGE',
};

const initialState = {
  language: 'en_US',
};

export default function themes(state = initialState, action) {
  switch (action.type) {
    case Types.SET_LANGUAGE:
      const language = action.payload.language;
      return {language: language};
    default:
      return state;
  }
}

export function setLanguage(language) {
  return {
    type: Types.SET_LANGUAGE,
    payload: {
      language,
    },
  };
}