import * as actions from '../../actions/user/action-types';

const initialState = {
  account: {
    id: null,
    name: '',
    email: '',
  },
  authToken: '',
  isLogged: false,
}

const userLogged = JSON.parse(localStorage.getItem('session'));

const startingData = userLogged != null ? {...userLogged, isLogged: true} : initialState;

console.log('Starting: ',startingData)
console.log('Initial: ',initialState)
export default (state =  startingData, action) => {

  switch (action.type) {
    case actions.USER_LOGGED_IN:
      return {
        ...state,
        account: action.payload.account,
        authToken: action.payload.authToken,
        isLogged: true
      };

    case actions.USER_LOGGED_OUT:
      return initialState;

    default:
      return state;
      break;
  }
}

