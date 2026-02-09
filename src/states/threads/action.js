import { hideLoading, showLoading } from '@dimasmds/react-redux-loading-bar';
import api from '../../utils/api';

const ActionType = {
  RECEIVE_THREADS: 'RECEIVE_THREADS',
  ADD_THREAD: 'ADD_THREAD',
  UPVOTE_THREAD: 'UPVOTE_THREAD',
  DOWNVOTE_THREAD: 'DOWNVOTE_THREAD',
  NEUTRAL_VOTE_THREAD: 'NEUTRAL_VOTE_THREAD',
};

function receiveThreadsActionCreator(threads) {
  return {
    type: ActionType.RECEIVE_THREADS,
    payload: {
      threads,
    },
  };
}

function addThreadActionCreator(thread) {
  return {
    type: ActionType.ADD_THREAD,
    payload: {
      thread,
    },
  };
}

function upvoteThreadActionCreator(threadId, userId) {
  return {
    type: ActionType.UPVOTE_THREAD,
    payload: {
      threadId,
      userId,
    },
  };
}

function downvoteThreadActionCreator(threadId, userId) {
  return {
    type: ActionType.DOWNVOTE_THREAD,
    payload: {
      threadId,
      userId,
    },
  };
}

function neutralVoteThreadActionCreator(threadId, userId) {
  return {
    type: ActionType.NEUTRAL_VOTE_THREAD,
    payload: {
      threadId,
      userId,
    },
  };
}

function asyncToggleUpvoteThread(threadId) {
  return async (dispatch, getState) => {
    const { authUser } = getState();
    dispatch(showLoading());
    try {
      await api.upvoteThread(threadId);
      dispatch(upvoteThreadActionCreator(threadId, authUser.id));
    } catch (error) {
      alert(error.message);
    }
    dispatch(hideLoading());
  };
}

function asyncToggleDownvoteThread(threadId) {
  return async (dispatch, getState) => {
    const { authUser } = getState();
    dispatch(showLoading());
    try {
      await api.downvoteThread(threadId);
      dispatch(downvoteThreadActionCreator(threadId, authUser.id));
    } catch (error) {
      alert(error.message);
    }
    dispatch(hideLoading());
  };
}

function asyncAddThread({ title, category, body }) {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const thread = await api.createThread({ title, category, body });
      dispatch(addThreadActionCreator(thread));
    } catch (error) {
      alert(error.message);
    }
    dispatch(hideLoading());
  };
}

function asyncReceiveThreads() {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const threads = await api.getAllThreads();
      dispatch(receiveThreadsActionCreator(threads));
    } catch (error) {
      alert(error.message);
    }
    dispatch(hideLoading());
  };
}

function asyncToggleNeutralVoteThread(threadId) {
  return async (dispatch, getState) => {
    const { authUser } = getState();
    dispatch(showLoading());
    try {
      await api.neutralizeVoteThread(threadId);
      dispatch(neutralVoteThreadActionCreator(threadId, authUser.id));
    } catch (error) {
      alert(error.message);
    }
    dispatch(hideLoading());
  };
}

export {
  ActionType,
  addThreadActionCreator,
  receiveThreadsActionCreator,
  upvoteThreadActionCreator,
  downvoteThreadActionCreator,
  neutralVoteThreadActionCreator,
  asyncAddThread,
  asyncReceiveThreads,
  asyncToggleUpvoteThread,
  asyncToggleDownvoteThread,
  asyncToggleNeutralVoteThread,
};