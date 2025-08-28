import React, { useState, useEffect } from 'react'
import api from "../../../Config/apiConfig.js"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from 'react-router-dom';
import { ProductCard } from '../Product/ProductCard.jsx';

function RelatedProduct({ categoryId }) {

  console.log("categoryId : ", categoryId);


  const dispatch = useDispatch();
  const param = useParams();

  const [products, setProducts] = useState(null);
  console.log("products category wise :", products);



  useEffect(() => {
    const fetchProductsByCategory = async () => {
      try {
        const response = await api.get(`/api/products/category/${categoryId}`); // API call
        console.log("response  :", response);
        console.log("response  :", response.data);
        // console.log("response data  :", response.data.data);
        setProducts(response.data); // Update state with fetched products
      } catch (error) {
        console.error('Error fetching latest products:', error);
      }
    };

    // fetchLatestProducts();
    fetchProductsByCategory()
  }, [categoryId]); // Run only once on component mount


  return (
    // <div className='sm:pb-10 md:md:-mt-12 lg:mt-0 xl:-mt-13'>
    <div className="pb-6 sm:pb-10 md:-mt-12 lg:mt-0 xl:-mt-12">
       <h1 className="font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-gray-800 text-center mb-8 uppercase tracking-wide">
        RELATED PRODUCTS
      </h1>

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 px-8">
        {products?.products?.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  )
}

export default RelatedProduct
