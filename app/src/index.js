import React from 'react';
import ReactDOM from 'react-dom';
import {AppContainer} from 'react-hot-loader';

import 'theme/main.scss';
import Root from 'containers/root';

const appContainer = document.getElementById('app');

const renderApp = Component => {
  ReactDOM.render(
    <AppContainer
      container={Component}
    />,
    appContainer
  );
};

renderApp(Root);

if (module.hot) {
  module.hot.accept('./containers/root', () => { renderApp(Root); });
}
