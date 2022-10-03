import { compose , applyMiddleware} from 'redux';
import logger from 'redux-logger';

import { rootReducer } from './root-reducer';
import { configureStore } from '@reduxjs/toolkit';

//root reducer

const middleWares = [logger];

const composedEnhancers = compose(applyMiddleware(...middleWares))

export const store = configureStore({reducer:rootReducer,middleware:[logger]}, undefined, composedEnhancers)