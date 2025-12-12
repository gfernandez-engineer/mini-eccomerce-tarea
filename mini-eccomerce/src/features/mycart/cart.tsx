import { useCartStore } from "@/common/store/cart-store";

export function CartScreen() {
  const cart = useCartStore((state) => state.cart);
  const remove = useCartStore((state) => state.removeProductFromCart);
  const clear = useCartStore((state) => state.clearCart);

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">🛒 Tu carrito</h2>

      {cart.length === 0 ? (
        <p>El carrito está vacío.</p>
      ) : (
        <ul className="flex flex-col gap-2">
          {cart.map((item) => (
            <li key={item.id} className="flex justify-between items-center">
              <span>
                {item.title} - {item.quantity} x S/. {item.price}
              </span>
              <button
                onClick={() => remove(item.id)}
                className="text-red-500 text-sm"
              >
                Eliminar
              </button>
            </li>
          ))}
        </ul>
      )}

      <p className="mt-4 font-semibold">Total: S/. total </p>

      {cart.length > 0 && (
        <button
          onClick={clear}
          className="mt-2 bg-gray-500 text-white px-4 py-2 rounded-md"
        >
          Vaciar carrito
        </button>
      )}
    </div>
  );
}
