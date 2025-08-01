import React, { useState, useEffect } from "react";
import { ShoppingCart, Search } from "@mui/icons-material";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getUser, logout } from "../../../state/Auth/Action.js";





const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Mobile menu toggle
  const [openDropdown, setOpenDropdown] = useState(null); // Dropdown state
  const [currentCategory, setCurrentCategory] = useState(null); // Mobile subcategory navigation
  const navigate = useNavigate();
  const dispatch = useDispatch();


  const { auth } = useSelector(store => store);
  console.log("auth in navi:", auth);

  // Check login state based on JWT token
  const isLoggedIn = Boolean(auth.user);
  const jwt = localStorage.getItem("jwt");
  console.log("jwt : ", jwt);


  // Logout handler
  const handleLogout = () => {
    dispatch(logout())
    localStorage.removeItem("jwt");
    navigate("/");
  };

  // Navigate to specific pages
  const handleNavigate = (category, section, item) => {
    if (category?.id && section?.id && item?.id) {
      navigate(`/${category.id}/${section.id}/${item.id}`);
      setOpenDropdown(null); // Close dropdown
    }
  };


  useEffect(() => {
    if (jwt) {
      dispatch(getUser(jwt))
    }
  }, [jwt, auth.jwt])


  // Dropdown management
  const handleMouseEnter = (categoryId) => setOpenDropdown(categoryId);
  const handleMouseLeave = () => setOpenDropdown(null);

  const toggleIsMenuOpen = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeIsMenuOpen = () => {
    console.log("close function called :")
    setIsMenuOpen(false)
  }

  return (

    <div className="bg-gray-50 lg:top-0 lg:fixed z-50 w-full">
      {/* Navbar */}
      <nav className="bg-gray-800 text-white">
        <div className="container mx-auto px-6 flex justify-between items-center h-16">
          {/* Logo */}
          <button
            onClick={() => navigate("/")}
            className="text-2xl font-bold flex-shrink-0 mr-8" // Added margin-right to increase spacing
          >
            GharSeStore
          </button>


          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-6">
            {navigationData.categories.map((category) => (
              <div
                key={category.id}
                className="relative"
                onMouseEnter={() => handleMouseEnter(category.id)}
                onMouseLeave={handleMouseLeave}
              >
                <button className="hover:text-white bg-black px-3 py-2 rounded">
                  {category.name}
                </button>

                {openDropdown === category.id && (
                  <div className="absolute left-0 right-0 mt-1 w-[40rem] bg-white text-black shadow-lg rounded-md p-4 z-10">
                    <div className="grid grid-cols-3 gap-4">
                      {category.sections.map((section) => (
                        <div key={section.id}>
                          <h3 className="font-bold text-lg">{section.name}</h3>
                          <ul>
                            {section.items.map((item) => (
                              <li key={item.id}>
                                <button
                                  onClick={() => handleNavigate(category, section, item)}
                                  className="text-sm text-gray-700 hover:text-black"
                                >
                                  {item.name}
                                </button>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Search Bar */}
          <form
            className="hidden lg:flex items-center bg-gray-700 rounded overflow-hidden mx-auto flex-grow"
            style={{ maxWidth: "40%" }}
          >
            <input
              type="text"
              className="px-4 py-2 bg-gray-700 text-white placeholder-gray-400 focus:outline-none w-full"
              placeholder="Search..."
            />
            <button
              type="submit"
              className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-black"
            >
              <Search />
            </button>
          </form>

          <div className="hidden lg:flex items-center space-x-4 ml-auto">
            {!isLoggedIn ? (
              <button
                onClick={() => {
                  closeIsMenuOpen();
                  navigate("/register");
                }}
                className="hover:text-white bg-black px-3 py-2 rounded"
              >
                Sign In
              </button>
            ) : (
              <>
                {auth?.user?.role === "CUSTOMER" && (
                  <>
                    <a
                      href="/cart"
                      className="hover:text-white bg-black px-3 py-2 rounded"
                    >
                      <ShoppingCart /> Cart
                    </a>
                    <a
                      href="/orders"
                      className="hover:text-white bg-black px-3 py-2 rounded"
                    >
                      Orders
                    </a>
                  </>
                )}

                {auth?.user?.role === "ADMIN" && (
                  <a
                    href="/admin"
                    className="hover:text-white bg-black px-3 py-2 rounded"
                  >
                    Admin
                  </a>
                )}

                <button
                  onClick={handleLogout}
                  className="hover:text-white bg-black px-3 py-2 rounded"
                >
                  Logout
                </button>
              </>
            )}
          </div>


          {/* Mobile Hamburger Menu */}
          <button
            className="block lg:hidden bg-gray-800 p-2 rounded"
            onClick={toggleIsMenuOpen}
          >
            <MenuIcon />
          </button>
        </div>
      </nav >

      {/* Mobile Navigation */}
      {
        isMenuOpen && (
          <div
            className="absolute inset-0 bg-black bg-opacity-50 z-10"
            onClick={() => setIsMenuOpen(false)}
          >
            <div
              className="bg-white shadow-lg w-64 absolute top-0 left-0 h-full p-4 overflow-hidden"
              onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside menu
            >
              <h3 className="text-lg font-bold mb-4">
                {currentCategory ? currentCategory.name : "Menu"}
              </h3>

              {currentCategory && (
                <button
                  onClick={() => setCurrentCategory(null)}
                  className="block text-left text-blue-500 hover:underline mb-4"
                >
                  &larr; Back
                </button>
              )}

              <div className="overflow-y-auto max-h-[80vh]">
                {!currentCategory
                  ? navigationData.categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => {
                        // closeIsMenuOpen();
                        setCurrentCategory(category);
                      }}
                      className="block w-full text-left text-gray-700 hover:bg-gray-200 p-2 rounded"
                    >
                      {category.name}
                    </button>
                  ))
                  : currentCategory.sections.map((section) => (
                    <div key={section.id} className="mb-4">
                      <h4 className="text-sm font-bold">{section.name}</h4>
                      <ul className="ml-4">
                        {section.items.map((item) => (
                          <li
                            key={item.id}
                            onClick={() => { handleNavigate(currentCategory, section, item); closeIsMenuOpen(); }}
                          >
                            <button className="text-sm text-gray-700 hover:text-black">
                              {item.name}
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
              </div>

              {/* Orders */}


              {auth?.user === "CUSTOMER" && (<h3>
                <a
                  href="/cart"
                  className="block w-full text-left text-gray-700 hover:bg-gray-200 p-2 rounded"
                >
                  Cart
                </a>
              </h3>)}
              {auth?.user === "CUSTOMER" && (<h3>
                <a
                  href="/orders"
                  className="block w-full text-left text-gray-700 hover:bg-gray-200 p-2 rounded"
                >
                  Orders
                </a>
              </h3>)}


              {/* Admin  */}

              {auth?.user?.role === "ADMIN" && (<h3>
                <a
                  href="/Admin"
                  className="block w-full text-left text-gray-700 hover:bg-gray-200 p-2 rounded"
                >
                  Admin
                </a>
              </h3>)}



              {/* Add the Logout Button here for Mobile */}
              {isLoggedIn ? (
                <button
                  onClick={handleLogout}
                  className="block w-full text-left text-gray-700 hover:bg-gray-200 p-2 rounded"
                >Logout</button>
              ) : (<button
                className="block w-full text-left text-gray-700 hover:bg-gray-200 p-2 rounded"
                onClick={() => {
                  closeIsMenuOpen();
                  navigate("/register");
                }}>
                Sign IN
              </button>)}
            </div>
          </div>
        )
      }
    </div >
  );
};

export default Navigation;


const navigationData = {
  categories: [

    {
      id: 'men',
      name: 'Men',
      featured: [
        {
          name: 'New Arrivals',
          id: '#',
          imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-04-detail-product-shot-01.jpg',
          imageAlt: 'Drawstring top with elastic loop closure and textured interior padding.',
        },
        {
          name: 'Artwork Tees',
          id: '#',
          imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-02-image-card-06.jpg',
          imageAlt:
            'Three shirts in gray, white, and blue arranged on table with same line drawing of hands and shapes overlapping on front of shirt.',
        },
      ],
      sections: [
        {
          id: 'clothing',
          name: 'Clothing',
          items: [
            { name: 'Shirt', id: 'shirt' },
            { name: 'Men Jeans', id: 'men_jeans' },
            { name: 'Mens Kurtas', id: 'mens_kurta' },
            { name: 'Sweaters', id: 'Sweaters' },
            { name: 'T-Shirts', id: 't-shirt' },
            { name: 'Jackets', id: 'Jackets' },
            { name: 'Activewear', id: 'Activewear' },

          ],
        },
        {
          id: 'accessories',
          name: 'Accessories',
          items: [
            { name: 'Watches', id: 'Watches' },
            { name: 'Wallets', id: 'Wallets' },
            { name: 'Bags', id: 'Bags' },
            { name: 'Sunglasses', id: 'Sunglasses' },
            { name: 'Hats', id: 'Hats' },
            { name: 'Belts', id: 'Belts' },
          ],
        },
        {
          id: 'brands',
          name: 'Brands',
          items: [
            { name: 'Re-Arranged', id: 'Re-Arranged' },
            { name: 'Counterfeit', id: 'Counterfeit' },
            { name: 'Full Nelson', id: 'Full Nelson' },
            { name: 'My Way', id: 'My Way' },
          ],
        },
      ],
    },
    {
      id: 'women',
      name: 'Women',
      featured: [
        {
          name: 'New Arrivals',
          href: '/',
          imageSrc: 'https://tailwindui.com/img/ecommerce-images/mega-menu-category-01.jpg',
          imageAlt: 'Models sitting back to back, wearing Basic Tee in black and bone.',
        },
        {
          name: 'Basic Tees',
          href: '/',
          imageSrc: 'https://tailwindui.com/img/ecommerce-images/mega-menu-category-02.jpg',
          imageAlt: 'Close up of Basic Tee fall bundle with off-white, ochre, olive, and black tees.',
        },
      ],
      sections: [
        {
          id: 'clothing',
          name: 'Clothing',
          items: [
            { name: 'Tops', id: "top", href: `{women/clothing/tops}` },
            { name: 'Dresses', id: "dresses", href: `{women/clothing/dresses}` },
            { name: 'Women Jeans', id: 'women_jeans' },
            { name: 'Lengha Choli', id: 'lengha_choli' },
            { name: 'Sweaters', id: 'sweater' },
            { name: 'T-Shirts', id: 't-shirt' },
            { name: 'Jackets', id: 'jacket' },
            { name: 'Gouns', id: 'gouns' },
            { name: 'Sarees', id: 'saree' },
            { name: 'Kurtas', id: 'kurtas' },
          ],
        },
        {
          id: 'accessories',
          name: 'Accessories',
          items: [
            { name: 'Watches', id: 'watch' },
            { name: 'Wallets', id: 'wallet' },
            { name: 'Bags', id: 'bag' },
            { name: 'Sunglasses', id: 'sunglasse' },
            { name: 'Hats', id: 'hat' },
            { name: 'Belts', id: 'belt' },
          ],
        },
        {
          id: 'brands',
          name: 'Brands',
          items: [
            { name: 'Full Nelson', id: 'Full Nelson' },
            { name: 'My Way', id: 'My Way' },
            { name: 'Re-Arranged', id: 'Re-Arranged' },
            { name: 'Counterfeit', id: 'Counterfeit' },
            { name: 'Significant Other', id: 'Significant Other' },
          ],
        },
      ],
    },
  ],
  pages: [
    { name: 'Company', id: '/' },
    { name: 'Stores', id: '/' },
  ],
}




