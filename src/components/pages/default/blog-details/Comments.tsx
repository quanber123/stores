import React, { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { FaRegComment } from 'react-icons/fa6';
import {
  FacebookShareButton,
  FacebookIcon,
  RedditShareButton,
  RedditIcon,
  TwitterShareButton,
  TwitterIcon,
} from 'react-share';
import { formatTime } from '@/utils/format';
import { Blog } from '@/interfaces/interfaces';
type Props = {
  blogDetails: Blog;
};
const Comments: React.FC<Props> = ({ blogDetails }) => {
  const location = useLocation();
  const client_url = import.meta.env.VITE_CLIENT_URL;
  //cache tags and only reload when data change
  const renderedTags = useMemo(() => {
    if (!blogDetails?.tags?.length) {
      return '';
    }
    const hashtags = blogDetails?.tags?.map((t) => {
      return `#${t.name}`;
    });
    return hashtags.join(' ');
  }, [blogDetails]);

  //cache comments and only reload when data change
  const renderedComments = useMemo(() => {
    if (!blogDetails || !blogDetails?.comments) {
      return [];
    }
    return blogDetails?.comments?.map((c) => {
      return (
        <div key={c.created_at} className='flex items-start gap-[20px]'>
          <img
            className='w-[32px] h-[32px] rounded-full'
            src={c.user?.image}
            alt={c.user?.name}
          />
          <div className='w-full p-4 bg-overlayGray rounded-[26px] flex flex-col gap-[5px]'>
            <div className='text-sm flex justify-between'>
              <h6 className='text-darkGray font-bold'>{c.user?.name}</h6>
              <p className='text-semiBoldGray font-bold'>
                {formatTime(c.created_at)}
              </p>
            </div>
            <div>
              <p>{c.text}</p>
            </div>
          </div>
        </div>
      );
    });
  }, [blogDetails]);
  return (
    <section className='container flex flex-col gap-[30px]'>
      <div className='flex justify-between items-center gap-[20px] py-4 border-t border-b border-gray'>
        <div className='flex items-center gap-[10px]'>
          <FaRegComment />
          <p>
            {blogDetails.totalComments
              ? `${blogDetails.totalComments} comments`
              : `${blogDetails.totalComments} comment`}
          </p>
        </div>
        <div className='flex items-center gap-[10px]'>
          <p>Share:</p>
          <div className='flex gap-[10px]'>
            <FacebookShareButton
              url={`${client_url}${location.pathname}`}
              hashtag={renderedTags}
            >
              <FacebookIcon size={36} round />
            </FacebookShareButton>
            <RedditShareButton
              url={`${client_url}${location.pathname}`}
              title={blogDetails?.title}
            >
              <RedditIcon size={36} round />
            </RedditShareButton>
            <TwitterShareButton
              url={`${client_url}${location.pathname}`}
              title={blogDetails?.title}
              hashtags={[renderedTags]}
            >
              <TwitterIcon size={36} round />
            </TwitterShareButton>
          </div>
        </div>
      </div>
      <div className='pr-4 flex flex-col gap-[20px] h-full max-h-[50vh] overflow-y-auto'>
        {renderedComments?.length ? (
          renderedComments
        ) : (
          <p className='text-lg'>Be the first to comment.</p>
        )}
      </div>
    </section>
  );
};

export default Comments;
