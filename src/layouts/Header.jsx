import React from "react";
import { useNavigate } from "react-router-dom"; // For navigation after logout
import Swal from "sweetalert2"; // To display SweetAlert

function Header() {
    const navigate = useNavigate(); // Hook to redirect after logout

    const handleLogout = async () => {
        const token = localStorage.getItem("authToken"); // Get token from localStorage
        if (!token) {
            Swal.fire({
                title: "Error!",
                text: "No token found. Please login again.",
                icon: "error",
                confirmButtonText: "OK",
            });
            return;
        }

        try {
            const response = await fetch("http://demo-api.syaifur.io/api/logout", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`, // Correct string interpolation for Authorization header
                },
            });

            const data = await response.json();

            if (response.ok) {
                // SweetAlert success
                Swal.fire({
                    title: "Logged Out",
                    text: "You have been logged out successfully.",
                    icon: "success",
                    confirmButtonText: "OK",
                }).then(() => {
                    // Remove token from localStorage and redirect to login page
                    localStorage.removeItem("authToken");
                    navigate("/"); // Redirect to login page
                });
            } else {
                // SweetAlert error if logout fails
                Swal.fire({
                    title: "Error!",
                    text: data.message || "Logout failed.",
                    icon: "error",
                    confirmButtonText: "OK",
                });
            }
        } catch (error) {
            // SweetAlert error if there's a network issue
            Swal.fire({
                title: "Oops!",
                text: "An error occurred during logout.",
                icon: "error",
                confirmButtonText: "OK",
            });
        }
    };

    return (
        <header className="bg-indigo-900 p-5 mt-auto">
            <div className="flex justify-end">
                <button
                    onClick={handleLogout}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 "
                >
                    Logout
                </button>
            </div>
        </header>
    );
}

export default Header;
