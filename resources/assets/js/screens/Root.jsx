import React from 'react';
import { Route, Switch, Redirect, HashRouter } from 'react-router-dom';
import AuthParent from './Auth/Parent';
import Login from './Auth/Login';
import AppParent from './App/Parent';
import Home from './App/Home';
import Register from './Auth/Register';
import PrivateRoute from './routeRules/PrivateRoute';
import OnlyGuestRoute from './routeRules/OnlyGuestRoute';
import PasswordRecovery from './Auth/PasswordRecovery/PasswordRecovery';


const ScreensRoot = () => {
  return (
    <div>
      {mountRoutes()}
    </div>
  )
}

export default ScreensRoot;

const mountRoutes = () => (
  <HashRouter>
    <Switch>

      {/* /auth/... routes */}
      <Route path='/auth' render={({ match }) => (
        <OnlyGuestRoute>
          <AuthParent>
            <Switch>
              <Route path={`${match.url}/login`} component={Login} />
              <Route path={`${match.url}/register`} component={Register} />
              <Route path={`${match.url}/password/recovery`} component={PasswordRecovery} />
              {/* <Route path={`${match.url}/password/reset/:token`} component={PasswordReset} /> */}

              <Redirect from='*' to={`${match.url}/login`} />
            </Switch>
          </AuthParent>
        </OnlyGuestRoute>
      )} />


      {/* /app/... routes */}
      <Route path='/' render={({ match }) => (
        <PrivateRoute>
          <AppParent>
            <Switch>
              <Route path={`${match.url}/`} exact component={Home} />
              <Route component={Error}/>              
            </Switch>

          </AppParent>
        </PrivateRoute>
      )} />

    </Switch>
  </HashRouter>
);

const Error = () => {
  return (
    <div>
      Erro ai meu
    </div>
  )
}
