import React, { useState, useEffect, useCallback, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePostCommentMutation } from '@/services/redux/features/blogFeatures';
import { useSelector } from 'react-redux';
import { authInfo } from '@/services/redux/slice/authSlice';
import { FaPaperPlane } from 'react-icons/fa6';
import scrollElement from '@/services/utils/scroll-elements';
import ContentEditable, { ContentEditableEvent } from 'react-contenteditable';
import { ModalContext } from '@/components/modal/hooks/modalContext';

type Props = {
  id: string;
};

const PostComment: React.FC<Props> = ({ id }) => {
  const { setVisibleModal } = useContext(ModalContext);
  const navigate = useNavigate();
  const user = useSelector(authInfo);
  const [comment, setComment] = useState('');
  const [postComment, { status: statusComment }] = usePostCommentMutation();

  const handleChangeComment = useCallback(
    (e: ContentEditableEvent) => {
      setComment(e.target.value);
    },
    [comment]
  );

  const handlePostComment = useCallback(() => {
    if (comment) {
      postComment({ id: id, userId: user._id, text: comment });
    } else {
      setVisibleModal({
        visibleAlertModal: {
          status: 'failed',
          message: 'Failed: Cannot post an empty string',
        },
      });
    }
  }, [comment]);

  const redirectToVerified = () => {
    navigate('/verified');
    scrollElement();
  };

  useEffect(() => {
    if (comment && statusComment === 'fulfilled') {
      setComment('');
    }
  }, [comment, statusComment]);

  return (
    <section className='container'>
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
            />
            <button
              className={`absolute bottom-[10px] right-[5%] tablet:right-[2%] z-50 ${
                comment ? 'text-darkBlue' : ''
              }`}
              aria-label='Send-comment'
              disabled={statusComment === 'pending'}
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
            Please{' '}
            <span
              className='mx-[4px] text-purple font-bold cursor-pointer'
              onClick={() => setVisibleModal('visibleLoginModal')}
            >
              Login
            </span>{' '}
            or{' '}
            <span
              className='mx-[4px] text-purple font-bold cursor-pointer'
              onClick={() => setVisibleModal('visibleRegisterModal')}
            >
              Register
            </span>{' '}
            to comment.
          </p>
        </div>
      ) : (
        <></>
      )}
      {user.email && !user.isVerified ? (
        <div className='flex justify-center py-4 bg-overlayGray rounded-[4px] text-darkGray'>
          <p>
            Please{' '}
            <span
              className='mx-[4px] text-purple font-bold cursor-pointer'
              onClick={redirectToVerified}
            >
              verify
            </span>{' '}
            your account to comment.
          </p>
        </div>
      ) : (
        ''
      )}
    </section>
  );
};

export default PostComment;
