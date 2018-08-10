import * as constants from './action-types';
import { userLoggedIn } from '../../../actions/user/user';

const {
  SET_EMAIL,
  SET_PASSWORD,
  SET_REMEMBER,
  CLEAR_INPUTS,
  SET_ERRORS,
  SET_LOADING,
} = constants;

export function setEmail(value) {
  return {
    type: SET_EMAIL,
    payload: value,
  };
}

export function setPassword(value) {
  return {
    type: SET_PASSWORD,
    payload: value
  };
}

export function setRemember() {
  return {
    type: SET_REMEMBER,
  };
}

export function clearInputs() {
  return {
    type: CLEAR_INPUTS,
  };
}

export function setErrors(errors) {
  return {
    type: SET_ERRORS,
    payload: errors
  };
}

export function setLoading(value) {
  return {
    type: SET_LOADING,
    payload: value
  };
}

export function submitLogin() {
  const fakeUserResponse = {
    account: {
      id: 13,
      name: 'Lauro Rigon',
      email: 'laurorigon@gmail.com'
    },
    authToken: 'asjk5w5aewy5g759a0bnvg9vng7598.79g85w7nb98v5na7589ga7598aw75834957bgv8ag.b7v589a475gv489a579875a'
  };

  return dispatch => {
    dispatch(setLoading(true));

    setTimeout(() => {
      dispatch(setLoading(false));
      dispatch(userLoggedIn(fakeUserResponse));
    }, 4000);
  };
}