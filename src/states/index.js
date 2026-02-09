import { configureStore } from '@reduxjs/toolkit';
import authUserReducer from './authUser/reducer';
import usersReducer from './users/reducer';
import threadsReducer from './threads/reducer';
import threadDetailReducer from './threadDetail/reducer';
import leaderboardsReducer from './leaderboards/reducer';
import isPreloadReducer from './isPreload/reducer';
import { loadingBarReducer } from '@dimasmds/react-redux-loading-bar';

const store = configureStore({
  reducer: {
    authUser: authUserReducer,
    threads: threadsReducer,
    users: usersReducer,
    loadingBar: loadingBarReducer,
    threadDetail: threadDetailReducer,
    leaderboards: leaderboardsReducer,
    isPreload: isPreloadReducer,
  },
});

export default store;
