import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { asyncReceiveThreadDetail } from '../states/threadDetail/action';
import ThreadDetail from '../components/ThreadDetail';

function DetailPage() {
  const { id } = useParams();
  const {
    threadDetail = null,
    authUser,
  } = useSelector((states) => states);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncReceiveThreadDetail(id));
  }, [dispatch, id]);

  if (!threadDetail) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {
        threadDetail && (
          <div className='home-wrapper'>
            <div className='home-main'>
              <ThreadDetail {...threadDetail} authUser={authUser} />
            </div>
          </div>
        )
      }
    </div>
  );
}

export default DetailPage;