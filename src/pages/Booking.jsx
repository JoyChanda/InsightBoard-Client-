import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";

const Booking = () => {
    const { id } = useParams(); // product ID
    const navigate = useNavigate();
    const { user } = useAuth();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    const { register, handleSubmit, watch, formState: { errors }, setValue } = useForm();
    
    // Watch quantity to calculate total price dynamically
    const watchQty = watch("qty", 0);
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_API_URL}/products/${id}`);
                setProduct(res.data);
                
                // Set default/min quantity
                setValue("qty", res.data.minQty || 1);
            } catch {
                toast.error("Failed to load product details.");
                navigate("/products");
            } finally {
                setLoading(false);
            }
        };
        fetchProduct();
    }, [id, navigate, setValue]);

    useEffect(() => {
        if (product) {
            setTotalPrice(product.price * watchQty);
        }
    }, [watchQty, product]);

    const onSubmit = async (data) => {
        // Payment Redirect Logic
        const isOnlinePayment = ["Card", "Credit Card", "Stripe", "PayFast", "Online Payment"].includes(data.paymentMethod);

        if (isOnlinePayment) {
            toast.info("Redirecting to Payment Gateway...", { autoClose: 2000 });
            // Simulate Payment Gateway Delay
            await new Promise(resolve => setTimeout(resolve, 2000));
            // In a real app, window.location.href = paymentUrl;
            // For now, proceed to order placement as 'success' from gateway
        }

        try {
            const orderData = {
                productId: product._id,
                qty: Number(data.qty),
                shippingAddress: data.address,
                contactNumber: data.contact,
                receiverName: `${data.firstName} ${data.lastName}`,
                additionalNotes: data.notes,
                paymentMethod: data.paymentMethod
            };

            await axios.post(`${import.meta.env.VITE_API_URL}/bookings`, orderData, {
                withCredentials: true 
            });

            toast.success(isOnlinePayment ? "Payment Successful! Booking Placed." : "Booking placed successfully!");
            navigate("/dashboard/my-orders");
        } catch (err) {
            console.error(err);
            toast.error(err.response?.data?.message || "Failed to place order.");
        }
    };

    if (loading) return (
        <div className="flex justify-center items-center h-screen">
            <div className="loading loading-spinner loading-lg text-primary"></div>
        </div>
    );

    if (!product) return null;

    return (
        <div className="container mx-auto px-4 py-10 max-w-3xl">
            <h1 className="text-3xl font-bold mb-8 text-center text-gray-900 dark:text-white">Complete Your Booking</h1>
            
            <div className="bg-white dark:bg-gray-800 shadow-2xl rounded-2xl overflow-hidden flex flex-col md:flex-row">
                
                {/* Product Summary Sidebar (or Top) */}
                <div className="w-full md:w-1/3 bg-gray-50 dark:bg-gray-700 p-6 flex flex-col gap-4">
                    <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 border-b pb-2">Order Summary</h3>
                    <img src={product.images?.[0]} alt={product.title} className="w-full h-32 object-cover rounded-lg" />
                    <div>
                        <p className="font-semibold text-gray-700 dark:text-gray-300">{product.title}</p>
                        <p className="text-sm text-gray-500">{product.category}</p>
                    </div>
                    <div className="mt-auto pt-4 border-t dark:border-gray-600">
                        <div className="flex justify-between text-sm mb-1">
                            <span>Price per unit:</span>
                            <span>${product.price}</span>
                        </div>
                        <div className="flex justify-between text-lg font-bold text-primary">
                            <span>Total:</span>
                            <span>${totalPrice}</span>
                        </div>
                    </div>
                </div>

                {/* Booking Form */}
                <div className="w-full md:w-2/3 p-8">
                     <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        
                        {/* Read Only User Info */}
                        <div className="form-control">
                            <label className="label"><span className="label-text">Email</span></label>
                            <input type="email" value={user?.email || ""} readOnly className="input input-bordered w-full bg-gray-100 dark:bg-gray-600" />
                        </div>

                        {/* Name Fields */}
                        <div className="flex gap-4">
                            <div className="form-control w-1/2">
                                <label className="label"><span className="label-text">First Name</span></label>
                                <input 
                                    type="text" 
                                    {...register("firstName", { required: "First Name is required" })} 
                                    className="input input-bordered w-full" 
                                />
                                {errors.firstName && <span className="text-error text-xs mt-1">{errors.firstName.message}</span>}
                            </div>
                            <div className="form-control w-1/2">
                                <label className="label"><span className="label-text">Last Name</span></label>
                                <input 
                                    type="text" 
                                    {...register("lastName", { required: "Last Name is required" })} 
                                    className="input input-bordered w-full" 
                                />
                                {errors.lastName && <span className="text-error text-xs mt-1">{errors.lastName.message}</span>}
                            </div>
                        </div>

                        {/* Contact & Address */}
                        <div className="form-control">
                            <label className="label"><span className="label-text">Contact Number</span></label>
                            <input 
                                type="tel" 
                                {...register("contact", { required: "Contact Number is required" })} 
                                className="input input-bordered w-full" 
                            />
                            {errors.contact && <span className="text-error text-xs mt-1">{errors.contact.message}</span>}
                        </div>

                        <div className="form-control">
                            <label className="label"><span className="label-text">Delivery Address</span></label>
                            <textarea 
                                {...register("address", { required: "Address is required" })} 
                                className="textarea textarea-bordered h-24"
                            ></textarea>
                             {errors.address && <span className="text-error text-xs mt-1">{errors.address.message}</span>}
                        </div>

                        {/* Quantity */}
                         <div className="form-control">
                            <label className="label"><span className="label-text">Quantity (Min: {product.minQty}, Max: {product.qty})</span></label>
                            <input 
                                type="number" 
                                {...register("qty", { 
                                    required: "Quantity is required",
                                    min: { value: product.minQty, message: `Minimum quantity is ${product.minQty}` },
                                    max: { value: product.qty, message: `Maximum available is ${product.qty}` }
                                })} 
                                className="input input-bordered w-full" 
                            />
                             {errors.qty && <span className="text-error text-xs mt-1">{errors.qty.message}</span>}
                        </div>

                        {/* Payment Method */}
                        <div className="form-control">
                             <label className="label"><span className="label-text">Payment Method</span></label>
                             <select className="select select-bordered w-full" {...register("paymentMethod", { required: "Please select a payment method" })}>
                                <option value="">Select Option</option>
                                {product.paymentOptions?.map(opt => (
                                    <option key={opt} value={opt}>{opt}</option>
                                ))}
                             </select>
                             {errors.paymentMethod && <span className="text-error text-xs mt-1">{errors.paymentMethod.message}</span>}
                        </div>

                        {/* Notes */}
                        <div className="form-control">
                            <label className="label"><span className="label-text">Additional Notes (Optional)</span></label>
                            <textarea {...register("notes")} className="textarea textarea-bordered"></textarea>
                        </div>

                        <div className="mt-6">
                            <button type="submit" className="btn btn-primary w-full btn-lg">
                                Confirm & Place Order - ${totalPrice}
                            </button>
                        </div>

                     </form>
                </div>
            </div>
        </div>
    );
};

export default Booking;
