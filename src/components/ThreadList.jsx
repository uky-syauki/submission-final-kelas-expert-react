import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ThreadItem from './ThreadItem';
import PropTypes from 'prop-types';
import postedAt from '../utils/postedAt';
import ThreadInput from './ThreadInput';


function ThreadList({ threads, onAddThread, authUser, setCategory, categoryList }) {
  const navigate = useNavigate();
  const [showInput, setShowInput] = useState(false);

  const onToggleNewThread = () => {
    setShowInput((prevShowInput) => !prevShowInput);
  };

  const navLoginHandler = () => {
    navigate('/login');
  };

  return (
    <main className='home-main'>
      <ThreadInput onAddThread={onAddThread} showInput={showInput} setShowInput={setShowInput} authUser={authUser} />
      {authUser
        ? <h3 className='discussion-head'>Diskusi Tersedia <button className={`${showInput ? 'hidden' : ''}`} onClick={onToggleNewThread}>Buat Thread</button></h3>
        : <h3 className='discussion-head'>Diskusi Tersedia <button onClick={navLoginHandler}>Login untuk membuat Thread</button></h3> }

      <div className='category-list'>
        {categoryList.map((category) => (
          <button className='category-btn' key={category} onClick={() => setCategory(category)}>
            #{category}
          </button>
        ))}
      </div>
      {threads.map((disccus) => (
        <ThreadItem
          key={disccus.id}
          id={disccus.id}
          category={disccus.category}
          title={disccus.title}
          body={disccus.body}
          upVoteBy={disccus.upVotesBy}
          comments={disccus.totalComments}
          downVoteBy={disccus.downVotesBy}
          daysAgo={postedAt(disccus.createdAt)}
          author={disccus.user.name}
        />
      ))}
    </main>
  );
}

ThreadList.propTypes = {
  threads: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
    downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
    totalComments: PropTypes.number.isRequired,
    createdAt: PropTypes.string.isRequired,
    ownerId: PropTypes.string.isRequired,
  })).isRequired,
  onAddThread: PropTypes.func.isRequired,
  authUser: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    email: PropTypes.string,
    avatar: PropTypes.string,
  }),
  setCategory: PropTypes.func.isRequired,
  categoryList: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default ThreadList;