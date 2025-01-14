import React from 'react';
import OrderTable from './OrderTable.jsx'
import ProductsTable from './ProductTable.jsx';
import CustomerTable from './CustomerTable.jsx'
import CreateProductForm from './CreateProductForm.jsx';


const Body = ({ activeOption }) => {
  return (
    <div>
      {/* Render different content based on the selected option */}
      {activeOption === 'orders' && <h2 className="text-xl font-bold"><OrderTable/></h2>}
      {activeOption === 'products' && <h2 className="text-xl font-bold"><ProductsTable/></h2>}
      {activeOption === 'customers' && <h2 className="text-xl font-bold"><CustomerTable/></h2>}
      {activeOption === 'productCreate' && <h2 className="text-xl font-bold"><CreateProductForm/></h2>}
      {!activeOption && <h2 className="text-xl font-bold">Welcome to the Dashboard</h2>}
    </div>
  );
};

export default Body;
