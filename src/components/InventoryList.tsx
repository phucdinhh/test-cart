import { Button } from "antd";
import { ProductType } from "../types";

interface IInventoryListProps {
  inventory: ProductType[];
  addToCart: (product: ProductType) => void;
}

const InventoryList = ({ inventory, addToCart }: IInventoryListProps) => {
  return (
    <div>
      <h2>Inventory</h2>
      <ul>
        {inventory.map((item) => (
          <li key={item.name} className="flex items-center gap-2 mb-2">
            <span className="w-[150px]">
              {item.name} - {item.quantity}
            </span>
            <Button
              type="primary"
              onClick={() => addToCart(item)}
              disabled={item.quantity === 0}
            >
              Add to Cart
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default InventoryList;
