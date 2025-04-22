export interface ProductType {
  name: string;
  unitPrice: number;
  quantity: number;
}

export interface CartItemType extends ProductType {
  cartQuantity: number;
}
