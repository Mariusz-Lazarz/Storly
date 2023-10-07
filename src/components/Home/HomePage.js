import React from "react";
import "../../App.css";
import { Link } from "react-router-dom";
import ReviewCarousel from "./ReviewCarousel";

function HomePage() {
  return (
    <>
      <div className="bg-container text-center"></div>
      <div className="container mx-auto p-6">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Welcome to Storly!</h1>
          <p className="text-lg mb-8">
            Najlepszy i najfajniejszy sklep w jakim byłeś
          </p>
          <div className="flex flex-wrap justify-center">
            <Link
              to="/store"
              className="m-4 no-underline transform transition-transform duration-500 hover:scale-105"
            >
              <div className="p-6 bg-white rounded shadow-lg w-72 transition-colors duration-300 hover:bg-gray-100">
                <h2 className="text-2xl font-bold mb-2">Przeglądaj</h2>
                <p className="text-lg">
                  Przegladaj i zamawiaj najlepsze produkty z Turcji
                </p>
              </div>
            </Link>
            <Link
              to="/add"
              className="m-4 no-underline transform transition-transform duration-500 hover:scale-105"
            >
              <div className="p-6 bg-white rounded shadow-lg w-72 transition-colors duration-300 hover:bg-gray-100">
                <h2 className="text-2xl font-bold mb-2">Wystaw</h2>
                <p className="text-lg">Handlujesz, dodaj swoje guczi tutaj</p>
              </div>
            </Link>
          </div>
          <div className="mt-8 mb-8">
            <h2 className="text-2xl font-bold mb-4">
              Jak radzimy sobie z klientami
            </h2>
            <ReviewCarousel />
          </div>
        </div>
      </div>
    </>
  );
}

export default HomePage;
