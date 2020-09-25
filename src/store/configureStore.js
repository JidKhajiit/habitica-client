import { createStore, applyMiddleware, compose } from 'redux';
import { rootReducer } from '../reducers/rootReducer';
import createSagaMiddleware from 'redux-saga';
// import rootSaga from '../sagas/index';

const sagaMiddleware = createSagaMiddleware();

export const store = createStore(rootReducer, compose(
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    // applyMiddleware(sagaMiddleware)
    ));

// sagaMiddleware.run(rootSaga);
