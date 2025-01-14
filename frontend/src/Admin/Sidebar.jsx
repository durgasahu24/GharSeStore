import React from 'react';

const Sidebar = ({ activeOption, onSelectOption }) => {
    const menuItems = [
        { id: 'orders', label: 'Orders' },
        { id: 'products', label: 'Products' },
        { id: 'customers', label: 'Customers' },
        { id: 'productCreate', label: 'Create Product' },
    ];

    return (
        <div>
            <h2 className="text-2xl font-bold mb-6">Dashboard</h2>
            <ul>
                {menuItems.map((item) => (
                    <li
                        key={item.id}
                        className={`mb-4 p-3 rounded cursor-pointer ${activeOption === item.id ? 'bg-gray-700' : 'hover:bg-gray-700'
                            }`}
                        onClick={() => onSelectOption(item.id)}
                    >
                        {item.label}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Sidebar;
