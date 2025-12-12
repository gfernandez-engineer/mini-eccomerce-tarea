import { createBrowserRouter } from "react-router-dom";

import HomeScreen from "@/app/home/home";
import ProductScreen from "@/app/product/product";
import ProductsScreen from "@/app/products/products";
import { StoreLayout } from "@/layouts/store-layout/store-layout";
import { CartScreen } from "@/features/mycart/cart";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <StoreLayout />,
    children: [
      {
        index: true,
        element: <HomeScreen />,
      },
      {
        path: "/products",
        element: <ProductsScreen />,
      },
      {
        path: "/products/:id",
        element: <ProductScreen />,
      },
      {
        path: "/mycart",
        element: <CartScreen />,
      },
    ],
  },
]);
