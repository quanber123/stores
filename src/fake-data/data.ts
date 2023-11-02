import test1 from '@/assets/images/product-detail-01.jpg.webp';
import test2 from '@/assets/images/product-detail-02.jpg.webp';
import test3 from '@/assets/images/product-detail-03.jpg.webp';
import img1 from '@/assets/images/slide-01.jpg.webp';
import img2 from '@/assets/images/slide-02.jpg.webp';
import img3 from '@/assets/images/slide-03.jpg.webp';
import { Product } from '@/interfaces/interfaces';
export const products: Product[] = [
  {
    id: 1,
    title: 'Test 1',
    images: [test1, test2, test3],
    code: 'SKU: JAK-01',
    categories: ['Jacket', 'Men'],
    shortDescription:
      'Nulla eget sem vitae eros pharetra viverra. Nam vitae luctus ligula. Mauris consequat ornare feugiat.',
    price: 58.79,
    tabs: {
      description:
        'Aenean sit amet gravida nisi. Nam fermentum est felis, quis feugiat nunc fringilla sit amet. Ut in blandit ipsum. Quisque luctus dui at ante aliquet, in hendrerit lectus interdum. Morbi elementum sapien rhoncus pretium maximus. Nulla lectus enim, cursus et elementum sed, sodales vitae eros. Ut ex quam, porta consequat interdum in, faucibus eu velit. Quisque rhoncus ex ac libero varius molestie. Aenean tempor sit amet orci nec iaculis. Cras sit amet nulla libero. Curabitur dignissim, nunc nec laoreet consequat, purus nunc porta lacus, vel efficitur tellus augue in ipsum. Cras in arcu sed metus rutrum iaculis. Nulla non tempor erat. Duis in egestas nunc.',
      addInformation: {
        weight: '0.79 kg',
        dimensions: '110 x 33 x 100 cm',
        materials: '60% cotton',
        sizes: ['s', 'm', 'l', 'xl'],
        colors: ['red', 'blue', 'green', 'white'],
      },
      reviews: [
        {
          avatar: '',
          content: '',
          vote: 0,
        },
      ],
    },
  },
  {
    id: 2,
    title: 'Test 2',
    images: [test1, test2, test3],
    code: 'SKU: JAK-01',
    categories: ['Jacket', 'Men'],
    shortDescription:
      'Nulla eget sem vitae eros pharetra viverra. Nam vitae luctus ligula. Mauris consequat ornare feugiat.',
    price: 58.79,
    tabs: {
      description:
        'Aenean sit amet gravida nisi. Nam fermentum est felis, quis feugiat nunc fringilla sit amet. Ut in blandit ipsum. Quisque luctus dui at ante aliquet, in hendrerit lectus interdum. Morbi elementum sapien rhoncus pretium maximus. Nulla lectus enim, cursus et elementum sed, sodales vitae eros. Ut ex quam, porta consequat interdum in, faucibus eu velit. Quisque rhoncus ex ac libero varius molestie. Aenean tempor sit amet orci nec iaculis. Cras sit amet nulla libero. Curabitur dignissim, nunc nec laoreet consequat, purus nunc porta lacus, vel efficitur tellus augue in ipsum. Cras in arcu sed metus rutrum iaculis. Nulla non tempor erat. Duis in egestas nunc.',
      addInformation: {
        weight: '0.79 kg',
        dimensions: '110 x 33 x 100 cm',
        materials: '60% cotton',
        sizes: ['s', 'm', 'l', 'xl'],
        colors: ['red', 'blue', 'green', 'white'],
      },
      reviews: [
        {
          avatar: '',
          content: '',
          vote: 0,
        },
      ],
    },
  },
  {
    id: 3,
    title: 'Test 3',
    images: [test1, test2, test3],
    code: 'SKU: JAK-01',
    categories: ['Jacket', 'Men'],
    shortDescription:
      'Nulla eget sem vitae eros pharetra viverra. Nam vitae luctus ligula. Mauris consequat ornare feugiat.',
    price: 58.79,
    tabs: {
      description:
        'Aenean sit amet gravida nisi. Nam fermentum est felis, quis feugiat nunc fringilla sit amet. Ut in blandit ipsum. Quisque luctus dui at ante aliquet, in hendrerit lectus interdum. Morbi elementum sapien rhoncus pretium maximus. Nulla lectus enim, cursus et elementum sed, sodales vitae eros. Ut ex quam, porta consequat interdum in, faucibus eu velit. Quisque rhoncus ex ac libero varius molestie. Aenean tempor sit amet orci nec iaculis. Cras sit amet nulla libero. Curabitur dignissim, nunc nec laoreet consequat, purus nunc porta lacus, vel efficitur tellus augue in ipsum. Cras in arcu sed metus rutrum iaculis. Nulla non tempor erat. Duis in egestas nunc.',
      addInformation: {
        weight: '0.79 kg',
        dimensions: '110 x 33 x 100 cm',
        materials: '60% cotton',
        sizes: ['s', 'm', 'l', 'xl'],
        colors: ['red', 'blue', 'green', 'white'],
      },
      reviews: [
        {
          avatar: '',
          content: '',
          vote: 0,
        },
      ],
    },
  },
  {
    id: 4,
    title: 'Test 4',
    images: [test1, test2, test3],
    code: 'SKU: JAK-01',
    categories: ['Jacket', 'Men'],
    shortDescription:
      'Nulla eget sem vitae eros pharetra viverra. Nam vitae luctus ligula. Mauris consequat ornare feugiat.',
    price: 58.79,
    tabs: {
      description:
        'Aenean sit amet gravida nisi. Nam fermentum est felis, quis feugiat nunc fringilla sit amet. Ut in blandit ipsum. Quisque luctus dui at ante aliquet, in hendrerit lectus interdum. Morbi elementum sapien rhoncus pretium maximus. Nulla lectus enim, cursus et elementum sed, sodales vitae eros. Ut ex quam, porta consequat interdum in, faucibus eu velit. Quisque rhoncus ex ac libero varius molestie. Aenean tempor sit amet orci nec iaculis. Cras sit amet nulla libero. Curabitur dignissim, nunc nec laoreet consequat, purus nunc porta lacus, vel efficitur tellus augue in ipsum. Cras in arcu sed metus rutrum iaculis. Nulla non tempor erat. Duis in egestas nunc.',
      addInformation: {
        weight: '0.79 kg',
        dimensions: '110 x 33 x 100 cm',
        materials: '60% cotton',
        sizes: ['s', 'm', 'l', 'xl'],
        colors: ['red', 'blue', 'green', 'white'],
      },
      reviews: [
        {
          avatar: '',
          content: '',
          vote: 0,
        },
      ],
    },
  },
  {
    id: 5,
    title: 'Esprit Ruffle Shirt',
    images: [test1, test2, test3],
    code: 'SKU: JAK-01',
    categories: ['Jacket', 'Men'],
    shortDescription:
      'Nulla eget sem vitae eros pharetra viverra. Nam vitae luctus ligula. Mauris consequat ornare feugiat.',
    price: 58.79,
    tabs: {
      description:
        'Aenean sit amet gravida nisi. Nam fermentum est felis, quis feugiat nunc fringilla sit amet. Ut in blandit ipsum. Quisque luctus dui at ante aliquet, in hendrerit lectus interdum. Morbi elementum sapien rhoncus pretium maximus. Nulla lectus enim, cursus et elementum sed, sodales vitae eros. Ut ex quam, porta consequat interdum in, faucibus eu velit. Quisque rhoncus ex ac libero varius molestie. Aenean tempor sit amet orci nec iaculis. Cras sit amet nulla libero. Curabitur dignissim, nunc nec laoreet consequat, purus nunc porta lacus, vel efficitur tellus augue in ipsum. Cras in arcu sed metus rutrum iaculis. Nulla non tempor erat. Duis in egestas nunc.',
      addInformation: {
        weight: '0.79 kg',
        dimensions: '110 x 33 x 100 cm',
        materials: '60% cotton',
        sizes: ['s', 'm', 'l', 'xl'],
        colors: ['red', 'blue', 'green', 'white'],
      },
      reviews: [
        {
          avatar: '',
          content: '',
          vote: 0,
        },
      ],
    },
  },
  {
    id: 6,
    title: 'Esprit Ruffle Shirt',
    images: [test1, test2, test3],
    code: 'SKU: JAK-01',
    categories: ['Jacket', 'Men'],
    shortDescription:
      'Nulla eget sem vitae eros pharetra viverra. Nam vitae luctus ligula. Mauris consequat ornare feugiat.',
    price: 58.79,
    tabs: {
      description:
        'Aenean sit amet gravida nisi. Nam fermentum est felis, quis feugiat nunc fringilla sit amet. Ut in blandit ipsum. Quisque luctus dui at ante aliquet, in hendrerit lectus interdum. Morbi elementum sapien rhoncus pretium maximus. Nulla lectus enim, cursus et elementum sed, sodales vitae eros. Ut ex quam, porta consequat interdum in, faucibus eu velit. Quisque rhoncus ex ac libero varius molestie. Aenean tempor sit amet orci nec iaculis. Cras sit amet nulla libero. Curabitur dignissim, nunc nec laoreet consequat, purus nunc porta lacus, vel efficitur tellus augue in ipsum. Cras in arcu sed metus rutrum iaculis. Nulla non tempor erat. Duis in egestas nunc.',
      addInformation: {
        weight: '0.79 kg',
        dimensions: '110 x 33 x 100 cm',
        materials: '60% cotton',
        sizes: ['s', 'm', 'l', 'xl'],
        colors: ['red', 'blue', 'green', 'white'],
      },
      reviews: [
        {
          avatar: '',
          content: '',
          vote: 0,
        },
      ],
    },
  },
];

export const banners = [
  {
    src: img1,
    content: 'Women Collection 2018',
    category: 'New Season',
  },
  {
    src: img2,
    content: 'Men Collection 2018',
    category: 'New Arrivals',
  },
  {
    src: img3,
    content: 'Men New Season',
    category: 'New Arrivals',
  },
];
