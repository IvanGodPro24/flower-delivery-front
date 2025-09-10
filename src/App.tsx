import { lazy, Suspense } from "react";
import "./App.css";
import { Toaster } from "sonner";
import Loader from "./components/Loader/Loader";
import Layout from "./components/Layout/Layout";
import { Route, Routes } from "react-router-dom";

const FlowerShopsPage = lazy(
  () => import("./pages/FlowerShopsPage/FlowerShopsPage")
);
const ShoppingCartPage = lazy(
  () => import("./pages/ShoppingCartPage/ShoppingCartPage")
);
const NotFoundPage = lazy(() => import("./pages/NotFoundPage/NotFoundPage"));

function App() {
  return (
    <>
      <Toaster expand position="top-center" />

      <Layout>
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/shops" element={<FlowerShopsPage />} />
            <Route path="/shopping-cart" element={<ShoppingCartPage />} />

            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </Layout>
    </>
  );
}

export default App;
