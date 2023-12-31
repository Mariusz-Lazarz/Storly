import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Header/Navbar";
import Footer from "./components/Footer/Footer";
import BotChat from "./components/ChatBot/BotChat";
import "./App.css";
import LoadingSpinner from "./utils/LoadingSpinner";
import useDarkMode from "./hooks/useDarkMode";

const AddItemForm = lazy(() => import("./components/AddItem/AddItemForm"));
const NotFound = lazy(() => import("./components/Error/NotFound"));
const Store = lazy(() => import("./components/Store/Store"));
const NewHomePage = lazy(() => import("./components/Home/NewHomePage"));
const Cart = lazy(() => import("./components/Cart/Cart"));
const About = lazy(() => import("./components/Home/About"));
const Contact = lazy(() => import("./components/Home/Contact"));
const UserPanel = lazy(() => import("./components/UserPanel/UserPanel"));
const ProductDetails = lazy(() => import("./components/Store/ProductDetails"));

function App() {
  useDarkMode();
  return (
    <Router>
      <div className="App flex flex-col min-h-screen bg-gradient-to-b from-blue-50 via-white to-pink-200 dark:bg-gradient-to-b dark:from-dark-container dark:via-dark-primary dark:to-dark-secondary">
        <Navbar />
        <main>
          <Suspense fallback={<LoadingSpinner />}>
            <Routes>
              <Route path="/" element={<NewHomePage />} />
              <Route path="/add" element={<AddItemForm />} />
              <Route path="/store" element={<Store />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/userPanel" element={<UserPanel />} />
              <Route path="/product/:id" element={<ProductDetails />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </main>
        <BotChat />
        <Footer />
      </div>
    </Router>
  );
}

export default App;
