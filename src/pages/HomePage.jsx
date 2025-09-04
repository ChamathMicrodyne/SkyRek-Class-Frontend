import Header from "../components/Header";
import { Route, Routes } from "react-router-dom";
import ProductPage from "./client/ProductPage";
import ProductOverviewPage from "./client/ProductOverviewPage";
import Cart from "./client/Cart";
import Checkout from "./client/Checkout";

function HomePage() {
  return (
    <div className="w-full h-screen flex flex-col items-center">
      <Header />
      <div className="w-full h-[calc(100vh-80px)] flex flex-col items-center">
        <Routes path="/*">
        <Route path="/" element={<h1>Home</h1>}/>
        <Route path="/products" element={<ProductPage/>}/>
        <Route path="/about" element={<h1>About</h1>}/>
        <Route path="/contact" element={<h1>Contact</h1>}/>
        <Route path="/products/overview/:id" element={<ProductOverviewPage/>}/>
        <Route path="/cart" element={<Cart/>}/>
        <Route path="/checkout" element={<Checkout/>}/>
        <Route path="/*" element={<h1>404 Not Found</h1>}/>
        </Routes>
      </div>
    </div>
  );
}

export default HomePage;
