import { ActionType } from './action';

function threadsReducer(threads = [], action = {}) {
  switch (action.type) {
  case ActionType.RECEIVE_THREADS:
    return action.payload.threads;
  case ActionType.ADD_THREAD:
    return [action.payload.thread, ...threads];
  case ActionType.UPVOTE_THREAD: {
    const { threadId, userId } = action.payload;
    return threads.map((thread) => {
      if (thread.id !== threadId) return thread;

      const hasUpvoted = thread.upVotesBy.includes(userId);

      return {
        ...thread,
        upVotesBy: hasUpvoted
          ? thread.upVotesBy.filter((id) => id !== userId)
          : [...thread.upVotesBy, userId],
        downVotesBy: thread.downVotesBy.filter((id) => id !== userId),
      };
    });
  }
  case ActionType.DOWNVOTE_THREAD: {
    const { threadId, userId } = action.payload;

    return threads.map((thread) => {
      if (thread.id !== threadId) return thread;

      const hasDownvoted = thread.downVotesBy.includes(userId);

      return {
        ...thread,
        downVotesBy: hasDownvoted
          ? thread.downVotesBy.filter((id) => id !== userId)
          : [...thread.downVotesBy, userId],
        upVotesBy: thread.upVotesBy.filter((id) => id !== userId),
      };
    });
  }
  case ActionType.NEUTRAL_VOTE_THREAD: {
    const { threadId, userId } = action.payload;

    return threads.map((thread) => {
      if (thread.id !== threadId) return thread;

      return {
        ...thread,
        upVotesBy: thread.upVotesBy.filter((id) => id !== userId),
        downVotesBy: thread.downVotesBy.filter((id) => id !== userId),
      };
    });
  }
  default:
    return threads;
  }
}

export default threadsReducer;
