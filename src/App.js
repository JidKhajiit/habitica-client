import React from 'react';
import SignIn from './components/SignIn/SignIn';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import SignUp from './components/SignUp/SignUp';
import { Provider } from 'react-redux';
import { store } from './redux/store/configureStore';
import { PrivateRoute } from './components/PrivateRoute';
import Private from './components/Private/Private';
import taskBoards from './components/taskBoards/taskBoards';
import Header from './components/Header/Header';

function App() {
  return (
    <Provider store={store}>
      <Router>
        
        <Route path='/' component={Header} />
        <Switch>
          <Route exact path='/signin' component={SignIn} />
          <Route exact path='/signup' component={SignUp} />
          <PrivateRoute path='/private' component={Private} />
          <PrivateRoute path='/task-boards' component={taskBoards} />
          <Redirect to="/private" />
        </Switch>
      </Router>
    </Provider>

  );
}

export default App;
