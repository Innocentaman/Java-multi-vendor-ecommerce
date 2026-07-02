import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { showError, showSuccess } from "../utils/toast";
function CreateProduct() {

    const navigate = useNavigate();

    const [categories, setCategories] = useState([]);

    const [formData, setFormData] = useState({
        name: "",
        description: "",
        price: "",
        stockQuantity: "",
        imageUrl: "",
        categoryId: ""
    });

    useEffect(() => {

        loadCategories();

    }, []);

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

    const createProduct = async (e) => {

        e.preventDefault();

        try {

            await api.post(
                "/api/products",
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
                "Product Created"
            );

            navigate(
                "/seller/products"
            );

        } catch (error) {

            showError(
                error.response?.data ||
                "Failed"
            );
        }
    };

    return (

        <div className="container mt-4">

            <div className="card p-4">

                <h2>Create Product</h2>

                <form onSubmit={createProduct}>

                    <div className="mb-3">

                        <label>Name</label>

                        <input
                            type="text"
                            name="name"
                            className="form-control"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />

                    </div>

                    <div className="mb-3">

                        <label>Description</label>

                        <textarea
                            name="description"
                            className="form-control"
                            value={formData.description}
                            onChange={handleChange}
                            required
                        />

                    </div>

                    <div className="mb-3">

                        <label>Price</label>

                        <input
                            type="number"
                            name="price"
                            className="form-control"
                            value={formData.price}
                            onChange={handleChange}
                            required
                        />

                    </div>

                    <div className="mb-3">

                        <label>Stock</label>

                        <input
                            type="number"
                            name="stockQuantity"
                            className="form-control"
                            value={formData.stockQuantity}
                            onChange={handleChange}
                            required
                        />

                    </div>

                    <div className="mb-3">

                        <label>Image URL</label>

                        <input
                            type="text"
                            name="imageUrl"
                            className="form-control"
                            value={formData.imageUrl}
                            onChange={handleChange}
                        />

                    </div>

                    <div className="mb-3">

                        <label>Category</label>

                        <select
                            name="categoryId"
                            className="form-control"
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
                        className="btn btn-success"
                        type="submit"
                    >
                        Create Product
                    </button>

                </form>

            </div>

        </div>
    );
}

export default CreateProduct;