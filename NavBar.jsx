import React, { useState } from 'react';

const NavBar = () => {
  const [openSubmenu, setOpenSubmenu] = useState(null);

  const handleToggleSubmenu = (submenu) => {
    setOpenSubmenu(openSubmenu === submenu ? null : submenu);
  };

  const handleClickOutside = (event) => {
    if (!event.target.closest('.relative')) {
      setOpenSubmenu(null);
    }
  };

  React.useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <nav className="bg-blue-600 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-lg font-bold">MyWebsite</div>
        <div className="space-x-4 flex items-center">
          <a href="#" className="text-white hover:bg-blue-500 px-3 py-2 rounded">Home</a>
          <a href="#" className="text-white hover:bg-blue-500 px-3 py-2 rounded">About</a>
          <div className="relative">
            <button
              onClick={() => handleToggleSubmenu('services')}
              className="submenu-toggle text-white hover:bg-blue-500 px-3 py-2 rounded focus:outline-none"
            >
              Services
            </button>
            <div
              className={`submenu absolute bg-white text-blue-600 mt-2 rounded shadow-lg ${
                openSubmenu === 'services' ? 'block' : 'hidden'
              }`}
            >
              <a href="#" className="block px-4 py-2 hover:bg-blue-100">Web Development</a>
              <a href="#" className="block px-4 py-2 hover:bg-blue-100">SEO</a>
              <a href="#" className="block px-4 py-2 hover:bg-blue-100">Content Writing</a>
            </div>
          </div>
          <div className="relative">
            <button
              onClick={() => handleToggleSubmenu('products')}
              className="submenu-toggle text-white hover:bg-blue-500 px-3 py-2 rounded focus:outline-none"
            >
              Products
            </button>
            <div
              className={`submenu absolute bg-white text-blue-600 mt-2 rounded shadow-lg ${
                openSubmenu === 'products' ? 'block' : 'hidden'
              }`}
            >
              <a href="#" className="block px-4 py-2 hover:bg-blue-100">Product 1</a>
              <a href="#" className="block px-4 py-2 hover:bg-blue-100">Product 2</a>
              <a href="#" className="block px-4 py-2 hover:bg-blue-100">Product 3</a>
            </div>
          </div>
          <a href="#" className="text-white hover:bg-blue-500 px-3 py-2 rounded">Contact</a>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
