import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Spinner from "../../../components/Spinner";

const ManageProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            // Assuming GET /products returns all products, but for manager maybe logic needs filtering? 
            // Or use a query param ?createdBy=me or filter client side.
            // For now, fetching all (or backend could have a /my-products endpoint).
            // Let's use standard list and filter by CreatedBy if user ID is available, 
            // OR just List All since Managers manage the store. 
            // "Manager Dashboard: Manage Products".
            // Let's stick to listing all for now as Managers likely manage the whole inventory.
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

    if (loading) return <Spinner message="Loading products..." />;

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-base-content">Manage Products</h1>
                <Link to="/dashboard/add-product" className="btn btn-primary">+ Add New Product</Link>
            </div>

            <div className="overflow-x-auto bg-base-100 rounded-lg shadow">
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
                            <tr key={product._id} className="hover:bg-base-200">
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
                                    {/* Edit Logic could be a modal or separate page. For brevity, skipping logic or placeholder */}
                                    <button className="btn btn-sm btn-ghost" onClick={() => toast.info("Edit functionality coming soon")}>Edit</button>
                                    <button className="btn btn-sm btn-error text-white" onClick={() => handleDelete(product._id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                 {products.length === 0 && <div className="text-center py-4">No products found.</div>}
            </div>
        </div>
    );
};

export default ManageProducts;
