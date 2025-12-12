import type { Product } from "@/common/types";
import { Link } from "react-router-dom";

interface Props {
  product: Product;
}

export const ProductCard = ({ product }: Props) => {
  const { category, description, image, price, title, id } = product;

  const linkTo = `/products/${id}`;

  return (
    <Link
      to={linkTo}
      className="border border-gray-600/50 rounded-xl p-4 w-3xs flex flex-col gap-4"
    >
      <label className="w-fit px-2 rounded-3xl bg-green-500/50 text-[10px]">
        {category}
      </label>
      <img className="w-full h-36" src={image} alt={title} />
      <h3 className="text-xs font-bold">{title}</h3>
      <p className="text-xs line-clamp-2">{description}</p>
      <label>S/. {price}</label>
    </Link>
  );
};
