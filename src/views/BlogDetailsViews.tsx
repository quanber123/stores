import { useParams } from 'react-router-dom';

function BlogDetailsViews() {
  const { id } = useParams();
  console.log(id);
  return <main></main>;
}

export default BlogDetailsViews;
