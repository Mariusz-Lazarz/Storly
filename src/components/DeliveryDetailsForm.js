import React, { useState } from "react";

export function DeliveryDetailsForm({ onPlaceOrder }) {
  const [deliveryDetails, setDeliveryDetails] = useState({
    name: "",
    address: "",
    city: "",
    zip: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDeliveryDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onPlaceOrder(deliveryDetails);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label
          className="block text-sm font-medium text-gray-700"
          htmlFor="name"
        >
          Full Name
        </label>
        <input
          className="mt-1 p-2 w-full border rounded-md"
          type="text"
          id="name"
          name="name"
          value={deliveryDetails.name}
          onChange={handleInputChange}
          required
        />
      </div>
      <div className="mb-4">
        <label
          className="block text-sm font-medium text-gray-700"
          htmlFor="address"
        >
          Address
        </label>
        <input
          className="mt-1 p-2 w-full border rounded-md"
          type="text"
          id="address"
          name="address"
          value={deliveryDetails.address}
          onChange={handleInputChange}
          required
        />
      </div>
      <div className="mb-4">
        <label
          className="block text-sm font-medium text-gray-700"
          htmlFor="city"
        >
          City
        </label>
        <input
          className="mt-1 p-2 w-full border rounded-md"
          type="text"
          id="city"
          name="city"
          value={deliveryDetails.city}
          onChange={handleInputChange}
          required
        />
      </div>
      <div className="mb-4">
        <label
          className="block text-sm font-medium text-gray-700"
          htmlFor="zip"
        >
          ZIP Code
        </label>
        <input
          className="mt-1 p-2 w-full border rounded-md"
          type="text"
          id="zip"
          name="zip"
          value={deliveryDetails.zip}
          onChange={handleInputChange}
          required
        />
      </div>
      <button
        type="submit"
        className="bg-light-pink text-white py-2 px-4 rounded-full mt-4"
      >
        Place Order
      </button>
    </form>
  );
}
