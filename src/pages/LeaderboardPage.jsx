import React from 'react';
import LeaderboardList from '../components/LeaderboardList';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { asyncReceiveLeaderboard } from '../states/leaderboards/action';

function LeaderboardPage() {
  const dispatch = useDispatch();
  const { leaderboards } = useSelector((states) => states);

  useEffect(() => {
    dispatch(asyncReceiveLeaderboard());
  }, [dispatch]);

  return (
    <div className='leaderboard-container'>
      <LeaderboardList leaderboards={leaderboards} />
    </div>
  );
}

export default LeaderboardPage;