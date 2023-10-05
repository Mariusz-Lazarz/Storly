import { useLocation } from "react-router-dom";
import { DataLayer } from "@piwikpro/react-piwik-pro";

const ProductDetails = () => {
  const location = useLocation();
  const item = location.state;

  DataLayer.push({
    event: "product_detail_view",
    ecommerce: {
      items: [
        {
          item_id: String(item.id),
          item_name: item.title,
          price: String(item.price),
          quantity: 1,
          item_brand: `${item.title} + Brand`,
          item_category: `${item.title} + Category`,
          item_variant: `${item.title} + S`,
        },
      ],
    },
  });

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-wrap justify-center items-center">
        <div className="w-full md:w-1/2 p-4 flex items-center justify-center">
          <img
            src={item.imageLink}
            alt={item.title}
            className="w-1/2 object-cover"
          />
        </div>

        <div className="w-full md:w-1/2 p-4 flex flex-col">
          <h1 className="text-2xl text-pink-500 font-bold mb-2">
            {item.title}
          </h1>
          <p className="text-xl text-red-300 mb-4">${item.price}</p>

          <hr className="mb-4" />

          <p className="mb-4">{item.description}</p>

          <hr className="mb-4" />

          {/* <div className="mb-4 flex flex-col">
            <label htmlFor="quantity" className="block mb-2">
              Quantity:
            </label>
            <input
              type="number"
              id="quantity"
              name="quantity"
              min="1"
              className="border rounded-lg p-2 mb-4 w-1/3"
            />
            <button className="bg-light-pink text-white py-2 px-4 rounded-lg w-1/3">
              Add to Cart
            </button>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
