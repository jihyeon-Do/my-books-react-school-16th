import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';

// pages
import Home from './pages/Home';
import Signin from './pages/Signin';
import NotFound from './pages/NotFound';
import FatalError from './pages/FatalError';

export default function App() {
  return (
    <ErrorBoundary FallbackComponent={FatalError}>
      <BrowserRouter>
        <Switch>
          <Route path="/signin" component={Signin} />
          <Route path="/" exact component={Home} />
          <Route component={NotFound} />
        </Switch>
      </BrowserRouter>
    </ErrorBoundary>
  );
}
