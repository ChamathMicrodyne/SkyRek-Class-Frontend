import React from "react";
import Header from "../components/Header";
import { Route, Routes } from "react-router-dom";
import ProductPage from "./client/ProductPage";
import ProductOverviewPage from "./client/ProductOverviewPage";
import Cart from "./client/Cart";
import Checkout from "./client/Checkout";
import Home from "./client/Home";
import AboutUs from "./client/AboutUs";
import Contact from "./client/Contact";

function HomePage() {
  return (
    <div className="w-full h-screen flex flex-col items-center">
      <Header />
      <div className="w-full h-[calc(100vh-80px)] flex flex-col items-center">
        <Routes path="/*">
        <Route path="/" element={<Home/>}/>
        <Route path="/products" element={<ProductPage/>}/>
        <Route path="/about" element={<AboutUs/>}/>
        <Route path="/contact" element={<Contact/>}/>
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
