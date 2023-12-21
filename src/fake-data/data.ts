import test2 from '@/assets/images/product-detail-02.jpg.webp';
import test3 from '@/assets/images/product-detail-03.jpg.webp';
import img3 from '@/assets/images/slide-03.jpg.webp';
import blogImg from '@/assets/images/bg-02.jpg.webp';
import testImg from '@/assets/images/blog-04.jpg.webp';
import demoimg from '@/assets/images/banner-01.jpg.webp';

import { formatDate } from '@/utils/format';

export const blogs = [
  {
    id: 1,
    imgSrc: testImg,
    title: '8 Inspiring Ways to Wear Dresses in the Winter',
    date: formatDate(new Date()),
    description:
      'Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Fusce eget dictum tortor. Donec dictum vitae sapien eu varius',
    author: 'Admin',
    tag: ['StreetStyle', 'Fashion', 'Couple'],
    countCmt: 8,
  },
  {
    id: 2,
    imgSrc: img3,
    title: '8 Inspiring Ways to Wear Dresses in the Winter',
    date: formatDate(new Date()),
    description:
      'Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Fusce eget dictum tortor. Donec dictum vitae sapien eu varius',
    author: 'Admin',
    tag: ['StreetStyle', 'Fashion', 'Couple', 'Crafts', 'StreetStyle'],
    countCmt: 8,
  },
  {
    id: 3,
    title: 'The Great Big List of Men’s Gifts for the Holidays',
    description:
      'Nullam scelerisque, lacus sed consequat laoreet, dui enim iaculis leo, eu viverra ex nulla in tellus. Nullam nec ornare tellus, ac fringilla lacus. Ut sit ame',
    author: 'Nancy Ward',
    date: 'July 18, 2017',
    imgSrc: test2,
    tag: ['StreetStyle', 'Fashion', 'Couple'],
    countCmt: 8,
  },
  {
    id: 4,
    title: 'The Great Big List of Men’s Gifts for the Holidays',
    description:
      'Nullam scelerisque, lacus sed consequat laoreet, dui enim iaculis leo, eu viverra ex nulla in tellus. Nullam nec ornare tellus, ac fringilla lacus. Ut sit ame',
    author: 'Nancy Ward',
    date: 'July 18, 2017',
    imgSrc: test3,
    tag: ['StreetStyle', 'Fashion', 'Couple'],
    countCmt: 8,
  },
  {
    id: 5,
    title: 'The Great Big List of Men’s Gifts for the Holidays',
    description:
      'Nullam scelerisque, lacus sed consequat laoreet, dui enim iaculis leo, eu viverra ex nulla in tellus. Nullam nec ornare tellus, ac fringilla lacus. Ut sit ame',
    author: 'Nancy Ward',
    date: 'July 18, 2017',
    imgSrc: blogImg,
    tag: ['StreetStyle', 'Fashion', 'Couple'],
    countCmt: 8,
  },
];

export const categories = [
  {
    imgSrc: demoimg,
    title: 'Women',
    description: 'Spring 2018',
  },
  {
    imgSrc: demoimg,
    title: 'Women',
    description: 'Spring 2018',
  },
  {
    imgSrc: demoimg,
    title: 'Women',
    description: 'Spring 2018',
  },
];
