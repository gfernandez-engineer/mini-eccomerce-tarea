import { useEffect, useState } from "react";
import type { Product } from "@/common/types";

import { ProductCard } from "@/features/products/components/product-card/product-card";

export function Products() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((response) => response.json())
      .then((data) => setProducts(data));
  }, []);

  return (
    <div className="p-6 flex justify-center gap-4 flex-wrap w-full">
      {products.map((product) => (
        <ProductCard product={product} key={product.id} />
      ))}
    </div>
  );
}
