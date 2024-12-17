import Sider from "../layouts/Sider.jsx";
import Header from "../layouts/Header.jsx";
import Footer from "../layouts/Footer.jsx";
import ModalTambah from "../layouts/ModalTambah.jsx";
import React from "react";

function Dashboard() {
    return (
        <div className="bg-gray-50 min-h-screen">
            <div className="flex min-h-screen">
                {/* Sidebar */}
                <Sider className="bg-indigo-800" />

                {/* Main Content Area */}
                <div className="flex-1 flex flex-col overflow-hidden">
                    {/* Header */}
                    <Header className="bg-white shadow-md z-10" />

                    <main className="flex-1 p-6 bg-white">
                        {/* Dashboard Heading */}
                        <div className="mb-6">
                            <h1 className="text-3xl font-semibold text-gray-800">Dashboard</h1>
                            <p className="text-gray-500">Welcome to the Dashboard! Here's an overview of your data.</p>
                        </div>

                        {/* Content Section (Add additional widgets or content here) */}
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                            <div className="bg-gray-700 p-4 rounded-lg shadow-md hover:shadow-xl transition duration-300 ease-in-out">
                                <h2 className="text-xl font-medium text-white">Total Students</h2>
                                <p className="text-3xl font-bold text-indigo-600">120</p>
                            </div>
                            <div className="bg-gray-700 p-4 rounded-lg shadow-md hover:shadow-xl transition duration-300 ease-in-out">
                                <h2 className="text-xl font-medium text-white">Active Courses</h2>
                                <p className="text-3xl font-bold text-green-600">8</p>
                            </div>
                            <div className="bg-gray-700 p-4 rounded-lg shadow-md hover:shadow-xl transition duration-300 ease-in-out">
                                <h2 className="text-xl font-medium text-white">Pending Applications</h2>
                                <p className="text-3xl font-bold text-yellow-600">5</p>
                            </div>
                        </div>
                    </main>

                    {/* Footer */}
                    <Footer className="bg-white shadow-md p-4" />
                </div>
            </div>

            {/* Modal for Adding Student */}
            <ModalTambah />
        </div>
    );
}

export default Dashboard;
