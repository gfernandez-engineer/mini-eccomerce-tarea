import { useCartStore } from "@/common/store/cart-store";

const MyCart = () => {
  const { cart, removeProductFromCart, increaseQuantity, decreaseQuantity, getTotal } =
    useCartStore();

  if (cart.length === 0) {
    return (
      <div className="p-8">
        <h2 className="text-2xl">Tu carrito está vacío</h2>
      </div>
    );
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl mb-6">Mi Carrito</h1>

      <div className="space-y-4">
        {cart.map((item) => (
          <div
            key={item.id}
            className="flex items-center gap-4 border p-4 rounded"
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-20 h-20 object-contain"
            />

            <div className="flex-1">
              <h3 className="font-semibold">{item.title}</h3>
              <p className="text-gray-600">S/. {item.price}</p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => decreaseQuantity(item.id)}
                className="px-3 py-1 bg-gray-200 rounded"
              >
                -
              </button>
              <span className="px-4">{item.quantity}</span>
              <button
                onClick={() => increaseQuantity(item.id)}
                className="px-3 py-1 bg-gray-200 rounded"
              >
                +
              </button>
            </div>

            <p className="font-bold">
              S/. {(item.price * item.quantity).toFixed(2)}
            </p>

            <button
              onClick={() => removeProductFromCart(item.id)}
              className="px-4 py-2 bg-red-500 text-white rounded"
            >
              Eliminar
            </button>
          </div>
        ))}
      </div>

      <div className="mt-8 border-t pt-4">
        <h2 className="text-2xl font-bold text-right">
          Total: S/. {getTotal().toFixed(2)}
        </h2>
      </div>
    </div>
  );
};

export default MyCart;
