/*!

=========================================================
* Material Dashboard React - v1.8.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/material-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import ReactDOM from "react-dom";
import { Socket } from 'react-socket-io';
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import storeDefault from 'store/store';
import thunk from 'redux-thunk';

import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles';

import indigo from '@material-ui/core/colors/indigo';
import lightGreen from '@material-ui/core/colors/lightGreen';


import counterReducer from './store/reducers/counter';
import resultReducer from './store/reducers/result';

// core components
import Admin from "layouts/Admin.js";
import Root from "layouts/Root.js";

import registerServiceWorker from './registerServiceWorker';


import "assets/css/material-dashboard-react.css?v=1.8.0";

const uri = '/';
const options = { transports: ['websocket'] };


const hist = createBrowserHistory();

const rootReducer = combineReducers({
    ctr: counterReducer,
    res: resultReducer
});


const theme = createMuiTheme({
  palette: {
    primary: { main: indigo[700] }, // Purple and green play nicely together.
    secondary: { main: lightGreen[500] }, // This is just green.A700 as hex.
  },
});

const logger = store => {
    return next => {
        return action => {
          //  console.log('[Middleware] Dispatching', action);
            const result = next(action);
          //  console.log('[Middleware] next state', store.getState());
            return result;
        }
    }
};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(logger, thunk)));

ReactDOM.render(
  <Provider store={store}>
  <Router history={hist}>
   <ThemeProvider theme={theme}>
   <Socket uri={uri} options={options}>
    <Switch>
      <Route path="/admin" component={Admin} />
      <Route from="/" component={Root}  />
    </Switch>
    </Socket>
    </ThemeProvider>
  </Router>
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();
