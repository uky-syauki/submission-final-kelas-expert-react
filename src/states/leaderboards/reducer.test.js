/**
 * test scenario for leaderboaedReducer
 *
 * - leaderboardReducer fungsion
 *  - should return the inisial state when give by unknow action
 *  - should return the leaderboard when given by RECEIVE_LEADERBOARDS action
 */
import { describe, it, expect } from 'vitest';
import leaderboardsReducer from './reducer';

describe('leaderboardReducer function', () => {
  it('should return the inisial state when give by unknow action', () => {
    // arrange
    const initialState = [];
    const action = { type: 'UNKNOW' };

    // action
    const nextState = leaderboardsReducer(initialState, action);

    // assert
    expect(nextState).toEqual(initialState);
  });

  it('should return the leaderboard when given by RECEIVE_LEADERBOARDS action', () => {
    // arrange
    const inisialState = [];
    const action = {
      type: 'RECEIVE_LEADERBOARDS',
      payload: {
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
      }
    };

    // action
    const nextState = leaderboardsReducer(inisialState, action);

    // assert
    expect(nextState).toEqual(action.payload.leaderboards);
  });
});