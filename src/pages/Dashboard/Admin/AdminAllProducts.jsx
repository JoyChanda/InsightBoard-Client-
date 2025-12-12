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

    const confirmDelete = async () => {
        if (!productToDelete) return;
        try {
            console.log("🗑️ Attempting to delete product:", productToDelete._id);
            const response = await axios.delete(`${import.meta.env.VITE_API_URL}/products/${productToDelete._id}`, { withCredentials: true });
            console.log("✅ Delete response:", response.data);
            toast.success("Product deleted successfully");
            setProducts(products.filter(p => p._id !== productToDelete._id));
            setDeleteModalOpen(false);
            setProductToDelete(null);
        } catch (error) {
            console.error("❌ Delete failed:", error.response?.data || error.message);
            toast.error(error.response?.data?.message || "Failed to delete product");
        }
    };

    if (loading) return <Spinner message="Loading all products..." />;

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-6 text-base-content">All Products (Superadmin)</h1>

            <div className="overflow-x-auto bg-base-100 rounded-lg shadow">
                <table className="table w-full">
                    <thead>
                        <tr className="bg-base-200">
                            <th className="text-base-content font-bold">Image</th>
                            <th className="text-base-content font-bold">Product</th>
                            <th className="text-base-content font-bold">Category</th>
                            <th className="text-base-content font-bold">Price</th>
                            <th className="text-base-content font-bold">Created By</th>
                            <th className="text-base-content font-bold">Show on Home</th>
                            <th className="text-base-content font-bold">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map(product => (
                            <tr key={product._id} className="hover:bg-base-200">
                                <td>
                                    <div className="avatar">
                                        <div className="mask mask-squircle w-12 h-12">
                                            <img src={product.images?.[0] || "https://placehold.co/80"} alt={product.title} />
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <div className="font-bold">{product.title}</div>
                                    <div className="text-xs opacity-60 truncate max-w-[180px]">
                                        {product._id}
                                    </div>
                                </td>
                                <td>{product.category}</td>
                                <td>${product.price}</td>
                                <td>{product.createdBy || "—"}</td>
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
                    <div className="modal-box max-w-2xl bg-base-100 text-base-content border border-base-200">
                        <h3 className="font-bold text-lg mb-4">Update Product</h3>
                        
                        <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
                            {/* Title */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Product Title *</span>
                                </label>
                                <input
                                    type="text"
                                    className="input input-bordered w-full"
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    placeholder="Enter product title"
                                />
                            </div>

                            {/* Description */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Description</span>
                                </label>
                                <textarea
                                    className="textarea textarea-bordered h-24"
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    placeholder="Enter product description"
                                ></textarea>
                            </div>

                            {/* Price and Category */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Price *</span>
                                    </label>
                                    <input
                                        type="number"
                                        step="0.01"
                                        className="input input-bordered w-full"
                                        value={formData.price}
                                        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                        placeholder="0.00"
                                    />
                                </div>

                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Category *</span>
                                    </label>
                                    <input
                                        type="text"
                                        className="input input-bordered w-full"
                                        value={formData.category}
                                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                        placeholder="e.g., T-Shirts"
                                    />
                                </div>
                            </div>

                            {/* Images */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Image URLs (comma-separated)</span>
                                </label>
                                <textarea
                                    className="textarea textarea-bordered h-20"
                                    value={formData.images}
                                    onChange={(e) => setFormData({ ...formData, images: e.target.value })}
                                    placeholder="https://image1.jpg, https://image2.jpg"
                                ></textarea>
                            </div>

                            {/* Demo Video */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Demo Video URL</span>
                                </label>
                                <input
                                    type="url"
                                    className="input input-bordered w-full"
                                    value={formData.demoVideo}
                                    onChange={(e) => setFormData({ ...formData, demoVideo: e.target.value })}
                                    placeholder="https://youtube.com/..."
                                />
                            </div>

                            {/* Payment Options */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Payment Options (comma-separated)</span>
                                </label>
                                <input
                                    type="text"
                                    className="input input-bordered w-full bg-base-100 text-base-content"
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
                    <div className="modal-box bg-base-100 text-base-content">
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
