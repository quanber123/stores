import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  FacebookShareButton,
  FacebookIcon,
  RedditShareButton,
  RedditIcon,
  TwitterShareButton,
  TwitterIcon,
} from 'react-share';
import {
  FaRegClock,
  FaRegComment,
  FaRegEye,
  FaQuoteRight,
  FaPaperPlane,
} from 'react-icons/fa6';
import gsap from 'gsap';
import {
  Navigate,
  useLocation,
  useNavigate,
  useParams,
} from 'react-router-dom';
import {
  useGetBlogByIdQuery,
  usePostCommentMutation,
} from '@/store/features/blogFeatures';
import { useDispatch, useSelector } from 'react-redux';
import { getBlogDetails, setBlogsDetails } from '@/store/slice/blogSlice';
import { capitalizeFirstLetter, formatDate, formatTime } from '@/utils/format';
import LoadingBlogDetail from '@/components/common/Loading/LoadingBlogDetail';
import { authInfo } from '@/store/slice/authSlice';
import {
  setVisibleAlertModal,
  setVisibleLoginModal,
  setVisibleRegisterModal,
} from '@/store/slice/modalSlice';
import scrollElement from '@/utils/scroll-elements';
import ContentEditable, { ContentEditableEvent } from 'react-contenteditable';

function BlogDetails() {
  const { id } = useParams();
  const client_url = import.meta.env.VITE_CLIENT_URL;
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const user = useSelector(authInfo);
  const blogRef = useRef(null);
  const blogDetails = useSelector(getBlogDetails);
  const [postComment, { status: statusComment }] = usePostCommentMutation();
  const {
    data: blogData,
    isSuccess: isSuccessBlog,
    isLoading: isLoadingBlog,
    isFetching: isFetchingBlog,
    error: errorBlog,
    refetch: reFetchBlogData,
  } = useGetBlogByIdQuery(id, {
    skip: !id,
  });
  const [comment, setComment] = useState('');

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
            src={c.user.image}
            alt=''
          />
          <div className='w-full p-4 bg-overlayGray rounded-[26px] flex flex-col gap-[5px]'>
            <div className='text-sm flex justify-between'>
              <h6 className='text-darkGray font-bold'>{c.user.name}</h6>
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

  // redirect to verified if account not verified

  const redirectToVerified = () => {
    navigate('/verified');
    scrollElement();
  };

  // change comment
  const handleChangeComment = useCallback((e: ContentEditableEvent) => {
    setComment(e.target.value);
  }, []);

  // post comment
  const handleKeyDown = async (e: React.KeyboardEvent<HTMLElement>) => {
    if (comment! == '') {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        comment
          ? await postComment({ id: id, userId: user._id, text: comment })
          : dispatch(
              setVisibleAlertModal({
                status: 'failed',
                message: 'Failed: Can not post emty string',
              })
            );
      }
    }
  };
  console.log(comment.length > 0);
  const handlePostComment = async () => {
    comment
      ? await postComment({ id: id, userId: user._id, text: comment })
      : dispatch(
          setVisibleAlertModal({
            status: 'failed',
            message: 'Failed: Can not post emty string',
          })
        );
  };

  // check polling blog when post comment success
  useEffect(() => {
    if (comment && statusComment === 'fulfilled') {
      setComment('');
      reFetchBlogData();
    }
  }, [comment, statusComment, reFetchBlogData]);
  //checking blog-details
  useEffect(() => {
    if (isSuccessBlog && !isLoadingBlog && !isFetchingBlog) {
      dispatch(setBlogsDetails(blogData));
    }
  }, [dispatch, isSuccessBlog, isLoadingBlog, isFetchingBlog, blogData]);

  //animation
  useLayoutEffect(() => {
    if (blogRef.current) {
      const ctx = gsap.context(() => {
        gsap.fromTo(
          blogRef.current,
          {
            opacity: 0,
          },
          {
            opacity: 1,
            duration: 1,
          }
        );
      });
      return () => {
        ctx.revert();
      };
    }
  }, [id]);

  if (isLoadingBlog && isFetchingBlog) {
    return <LoadingBlogDetail />;
  }
  if (errorBlog && 'data' in errorBlog) {
    return <Navigate to={`/not-found/${id}`} />;
  }
  return (
    <section
      ref={blogRef}
      className='container mt-16 tablet:mt-32 flex flex-col gap-[20px]'
    >
      <div className='bg-darkGray absolute top-0 left-0 w-full h-[250px] tablet:h-[450px] -z-10'></div>
      <img
        className='w-full desktop:h-[600px] object-fill'
        src={blogDetails?.imgSrc}
        alt={blogDetails?.title}
      />
      <div className='flex flex-col tablet:flex-row tablet:items-center gap-[10px] text-sm'>
        <p>
          By{' '}
          <span className='font-bold'>
            {blogDetails?.author
              ? capitalizeFirstLetter(blogDetails.author)
              : ''}
          </span>
        </p>
        <span className='hidden tablet:block'>|</span>
        <div className='flex items-center gap-[5px]'>
          <FaRegClock />
          <p>{formatDate(blogDetails?.created_at)}</p>
        </div>
        <span className='hidden tablet:block'>|</span>
        <div className='flex items-center gap-[5px]'>
          <FaRegEye />
          {blogDetails?.views ? (
            <p>
              {blogDetails.views > 1
                ? `${blogDetails.views} views`
                : `${blogDetails.views} view`}
            </p>
          ) : (
            ''
          )}
        </div>
      </div>
      <div className='flex flex-col gap-[20px] text-semiBoldGray'>
        <h1 className='text-[20px] tablet:text-2xl text-darkGray font-bold'>
          {blogDetails?.title}
        </h1>
        <p>{blogDetails?.open_paragraph}</p>
        {blogDetails?.quotes ? (
          <div className='relative bg-bgGray min-h-[250px] my-4 p-8 rounded-[8px] flex justify-center items-center'>
            <q className='font-bold text-md tablet:text-[20px]'>
              {blogDetails.quotes}
            </q>
            <FaQuoteRight className='hidden tablet:block absolute top-0 right-[10%] text-gray text-[246px] opacity-30' />
          </div>
        ) : (
          <></>
        )}
        <p>{blogDetails?.body_paragraph}</p>
        <p>{blogDetails?.close_paragraph}</p>
      </div>
      <div className='mt-4 flex flex-col gap-[30px]'>
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
        {user.name && user.image && user.isVerified ? (
          <div className='flex items-start gap-[10px] tablet:gap-[20px]'>
            <img
              className='w-[32px] h-[32px] rounded-full'
              src={user.image}
              alt={user.name}
            />
            <div className='relative w-full text-darkGray'>
              <ContentEditable
                disabled={false}
                html={comment}
                className='sticky top-0 right-0 py-2 px-4 w-full min-h-[36px] rounded-[24px] bg-overlayGray z-20'
                id='comment'
                onChange={handleChangeComment}
                onKeyDown={handleKeyDown}
              />
              <button
                className={`absolute bottom-[10px] right-[5%] tablet:right-[2%] z-50 ${
                  comment ? 'text-darkBlue' : ''
                }`}
                aria-label='Send-comment'
                onClick={handlePostComment}
              >
                <FaPaperPlane />
              </button>
              <p
                className={`absolute top-[10px] left-4 z-10 ${
                  comment ? 'hidden' : 'block'
                }`}
              >
                Write a comment...
              </p>
            </div>
          </div>
        ) : (
          <></>
        )}
        {!user.email ? (
          <div className='flex justify-center py-4 bg-overlayGray rounded-[4px] text-darkGray'>
            <p>
              Please
              <span
                className='mx-[4px] text-purple font-bold cursor-pointer'
                onClick={() => dispatch(setVisibleLoginModal())}
              >
                Login
              </span>
              or
              <span
                className='mx-[4px] text-purple font-bold cursor-pointer'
                onClick={() => dispatch(setVisibleRegisterModal())}
              >
                Register
              </span>
              to comment.
            </p>
          </div>
        ) : (
          <></>
        )}
        {user.email && !user.isVerified ? (
          <div className='flex justify-center py-4 bg-overlayGray rounded-[4px] text-darkGray'>
            <p>
              Please
              <span
                className='mx-[4px] text-purple font-bold cursor-pointer'
                onClick={redirectToVerified}
              >
                verified
              </span>
              your account to comment.
            </p>
          </div>
        ) : (
          ''
        )}
      </div>
    </section>
  );
}

export default BlogDetails;
