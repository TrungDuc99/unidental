export interface Cart {
  Items: ItemCart[];
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

export interface ItemCart {
  ProductId: number;
  ProductName: string;
  ProductSeName: string;
  Quantity: number;
  UnitPrice: string;
  UnitPriceValue: number;
  AttributeInfo: string;
  Picture: any;
  Id: number;
  CustomProperties: any;
}

export interface Picture {
  ImageUrl: string;
  ThumbImageUrl: string;
  FullSizeImageUrl: string;
  Title: string;
  AlternateText: string;
  CustomProperties: CustomProperties;
}

export interface CustomProperties {
  additionalProp1: string;
  additionalProp2: string;
  additionalProp3: string;
}

export interface CustomProperties2 {
  additionalProp1: string;
  additionalProp2: string;
  additionalProp3: string;
}

export interface CustomProperties3 {
  additionalProp1: string;
  additionalProp2: string;
  additionalProp3: string;
}
