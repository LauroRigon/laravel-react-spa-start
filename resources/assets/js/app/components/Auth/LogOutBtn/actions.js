import { userLoggedOut } from '../../../actions/user';

export function doLogout() {
  return dispatch => {
    //ajax call... to logout
    dispatch(userLoggedOut());  
  };
}