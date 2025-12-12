import { Header } from "@/common/components/header";
import { Outlet } from "react-router-dom";

export const StoreLayout = () => {
  return (
    <main>
      <Header />
      <Outlet />
    </main>
  );
};
