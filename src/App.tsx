import { useState } from "react";
import { CartItemType, ProductType } from "./types";
import InventoryList from "./components/InventoryList";
import Cart from "./components/Cart";

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
  const [inventyory, setInventory] = useState<ProductType[]>(initialInventory);
  const [cart, setCart] = useState<CartItemType[]>([]);

  const addToCart = (product: ProductType) => {
    const existing = cart.find((item) => item.name === product.name);

    if (existing) {
      updateCartQuantity(product.name, existing.cartQuantity + 1);
    } else {
      setCart((prev) => [...prev, { ...product, cartQuantity: 1 }]);
      setInventory((prev) =>
        prev.map((item) =>
          item.name === product.name
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
      );
    }
  };

  const updateCartQuantity = (
    productName: string,
    newCartQuantity: number = 0
  ) => {
    const product = inventyory.find((item) => item.name === productName);
    const cartItem = cart.find((item) => item.name === productName);

    if (!product || !cartItem) return;

    if (newCartQuantity === 0) {
      removeFromCart(productName);
      return;
    }

    const delta = newCartQuantity - cartItem.cartQuantity;

    if (delta > 0 && delta > product.quantity) {
      alert("not enough in stock");
      return;
    }

    setCart((prev) =>
      prev.map((item) =>
        item.name === productName
          ? { ...item, cartQuantity: newCartQuantity }
          : item
      )
    );

    setInventory((prev) =>
      prev.map((item) =>
        item.name === productName
          ? { ...item, quantity: item.quantity - delta }
          : item
      )
    );
  };

  const removeFromCart = (name: string) => {
    const removed = cart.find((item) => item.name === name);
    if (!removed) return;

    setInventory((prev) =>
      prev.map((item) =>
        item.name === removed.name
          ? { ...item, quantity: item.quantity + removed.cartQuantity }
          : item
      )
    );

    setCart((prev) => prev.filter((item) => item.name !== name));
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex items-start justify-between gap-32">
        <InventoryList inventory={inventyory} addToCart={addToCart} />
        <Cart
          cart={cart}
          updateCartQuantity={updateCartQuantity}
          removeFromCart={removeFromCart}
        />
      </div>
    </div>
  );
}

export default App;
