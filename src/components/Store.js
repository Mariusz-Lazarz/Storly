import React from "react";

function Store() {
  const dummyItems = Array(12).fill({
    title: "Dummy Item",
    imageUrl: "https://via.placeholder.com/150",
  });

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {dummyItems.map((item, index) => (
          <div key={index} className="bg-white p-4 rounded shadow-lg">
            <img
              src={item.imageUrl}
              alt={item.title}
              className="w-full h-48 object-cover rounded mb-4"
            />
            <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
            <button className="bg-light-pink text-white py-2 px-4 rounded-full">
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Store;
