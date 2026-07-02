import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { register } from "../services/authService";
import { showError, showSuccess } from "../utils/toast";
function Register() {

    const navigate =
        useNavigate();

    const [error, setError] =
        useState("");

    const [formData, setFormData] =
        useState({

            firstName: "",
            lastName: "",
            email: "",
            password: "",
            phone: "",
            role: "CUSTOMER"
        });

    const handleChange = (e) => {

        setFormData({

            ...formData,

            [e.target.name]:
                e.target.value
        });
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        setError("");

        try {

            await register(formData);

            showSuccess(
                "Registration Successful. Please Login."
            );

            navigate("/login");

        } catch (err) {

            setError(

                err.response?.data ||

                "Registration Failed"
            );
        }
    };

    return (

        <div className="container mt-5">

            <div className="card p-4">

                <h2>
                    Register
                </h2>

                {
                    error &&

                    <div className="alert alert-danger">

                        {error}

                    </div>
                }

                <form onSubmit={handleSubmit}>

                    <div className="mb-3">

                        <label>
                            First Name
                        </label>

                        <input
                            type="text"
                            name="firstName"
                            className="form-control"
                            value={formData.firstName}
                            onChange={handleChange}
                            required
                        />

                    </div>

                    <div className="mb-3">

                        <label>
                            Last Name
                        </label>

                        <input
                            type="text"
                            name="lastName"
                            className="form-control"
                            value={formData.lastName}
                            onChange={handleChange}
                            required
                        />

                    </div>

                    <div className="mb-3">

                        <label>
                            Email
                        </label>

                        <input
                            type="email"
                            name="email"
                            className="form-control"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />

                    </div>

                    <div className="mb-3">

                        <label>
                            Password
                        </label>

                        <input
                            type="password"
                            name="password"
                            className="form-control"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />

                    </div>

                    <div className="mb-3">

                        <label>
                            Phone
                        </label>

                        <input
                            type="text"
                            name="phone"
                            className="form-control"
                            value={formData.phone}
                            onChange={handleChange}
                        />

                    </div>

                    <div className="mb-3">

                        <label>
                            Role
                        </label>

                        <select
                            name="role"
                            className="form-control"
                            value={formData.role}
                            onChange={handleChange}
                        >

                            <option value="CUSTOMER">
                                Customer
                            </option>

                            <option value="SELLER">
                                Seller
                            </option>

                        </select>

                    </div>

                    <button
                        type="submit"
                        className="btn btn-success"
                    >
                        Register
                    </button>

                </form>

                <hr />

                <Link
                    to="/login"
                    className="btn btn-primary"
                >
                    Already a User? Login
                </Link>

            </div>

        </div>
    );
}

export default Register;