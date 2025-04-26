import React, { useState, useEffect } from 'react';
import { ProductCard } from './ProductCard';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { findProducts } from '../../../state/Product/Action';
import { useParams } from 'react-router-dom';
import { Pagination } from '@mui/material'


function Product() {


    const [expandedFilter, setExpandedFilter] = useState("");
    const [isSidebarVisible, setIsSidebarVisible] = useState(false);
    const [activeFilters, setActiveFilters] = useState({
        color: [],
        size: [],
        price: "",
        discount: "",
        availability: "",
    });


    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();
    const param = useParams();

    const { products } = useSelector(store => store);


    const decodedQueryString = decodeURIComponent(location.search);
    const searchParams = new URLSearchParams(decodedQueryString);
    const colorValue = searchParams.get("color");
    const sizeValue = searchParams.get("size");
    const price = searchParams.get("price");
    const disccount = searchParams.get("discount");
    const sortValue = searchParams.get("sort");
    const pageNumber = searchParams.get("page") || 1;
    const stock = searchParams.get("stock");

    console.log(decodedQueryString, searchParams, colorValue, sizeValue, price, disccount, sortValue, pageNumber, stock);



    // Read filter values from URL on mount

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const filtersFromUrl = {
            color: searchParams.get("color") ? searchParams.get("color").split(",") : [],
            size: searchParams.get("size") ? searchParams.get("size").split(",") : [],
            price: searchParams.get("price") || "",
            discount: searchParams.get("discount") || "",
            availability: searchParams.get("availability") || "",
        };
        setActiveFilters(filtersFromUrl);
    }, [location.search]);



    useEffect(() => {
        const [minPrice, maxPrice] =
            price === null ? [0, 0] : price.split("-").map(Number);
        const data = {
            category: param.lavelThree,
            colors: colorValue || [],
            sizes: sizeValue || [],
            minPrice: minPrice || 0,
            maxPrice: maxPrice || 10000,
            minDiscount: disccount || 0,
            sort: sortValue || "price_low",
            pageNumber: pageNumber,
            pageSize: 8,
            stock: stock,
        };
        console.log("data in useEffect", data);
        dispatch(findProducts(data));
    }, [
        param.lavelThree,
        colorValue,
        sizeValue,
        price,
        disccount,
        sortValue,
        pageNumber,
        stock,
    ]);



    // Toggle filter section visibility
    const toggleFilter = (filterName) => {
        setExpandedFilter(expandedFilter === filterName ? "" : filterName);
    };


    // Toggle sidebar visibility for mobile/tablet
    const toggleSidebar = () => {
        setIsSidebarVisible(!isSidebarVisible);
    };


    // Update filters in search parameters
    const handleCheckboxFilter = (value, sectionId) => {
        const newFilterValues = activeFilters[sectionId].includes(value)
            ? activeFilters[sectionId].filter((item) => item !== value)
            : [...activeFilters[sectionId], value];

        setActiveFilters((prevFilters) => ({
            ...prevFilters,
            [sectionId]: newFilterValues,
        }));


        // Update the URL search params
        const searchParams = new URLSearchParams(location.search);

        if (newFilterValues.length > 0) {
            searchParams.set(sectionId, newFilterValues.join(","));
        } else {
            searchParams.delete(sectionId);
        }

        const query = searchParams.toString();
        navigate({ search: `?${query}` });
    };


    const handleSortChange = (value) => {
        const searchParams = new URLSearchParams(location.search);
        searchParams.set("sort", value);
        const query = searchParams.toString();
        navigate({ search: `?${query}` });
    };

    const handlePaginationChange = (event, value) => {
        const searchParams = new URLSearchParams(location.search);
        searchParams.set("page", value);
        const query = searchParams.toString();
        navigate({ search: `?${query}` });
    };

    // Handle radio filter change (for price, discount, availability)
    const handleRadioFilterChange = (e, sectionId) => {
        const value = e.target.value;
        setActiveFilters((prevFilters) => ({
            ...prevFilters,
            [sectionId]: value,
        }));

        // Update the URL search params
        const searchParams = new URLSearchParams(location.search);
        searchParams.set(sectionId, value);
        const query = searchParams.toString();
        navigate({ search: `?${query}` });
    };

    return (

        <div>
            <div className="flex flex-col lg:flex-row min-h-screen mt-15 lg:mt-[68px]">
                {/* Filter Button for Mobile/Tablet */}
                <div className="lg:hidden p-4">
                    <button
                        className="bg-blue-500 text-white py-2 px-4 rounded"
                        onClick={toggleSidebar}
                    >
                        {isSidebarVisible ? "Hide Filters" : "Show Filters"}
                    </button>
                </div>

                {/* Filter Sidebar for large screen */}
                <div className={`lg:w-1/5 w-full p-4 bg-gray-100 border-r border-gray-300 ${isSidebarVisible ? 'block' : 'hidden'} lg:block`}>
                    <h2 className="font-bold text-xl mb-4">Filters</h2>

                    {/* Color Filter */}
                    <div className="mb-4">
                        <h3
                            className="font-semibold cursor-pointer mb-2 flex justify-between items-center"
                            onClick={() => toggleFilter("color")}
                        >
                            Color
                            {expandedFilter === "color" ? <RemoveIcon /> : <AddIcon />}
                        </h3>
                        {expandedFilter === "color" && (
                            ["White", "Beige", "Blue", "Brown", "Green", "Purple", "Yellow"].map((color) => (
                                <div key={color} className="flex items-center">
                                    <input
                                        type="checkbox"
                                        checked={activeFilters.color.includes(color)}
                                        onChange={() => handleCheckboxFilter(color, "color")}
                                        className="mr-2"
                                    />
                                    <label>{color}</label>
                                </div>
                            ))
                        )}
                    </div>

                    {/* Size Filter */}
                    <div className="mb-4">
                        <h3
                            className="font-semibold cursor-pointer mb-2 flex justify-between items-center"
                            onClick={() => toggleFilter("size")}
                        >
                            Size
                            {expandedFilter === "size" ? <RemoveIcon /> : <AddIcon />}
                        </h3>
                        {expandedFilter === "size" && (
                            ["S", "M", "L"].map((size) => (
                                <div key={size} className="flex items-center">
                                    <input
                                        type="checkbox"
                                        checked={activeFilters.size.includes(size)}
                                        onChange={() => handleCheckboxFilter(size, "size")}
                                        className="mr-2"
                                    />
                                    <label>{size}</label>
                                </div>
                            ))
                        )}
                    </div>


                    {/* Price Filter */}
                    <div className="mb-4">
                        <h3
                            className="font-semibold cursor-pointer mb-2 flex justify-between items-center"
                            onClick={() => toggleFilter("price")}
                        >
                            Price
                            {expandedFilter === "price" ? <RemoveIcon /> : <AddIcon />}
                        </h3>
                        {expandedFilter === "price" && (
                            ["159-399", "399-999", "999-1999", "1999-2999", "3999-4999"].map((price) => (
                                <div key={price} className="flex items-center">
                                    <input
                                        type="checkbox"
                                        checked={activeFilters.price === price}
                                        onChange={(e) => handleRadioFilterChange(e, "price")}
                                        value={price}
                                        className="mr-2"
                                    />
                                    <label>₹{price}</label>
                                </div>
                            ))
                        )}
                    </div>

                    {/* Discount Filter */}
                    <div className="mb-4">
                        <h3
                            className="font-semibold cursor-pointer mb-2 flex justify-between items-center"
                            onClick={() => toggleFilter("discount")}
                        >
                            Discount
                            {expandedFilter === "discount" ? <RemoveIcon /> : <AddIcon />}
                        </h3>
                        {expandedFilter === "discount" && (
                            ["0", "20", "40", "60", "80"].map((discount) => (
                                <div key={discount} className="flex items-center">
                                    <input
                                        type="radio"
                                        checked={activeFilters.discount === discount}
                                        onChange={(e) => handleRadioFilterChange(e, "discount")}
                                        value={discount}
                                        className="mr-2"
                                    />
                                    <label>{discount}%</label>
                                </div>
                            ))
                        )}
                    </div>

                    {/* Availability Filter */}
                    <div className="mb-4">
                        <h3
                            className="font-semibold cursor-pointer mb-2 flex justify-between items-center"
                            onClick={() => toggleFilter("availability")}
                        >
                            Availability
                            {expandedFilter === "availability" ? <RemoveIcon /> : <AddIcon />}
                        </h3>
                        {expandedFilter === "availability" && (
                            ["Available", "Out of stock"].map((status) => (
                                <div key={status} className="flex items-center">
                                    <input
                                        type="radio"
                                        checked={activeFilters.availability === status}
                                        onChange={(e) => handleRadioFilterChange(e, "availability")}
                                        value={status}
                                        className="mr-2"
                                    />
                                    <label>{status}</label>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                {/* Product List */}
                <div className="lg:w-[90%] w-full mx-auto p-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {products?.product?.content?.map((product) => (
                            <ProductCard key={product._id} product={product} />
                        ))}
                    </div>
                </div>


            </div>

            <section className='w-full px-[3.6rem]'>
                <div className="px-4 py-5 flex justify-center">

                    <Pagination count={products.product?.totalPages} color='secondary' onChange={handlePaginationChange} />
                </div>
            </section>

        </div>
    );
}

export default Product;
