export interface CartReq {
  productId: string;
  shoppingCartTypeId: string;
  quantity: number;
}
export interface CartAddResponse {
  success: boolean;
  message: string;
}
export interface CartResponse {
  Items: Item[];
  TotalProducts: number;
  SubTotal: string;
  SubTotalValue: number;
  DisplayShoppingCartButton: boolean;
  DisplayCheckoutButton: boolean;
  CurrentCustomerIsGuest: boolean;
  AnonymousCheckoutAllowed: boolean;
  ShowProductImages: boolean;
  CustomProperties: CustomProperties3;
}

export interface Item {
  ProductId: number;
  ProductName: string;
  ProductSeName: string;
  Quantity: number;
  UnitPrice: string;
  UnitPriceValue: number;
  AttributeInfo: string;
  Picture: Picture;
  Id: number;
  CustomProperties: CustomProperties2;
}

export interface Picture {
  ImageUrl: string;
  ThumbImageUrl: any;
  FullSizeImageUrl: any;
  Title: string;
  AlternateText: string;
  CustomProperties: CustomProperties;
}

export interface CustomProperties {}

export interface CustomProperties2 {}

export interface CustomProperties3 {}
