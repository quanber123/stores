function LoadingComponents() {
  const loadingItems = [];
  for (let i = 0; i < 3; i++) {
    loadingItems.push(<div key={i} className='circle'></div>);
  }
  return <div className='loading-components h-[50vh]'>{loadingItems}</div>;
}

export default LoadingComponents;
