type propsBLog = {
  style?: React.CSSProperties | undefined;
  srcImg: string;
  altImg?: string;
  refEl: (el: HTMLElement | null) => void;
  author: string;
  date: string;
  title: string;
  description: string;
};
function PreviewBlog({
  style,
  srcImg,
  altImg,
  author,
  date,
  refEl,
  title,
  description,
}: propsBLog) {
  return (
    <article
      ref={(el) => refEl?.(el)}
      className='relative max-w-[315px] flex flex-col gap-[15px]'
      style={style ? style : undefined}
    >
      <div className='blog-preview relative overflow-hidden cursor-pointer'>
        <img className='max-h-[390px]' src={srcImg} alt={altImg} />
      </div>
      <div className='flex flex-col gap-[5px]'>
        <p className='text-sm'>
          By {author} on {date}
        </p>
        <h5 className='text-lg hover:text-purple transition-colors cursor-pointer'>
          {title.substring(0, 50)}...
        </h5>
        <p className='text-sm text-gray'>{description}</p>
      </div>
    </article>
  );
}

export default PreviewBlog;
