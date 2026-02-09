// states/threadDetail/action.js
import { hideLoading, showLoading } from '@dimasmds/react-redux-loading-bar';
import api from '../../utils/api';

const ActionType = {
  RECEIVE_THREAD_DETAIL: 'RECEIVE_THREAD_DETAIL',
  CLEAR_THREAD_DETAIL: 'CLEAR_THREAD_DETAIL',
  TOGGLE_UPVOTE_THREAD_DETAIL: 'TOGGLE_UPVOTE_THREAD_DETAIL',
  TOGGLE_DOWNVOTE_THREAD_DETAIL: 'TOGGLE_DOWNVOTE_THREAD_DETAIL',
  TOGGLE_NEUTRAL_VOTE_THREAD_DETAIL: 'TOGGLE_NEUTRAL_VOTE_THREAD_DETAIL',
  ADD_COMMENT_THREAD_DETAIL: 'ADD_COMMENT_THREAD_DETAIL',
  TOGGLE_UPVOTE_COMMENT: 'TOGGLE_UPVOTE_COMMENT',
  TOGGLE_DOWNVOTE_COMMENT: 'TOGGLE_DOWNVOTE_COMMENT',
  TOGGLE_NEUTRAL_VOTE_COMMENT: 'TOGGLE_NEUTRAL_VOTE_COMMENT',
};

function receiveThreadDetailActionCreator(threadDetail) {
  return {
    type: ActionType.RECEIVE_THREAD_DETAIL,
    payload: {
      threadDetail,
    },
  };
}

function clearThreadDetailActionCreator() {
  return {
    type: ActionType.CLEAR_THREAD_DETAIL,
  };
}

function toggleUpvoteThreadDetailActionCreator({ userId }) {
  return {
    type: ActionType.TOGGLE_UPVOTE_THREAD_DETAIL,
    payload: {
      userId,
    },
  };
}

function toggleDownvoteThreadDetailActionCreator({ userId }) {
  return {
    type: ActionType.TOGGLE_DOWNVOTE_THREAD_DETAIL,
    payload: {
      userId,
    },
  };
}

function toggleNeutralVoteThreadDetailActionCreator({ userId }) {
  return {
    type: ActionType.TOGGLE_NEUTRAL_VOTE_THREAD_DETAIL,
    payload: {
      userId,
    },
  };
}

function addCommentThreadDetailActionCreator(comment) {
  return {
    type: ActionType.ADD_COMMENT_THREAD_DETAIL,
    payload: {
      comment,
    },
  };
}

function toggleUpvoteCommentActionCreator({ threadId, commentId, userId }) {
  return {
    type: ActionType.TOGGLE_UPVOTE_COMMENT,
    payload: {
      threadId,
      commentId,
      userId,
    },
  };
}

function toggleDownvoteCommentActionCreator({ threadId, commentId, userId }) {
  return {
    type: ActionType.TOGGLE_DOWNVOTE_COMMENT,
    payload: {
      threadId,
      commentId,
      userId,
    },
  };
}

function toggleNeutralVoteCommentActionCreator({ threadId, commentId, userId }) {
  return {
    type: ActionType.TOGGLE_NEUTRAL_VOTE_COMMENT,
    payload: {
      threadId,
      commentId,
      userId,
    },
  };
}

function asyncReceiveThreadDetail(threadId) {
  return async (dispatch) => {
    dispatch(showLoading());
    dispatch(clearThreadDetailActionCreator());
    try {
      const threadDetail = await api.getThreadDetail(threadId);
      dispatch(receiveThreadDetailActionCreator(threadDetail));
    } catch (error) {
      alert(error.message);
    }
    dispatch(hideLoading());
  };
}

function asyncToggleUpvoteThreadDetail() {
  return async (dispatch, getState) => {
    dispatch(showLoading());
    const { authUser, threadDetail } = getState();
    if (!authUser || !threadDetail) {
      dispatch(hideLoading());
      return;
    }

    // optimistic update
    dispatch(toggleUpvoteThreadDetailActionCreator({ userId: authUser.id }));

    try {
      await api.upvoteThread(threadDetail.id);
      // success: server state assumed consistent
    } catch (error) {
      // on error: reload official detail from server to revert optimistic change
      alert(error.message);
      try {
        const fresh = await api.getThreadDetail(threadDetail.id);
        dispatch(receiveThreadDetailActionCreator(fresh));
      } catch (err) {
        // last resort: clear or notify
        alert(err.message);
      }
    } finally {
      dispatch(hideLoading());
    }
  };
}

function asyncToggleDownvoteThreadDetail() {
  return async (dispatch, getState) => {
    dispatch(showLoading());
    const { authUser, threadDetail } = getState();
    if (!authUser || !threadDetail) {
      dispatch(hideLoading());
      return;
    }

    dispatch(toggleDownvoteThreadDetailActionCreator({ userId: authUser.id }));

    try {
      await api.downvoteThread(threadDetail.id);
    } catch (error) {
      alert(error.message);
      try {
        const fresh = await api.getThreadDetail(threadDetail.id);
        dispatch(receiveThreadDetailActionCreator(fresh));
      } catch (err) {
        alert(err.message);
      }
    } finally {
      dispatch(hideLoading());
    }
  };
}

function asyncToggleNeutralVoteThreadDetail() {
  return async (dispatch, getState) => {
    dispatch(showLoading());
    const { authUser, threadDetail } = getState();
    if (!authUser || !threadDetail) {
      dispatch(hideLoading());
      return;
    }

    dispatch(toggleNeutralVoteThreadDetailActionCreator({ userId: authUser.id }));

    try {
      await api.neutralizeVoteThread(threadDetail.id);
    } catch (error) {
      alert(error.message);
      try {
        const fresh = await api.getThreadDetail(threadDetail.id);
        dispatch(receiveThreadDetailActionCreator(fresh));
      } catch (err) {
        alert(err.message);
      }
    } finally {
      dispatch(hideLoading());
    }
  };
}

function asyncAddCommentThreadDetail(threadId, content) {
  return async (dispatch, getState) => {
    dispatch(showLoading());
    const { authUser } = getState();
    if (!authUser) {
      dispatch(hideLoading());
      return;
    }

    try {
      const comment = await api.postComment(threadId, content);
      dispatch(addCommentThreadDetailActionCreator(comment));
    } catch (error) {
      alert(error.message);
    } finally {
      dispatch(hideLoading());
    }
  };
}

function asyncToggleUpvoteComment(threadId, commentId) {
  console.log('action upvote comment');
  return async (dispatch, getState) => {
    dispatch(showLoading());
    const { authUser } = getState();
    if (!authUser) {
      dispatch(hideLoading());
      return;
    }

    dispatch(toggleUpvoteCommentActionCreator({ threadId, commentId, userId: authUser.id }));

    try {
      await api.upvoteComment(threadId, commentId);
    } catch (error) {
      alert(error.message);
    } finally {
      dispatch(hideLoading());
    }
  };
}

function asyncToggleDownvoteComment(threadId, commentId) {
  return async (dispatch, getState) => {
    dispatch(showLoading());
    const { authUser } = getState();
    if (!authUser) {
      dispatch(hideLoading());
      return;
    }

    dispatch(toggleDownvoteCommentActionCreator({ threadId, commentId, userId: authUser.id }));
    try {
      await api.downvoteComment(threadId, commentId);
    } catch (error) {
      alert(error.message);
    } finally {
      dispatch(hideLoading());
    }
  };
}

function asyncToggleNeutralVoteComment(threadId, commentId) {
  return async (dispatch, getState) => {
    dispatch(showLoading());
    const { authUser } = getState();
    if (!authUser) {
      dispatch(hideLoading());
      return;
    }

    dispatch(toggleNeutralVoteCommentActionCreator({ threadId, commentId, userId: authUser.id }));
    try {
      await api.neutralizeVoteComment(threadId, commentId);
    } catch (error) {
      alert(error.message);
    } finally {
      dispatch(hideLoading());
    }
  };
}

export {
  ActionType,
  receiveThreadDetailActionCreator,
  clearThreadDetailActionCreator,
  toggleUpvoteThreadDetailActionCreator,
  toggleDownvoteThreadDetailActionCreator,
  toggleNeutralVoteThreadDetailActionCreator,
  asyncReceiveThreadDetail,
  asyncToggleUpvoteThreadDetail,
  asyncToggleDownvoteThreadDetail,
  asyncToggleNeutralVoteThreadDetail,
  asyncAddCommentThreadDetail,
  asyncToggleUpvoteComment,
  asyncToggleDownvoteComment,
  asyncToggleNeutralVoteComment,
};
