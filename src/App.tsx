import { useState } from "react";
import { CartItemType, ProductType } from "./types";
import InventoryList from "./components/InventoryList";
import Cart from "./components/Cart";
import { message } from "antd";

const initialInventory: ProductType[] = [
  { name: "bacon", unitPrice: 10.99, quantity: 10 },
  { name: "eggs", unitPrice: 3.99, quantity: 10 },
  { name: "cheese", unitPrice: 6.99, quantity: 10 },
  { name: "chives", unitPrice: 1.0, quantity: 10 },
  { name: "wine", unitPrice: 11.99, quantity: 10 },
  { name: "brandy", unitPrice: 17.55, quantity: 10 },
  { name: "bananas", unitPrice: 0.69, quantity: 10 },
  { name: "ham", unitPrice: 2.69, quantity: 10 },
  { name: "tomatoes", unitPrice: 3.26, quantity: 10 },
  { name: "tissue", unitPrice: 8.45, quantity: 10 },
];

function App() {
  const [inventory, setInventory] = useState<ProductType[]>(initialInventory);
  const [cart, setCart] = useState<CartItemType[]>([]);
  const [messageApi, contextHolder] = message.useMessage();

  const updateInventory = (productName: string, delta: number) => {
    setInventory((prev) =>
      prev.map((item) =>
        item.name === productName
          ? { ...item, quantity: item.quantity + delta }
          : item
      )
    );
  };

  const updateCart = (productName: string, newCartQuantity: number) => {
    setCart((prev) =>
      prev.map((item) =>
        item.name === productName
          ? { ...item, cartQuantity: newCartQuantity }
          : item
      )
    );
  };

  const addToCart = (product: ProductType) => {
    const existing = cart.find((item) => item.name === product.name);

    if (existing) {
      updateCartQuantity(product.name, existing.cartQuantity + 1);
    } else {
      setCart((prev) => [...prev, { ...product, cartQuantity: 1 }]);
      updateInventory(product.name, -1);
    }
  };

  const updateCartQuantity = (
    productName: string,
    newCartQuantity: number = 0
  ) => {
    if (!Number.isInteger(newCartQuantity) || newCartQuantity < 0) {
      messageApi.error("Invalid quantity. Please enter a positive integer.");
      return;
    }

    const product = inventory.find((item) => item.name === productName);
    const cartItem = cart.find((item) => item.name === productName);

    if (!product || !cartItem) return;

    if (newCartQuantity === 0) {
      removeFromCart(productName);
      return;
    }

    const delta = newCartQuantity - cartItem.cartQuantity;

    if (delta > 0 && delta > product.quantity) {
      messageApi.error("Not enough in stock.");
      return;
    }

    updateCart(productName, newCartQuantity);
    updateInventory(productName, -delta);
  };

  const removeFromCart = (name: string) => {
    const removed = cart.find((item) => item.name === name);
    if (!removed) return;

    updateInventory(removed.name, removed.cartQuantity);
    setCart((prev) => prev.filter((item) => item.name !== name));
  };

  const totalInventoryCount = inventory.reduce(
    (acc, item) => acc + item.quantity,
    0
  );

  return (
    <>
      {contextHolder}
      <div className="flex items-center justify-center h-screen">
        <div className="flex items-start justify-between gap-32">
          <div className="flex flex-col p-4 border border-gray-300 rounded-md shadow">
            <h3>Total Inventory: {totalInventoryCount}</h3>
            <InventoryList inventory={inventory} addToCart={addToCart} />
          </div>
          <div className="flex flex-col p-4 border border-gray-300 rounded-md shadow min-w-[503px]">
            <h3>
              Total Cart:{" "}
              {cart.reduce((acc, item) => acc + item.cartQuantity, 0)}
            </h3>
            <Cart
              cart={cart}
              updateCartQuantity={updateCartQuantity}
              removeFromCart={removeFromCart}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
