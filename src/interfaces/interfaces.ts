export interface Category {
  imgSrc: string;
  title: string;
  description: string;
}
export interface Product {
  _id: string;
  images: string[];
  name: string;
  code: string;
  price: number;
  shortDescription: string;
  type: string;
  details: {
    variants: [
      {
        size: string;
        color: string;
        quantity: number;
      }
    ];
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
