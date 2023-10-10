import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Header/Navbar";
import AddItemForm from "./components/AddItem/AddItemForm";
import NotFound from "./components/Error/NotFound";
import Store from "./components/Store/Store";
import HomePage from "./components/Home/HomePage";
import Footer from "./components/Footer/Footer";
import "./App.css";
import Cart from "./components/Cart/Cart";
import About from "./components/Home/About";
import Contact from "./components/Home/Contact";
import UserPanel from "./components/UserPanel/UserPanel";
import ProductDetails from "./components/Store/ProductDetails";

function App() {
  return (
    <Router>
      <div className="App flex flex-col min-h-screen bg-gradient-to-b from-blue-50 via-white to-pink-200">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/add" element={<AddItemForm />} />
            <Route path="/store" element={<Store />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/userPanel" element={<UserPanel />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
