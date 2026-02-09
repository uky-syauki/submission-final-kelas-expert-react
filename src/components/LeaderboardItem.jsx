import React from 'react';
import PropTypes from 'prop-types';

function LeaderboardItem({ user, score }) {
  return (
    <tr>
      <td>
        <img src={user.avatar} alt={user.name} width={32} />
        {user.name}
      </td>
      <td>{score}</td>
    </tr>
  );
}

LeaderboardItem.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired
  }),
  score: PropTypes.number.isRequired,
};

export default LeaderboardItem;