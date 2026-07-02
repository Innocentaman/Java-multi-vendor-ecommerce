import { useEffect, useState } from "react";

import {
    getCategories,
    createCategory,
    updateCategory,
    deleteCategory
} from "../services/categoryService";
import { showError, showSuccess } from "../utils/toast";
function CategoriesPage() {

    const [categories, setCategories] =
        useState([]);

    const [editingId,
        setEditingId] =
        useState(null);

    const [name, setName] =
        useState("");

    const [description,
        setDescription] =
        useState("");

    useEffect(() => {

        loadCategories();

    }, []);

    const loadCategories =
        async () => {

        const data =
            await getCategories();

        setCategories(data);
    };

    const handleSubmit =
        async (e) => {

        e.preventDefault();

        try {

            if (editingId) {

                await updateCategory(
                    editingId,
                    {
                        name,
                        description
                    }
                );

                showSuccess("Updated");

            } else {

                await createCategory({
                    name,
                    description
                });

                showSuccess("Created");
            }

            resetForm();

            loadCategories();

        } catch (error) {

            showError(
                error.response?.data
            );
        }
    };

    const editCategory =
        (category) => {

        setEditingId(
            category.id
        );

        setName(
            category.name
        );

        setDescription(
            category.description
        );
    };

    const removeCategory = async (id) => {

    if (!window.confirm("Delete category?")) {
        return;
    }

    try {

        await deleteCategory(id);

        loadCategories();

    } catch (error) {

        showError(
            error.response?.data ||
            "Delete failed"
        );
    }
};

    const resetForm = () => {

        setEditingId(null);
        setName("");
        setDescription("");
    };

    return (

        <div className="container mt-4">

            <h2>
                Category Management
            </h2>

            <form
                className="card p-3 mb-4"
                onSubmit={handleSubmit}
            >

                <h4>

                    {editingId
                        ? "Edit Category"
                        : "Create Category"}

                </h4>

                <input
                    className="form-control mb-3"
                    placeholder="Name"
                    value={name}
                    onChange={(e) =>
                        setName(
                            e.target.value
                        )
                    }
                    required
                />

                <textarea
                    className="form-control mb-3"
                    placeholder="Description"
                    value={description}
                    onChange={(e) =>
                        setDescription(
                            e.target.value
                        )
                    }
                />

                <button
                    className="btn btn-success"
                >
                    Save
                </button>

            </form>

            {categories.map(category => (

                <div
                    key={category.id}
                    className="card mb-3"
                >

                    <div className="card-body">

                        <h5>
                            {category.name}
                        </h5>

                        <p>
                            {category.description}
                        </p>

                        <button
                            className="btn btn-primary me-2"
                            onClick={() =>
                                editCategory(
                                    category
                                )
                            }
                        >
                            Edit
                        </button>

                        <button
                            className="btn btn-danger"
                            onClick={() =>
                                removeCategory(
                                    category.id
                                )
                            }
                        >
                            Delete
                        </button>

                    </div>

                </div>

            ))}

        </div>
    );
}

export default CategoriesPage;