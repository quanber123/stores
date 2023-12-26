import React from 'react';
const LoadingV2 = React.memo(() => {
  const loadingItems = [];
  for (let i = 0; i < 3; i++) {
    loadingItems.push(<div key={i} className='circle'></div>);
  }
  return <main className='loadingV2'>{loadingItems}</main>;
});

export default LoadingV2;
