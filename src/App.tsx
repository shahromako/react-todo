import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';

import './App.scss';
import AppNavBar from './components/AppNavBar/AppNavBar';

const Todos = lazy(() => import('./layouts/Todos/Todos'));
const User = lazy(() => import('./layouts/User/User'));

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <AppNavBar />
        <Suspense fallback={'Loading...'}>
          <Switch>
            <Route exact path="/todos" component={Todos} />
            <Route exact path="/user/:id" component={User} />
            <Redirect to="/todos" />
          </Switch>
        </Suspense>
      </div>
    </BrowserRouter>
  );
}

export default App;
