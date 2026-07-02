 import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";
import { showError, showSuccess } from "../utils/toast";
function EditProduct() {

    const { id } = useParams();

    const navigate = useNavigate();

    const [categories, setCategories] = useState([]);

    const [loading, setLoading] = useState(true);

    const [formData, setFormData] = useState({
        name: "",
        description: "",
        price: "",
        stockQuantity: "",
        imageUrl: "",
        categoryId: ""
    });

    useEffect(() => {

        loadProduct();
        loadCategories();

    }, []);

    const loadProduct = async () => {

        try {

            const response =
                await api.get(
                    `/api/products/${id}`
                );

            const product =
                response.data;

            setFormData({
                name:
                    product.name || "",
                description:
                    product.description || "",
                price:
                    product.price || "",
                stockQuantity:
                    product.stockQuantity || "",
                imageUrl:
                    product.imageUrl || "",
                categoryId:
                    product.category?.id || ""
            });

        } catch (error) {

            console.error(error);

            showError("Failed to load product");

        } finally {

            setLoading(false);
        }
    };

    const loadCategories = async () => {

        try {

            const response =
                await api.get(
                    "/api/categories"
                );

            setCategories(
                response.data
            );

        } catch (error) {

            console.error(error);
        }
    };

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]:
                e.target.value
        });
    };

    const updateProduct = async (e) => {

        e.preventDefault();

        try {

            await api.put(
                `/api/products/${id}`,
                {
                    ...formData,
                    price:
                        parseFloat(
                            formData.price
                        ),
                    stockQuantity:
                        parseInt(
                            formData.stockQuantity
                        ),
                    categoryId:
                        parseInt(
                            formData.categoryId
                        )
                }
            );

            showSuccess(
                "Product Updated Successfully"
            );

            navigate(
                "/seller/products"
            );

        } catch (error) {

            showError(
                error.response?.data ||
                "Update Failed"
            );
        }
    };

    if (loading) {

        return (
            <div className="container mt-4">
                <h3>Loading...</h3>
            </div>
        );
    }

    return (

        <div className="container mt-4">

            <div className="card p-4">

                <h2>Edit Product</h2>

                <form onSubmit={updateProduct}>

                    <div className="mb-3">

                        <label>Name</label>

                        <input
                            type="text"
                            className="form-control"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />

                    </div>

                    <div className="mb-3">

                        <label>Description</label>

                        <textarea
                            className="form-control"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            rows="4"
                            required
                        />

                    </div>

                    <div className="mb-3">

                        <label>Price</label>

                        <input
                            type="number"
                            className="form-control"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            required
                        />

                    </div>

                    <div className="mb-3">

                        <label>Stock Quantity</label>

                        <input
                            type="number"
                            className="form-control"
                            name="stockQuantity"
                            value={formData.stockQuantity}
                            onChange={handleChange}
                            required
                        />

                    </div>

                    <div className="mb-3">

                        <label>Image URL</label>

                        <input
                            type="text"
                            className="form-control"
                            name="imageUrl"
                            value={formData.imageUrl}
                            onChange={handleChange}
                        />

                    </div>

                    <div className="mb-3">

                        <label>Category</label>

                        <select
                            className="form-control"
                            name="categoryId"
                            value={formData.categoryId}
                            onChange={handleChange}
                            required
                        >

                            <option value="">
                                Select Category
                            </option>

                            {categories.map(category => (

                                <option
                                    key={category.id}
                                    value={category.id}
                                >
                                    {category.name}
                                </option>

                            ))}

                        </select>

                    </div>

                    <button
                        type="submit"
                        className="btn btn-primary me-2"
                    >
                        Update Product
                    </button>

                    <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={() =>
                            navigate(
                                "/seller/products"
                            )
                        }
                    >
                        Cancel
                    </button>

                </form>

            </div>

        </div>
    );
}

export default EditProduct;