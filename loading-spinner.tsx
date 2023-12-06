import React from 'react';
import styled from 'react-emotion';

const LoadingContainer = styled('div')({
  padding: '20rem 0',
  textAlign: 'center',
  width: '100px',
  height: '100px',
  margin: '0 auto',

  img: {
    marginTop: '-50px'
  }
});

const LoadingScreen = () => (
  <LoadingContainer>
    <img
      // eslint-disable-next-line global-require
      src={require('../../../assets/images/loading-spinner.svg')}
      alt="loading"
    />
  </LoadingContainer>
);

export default LoadingScreen;
