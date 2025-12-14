import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Spinner from "../../../components/Spinner";

const AdminAllProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState(false);
    
    // Update Modal State
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        price: "",
        category: "",
        images: "",
        demoVideo: "",
        paymentOptions: ""
    });

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/products?limit=200`);
            setProducts(res.data.products);
        } catch {
            toast.error("Failed to load products");
        } finally {
            setLoading(false);
        }
    };

    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [productToDelete, setProductToDelete] = useState(null);

    const openDeleteModal = (product) => {
        setProductToDelete(product);
        setDeleteModalOpen(true);
    };

    const handleToggleHome = async (product) => {
        try {
            setUpdating(true);
            const newValue = !product.showOnHome;
            const res = await axios.patch(
                `${import.meta.env.VITE_API_URL}/products/${product._id}`, 
                { showOnHome: newValue }, 
                { withCredentials: true }
            );
            
            if (res.data.success) {
                 setProducts(products.map(p => 
                    p._id === product._id ? { ...p, showOnHome: newValue } : p
                ));
                toast.success(`Product ${newValue ? "added to" : "removed from"} Home`);
            }
        } catch (error) {
            console.error("Failed to toggle home status", error);
            toast.error("Failed to update status");
        } finally {
            setUpdating(false);
        }
    };

    const openUpdateModal = (product) => {
        setSelectedProduct(product);
        setFormData({
            title: product.title || "",
            description: product.desc || "",
            price: product.price || "",
            category: product.category || "",
            images: product.images?.join(", ") || "",
            demoVideo: product.demoVideo || "",
            paymentOptions: product.paymentOptions?.join(", ") || ""
        });
        setIsUpdateModalOpen(true);
    };

    const handleUpdateProduct = async () => {
        if (!selectedProduct) return;
        try {
            setUpdating(true);
            const payload = {
                title: formData.title,
                desc: formData.description,
                price: Number(formData.price),
                category: formData.category,
                images: formData.images.split(",").map(s => s.trim()).filter(Boolean),
                demoVideo: formData.demoVideo,
                paymentOptions: formData.paymentOptions.split(",").map(s => s.trim()).filter(Boolean)
            };

            const res = await axios.patch(
                `${import.meta.env.VITE_API_URL}/products/${selectedProduct._id}`,
                payload,
                { withCredentials: true }
            );

            if (res.data.success) {
                setProducts(products.map(p => 
                    p._id === selectedProduct._id ? res.data.product : p
                ));
                toast.success("Product updated successfully");
                setIsUpdateModalOpen(false);
                setSelectedProduct(null);
            }
        } catch (error) {
           console.error("Update failed", error);
           toast.error(error.response?.data?.message || "Failed to update product");
        } finally {
            setUpdating(false);
        }
    };






    if (loading) return <Spinner message="Loading all products..." />;

    return (
        <div className="p-6 min-h-full">
            <h1 className="text-3xl font-bold mb-6 text-base-content">All Products (Superadmin)</h1>

            <div className="overflow-x-auto bg-base-100 dark:bg-base-200 rounded-lg shadow border border-base-200 dark:border-base-300">
                <table className="table w-full">
                    <thead>
                        <tr className="bg-base-200 text-base-content dark:bg-base-300">
                            <th className="font-bold">Image</th>
                            <th className="font-bold">Product</th>
                            <th className="font-bold">Category</th>
                            <th className="font-bold">Price</th>
                            <th className="font-bold">Created By</th>
                            <th className="font-bold">Show on Home</th>
                            <th className="font-bold">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map(product => (
                            <tr key={product._id} className="hover:bg-base-200 dark:hover:bg-base-300">
                                <td>
                                    <div className="avatar">
                                        <div className="mask mask-squircle w-12 h-12">
                                            <img src={product.images?.[0] || "https://placehold.co/80"} alt={product.title} />
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <div className="font-bold text-base-content">{product.title}</div>
                                    <div className="text-xs opacity-60 truncate max-w-[180px] text-base-content/70">
                                        {product._id}
                                    </div>
                                </td>
                                <td className="text-base-content">{product.category}</td>
                                <td className="text-base-content">${product.price}</td>
                                <td className="text-base-content">{product.createdBy || "—"}</td>
                                <td>
                                    <input
                                        type="checkbox"
                                        className="toggle toggle-primary"
                                        checked={!!product.showOnHome}
                                        onChange={() => handleToggleHome(product)}
                                        disabled={updating}
                                    />
                                </td>
                                <td className="space-x-2">
                                    <button
                                        className="btn btn-xs btn-outline btn-info"
                                        onClick={() => openUpdateModal(product)}
                                    >
                                        Update
                                    </button>
                                    <button className="btn btn-xs btn-error text-white" onClick={() => openDeleteModal(product)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Update Product Modal */}
            {isUpdateModalOpen && selectedProduct && (
                <div className="modal modal-open">
                    <div className="modal-box max-w-2xl bg-base-100 dark:bg-base-200 text-base-content border border-base-200 dark:border-base-300">
                        <h3 className="font-bold text-lg mb-4">Update Product</h3>
                        
                        <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
                            {/* Title */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-base-content">Product Title *</span>
                                </label>
                                <input
                                    type="text"
                                    className="input input-bordered w-full bg-base-100 dark:bg-base-200 text-base-content border-gray-300 dark:border-gray-600"
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    placeholder="Enter product title"
                                />
                            </div>

                            {/* Description */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-base-content">Description</span>
                                </label>
                                <textarea
                                    className="textarea textarea-bordered h-24 bg-base-100 dark:bg-base-200 text-base-content border-gray-300 dark:border-gray-600"
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    placeholder="Enter product description"
                                ></textarea>
                            </div>

                            {/* Price and Category */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text text-base-content">Price *</span>
                                    </label>
                                    <input
                                        type="number"
                                        step="0.01"
                                        className="input input-bordered w-full bg-base-100 dark:bg-base-200 text-base-content border-gray-300 dark:border-gray-600"
                                        value={formData.price}
                                        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                        placeholder="0.00"
                                    />
                                </div>

                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text text-base-content">Category *</span>
                                    </label>
                                    <input
                                        type="text"
                                        className="input input-bordered w-full bg-base-100 dark:bg-base-200 text-base-content border-gray-300 dark:border-gray-600"
                                        value={formData.category}
                                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                        placeholder="e.g., T-Shirts"
                                    />
                                </div>
                            </div>

                            {/* Images */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-base-content">Image URLs (comma-separated)</span>
                                </label>
                                <textarea
                                    className="textarea textarea-bordered h-20 bg-base-100 dark:bg-base-200 text-base-content border-gray-300 dark:border-gray-600"
                                    value={formData.images}
                                    onChange={(e) => setFormData({ ...formData, images: e.target.value })}
                                    placeholder="https://image1.jpg, https://image2.jpg"
                                ></textarea>
                            </div>

                            {/* Demo Video */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-base-content">Demo Video URL</span>
                                </label>
                                <input
                                    type="url"
                                    className="input input-bordered w-full bg-base-100 dark:bg-base-200 text-base-content border-gray-300 dark:border-gray-600"
                                    value={formData.demoVideo}
                                    onChange={(e) => setFormData({ ...formData, demoVideo: e.target.value })}
                                    placeholder="https://youtube.com/..."
                                />
                            </div>

                            {/* Payment Options */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-base-content">Payment Options (comma-separated)</span>
                                </label>
                                <input
                                    type="text"
                                    className="input input-bordered w-full bg-base-100 dark:bg-base-200 text-base-content border-gray-300 dark:border-gray-600"
                                    value={formData.paymentOptions}
                                    onChange={(e) => setFormData({ ...formData, paymentOptions: e.target.value })}
                                    placeholder="Credit Card, PayPal, Cash"
                                />
                            </div>
                        </div>

                        <div className="modal-action mt-6">
                            <button className="btn" onClick={() => setIsUpdateModalOpen(false)}>Cancel</button>
                            <button className="btn btn-primary" onClick={handleUpdateProduct}>Save Changes</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Delete Confirmation Modal */}
            {deleteModalOpen && productToDelete && (
                <div className="modal modal-open">
                    <div className="modal-box bg-base-100 dark:bg-base-200 text-base-content">
                        <h3 className="font-bold text-lg mb-4 text-error">Confirm Deletion</h3>
                        <p className="py-2">
                            Are you sure you want to delete the product <strong>{productToDelete.title}</strong>?
                        </p>
                        <p className="text-sm text-base-content/70">This action cannot be undone.</p>
                        
                        <div className="modal-action">
                            <button className="btn" onClick={() => setDeleteModalOpen(false)}>Cancel</button>
                            <button className="btn btn-error text-white" onClick={confirmDelete}>Delete Product</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminAllProducts;
