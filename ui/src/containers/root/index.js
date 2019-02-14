import './root.scss';
import Login from 'containers/identity/login';
import PropTypes from 'prop-types';
import React from 'react';
import RoutePaths from 'constants/route_paths.js';
import {BrowserRouter, Redirect, Route, Switch} from 'react-router-dom';
import {Provider} from 'react-redux';

const Routes = () =>
  <Switch>
    <Route
      path={RoutePaths.IDENTITY.LOGIN}
      component={Login} />
    <Route
      path={RoutePaths.HOME}
      render={() => <h1>You did it!</h1>} />
    <Route render={() => <Redirect to={RoutePaths.IDENTITY.LOGIN} />} />
  </Switch>;

const Root = ({store}) =>
  <Provider store={store}>
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
  </Provider>;

Root.propTypes = {
  store: PropTypes.object.isRequired
};

export default Root;
