import React from "react";
import "../../App.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

function ReviewCarousel() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
  };

  function renderSlide(reviewText, reviewerName) {
    return (
      <div className="flex flex-col items-center p-4">
        <FontAwesomeIcon
          icon={faUser}
          className="w-12 h-12 rounded-full mb-2 dark:text-white"
        />
        <span className="block mb-2 text-center dark:text-gray-300">
          - {reviewerName}
        </span>
        <p className="text-center dark:text-gray-300">{reviewText}</p>
      </div>
    );
  }

  return (
    <div className="mt-8 mb-8">
      <h2 className="text-2xl font-bold mb-4 dark:text-gray-300">
        Real Feedback from Happy Shoppers
      </h2>
      <Slider {...settings}>
        {renderSlide(
          "Ten sklep jest najlepszy woooooooooow!!!!!!!!!",
          "Lipski Bartek"
        )}
        {renderSlide(
          "My tracking is working in GA but not in Piwik!!!!!!!!",
          "Google Analytics"
        )}
        {renderSlide(
          "Swojego macbooka kupywalem wlasnie tutaj :OO !!!!!",
          "Grucha"
        )}
        {renderSlide(
          "Looker studtio a co to takiego? Nie polecam!",
          "Loyal Customer"
        )}
      </Slider>
    </div>
  );
}

export default React.memo(ReviewCarousel);
