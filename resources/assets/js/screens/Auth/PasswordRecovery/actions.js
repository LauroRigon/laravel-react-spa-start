import * as actions from './action-types';
import axios from 'axios';
import toastr from 'toastr';

export function moveForward() {
  return {
    type: actions.STEP_MOVE_FORWARD
  }
}

export function moveBackward() {
  return {
    type: actions.STEP_MOVE_BACKWARD
  }
}

export function setEmail(value) {
  return {
    type: actions.SET_EMAIL,
    payload: value
  }
}

export function setLoading(value) {
  return {
    type: actions.SET_LOADING,
    payload: value
  }
}

export function submitRecoveryRequest(payload) {
  return dispatch => {
    dispatch(setLoading(true))
    axios.post('/api/password/recover', payload)
      .then(response => {
        dispatch(moveForward())
        dispatch(setLoading(false))
      })
      .catch(({ response }) => {
        dispatch(setLoading(false))
        let msg = (response.data.errors) ? response.data.errors.email[0] : response.data.error;
        toastr.error(msg, 'Ocorreu um erro!', { timeOut: 4000 });

      })

  }
}

export function setToken(value) {
  return {
    type: actions.SET_TOKEN,
    payload: value.toUpperCase()
  }
}

export function setPassword(value) {
  return {
    type: actions.SET_PASSWORD,
    payload: value
  }
}

export function setPasswordConfirm(value) {
  return {
    type: actions.SET_PASSWORD_CONFIRM,
    payload: value
  }
}