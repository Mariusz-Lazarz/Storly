import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import AddItemForm from "./components/AddItemForm";
import NotFound from "./components/NotFound";
import Store from "./components/Store";
import HomePage from "./components/HomePage";
import Footer from "./components/Footer";
import "./App.css";
import Cart from "./components/Cart";
import About from "./components/About";
import Contact from "./components/Contact";
import UserPanel from "./components/UserPanel";
import { getAuth } from "firebase/auth";

function App() {
  const auth = getAuth();
  const user = auth.currentUser;
  return (
    <Router>
      <div className="App flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/add" element={<AddItemForm />} />
            <Route path="/store" element={<Store />} />
            <Route path="/cart" element={user ? <Cart /> : <NotFound />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route
              path="/userPanel"
              element={user ? <UserPanel /> : <NotFound />}
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
