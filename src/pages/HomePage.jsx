import React, { useEffect, useState } from 'react';
import ThreadList from '../components/ThreadList';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { asyncPopulateData } from '../states/shared/action';
import { asyncAddThread } from '../states/threads/action';

function HomePage() {
  const [category, setCategory] = useState('');
  const {
    threads = [],
    users = [],
    authUser,
  } = useSelector((states) => states);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncPopulateData());
  }, [dispatch]);

  const onAddThread = ({ title, category, body }) => {
    dispatch(asyncAddThread({ title, category, body }));
  };

  const threadlist = threads.map((tread) => ({
    ...tread,
    user: users.find((user) => user.id === tread.ownerId),
  }));

  const categorys = category === '' ? threadlist : threadlist.filter((item) => item.category === category);
  const categoryList = [...new Set(threadlist.map((item) => item.category))];

  console.log('category: ', categorys);
  return (
    <div className='home-wrapper'>
      <ThreadList threads={categorys} users={users} authUser={authUser} onAddThread={onAddThread} setCategory={setCategory} categoryList={categoryList} />
    </div>
  );
}

HomePage.propTypes = {
  onSingOut: PropTypes.func.isRequired,
};

export default HomePage;