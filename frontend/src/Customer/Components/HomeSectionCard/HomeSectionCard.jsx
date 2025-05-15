import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Make sure you have Axios installed for API requests
import { ProductCard } from '../Product/ProductCard';

function HomeSectionCard({ category, productName }) {
  const [products, setProducts] = useState([]);  // Store products fetched from API
  const [loading, setLoading] = useState(false);  // Track loading state
  const [error, setError] = useState(null);       // Handle errors

  useEffect(() => {
    // Only fetch products if the category changes
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);

      try {
        // Make the API call to fetch products by category
        const response = await axios.get('http://localhost:8000/api/products/category', {
          params: { category },  // Pass the category as a query parameter
        });

        // Set the products state with the fetched data
        setProducts(response.data);
      } catch (err) {
        // Handle errors (e.g., network issues, server errors)
        console.log("error : home ", error)
        setError('Failed to fetch products.');
      } finally {
        setLoading(false);
      }
    };

    // Call fetchProducts only if category is valid
    if (category) {
      fetchProducts();
    }
  }, [category]); // This effect runs whenever the category prop changes

  return (
    <div className="py-10 lg:py-16 px-4 md:px-8">
      {/* Section Heading */}
      <h1 className="font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-gray-800 text-center mb-8 uppercase tracking-wide">
        {productName}
      </h1>

      {/* Loading State */}
      {loading && <p>Loading...</p>}

      {/* Error State */}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {/* Product Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
        {products.length > 0 ? (
          products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))
        ) : (
          <p>No products available in this category.</p>
        )}
      </div>
    </div>
  );
}

export default HomeSectionCard;
