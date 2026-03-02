import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Spinner from "../../../components/Spinner";

const ManageProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    const [updating, setUpdating] = useState(false);
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
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/products?limit=100`); 
            setProducts(res.data.products);
        } catch {
            toast.error("Failed to load products");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if(!confirm("Are you sure you want to delete this product?")) return;
        try {
            await axios.delete(`${import.meta.env.VITE_API_URL}/products/${id}`, { withCredentials: true });
            toast.success("Product deleted");
            setProducts(products.filter(p => p._id !== id));
        } catch {
            toast.error("Failed to delete product");
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

    if (loading) return <Spinner message="Loading products..." />;

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-base-content">Manage Products</h1>
                <Link to="/dashboard/add-product" className="btn btn-primary">+ Add New Product</Link>
            </div>

            <div className="overflow-x-auto bg-base-100 rounded-lg shadow border border-base-200">
                <table className="table w-full">
                    <thead>
                        <tr className="bg-base-200 text-base-content">
                            <th>Image</th>
                            <th>Title</th>
                            <th>Category</th>
                            <th>Price</th>
                            <th>Stock</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map(product => (
                            <tr key={product._id} className="hover:bg-base-200 transition">
                                <td>
                                    <div className="avatar">
                                        <div className="mask mask-squircle w-12 h-12">
                                            <img src={product.images?.[0] || "https://placehold.co/50"} alt={product.title} />
                                        </div>
                                    </div>
                                </td>
                                <td className="font-semibold">{product.title}</td>
                                <td>{product.category}</td>
                                <td>${product.price}</td>
                                <td>
                                    {product.qty === 0 ? <span className="text-error font-bold">Out of Stock</span> : product.qty}
                                </td>
                                <td className="flex gap-2">
                                    <button className="btn btn-sm btn-info btn-outline" onClick={() => openUpdateModal(product)}>Edit</button>
                                    <button className="btn btn-sm btn-error text-white" onClick={() => handleDelete(product._id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                 {products.length === 0 && <div className="text-center py-4 text-base-content/70">No products found.</div>}
            </div>

            {/* Update Product Modal */}
            {isUpdateModalOpen && selectedProduct && (
                <div className="modal modal-open">
                    <div className="modal-box max-w-2xl bg-base-100 text-base-content border border-base-200">
                        <h3 className="font-bold text-lg mb-4">Update Product</h3>
                        
                        <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
                            <div className="form-control">
                                <label className="label"><span className="label-text text-base-content">Product Title *</span></label>
                                <input type="text" className="input input-bordered w-full" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} />
                            </div>

                            <div className="form-control">
                                <label className="label"><span className="label-text text-base-content">Description</span></label>
                                <textarea className="textarea textarea-bordered h-24" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })}></textarea>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="form-control">
                                    <label className="label"><span className="label-text text-base-content">Price *</span></label>
                                    <input type="number" className="input input-bordered w-full" value={formData.price} onChange={(e) => setFormData({ ...formData, price: e.target.value })} />
                                </div>
                                <div className="form-control">
                                    <label className="label"><span className="label-text text-base-content">Category *</span></label>
                                    <input type="text" className="input input-bordered w-full" value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} />
                                </div>
                            </div>

                            <div className="form-control">
                                <label className="label"><span className="label-text text-base-content">Image URLs (comma-separated)</span></label>
                                <textarea className="textarea textarea-bordered h-20" value={formData.images} onChange={(e) => setFormData({ ...formData, images: e.target.value })}></textarea>
                            </div>

                            <div className="form-control">
                                <label className="label"><span className="label-text text-base-content">Demo Video URL</span></label>
                                <input type="url" className="input input-bordered w-full" value={formData.demoVideo} onChange={(e) => setFormData({ ...formData, demoVideo: e.target.value })} />
                            </div>

                            <div className="form-control">
                                <label className="label"><span className="label-text text-base-content">Payment Options (comma-separated)</span></label>
                                <input type="text" className="input input-bordered w-full" value={formData.paymentOptions} onChange={(e) => setFormData({ ...formData, paymentOptions: e.target.value })} />
                            </div>
                        </div>

                        <div className="modal-action mt-6">
                            <button className="btn" onClick={() => setIsUpdateModalOpen(false)}>Cancel</button>
                            <button className="btn btn-primary" onClick={handleUpdateProduct} disabled={updating}>{updating ? "Saving..." : "Save Changes"}</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ManageProducts;
