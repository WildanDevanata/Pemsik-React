import React from "react";

function Footer() {
    return (
        <footer className="bg-indigo-900 text-white p-6 mt-auto">
            <div className="container mx-auto text-center">
                <p className="text-sm mb-4">
                    &copy; {new Date().getFullYear()} Admin Panel. All rights reserved.
                </p>
                <div className="flex justify-center space-x-6">
                    <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-400">
                        <i className="fab fa-facebook-f text-xl"></i>
                    </a>
                    <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-400">
                        <i className="fab fa-twitter text-xl"></i>
                    </a>
                    <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-400">
                        <i className="fab fa-linkedin-in text-xl"></i>
                    </a>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
