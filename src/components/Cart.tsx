import { Button, Input, message } from "antd";
import { CartItemType } from "../types";

interface ICartProps {
  cart: CartItemType[];
  updateCartQuantity: (productName: string, quantity: number) => void;
  removeFromCart: (productName: string) => void;
}

const Cart = ({ cart, updateCartQuantity, removeFromCart }: ICartProps) => {
  const [messageApi, contextHolder] = message.useMessage();

  return (
    <>
      {contextHolder}
      <div className="flex flex-col">
        <h2>Cart</h2>
        {!cart.length ? (
          "No items yet"
        ) : (
          <ul>
            {cart.map((item) => (
              <li key={item.name} className="flex items-center gap-2 mb-2">
                <span className="w-[150px]">
                  {item.name} - ${item.unitPrice} x
                </span>
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
                    const value = parseInt(e.target.value, 10);
                    if (isNaN(value) || value < 0) {
                      messageApi.error(
                        "Invalid input. Please enter a positive integer."
                      );
                      return;
                    }
                    updateCartQuantity(item.name, value);
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
                <span className="w-[100px]">
                  = ${(item.cartQuantity * item.unitPrice).toFixed(2)}{" "}
                </span>
                <Button danger onClick={() => removeFromCart(item.name)}>
                  Remove
                </Button>
              </li>
            ))}
          </ul>
        )}
        <div className="flex justify-end">
          <h3 className="mr-4">
            Total: $
            {cart
              .reduce(
                (acc, item) => acc + item.cartQuantity * item.unitPrice,
                0
              )
              .toFixed(2)}
          </h3>
        </div>
      </div>
    </>
  );
};

export default Cart;
