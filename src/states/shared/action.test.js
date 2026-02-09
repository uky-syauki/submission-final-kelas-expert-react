/**
 * skenario test
 *
 * - asyncPopulateData thunk
 *  - should dispatch action correctly when data fetching success
 *  - should dispatch action and call correctly when data fetching failed
 */

import { describe, beforeEach, afterEach, it, vi, expect } from 'vitest';
import api from '../../utils/api';
import { asyncPopulateData } from './action';
import { receiveThreadsActionCreator } from '../threads/action';
import { receiveUsersActionCreator } from '../users/action';
import { hideLoading, showLoading } from '@dimasmds/react-redux-loading-bar';

const fakeThreadResponse = [
  {
    'id': 'thread-1',
    'title': 'Thread Pertama',
    'body': 'Ini adalah thread pertama',
    'category': 'General',
    'createdAt': '2021-06-21T07:00:00.000Z',
    'ownerId': 'users-1',
    'upVotesBy': [],
    'downVotesBy': [],
    'totalComments': 0
  },
];

const fakeUserResponse = [
  {
    'id': 'john_doe',
    'name': 'John Doe',
    'email': 'john@example.com',
    'avatar': 'https://generated-image-url.jpg'
  },
];

const fakeErrorResponse = new Error('Ups, something went wrong');

describe('asyncPopulateData thunk', () => {
  beforeEach(() => {
    api._getAllUsers = api.getAllUsers;
    api._getAllThreads = api.getAllThreads;
  });

  afterEach(() => {
    api.getAllUsers = api._getAllUsers;
    api.getAllThreads = api._getAllThreads;

    // delete backup data
    delete api._getAllThreads;
    delete api._getAllUsers;
  });

  it('should dispatch action correctly when data fetching success', async () => {
    // arrange
    // stub implementasi
    api.getAllUsers = () => Promise.resolve(fakeUserResponse);
    api.getAllThreads = () => Promise.resolve(fakeThreadResponse);
    // mock dispatch
    const dispatch = vi.fn();

    // action
    await asyncPopulateData()(dispatch);

    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(receiveThreadsActionCreator(fakeThreadResponse));
    expect(dispatch).toHaveBeenCalledWith(receiveUsersActionCreator(fakeUserResponse));
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it('should dispatch action and call alert correctly when data fetching failed', async () => {
    // arrange
    // stub implementasi
    api.getAllThreads = () => Promise.reject(fakeErrorResponse);
    api.getAllUsers = () => Promise.reject(fakeErrorResponse);
    // mock dispatch
    const dispatch = vi.fn();
    // alert
    window.alert = vi.fn();

    // action
    await asyncPopulateData()(dispatch);

    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
    expect(window.alert).toHaveBeenCalledWith(fakeErrorResponse.message);
  });
});