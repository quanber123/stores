import { useParams } from 'react-router-dom';

function BlogDetailsViews() {
  const { id } = useParams();
  console.log(id);
  return <main className='pt-[120px]'></main>;
}

export default BlogDetailsViews;
