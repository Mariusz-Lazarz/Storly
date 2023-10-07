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
          item_brand: item.brand,
          item_category: item.category,
          item_variant: item.variant,
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

          <div className="mb-4">
            <h2 className="text-lg text-pink-500 font-semibold mb-2">
              Details
            </h2>
            <p className="mb-2">
              <span className="font-medium">Category:</span>{" "}
              {item.category || "N/A"}
            </p>
            <p className="mb-2">
              <span className="font-medium">Variant:</span>{" "}
              {item.variant || "N/A"}
            </p>
            <p className="mb-2">
              <span className="font-medium">Brand:</span> {item.brand || "N/A"}
            </p>
          </div>
          <hr className="mb-4" />
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
