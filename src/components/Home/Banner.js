import { Link } from "react-router-dom";
import "animate.css";
import "./Banner.css";

const Banner = () => {
  return (
    <div className="background-image flex flex-col lg:flex-row justify-center items-center lg:justify-between p-6 lg:p-36 text-white">
      <div className="text-center md:text-left lg:text-left md:mr-0 lg:mr-4 lg:flex-1 animate__animated animate__fadeIn">
        <h1 className="text-3xl lg:text-5xl font-bold mb-4 animate__animated animate__slideInDown">
          <span className="text-red-600">Discover</span> Your Next Favorite Item
          at Storly!
        </h1>
        <p className="text-xl lg:text-2xl mb-8 animate__animated animate__fadeIn">
          Dive into a curated collection of premium products, each handpicked
          for its quality and style. At Storly, we blend craftsmanship with
          aesthetic appeal, offering more than just items, but an experience.
          Explore and find pieces that resonate with your unique taste.
        </p>
        <Link to="/store">
          <button className="bg-light-pink px-4 py-2 font-thin text-2xl rounded hover:opacity-80 transform transition-all animate__animated animate__slideInLeft">
            Shop Now
          </button>
        </Link>
        <span className="mx-4">OR</span>
        <Link to="/add">
          <button className="bg-light-pink px-4 py-2 font-thin text-2xl rounded hover:opacity-80 transform transition-all animate__animated animate__slideInRight">
            List item
          </button>
        </Link>
      </div>
      <div className="lg:flex-1"></div>
    </div>
  );
};

export default Banner;
