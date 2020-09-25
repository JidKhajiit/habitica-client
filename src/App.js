import React from 'react';
import SignIn from './components/SignIn/SignIn';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import SignUp from './components/SignUp/SignUp';
import { Provider } from 'react-redux';
import { store } from './store/configureStore';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route path='/signin' component={SignIn} />
          <Route path='/signup' component={SignUp} />
          <Redirect to="signin" />
        </Switch>
      </Router>
    </Provider>

  );
}

export default App;
