import React, { useState } from "react";

const AddProduct = () => {
  const [images, setImages] = useState([]);
  const [form, setForm] = useState({
    title: "",
    desc: "",
    price: "",
    qty: "",
    minQty: "",
    payment: "",
    imageUrl: "",
  });

  // Handle input change
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // Add image URL to preview list
  const handleAddImage = () => {
    if (form.imageUrl.trim() !== "") {
      setImages([...images, form.imageUrl]);
      setForm({ ...form, imageUrl: "" });
    }
  };

  // Remove image from preview
  const handleRemoveImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-semibold mb-4">Add New Product</h1>

      <div className="grid gap-4">

        {/* Title */}
        <input
          type="text"
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Product Title"
          className="border px-3 py-2 rounded w-full"
        />

        {/* Description */}
        <textarea
          name="desc"
          value={form.desc}
          onChange={handleChange}
          placeholder="Product Description"
          className="border px-3 py-2 rounded w-full h-24"
        />

        {/* Price */}
        <input
          type="number"
          name="price"
          value={form.price}
          onChange={handleChange}
          placeholder="Price"
          className="border px-3 py-2 rounded w-full"
        />

        {/* Quantity */}
        <input
          type="number"
          name="qty"
          value={form.qty}
          onChange={handleChange}
          placeholder="Available Quantity"
          className="border px-3 py-2 rounded w-full"
        />

        {/* Minimum Order Quantity */}
        <input
          type="number"
          name="minQty"
          value={form.minQty}
          onChange={handleChange}
          placeholder="Minimum Order Quantity"
          className="border px-3 py-2 rounded w-full"
        />

        {/* Payment Options */}
        <select
          name="payment"
          value={form.payment}
          onChange={handleChange}
          className="border px-3 py-2 rounded w-full"
        >
          <option value="">Select Payment Option</option>
          <option value="cash">Cash Payment</option>
          <option value="online">Online Payment</option>
          <option value="both">Both Available</option>
        </select>

        {/* Image URL Input */}
        <div className="flex gap-2">
          <input
            type="text"
            name="imageUrl"
            value={form.imageUrl}
            onChange={handleChange}
            placeholder="Paste Image URL"
            className="border px-3 py-2 rounded w-full"
          />
          <button
            onClick={handleAddImage}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Add
          </button>
        </div>

        {/* Image Preview */}
        {images.length > 0 && (
          <div className="grid grid-cols-3 gap-3 mt-3">
            {images.map((img, i) => (
              <div key={i} className="relative">
                <img
                  src={img}
                  alt="preview"
                  className="w-full h-24 object-cover border rounded"
                />
                <button
                  onClick={() => handleRemoveImage(i)}
                  className="absolute top-0 right-0 bg-red-500 text-white text-xs px-2 py-1 rounded-bl"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Submit Button */}
        <button
          className="mt-4 bg-green-600 text-white py-2 px-4 rounded w-full hover:bg-green-700"
          onClick={() => alert("Submit function not added yet")}
        >
          Add Product
        </button>
      </div>
    </div>
  );
};

export default AddProduct;
