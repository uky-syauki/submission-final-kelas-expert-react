import React from 'react';
import LoadingBar from '@dimasmds/react-redux-loading-bar';

function Loading() {
  return (
    <div className='loading'>
      <LoadingBar style={{ backgroundColor: '#7c7cff', height: 3, zIndex: 2000 }}/>
    </div>
  );
}

export default Loading;