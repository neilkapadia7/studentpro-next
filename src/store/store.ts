import { configureStore as createStore, combineReducers } from '@reduxjs/toolkit';


// middlewares
import createSagaMiddleware from 'redux-saga';

// Import custom components
import reducers from '../reducers';
import rootSaga from '../sagas';
// import thunk from 'redux-thunk';

const sagaMiddleware = createSagaMiddleware();
const initialState = {};

// let middlewares = [sagaMiddleware, thunk];

// add logger only in development
if (process.env.NODE_ENV === `development`) {
    const { logger } = require(`redux-logger`);
    // middlewares.push(logger);
}


const store = createStore({
    reducer: reducers,
    // middleware: middlewares,
    middleware: (gDM) => gDM().concat(sagaMiddleware),
    // middleware: (getDefaultMiddleware) => [...getDefaultMiddleware(), ...middlewares],
    preloadedState: initialState,
    devTools: process.env.NEXT_APP_ENVIRONMENT === `testing` || process.env.NEXT_APP_ENVIRONMENT !== `production`
});


sagaMiddleware.run(rootSaga);


// import { createStore, applyMiddleware } from 'redux';
// import thunk from 'redux-thunk';
// import { composeWithDevTools } from 'redux-devtools-extension';
// import rootReducer from './Reducers';

// const initialState = {};

// const middleware = [thunk];

// const store = createStore(
// 	rootReducer,
// 	initialState,
// 	composeWithDevTools(applyMiddleware(...middleware))
// );

// export default store;


export default store ;

// Type for using useSelector hook
const rootReducer = combineReducers({})
export type RootState = ReturnType<typeof rootReducer>