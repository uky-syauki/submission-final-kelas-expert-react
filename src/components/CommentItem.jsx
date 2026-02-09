import React from 'react';
import PropTypes from 'prop-types';
import postedAt from '../utils/postedAt';
import { FaThumbsUp, FaThumbsDown, FaRegThumbsDown, FaRegThumbsUp } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import {
  asyncToggleUpvoteComment,
  asyncToggleDownvoteComment,
} from '../states/threadDetail/action';

function CommentItem({ comment, threadId, authUser }) {
  const dispatch = useDispatch();

  const hasUpvoted = authUser ? comment.upVotesBy.includes(authUser.id) : false;
  const hasDownvoted = authUser ? comment.downVotesBy.includes(authUser.id) : false;

  const handleUpvote = (e) => {
    console.log('upvote comment');
    e.stopPropagation();
    if (!authUser) return;
    dispatch(asyncToggleUpvoteComment(threadId, comment.id));
  };

  const handleDownvote = (e) => {
    e.stopPropagation();
    if (!authUser) return;
    dispatch(asyncToggleDownvoteComment(threadId, comment.id));
  };

  return (
    <div className='comment-card'>
      <p className='comment-body' dangerouslySetInnerHTML={{ __html: comment.content }}></p>
      <div className='discussion-footer'>
        <div className='discussion-stats'>
          <button
            type='button'
            className={`vote ${hasUpvoted ? 'voted-up' : ''}`}
            onClick={handleUpvote}
          >
            {hasUpvoted ? <FaThumbsUp /> : <FaRegThumbsUp />} <span>{comment.upVotesBy.length}</span>
          </button>
          <button
            type='button'
            className={`vote ${hasDownvoted ? 'voted-down' : ''}`}
            onClick={handleDownvote}
          >
            {hasDownvoted ? <FaThumbsDown className="downvoted" /> : <FaRegThumbsDown />} <span>{comment.downVotesBy.length}</span>
          </button>
        </div>
        <span>Dibuat oleh</span>
        <img src={comment.owner.avatar} alt={comment.owner.name} className='detail-avatar' />
        <span className='owner-name'> {comment.owner.name} </span>
        <span> {postedAt(comment.createdAt)}</span>
      </div>
    </div>
  );
}

CommentItem.propTypes = {
  comment: PropTypes.shape({
    id: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
    downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
    createdAt: PropTypes.string.isRequired,
    owner: PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      avatar: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  authUser: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
  }),
  threadId: PropTypes.string.isRequired,
};

export default CommentItem;