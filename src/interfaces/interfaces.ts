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
  id: string;
  image: string;
  imageMobile: string;
  imageTablet: string;
  imageLaptop: string;
  content: string;
  sub_content: string;
  category: Category;
}
export interface Product {
  _id: string;
  images: string[];
  name: string;
  code: string;
  price: number;
  sale: {
    active: boolean;
    name: string;
    rate: number;
    startDate: string;
    endDate: string;
    tag: string;
  };
  salePrice: number;
  finalPrice: number;
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
    tags: [
      {
        _id: string;
        name: string;
      }
    ];
  };
  reviews?: [
    {
      avatar: string;
      content: string;
      vote: number;
    }
  ];
}
export interface Cart {
  _id: string;
  userId: string;
  product: {
    id: string;
    name: string;
    image: string;
    color: string;
    size: string;
    price: number;
    amountSalePrice: number;
    salePrice: number;
    finalPrice: number;
    quantity: number;
    totalPrice: number;
  };
}
export interface Favorite {
  _id: string;
  products: Array<{
    _id: string;
    images: string[];
    name: string;
  }>;
  userId: String;
}
export interface Order {
  _id: string;
  created_at: string;
  updated_at: string;
  paymentMethod: string;
  user: string;
  paymentInfo: {
    products: [
      {
        _id: string;
        id: string;
        image: string;
        name: string;
        color: string;
        size: string;
        price: number;
        amountSalePrice: number;
        quantity: number;
        salePrice: number;
        finalPrice: number;
        totalPrice: number;
        isReview: boolean;
      }
    ];
    qrCode: string | null;
    status: string;
    accountName: string | null;
    accountNumber: string | null;
    amount: number;
    bin: string | number | null;
    checkoutUrl: string;
    currency: string;
    description: string;
    orderCode: number;
    paymentLinkId: string;
  };
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
        id: string;
        name: string;
        image: string;
      };
      text: string;
      created_at: string;
    }
  ];
}

export interface User {
  _id: string;
  id: string;
  email: string | null;
  name: string;
  image: string;
  isVerified: boolean;
}

export interface Settings {
  _id: string;
  user: string;
  created_at: string;
  updated_at: string;
  notifications: Array<{
    _id: string;
    type: string;
    description: string;
    enabled: boolean;
    created_at: string;
  }>;
}

export interface Address {
  geoinfo: {
    region: {
      latitude: null | string | number;
      longitude: null | string | number;
    };
    geoinfo_confirm: boolean;
  };
  _id: string;
  userId: string;
  name: string;
  phone: string;
  state: string;
  city: string;
  address: string;
  district: string;
  zipcode: string | number | null;
  isDefault: boolean;
}

export interface StatusOrder {
  _id: string;
  name: string;
  number: number;
  color: string;
  backgroundColor: string;
}
