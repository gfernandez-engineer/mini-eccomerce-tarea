import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import type { Product } from "@/common/types";
import { Star } from "lucide-react";
import { useCartStore } from "@/common/store/cart-store";

export function Product() {
  const { id } = useParams();
  const [product, setProduct] = useState<Product>();

  const { addProductToCart } = useCartStore();

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((response) => response.json())
      .then((data) => setProduct(data));
  }, [id]);

  if (!product) return <div>No existe el producto</div>;

  return (
    <div className="p-4">
      <div className="grid grid-cols-2 items-center">
        <div className="mx-auto">
          <img
            className="w-2xs h-36"
            src={product.image}
            alt={product?.title}
          />
        </div>
        <div className="flex flex-col gap-4">
          <h2 className="text-xl font-semibold">{product.title}</h2>
          <span className="flex gap-2 items-center">
            {product.rating.rate}
            <Star className="text-amber-400" />
            <span className="text-xs opacity-50 italic">
              {product.rating.count} reviews
            </span>
          </span>

          <p className="opacity-60">{product.description}</p>
          <button
            onClick={() => addProductToCart(product)}
            className="bg-red-500 text-white w-3xs p-2 rounded-md"
          >
            Agregar
          </button>
        </div>
      </div>
    </div>
  );
}
