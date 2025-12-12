import { Home, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import { useCartStore } from "../store/cart-store";
import { useState } from "react";

export const Header = () => {
  const { cart } = useCartStore();
  const [openCart, setOpenCart] = useState<boolean>(false);

  const removeProductFromCart = useCartStore(
    (state) => state.removeProductFromCart
  );
  const increaseQuantity = useCartStore((state) => state.increaseQuantity);
  const decreaseQuantity = useCartStore((state) => state.decreaseQuantity);
  const getTotal = useCartStore((state) => state.getTotal);
  
  return (
    <div className="relative flex px-4 items-center justify-between h-16 bg-red-500 text-white">
      <Link to={"/"}>
        <Home />
      </Link>

      <div className="flex items-center gap-4">
        <Link to={"/products"}>Tienda</Link>
        <button
          className="cursor-pointer relative"
          onClick={() => setOpenCart(!openCart)}
        >
          <ShoppingCart />
          <label className="bg-blue-600 text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center absolute -top-2 -right-2">
            {cart.length}
          </label>
        </button>
      </div>

      {openCart && (
        <div className="absolute right-5 top-14 w-[400px] max-h-[300px] overflow-y-auto bg-white text-black border border-gray-300 rounded-lg shadow-md p-4">
          {cart.map((product) => (
            <div
              key={product.id}
              className="flex items-center gap-3 border-b pb-2"
            >
              <img
                src={product.image}
                alt={product.title}
                className="h-12 w-12 rounded-md object-cover"
              />
              <div className="flex flex-col flex-1">
                <h3 className="text-sm font-medium">{product.title}</h3>
                <p className="text-xs text-gray-500">
                  Subtotal: S/. {(product.price * product.quantity).toFixed(2)}
                </p>
                <div className="flex items-center gap-2 mt-2">
                  <button
                    onClick={() => decreaseQuantity(product.id)}
                    className="px-3 py-1 bg-red-200 text-red-600 rounded-full text-sm"
                  >
                    -1
                  </button>
                  <span className="px-2">{product.quantity}</span>
                  <button
                    onClick={() => increaseQuantity(product.id)}
                    className="px-3 py-1 bg-blue-200 text-green-600 rounded-full text-sm"
                  >
                    +1
                  </button>
                </div>
              </div>
              <button
                onClick={() => removeProductFromCart(product.id)}
                className="text-red-500 hover:text-red-700"
              ></button>
            </div>
          ))}

          <div className="flex justify-between items-center border-t pt-5 ">
            <span className="font-semibold">
              Total: S/. {getTotal().toFixed(2)}
            </span>
            <div className="flex gap-4">
              <button className="bg-orange-300 px-3 py-1 rounded-md">
                Add more products
              </button>
              <button className="bg-green-500 text-white px-4 py-1 rounded-md">
                Checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
