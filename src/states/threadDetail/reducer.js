// states/threadDetail/reducer.js
import { ActionType } from './action';

function threadDetailReducer(threadDetail = null, action = {}) {
  switch (action.type) {
  case ActionType.RECEIVE_THREAD_DETAIL:
    return action.payload.threadDetail;

  case ActionType.CLEAR_THREAD_DETAIL:
    return null;

  case ActionType.TOGGLE_UPVOTE_THREAD_DETAIL: {
    const { userId } = action.payload;
    const isUpvoted = threadDetail.upVotesBy.includes(userId);

    return {
      ...threadDetail,
      upVotesBy: isUpvoted
        ? threadDetail.upVotesBy.filter((id) => id !== userId)
        : [...threadDetail.upVotesBy, userId],
      // selalu hapus downvote jika ada
      downVotesBy: threadDetail.downVotesBy.filter((id) => id !== userId),
    };
  }

  case ActionType.TOGGLE_DOWNVOTE_THREAD_DETAIL: {
    const { userId } = action.payload;
    const isDownvoted = threadDetail.downVotesBy.includes(userId);

    return {
      ...threadDetail,
      downVotesBy: isDownvoted
        ? threadDetail.downVotesBy.filter((id) => id !== userId)
        : [...threadDetail.downVotesBy, userId],
      // selalu hapus upvote jika ada
      upVotesBy: threadDetail.upVotesBy.filter((id) => id !== userId),
    };
  }

  case ActionType.TOGGLE_NEUTRAL_VOTE_THREAD_DETAIL: {
    const { userId } = action.payload;

    return {
      ...threadDetail,
      upVotesBy: threadDetail.upVotesBy.filter((id) => id !== userId),
      downVotesBy: threadDetail.downVotesBy.filter((id) => id !== userId),
    };
  }
  case ActionType.ADD_COMMENT_THREAD_DETAIL: {
    const { comment } = action.payload;

    return {
      ...threadDetail,
      comments: [...threadDetail.comments, comment],
    };
  }
  case ActionType.TOGGLE_UPVOTE_COMMENT: {
    const { commentId, userId } = action.payload;
    return {
      ...threadDetail,
      comments: threadDetail.comments.map((comment) => {
        if (comment.id === commentId) {
          const isUpvoted = comment.upVotesBy.includes(userId);
          return {
            ...comment,
            upVotesBy: isUpvoted
              ? comment.upVotesBy.filter((id) => id !== userId)
              : [...comment.upVotesBy, userId],
            downVotesBy: comment.downVotesBy.filter((id) => id !== userId),
          };
        }
        return comment;
      }),
    };
  }
  case ActionType.TOGGLE_DOWNVOTE_COMMENT: {
    const { commentId, userId } = action.payload;
    return {
      ...threadDetail,
      comments: threadDetail.comments.map((comment) => {
        if (comment.id === commentId) {
          const isDownvoted = comment.downVotesBy.includes(userId);
          return {
            ...comment,
            downVotesBy: isDownvoted
              ? comment.downVotesBy.filter((id) => id !== userId)
              : [...comment.downVotesBy, userId],
            upVotesBy: comment.upVotesBy.filter((id) => id !== userId),
          };
        }
        return comment;
      }),
    };
  }
  case ActionType.TOGGLE_NEUTRAL_VOTE_COMMENT: {
    const { commentId, userId } = action.payload;
    return {
      ...threadDetail,
      comments: threadDetail.comments.map((comment) => {
        if (comment.id === commentId) {
          return {
            ...comment,
            upVotesBy: comment.upVotesBy.filter((id) => id !== userId),
            downVotesBy: comment.downVotesBy.filter((id) => id !== userId),
          };
        }
        return comment;
      }),
    };
  }
  default:
    return threadDetail;
  }
}

export default threadDetailReducer;
