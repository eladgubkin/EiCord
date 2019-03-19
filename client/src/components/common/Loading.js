import React from 'react';
import PropTypes from 'prop-types';
import loadingGif from '../../img/loading1.gif';

const Loading = ({ background }) => {
  return (
    <div
      id="Loading"
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
        margin: 0,
        padding: 0,
        background: background
      }}
    >
      <img src={loadingGif} alt="Loading..." style={{ width: '75px' }} />
    </div>
  );
};

Loading.propTypes = {
  background: PropTypes.string.isRequired
};

export default Loading;
