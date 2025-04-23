import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { ProductCard } from "../Customer/Components/Product/ProductCard.jsx";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { findProducts } from "../state/Product/Action";
import api from "../config/apiConfig.js";
import HomeSectionCard from "../Customer/Components/HomeSectionCard/HomeSectionCard.jsx";

const HomePage = () => {

    const dispatch = useDispatch();
    const param = useParams();

    const [products, setProducts] = useState(null);


    useEffect(() => {

        const fetchLatestProducts = async () => {
            try {
                const response = await api.get('/api/products/latest'); // API call

                setProducts(response.data.data); // Update state with fetched products
            } catch (error) {
                console.error('Error fetching latest products:', error);
            }
        };

        fetchLatestProducts();

    }, []); // Run only once on component mount


    return (

        <div className="bg-white text-black py-4 md:py-10 lg:py-32 text-center min-h-screen flex flex-col justify-center items-center">
            <h1 className="text-3xl sm:text-4xl md:text-4xl lg:text-6xl font-bold mb-4">
                Welcome to Our E-Commerce Site
            </h1>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl mb-6">
                Shop the latest products at amazing prices.
            </p>

            <h1 className="font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-gray-800 text-center mb-8 uppercase tracking-wide">
                Latest Arrivals
            </h1>

            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 px-8">
                {products?.map((product) => (
                    <ProductCard key={product._id} product={product} />
                ))}
            </div>


            <HomeSectionCard category={"top"} productName={"top"} />
            <HomeSectionCard category={"dresses"} productName={"dresses"} />
            <HomeSectionCard category={"shirt"} productName={"shirt"} />
            <HomeSectionCard category={"men_jeans"} productName={"Mens jeans"} />

        </div>

    );
};

export default HomePage;
