import React from 'react';
import PropTypes from 'prop-types';
import {
  FaThumbsUp,
  FaThumbsDown,
  FaRegThumbsUp,
  FaRegThumbsDown,
  FaCommentAlt,
} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  asyncToggleUpvoteThread,
  asyncToggleDownvoteThread,
} from '../states/threads/action';

function ThreadItem({ id, category, title, body, upVoteBy, downVoteBy, daysAgo, author, comments }) {
  const { authUser } = useSelector((states) => states);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isUpvoted = authUser ? upVoteBy.includes(authUser.id) : false;
  const isDownvoted = authUser ? downVoteBy.includes(authUser.id) : false;

  const handleThreadClick = () => {
    navigate(`/threads/${id}`);
  };

  const handleUpvote = (e) => {
    e.stopPropagation();
    if (!authUser) return;
    dispatch(asyncToggleUpvoteThread(id));
  };

  const handleDownvote = (e) => {
    e.stopPropagation();
    if (!authUser) return;
    dispatch(asyncToggleDownvoteThread(id));
  };

  return (
    <div className='glass-card discussion-card'>
      <span className='discussion-tag'>#{category}</span>

      <h3
        className='discussion-title discussion-title-detail'
        role='button'
        tabIndex={0}
        onClick={handleThreadClick}
        onKeyDown={(e) => e.key === 'Enter' && handleThreadClick()}
      >
        {title}
      </h3>

      <p
        className='discussion-desc-paragraph'
        dangerouslySetInnerHTML={{ __html: body }}
      />

      <div className='discussion-footer'>
        <div className='discussion-stats'>
          <button
            type='button'
            className={`vote ${isUpvoted ? 'voted-up' : ''}`}
            onClick={handleUpvote}
            aria-label='Upvote'
          >
            {isUpvoted ? <FaThumbsUp /> : <FaRegThumbsUp />}
            <span>{upVoteBy.length}</span>
          </button>

          <button
            type='button'
            className={`vote ${isDownvoted ? 'voted-down' : ''}`}
            onClick={handleDownvote}
            aria-label='Downvote'
          >
            {isDownvoted ? <FaThumbsDown /> : <FaRegThumbsDown />}
            <span>{downVoteBy.length}</span>
          </button>

          <span className='vote'><FaCommentAlt />{comments}</span>
        </div>

        <div className='discussion-meta'>
          {daysAgo} · <strong>{author}</strong>
        </div>
      </div>
    </div>
  );
}

ThreadItem.propTypes = {
  id: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  upVoteBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  downVoteBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  comments: PropTypes.number.isRequired,
  daysAgo: PropTypes.number.isRequired,
  author: PropTypes.string.isRequired,
};

export default ThreadItem;
