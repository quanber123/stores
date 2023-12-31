export interface Category {
  _id: string;
  name: string;
  image: string;
  description: string;
}
export interface Tag {
  _id: string;
  name: string;
}
export interface Banner {
  _id: string;
  image: string;
  content: string;
  category: string;
}
export interface Product {
  _id: string;
  images: string[];
  name: string;
  code: string;
  price: number;
  type: string;
  details: {
    variants: [
      {
        size: string;
        color: string;
        quantity: number;
        inStock: boolean;
      }
    ];
    shortDescription: string;
    description: string;
    weight: string;
    dimensions: string;
    materials: string;
    category: {
      name: string;
    };
  };
  reviews?: [
    {
      avatar: string;
      content: string;
      vote: number;
    }
  ];
}
export interface Blog {
  _id: string;
  author: string;
  imgSrc: string;
  title: string;
  created_at: string;
  updated_at: string;
  open_paragraph: string;
  body_paragraph: string;
  close_paragraph: string;
  quotes: string;
  category: {
    _id: string;
    name: string;
  };
  views: number;
  totalComments: number;
  tags: [
    {
      _id: string;
      name: string;
    }
  ];
  comments?: [
    {
      user: {
        _id: string;
        name: string;
        image: string;
      };
      text: string;
      created_at: string;
    }
  ];
}
