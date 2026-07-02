import { useEffect, useState } from "react";
import { getDashboard } from "../services/adminService";

function AdminDashboard() {

    const [data, setData] =
        useState(null);

    useEffect(() => {

        loadDashboard();

    }, []);

    const loadDashboard =
        async () => {

        try {

            const dashboard =
                await getDashboard();

            setData(dashboard);

        } catch (error) {

            console.error(error);
        }
    };

    if (!data) {

        return (
            <h3 className="m-4">
                Loading...
            </h3>
        );
    }

    return (

        <div className="container mt-4">

            <h2>
                Admin Dashboard
            </h2>

            <div className="row">

                <DashboardCard
                    title="Total Users"
                    value={data.totalUsers}
                />

                <DashboardCard
                    title="Customers"
                    value={data.totalCustomers}
                />

                <DashboardCard
                    title="Sellers"
                    value={data.totalSellers}
                />

                <DashboardCard
                    title="Products"
                    value={data.totalProducts}
                />

                <DashboardCard
                    title="Categories"
                    value={data.totalCategories}
                />

                <DashboardCard
                    title="Orders"
                    value={data.totalOrders}
                />

            </div>

        </div>
    );
}

function DashboardCard({
    title,
    value
}) {

    return (

        <div className="col-md-4 mb-3">

            <div className="card">

                <div className="card-body">

                    <h5>
                        {title}
                    </h5>

                    <h2>
                        {value}
                    </h2>

                </div>

            </div>

        </div>
    );
}

export default AdminDashboard;