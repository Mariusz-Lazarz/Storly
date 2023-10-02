import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faTwitter,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import { Link } from "react-router-dom"; // Import the Link component

function Footer() {
  return (
    <footer className="bg-white p-4 border-t mt-auto">
      <div className="container mx-auto flex justify-between items-center">
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
          {/* New flex container for your internal links */}
          <Link to="/about" className="text-black hover:underline">
            About
          </Link>
          <Link to="/contact" className="text-black hover:underline">
            Contact
          </Link>
          <a
            href="https://www.piwik.pro"
            target="_blank"
            rel="noopener noreferrer"
            className="text-black hover:underline"
          >
            Piwik PRO
          </a>
        </div>
        <div className="text-black">
          &copy; {new Date().getFullYear()} Mariusz Łazarz
        </div>
      </div>
    </footer>
  );
}

export default Footer;
