export interface Category {
  imgSrc: string;
  title: string;
  description: string;
}
export interface Product {
  id: string | number;
  images: string[];
  title: string;
  code: string;
  categories: string[];
  price: number;
  shortDescription: string;
  tabs: {
    description: string;
    addInformation: {
      weight: string;
      dimensions: string;
      materials: string;
      sizes: string[];
      colors: string[];
    };
    reviews?: [
      {
        avatar: string;
        content: string;
        vote: number;
      }
    ];
  };
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
}
