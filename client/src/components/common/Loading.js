import React from 'react';
import loadingGif from '../../img/loading1.gif';

function Loading() {
  return (
    <div
      id="Loading"
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '94vh',
        background: '#202225',
        margin: 0,
        border: 0
      }}
    >
      <img src={loadingGif} alt="Loading..." style={{ width: '75px' }} />
    </div>
  );
}

export default Loading;
