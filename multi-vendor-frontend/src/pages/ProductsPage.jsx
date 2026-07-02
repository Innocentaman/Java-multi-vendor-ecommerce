import {
    useEffect,
    useState
} from "react";

import { Link } from "react-router-dom";

import {
    getProducts,
    searchProducts
} from "../services/productService";

function ProductsPage() {

    const [products, setProducts] =
        useState([]);

    const [loading, setLoading] =
        useState(true);

    const [keyword, setKeyword] =
        useState("");

    useEffect(() => {

        loadProducts();

    }, []);

    const loadProducts = async () => {

        try {

            const data =
                await getProducts();

            setProducts(data);

        } catch (error) {

            console.error(error);

        } finally {

            setLoading(false);
        }
    };

    const handleSearch = async () => {

        try {

            if (keyword.trim() === "") {

                loadProducts();

                return;
            }

            const data =
                await searchProducts(
                    keyword
                );

            setProducts(data);

        } catch (error) {

            console.error(error);
        }
    };

    if (loading) {

        return (

            <div className="container mt-4">

                <h3>
                    Loading Products...
                </h3>

            </div>

        );
    }

    return (

        <div className="container mt-4">

            <h2 className="mb-4">
                Products
            </h2>

            <div className="mb-4 d-flex gap-2">

                <input
                    type="text"
                    className="form-control"
                    placeholder="Search products"
                    value={keyword}
                    onChange={(e) =>
                        setKeyword(
                            e.target.value
                        )
                    }
                />

                <button
                    className="btn btn-primary"
                    onClick={handleSearch}
                >
                    Search
                </button>

                <button
                    className="btn btn-secondary"
                    onClick={() => {

                        setKeyword("");

                        loadProducts();

                    }}
                >
                    Reset
                </button>

            </div>

            <div className="row">

                {

                    products.map(product => (

                        <div
                            key={product.id}
                            className="col-md-4 mb-4"
                        >

                            <div className="card h-100 shadow-sm">

                                <img
                                    src={product.imageUrl}
                                    alt={product.name}
                                    className="card-img-top"
                                    style={{
                                        height: "220px",
                                        objectFit: "cover"
                                    }}
                                    onError={(e) => {

                                        e.target.src =
                                            "https://placehold.co/400x220?text=No+Image";

                                    }}
                                />

                                <div className="card-body d-flex flex-column">

                                    <h5>
                                        {product.name}
                                    </h5>

                                    <p className="text-muted flex-grow-1">
                                        {product.description}
                                    </p>

                                    <h4 className="text-success">
                                        ₹{product.price}
                                    </h4>

                                    <p>

                                        <strong>
                                            Stock:
                                        </strong>{" "}

                                        {

                                            product.stockQuantity > 0 ? (

                                                product.stockQuantity

                                            ) : (

                                                <span className="text-danger fw-bold">
                                                    Out of Stock
                                                </span>

                                            )

                                        }

                                    </p>

                                </div>

                                <div className="card-footer bg-white border-0">

                                    <Link
                                        to={`/products/${product.id}`}
                                        className="btn btn-primary w-100"
                                    >
                                        View Details
                                    </Link>

                                </div>

                            </div>

                        </div>

                    ))

                }

            </div>

        </div>

    );
}

export default ProductsPage;