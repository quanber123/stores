export interface Category {
  name: string;
  image: string;
  description: string;
}
export interface Tag {
  _id: string;
  name: string;
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
export interface CmtUser {
  id: number | string;
  avatar: string;
  cmt: string;
  dateCmt: string;
}
export interface Blog {
  id: number | string;
  imgSrc: string;
  title: string;
  date: string;
  description: string;
  author: string;
  tag: string[];
  countCmt: number;
  details?: CmtUser[];
}
