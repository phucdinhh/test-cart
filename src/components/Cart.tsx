import { Button, Input } from "antd";
import { CartItemType } from "../types";

interface ICartProps {
  cart: CartItemType[];
  updateCartQuantity: (productName: string, quantity: number) => void;
  removeFromCart: (productName: string) => void;
}

const Cart = ({ cart, updateCartQuantity, removeFromCart }: ICartProps) => {
  return (
    <>
      <div className="flex flex-col">
        <h2>Cart</h2>
        {!cart.length ? (
          "No items yet"
        ) : (
          <ul>
            {cart.map((item) => (
              <li key={item.name} className="flex">
                {item.name} - ${item.unitPrice} x
                <Button
                  type="primary"
                  onClick={() =>
                    updateCartQuantity(item.name, item.cartQuantity - 1)
                  }
                >
                  -
                </Button>
                <Input
                  className="!w-[50px]"
                  size="small"
                  value={item.cartQuantity}
                  min={1}
                  onChange={(e) => {
                    if (!e.target.value) updateCartQuantity(item.name, 0);
                    else
                      updateCartQuantity(
                        item.name,
                        parseInt(e.target.value, 10)
                      );
                  }}
                />
                <Button
                  type="primary"
                  onClick={() =>
                    updateCartQuantity(item.name, item.cartQuantity + 1)
                  }
                >
                  +
                </Button>
                = ${(item.cartQuantity * item.unitPrice).toFixed(2)}{" "}
                <Button danger onClick={() => removeFromCart(item.name)}>
                  Remove
                </Button>
              </li>
            ))}
          </ul>
        )}
        <div className="flex justify-end">
          <h3 className="mr-4">
            Total:{" "}
            {cart.reduce(
              (acc, item) => acc + item.cartQuantity * item.unitPrice,
              0
            )}
          </h3>
        </div>
      </div>
    </>
  );
};

export default Cart;
