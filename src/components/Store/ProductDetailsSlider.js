import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ProductDetailsSlider = ({ item }) => {
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
  return (
    <div className="w-full md:w-1/2 p-4 flex items-center justify-center">
      <Slider {...settings} className="w-full md:w-1/2">
        {item.imageLinks.map((imgLink, index) => (
          <div key={index} className="w-full h-64 md:h-96">
            <img
              src={imgLink}
              alt={`${item.title} ${index}`}
              className="w-full h-full object-fit"
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ProductDetailsSlider;
