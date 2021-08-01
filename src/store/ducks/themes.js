export const Types = {
  SET_THEME: 'SET_THEME',
};

const initialState = {
  firstColor: '#fff',
  secondColor: '#000',
};

export default function themes(state = initialState, action) {
  switch (action.type) {
    case Types.SET_THEME:
      const fstColor = action.payload.firstColor;
      const sndColor = action.payload.secondColor;
      return {firstColor: fstColor, secondColor: sndColor};
    default:
      return state;
  }
}

export function set_theme(firstColor, secondColor) {
  return {
    type: Types.SET_THEME,
    payload: {
      firstColor,
      secondColor,
    },
  };
}