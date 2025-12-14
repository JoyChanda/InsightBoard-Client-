import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [images, setImages] = useState([]);
  const [currImage, setCurrImage] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // Add image URL
  const handleAddImage = (e) => {
    e.preventDefault();
    if (currImage.trim() !== "") {
      setImages([...images, currImage]);
      setCurrImage("");
    }
  };

  // Remove image
  const handleRemoveImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const onSubmit = async (data) => {
    try {
        setLoading(true);
        if(images.length === 0 && !data.imageUrl) {
            toast.error("Please add at least one image");
            setLoading(false);
            return;
        }

        const finalImages = images.length > 0 ? images : [data.imageUrl];

        const payload = {
            ...data,
            images: finalImages,
            paymentOptions: ["cash", "online"] // Simplified for now or can collect from checkboxes
        };

        // Handle Payment Options from Select if needed or Checkboxes
        // Assuming simple default for now based on requirement "Payment Options (Cash, Online, Both)"
        if (data.payment === "cash") payload.paymentOptions = ["Cash on Delivery"];
        if (data.payment === "online") payload.paymentOptions = ["Online Payment"];
        if (data.payment === "both") payload.paymentOptions = ["Cash on Delivery", "Online Payment"];

        await axios.post(`${import.meta.env.VITE_API_URL}/products`, payload, { withCredentials: true });
        toast.success("Product added successfully!");
        navigate("/products"); // Or Redirect to Manage Products
    } catch (err) {
        toast.error(err.response?.data?.message || "Failed to add product");
    } finally {
        setLoading(false);
    }
  };

  return (
    <div className="p-6 transition-colors duration-300">
      <div className="max-w-2xl mx-auto bg-base-100 rounded-lg shadow-xl p-6 border border-base-200">
        <h1 className="text-3xl font-bold mb-6 text-base-content text-center">Add New Product</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        
        {/* Title */}
        <div className="form-control">
            <label className="label"><span className="label-text font-bold text-base-content">Product Title</span></label>
            <input
              type="text"
              {...register("title", { required: "Title is required" })}
              className="input input-bordered w-full"
              placeholder="e.g. Premium Shirts"
            />
            {errors.title && <span className="text-red-500 text-sm">{errors.title.message}</span>}
        </div>

        {/* Description */}
        <div className="form-control">
            <label className="label"><span className="label-text font-bold text-base-content">Description</span></label>
            <textarea
              {...register("desc", { required: "Description is required" })}
              className="textarea textarea-bordered h-24"
              placeholder="Product details..."
            />
            {errors.desc && <span className="text-red-500 text-sm">{errors.desc.message}</span>}
        </div>

        {/* Price & Qty Row */}
        <div className="flex flex-col md:flex-row gap-4">
            <div className="form-control w-full">
                <label className="label"><span className="label-text font-bold text-base-content">Price ($)</span></label>
                <input
                  type="number"
                  {...register("price", { required: "Price is required", min: 1 })}
                  className="input input-bordered w-full"
                />
                {errors.price && <span className="text-red-500 text-sm">{errors.price.message}</span>}
            </div>

            <div className="form-control w-full">
                <label className="label"><span className="label-text font-bold text-base-content">Quantity</span></label>
                <input
                  type="number"
                  {...register("qty", { required: "Quantity is required", min: 0 })}
                  className="input input-bordered w-full"
                />
                 {errors.qty && <span className="text-red-500 text-sm">{errors.qty.message}</span>}
            </div>
        </div>

        {/* Min Qty & Category Row */}
        <div className="flex flex-col md:flex-row gap-4">
            <div className="form-control w-full">
                <label className="label"><span className="label-text font-bold text-base-content">Min Order Qty</span></label>
                <input
                  type="number"
                  {...register("minQty", { required: "Min Qty is required", min: 1 })}
                  className="input input-bordered w-full"
                  defaultValue={1}
                />
                 {errors.minQty && <span className="text-red-500 text-sm">{errors.minQty.message}</span>}
            </div>

             <div className="form-control w-full">
                <label className="label"><span className="label-text font-bold text-base-content">Category</span></label>
                <select
                  {...register("category", { required: "Category is required" })}
                  className="select select-bordered w-full"
                >
                    <option value="">Select Category</option>
                    <option value="Men">Men</option>
                    <option value="Women">Women</option>
                    <option value="Kids">Kids</option>
                    <option value="Accessories">Accessories</option>
                    <option value="Electronics">Electronics</option>
                    <option value="Home">Home</option>
                </select>
                {errors.category && <span className="text-red-500 text-sm">{errors.category.message}</span>}
            </div>
        </div>

        {/* Payment Options & Show On Home */}
        <div className="flex flex-col md:flex-row gap-4">
            <div className="form-control w-full">
                <label className="label"><span className="label-text font-bold text-base-content">Payment Options</span></label>
                <select
                  {...register("payment", { required: "Payment option is required" })}
                  className="select select-bordered w-full"
                >
                  <option value="both">Both (Cash & Online)</option>
                  <option value="cash">Cash Only</option>
                  <option value="online">Online Only</option>
                </select>
            </div>
             <div className="form-control w-full items-start pt-8">
                 <label className="label cursor-pointer gap-2">
                    <input type="checkbox" {...register("showOnHome")} className="checkbox checkbox-primary" />
                    <span className="label-text font-bold text-base-content">Show on Home Page?</span>
                </label>
            </div>
        </div>
        
        {/* Demo Video */}
         <div className="form-control">
            <label className="label"><span className="label-text font-bold text-base-content">Demo Video URL (Optional)</span></label>
            <input
              type="text"
              {...register("demoVideo")}
              className="input input-bordered w-full"
              placeholder="https://youtube.com/..."
            />
        </div>

        {/* Image Management */}
        <div className="form-control p-4 border rounded-lg bg-base-200 border-base-300">
          <label className="label"><span className="label-text font-bold text-base-content">Product Images</span></label>
          <div className="flex gap-2 mb-2">
            <input
              type="text"
              value={currImage}
              onChange={(e) => setCurrImage(e.target.value)}
              placeholder="Paste Image URL"
              className="input input-bordered w-full"
            />
            <button onClick={handleAddImage} className="btn btn-secondary">Add</button>
          </div>
          
           {/* Previews */}
           <div className="flex flex-wrap gap-4 mt-2">
            {images.map((img, i) => (
              <div key={i} className="relative group">
                <img src={img} alt="preview" className="w-24 h-24 object-cover rounded border border-base-300" />
                <button
                  type="button"
                  onClick={() => handleRemoveImage(i)}
                  className="absolute -top-2 -right-2 btn btn-circle btn-xs btn-error opacity-0 group-hover:opacity-100 transition-opacity"
                >✕</button>
              </div>
            ))}
          </div>
          <p className="text-xs text-base-content/70 mt-2">Add at least one image URL.</p>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className={`btn btn-primary w-full text-lg mt-6 text-white ${loading ? 'loading' : ''}`}
        >
          {loading ? 'Adding Product...' : 'Create Product'}
        </button>

      </form>
      </div>
    </div>
  );
};

export default AddProduct;
