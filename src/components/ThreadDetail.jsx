// components/ThreadDetail.jsx
import React from 'react';
import PropTypes from 'prop-types';
import {
  FaThumbsUp,
  FaThumbsDown,
  FaRegThumbsUp,
  FaRegThumbsDown,
  FaCommentAlt,
} from 'react-icons/fa';
import postedAt from '../utils/postedAt';
import CommentItem from './CommentItem';
import CommentInput from './CommentInput';
import { useDispatch, useSelector } from 'react-redux';
import {
  asyncToggleUpvoteThreadDetail,
  asyncToggleDownvoteThreadDetail,
  asyncAddCommentThreadDetail,
} from '../states/threadDetail/action';

function ThreadDetail(props) {
  const {
    id,
    title: titleProp,
    body: bodyProp,
    category: categoryProp,
    upVotesBy: upVotesByProp = [],
    downVotesBy: downVotesByProp = [],
    createdAt: createdAtProp,
    owner: ownerProp = {},
    comments: commentsProp = [],
    authUser,
  } = props;

  const dispatch = useDispatch();

  // Ambil thread paling "fresh" dari store (utamakan state.threadDetail)
  const threadFromStore = useSelector((state) => state.threadDetail && state.threadDetail.id === id
    ? state.threadDetail
    : state.threads?.find((t) => t.id === id) || null);

  const thread = threadFromStore || {
    title: titleProp,
    body: bodyProp,
    category: categoryProp,
    upVotesBy: upVotesByProp,
    downVotesBy: downVotesByProp,
    createdAt: createdAtProp,
    owner: ownerProp,
    comments: commentsProp,
  };

  const { title, body, category, upVotesBy, downVotesBy, createdAt, owner, comments } = thread;

  const hasUpvoted = authUser ? upVotesBy.includes(authUser.id) : false;
  const hasDownvoted = authUser ? downVotesBy.includes(authUser.id) : false;

  const handleUpvote = (e) => {
    e.stopPropagation();
    if (!authUser) return;
    dispatch(asyncToggleUpvoteThreadDetail());
  };

  const handleDownvote = (e) => {
    e.stopPropagation();
    if (!authUser) return;
    dispatch(asyncToggleDownvoteThreadDetail());
  };

  const onAddComment = (content) => {
    console.log('Thread id: ', id);
    console.log('Add comment:', content);
    if (!authUser) return;
    dispatch(asyncAddCommentThreadDetail(id, content));
  };

  if (!threadFromStore && !titleProp) {
    return <div className="glass-card discussion-card">Loading…</div>;
  }

  return (
    <div className='glass-card discussion-card' role="article" aria-labelledby={`thread-${id}`}>
      {/* <LoadingBar /> */}
      <p className='discussion-tag'>#{category}</p>
      <h2 id={`thread-${id}`} className='discussion-title'>{title}</h2>

      <div className='discussion-desc' dangerouslySetInnerHTML={{ __html: body }} />

      <div className='discussion-footer'>
        <div className='discussion-stats' aria-hidden={false}>

          <button
            type='button'
            className={`vote ${hasUpvoted ? 'voted-up' : ''}`}
            onClick={handleUpvote}
            onKeyDown={(e) => { if (e.key === 'Enter') handleUpvote(e); }}
            aria-pressed={hasUpvoted}
            disabled={!authUser}
            title={authUser ? (hasUpvoted ? 'Batalkan upvote' : 'Upvote') : 'Login untuk vote'}
          >
            {hasUpvoted ? <FaThumbsUp /> : <FaRegThumbsUp />} <span>{upVotesBy.length}</span>
          </button>

          <button
            type='button'
            className={`vote ${hasDownvoted ? 'voted-down' : ''}`}
            onClick={handleDownvote}
            onKeyDown={(e) => { if (e.key === 'Enter') handleDownvote(e); }}
            aria-pressed={hasDownvoted}
            disabled={!authUser}
            title={authUser ? (hasDownvoted ? 'Batalkan downvote' : 'Downvote') : 'Login untuk vote'}
          >
            {hasDownvoted ? <FaThumbsDown /> : <FaRegThumbsDown />} <span>{downVotesBy.length}</span>
          </button>

          <span className='vote'><FaCommentAlt />{comments.length}</span>

        </div>

        {/* <div className='discussion-meta'> */}
        <span>Dibuat oleh</span>
        <img src={owner?.avatar} alt={owner?.name} className='detail-avatar' />
        <span className='owner-name'> {owner?.name} </span>
        <span> {postedAt(createdAt)}</span>
      </div>
      {/* </div> */}

      <div className='comments-section'>
        <h3>Beri Komentar</h3>
        <CommentInput onAddComment={onAddComment} threadId={id} authUser={authUser} />
        {comments?.map((comment) => (
          <CommentItem key={comment.id} threadId={id} comment={comment} authUser={authUser} />
        ))}
      </div>
    </div>
  );
}

ThreadDetail.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string,
  body: PropTypes.string,
  category: PropTypes.string,
  upVotesBy: PropTypes.arrayOf(PropTypes.string),
  downVotesBy: PropTypes.arrayOf(PropTypes.string),
  createdAt: PropTypes.string,
  owner: PropTypes.object,
  comments: PropTypes.arrayOf(PropTypes.object),
  authUser: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    email: PropTypes.string,
    avatar: PropTypes.string,
  }),
};

ThreadDetail.defaultProps = {
  title: '',
  body: '',
  category: '',
  upVotesBy: [],
  downVotesBy: [],
  createdAt: '',
  owner: {},
  comments: [],
  authUser: null,
};

export default ThreadDetail;
