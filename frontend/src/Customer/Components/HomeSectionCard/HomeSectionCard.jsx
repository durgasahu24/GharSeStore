import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ProductCard } from '../Product/ProductCard';

function HomeSectionCard({ category, productName }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {


    const fetchProducts = async () => {
      setLoading(true);
      setError(null);

      try {

        console.log(" process.env.VITE_API_BASE_URL ", import.meta.env.VITE_API_BASE_URL)


          const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/products/category`, {
            params: { category },
          });


          console.log("respone of fetch product ",response);

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
