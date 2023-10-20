import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faTwitter,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-gray-800 p-4 mt-auto text-white dark:bg-dark-primary">
      <div className="container mx-auto justify-between items-center flex flex-col md:flex-row">
        <div className="flex space-x-4">
          <a
            href="https://www.facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800"
          >
            <FontAwesomeIcon icon={faFacebook} size="2x" />
          </a>
          <a
            href="https://www.twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:text-blue-600"
          >
            <FontAwesomeIcon icon={faTwitter} size="2x" />
          </a>
          <a
            href="https://www.instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-pink-600 hover:text-pink-800"
          >
            <FontAwesomeIcon icon={faInstagram} size="2x" />
          </a>
        </div>
        <div className="flex space-x-4">
          {" "}
          <Link to="/about" className="text-white hover:underline">
            About
          </Link>
          <Link to="/contact" className="text-white hover:underline">
            Contact
          </Link>
          <a
            href="https://www.piwik.pro"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:underline"
          >
            Piwik PRO
          </a>
        </div>
        <div className="text-white">
          &copy; {new Date().getFullYear()} Mariusz Łazarz
        </div>
      </div>
    </footer>
  );
}

export default Footer;
