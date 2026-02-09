/**
 * test scenario for threadReducer
 *
 * - threadReducers function
 *  - should return the initial state when give by unknow action
 *  - should return the threads when give by RECEIVE_THREADS action
 *  - should return the threads with the new thread when given by ADD_THREAD action
 *  - should return the threads with the toggle up vote thread when given by UPVOTE_THREAD action
 *  - should return the threads with the toggle down vote thread when given by DOWNVOTE_THREAD action
 */

import { describe, it, expect } from 'vitest';
import threadsReducer from './reducer';

describe('threadReducer function', () => {
  it('should return the initial state when give by unknow action', () => {
    // arrange
    const initialState = [];
    const action = { type: 'UNKNOW' };

    // action
    const nextState = threadsReducer(initialState, action);

    // assert
    expect(nextState).toEqual(initialState);
  });

  it('should return the threads when give by RECEIVE_THREADS action', () => {
    // arrange
    const initialState = [];
    const action = {
      type: 'RECEIVE_THREADS',
      payload: {
        threads: [
          {
            id: 'thread-1',
            title: 'Thread Pertama',
            body: 'Ini adalah thread pertama',
            category: 'General',
            createdAt: '2021-06-21T07:00:00.000Z',
            ownerId: 'users-1',
            upVotesBy: [],
            downVoteBy: [],
            totalComments: 0
          },
          {
            id: 'thread-2',
            title: 'Thread Kedua',
            body: 'Ini adalah thread Kedua',
            category: 'General',
            createdAt: '2021-06-21T07:00:00.000Z',
            ownerId: 'users-1',
            upVotesBy: [],
            downVoteBy: [],
            totalComments: 0
          }
        ]
      }
    };

    // action
    const nextState = threadsReducer(initialState, action);

    // assert
    expect(nextState).toEqual(action.payload.threads);
  });
  it('should return the threads with the new thread when given by ADD_THREAD action', () => {
    // arrange
    const initialState = [
      {
        id: 'thread-1',
        title: 'Thread Pertama',
        body: 'Ini adalah thread pertama',
        category: 'General',
        createdAt: '2021-06-21T07:00:00.000Z',
        ownerId: 'users-1',
        upVotesBy: [],
        downVoteBy: [],
        totalComments: 0
      },
    ];

    const action = {
      type: 'ADD_THREAD',
      payload: {
        thread: {
          id: 'thread-2',
          title: 'Thread Kedua',
          body: 'Ini adalah thread Kedua',
          category: 'General',
          createdAt: '2021-06-21T07:00:00.000Z',
          ownerId: 'users-1',
          upVotesBy: [],
          downVoteBy: [],
          totalComments: 0
        },
      }
    };

    // action
    const nextState = threadsReducer(initialState, action);

    // assert
    expect(nextState).toEqual([action.payload.thread, ...initialState]);
  });

  it('should return the threads with the toggle up vote thread when given by TOGGLE_UP_VOTE action', () => {
    // arrange
    const initialState = [
      {
        id: 'thread-1',
        title: 'Thread Pertama',
        body: 'Ini adalah thread pertama',
        category: 'General',
        createdAt: '2021-06-21T07:00:00.000Z',
        ownerId: 'users-1',
        upVotesBy: [],
        downVotesBy: [],
        totalComments: 0
      },
    ];

    const action = {
      type: 'UPVOTE_THREAD',
      payload: {
        threadId: 'thread-1',
        userId: 'user-1',
      },
    };

    // action: upvote
    const nextState = threadsReducer(initialState, action);

    // assert
    expect(nextState).toEqual([
      {
        ...initialState[0],
        upVotesBy: [action.payload.userId],
      }
    ]);

    // action: cancel upvote
    const nextState2 = threadsReducer(nextState, action);

    // assert
    expect(nextState2).toEqual(initialState);
  });

  it('should return the threads with the toggle down vote thread when given by TOGGLE_DOWN_VOTE action', () => {
  // arrange
    const initialState = [
      {
        id: 'thread-1',
        title: 'Thread Pertama',
        body: 'Ini adalah thread pertama',
        category: 'General',
        createdAt: '2021-06-21T07:00:00.000Z',
        ownerId: 'users-1',
        upVotesBy: [],
        downVotesBy: [],
        totalComments: 0
      },
    ];

    const action = {
      type: 'DOWNVOTE_THREAD',
      payload: {
        threadId: 'thread-1',
        userId: 'user-1',
      },
    };

    // action: downvote
    const nextState = threadsReducer(initialState, action);

    // assert
    expect(nextState).toEqual([
      {
        ...initialState[0],
        downVotesBy: [action.payload.userId],
      }
    ]);

    // action: cancel downvote
    const nextState2 = threadsReducer(nextState, action);

    // assert
    expect(nextState2).toEqual(initialState);
  });
});