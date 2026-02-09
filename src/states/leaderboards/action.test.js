/**
 * scenario test
 *
 *  - should dispatch action correctly when data fetching success
 *  - should dispatch action and call correctly when data fetching failed
 */
import { describe, beforeEach, afterEach, it, vi, expect } from 'vitest';
import api from '../../utils/api';
import { asyncReceiveLeaderboard, receiveLeaderboardsActionCreator } from './action';
import { hideLoading, showLoading } from '@dimasmds/react-redux-loading-bar';

const fakeLeaderboardResponse = {
  leaderboards: [
    {
      user: {
        id: 'users-1',
        name: 'John Doe',
        email: 'john@example.com',
        avatar: 'https://generated-image-url.jpg'
      },
      score: 10
    },
    {
      user: {
        id: 'users-2',
        name: 'Jane Doe',
        email: 'jane@example.com',
        avatar: 'https://generated-image-url.jpg'
      },
      score: 5
    }
  ]
};

const fakeErrorResponse = new Error('Ups, something went wrong');

describe('asyncReceiveLeaderboard thunk', () => {
  beforeEach(() => {
    api._getLeaderboards = api.getLeaderboards;
  });

  afterEach(() => {
    api.getLeaderboards = api._getLeaderboards;

    delete api._getLeaderboards;
  });

  it('should dispatch action correctly when data fetching success', async () => {
    // arrange
    // stub implementasi
    api.getLeaderboards = () => Promise.resolve(fakeLeaderboardResponse);
    // mock dispatch
    const dispatch = vi.fn();

    // action
    await asyncReceiveLeaderboard()(dispatch);

    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(receiveLeaderboardsActionCreator(fakeLeaderboardResponse));
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it('should dispatch action and call correctly when data fetching failed', async () => {
    // arrange
    // stub implementasi
    api.getLeaderboards = () => Promise.reject(fakeErrorResponse);
    // mock dispatch
    const dispatch = vi.fn();
    // mock alert
    window.alert = vi.fn();

    // action
    await asyncReceiveLeaderboard()(dispatch);

    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
    expect(window.alert).toHaveBeenCalledWith(fakeErrorResponse.message);
  });
});