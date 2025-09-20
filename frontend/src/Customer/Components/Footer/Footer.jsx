import React from 'react'

export const Footer = () => {
    return (
        <>
            {/* Footer */}
            <footer className="bg-gray-800 text-white py-8">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* About */}
                        <div>
                            <h3 className="text-lg font-bold mb-4">About Us</h3>
                            <p className="text-gray-400">
                                Discover the best in fashion, electronics, and more at unbeatable prices.
                            </p>
                        </div>

                        {/* Quick Links */}
                        <div>
                            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
                            <ul className="space-y-2">
                                {["Home", "Shop"].map((link) => (
                                    <li key={link}>
                                        <a href={`#${link.toLowerCase()}`} className="hover:text-yellow-500">
                                            {link}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <p class="text-sm">
                            © 2025 GharSeStore. All rights reserved.
                        </p>
                    </div>
                </div>
            </footer>

        </>
    )
}

export default Footer
