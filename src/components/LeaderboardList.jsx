import React from 'react';
import PropTypes from 'prop-types';
import LeaderboardItem from './LeaderboardItem';

function LeaderboardList({ leaderboards }) {
  return (
    <div className='leaderboard-container'>
      <h2>Klasmen Pengguna Aktif</h2>
      <table className='leaderboard-table'>
        <thead>
          <th>Pengguna</th>
          <th>Skor</th>
        </thead>
        <tbody>
          {leaderboards?.map((item) => (
            <LeaderboardItem key={item.user.id} user={item.user} score={item.score} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

LeaderboardList.propTypes = {
  leaderboards: PropTypes.arrayOf(
    PropTypes.shape({
      user: PropTypes.shape({
        id: PropTypes.string,
        name: PropTypes.string,
        avatar: PropTypes.string
      }),
      score: PropTypes.string,
    }),
  )
};


export default LeaderboardList;