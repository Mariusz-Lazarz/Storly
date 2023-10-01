import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import AddItemForm from "./components/AddItemForm";
import NotFound from "./components/NotFound";
import Store from "./components/Store";
import HomePage from "./components/HomePage";
import Footer from "./components/Footer"; // Import the Footer component
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/add" element={<AddItemForm />} />
            <Route path="/store" element={<Store />} />
            <Route path="/" element={<HomePage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer /> {/* Include the Footer component */}
      </div>
    </Router>
  );
}

export default App;
