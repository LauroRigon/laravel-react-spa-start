import { userLoggedOut } from '../../../actions/user/user';

export function doLogout() {
  return dispatch => {
    //ajax call... to logout
    dispatch(userLoggedOut());  
  };
}