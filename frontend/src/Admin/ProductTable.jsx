import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { findProducts, deleteProduct } from '../state/Product/Action.js';
// import FullScreenImageModal from './FullScreenImageModal';
import FullScreenImageModal from './FullScreenImageModal.jsx';

function ProductsTable() {
  const dispatch = useDispatch();
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const { products } = useSelector(store => store);

  console.log("products in table : ",products);

  useEffect(() => {
    const data = {
      category: "shirt",
      colors: [],
      sizes: [],
      minPrice: 0,
      maxPrice: 10000,
      minDiscount: 0,
      sort: "price_low",
      pageNumber: 1,
      pageSize: 10,
    };
    dispatch(findProducts(data));
  }, [dispatch, products.deletedProduct, products.products.length]);

  const handleAvatarClick = (imageUrl) => {
    setSelectedImage(imageUrl);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedImage(null);
  };

  const handleProductDelete = (productId) => {
    dispatch(deleteProduct(productId));
  };

  return (
    <div className="">
      <div className="bg-white shadow-lg rounded-lg">
        {/* <h2 className="text-xl font-semibold p-4">All Products</h2> */}

        <div className="overflow-x-auto">
          <table className="min-w-full table-auto">
            <thead className="bg-gray-100">
              <tr className='text-base'>
                <th className="px-4 py-2 text-left">Image</th>
                <th className="px-4 py-2 text-left">Category</th>
                <th className="px-4 py-2 text-left">Price</th>
                <th className="px-4 py-2 text-left">Title</th>
                <th className="px-4 py-2 text-left">Quantity</th>
                <th className="px-4 py-2 text-left">Delete</th>
              </tr>
            </thead>
            <tbody>
              {products?.product?.content?.map((item) => (
                <tr key={item._id} className="border-b hover:bg-gray-50 text-xs">
                  <td className="px-4 py-2">
                    <img
                      src={item?.images[0]}
                      alt={item?.name}
                      className="w-12 h-12 rounded-full cursor-pointer"
                      onClick={() => handleAvatarClick(item?.images[0])}
                    />
                  </td>
                  <td className="px-4 py-2">{item.category.name}</td>
                  <td className="px-4 py-2">{item.price}</td>
                  <td className="px-4 py-2">{item.title}</td>
                  <td className="px-4 py-2">{item.quantity}</td>
                  <td className="px-4 py-2">
                    <button
                      onClick={() => handleProductDelete(item._id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Full-Screen Image Modal */}
      {selectedImage && (
        <FullScreenImageModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          imageUrl={selectedImage}
        />
      )}
    </div>
  );
}

export default ProductsTable;
