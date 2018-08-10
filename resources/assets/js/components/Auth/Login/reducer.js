import * as constants from './action-types';

const initialState = {
  email: '',
  password: '',
  remember: false,
  errors: [],
  isLoading: false
};

export default (state = initialState, action) => {
  const {
    SET_EMAIL,
    SET_PASSWORD,
    SET_REMEMBER,
    CLEAR_INPUTS,
    SET_ERRORS,
    SET_LOADING,
  } = constants;

  switch (action.type) {
    case SET_EMAIL:
      return { ...state, email: action.payload };

    case SET_PASSWORD:
      return { ...state, password: action.payload };

    case SET_REMEMBER:
      return { ...state, remember: !state.remember };

    case CLEAR_INPUTS:
      return { ...state, ...initialState }

    case SET_ERRORS:
      return { ...state, errors: action.payload }

    case SET_LOADING:
      return { ...state, isLoading: action.payload}
    default:
      return state;
  }
}