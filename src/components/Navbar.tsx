import olxLogo from '../assets/olx.png';
import lensLogo from '../assets/lens.png';
import arrow from '../assets/arrow.png';
import search from '../assets/search.png';
import './Navbar.css';
import Login from './Login';
import { useState } from 'react';
import { useAuth } from './authContext';
import { logout } from '../firebase';
import { useNavigate } from 'react-router-dom';

type searchProp = {
  setSearch: any;
};

function Navbar(props: searchProp) {
  const [loginPop, setLoginPop] = useState(false);
  const { user, setUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    setUser(null); // Reset the user
  };

  const handleSellClick = () => {
    if (user) {
      navigate('/add-product');
    } else {
      alert('Please login to sell a product');
    }
  };

  return (
    <>
      <div className="flex flex-col md:flex-row items-center p-4 bg-slate-100 shadow-md">
        {/* Logo */}
        <img src={olxLogo} alt="OLX Logo" className="w-11 h-9 mb-3 md:mb-0" />

        {/* Location Input */}
        <div className="navSecond border-2 bg-white flex items-center mb-3 md:mb-0 md:ml-4">
                <img src={lensLogo} alt="Location Icon" className="w-4 h-4 md:w-6 md:h-5 mt-1" />
                <input
                    placeholder="Location"
                    className="ml-3 outline-none"
                    style={{ width: '120px' }}
                />
                <img src={arrow} alt="Arrow" className="w-8 h-7 ml-[-2rem]" />
        </div>

        {/* Search Bar */}
        <div className="flex h-12 border-2 border-black bg-white flex-grow mb-3 md:mb-0 md:ml-4 items-center">
                <input
                    onChange={(e) => {
                    props?.setSearch(e.target.value);
                    }}
                    placeholder="Find Cars, Mobile Phones, and more..."
                    className="ml-3 w-full outline-none"
                />
                <img src={search} alt="Search Icon" className="w-8 h-8 mr-3" />
        </div>

        {/* Language Selector */}
        <div className="flex items-center h-12 p-3 cursor-pointer mb-3 md:mb-0 md:ml-4">
          <h1 className="font-semibold">ENGLISH</h1>
          <img src={arrow} alt="Language Arrow" className="w-8 h-7" />
        </div>

        {/* User Greeting and Logout Button */}
        {user ? (
          <>
            <div className="flex items-center h-12 p-3 cursor-text mb-3 md:mb-0 md:ml-4">
              <h1 className="font-bold text-lg text-blue-600 hover:text-orange-600">
                Welcome, {user}
              </h1>
            </div>

            <div
              onClick={handleLogout}
              className="flex items-center h-12 p-3 cursor-pointer underline hover:no-underline mb-3 md:mb-0 md:ml-4"
            >
              <h1 className="font-bold text-lg">Logout</h1>
            </div>
          </>
        ) : (
          <div
            onClick={() => {
              setLoginPop(!loginPop);
            }}
            className="flex items-center h-12 p-3 cursor-pointer underline hover:no-underline mb-3 md:mb-0 md:ml-4"
          >
            <h1 className="font-bold text-lg">Login</h1>
          </div>
        )}

        {/* Sell Button */}
        <div
          onClick={handleSellClick}
          className="flex items-center w-28 h-12 p-2 cursor-pointer rounded-full border border-yellow-500 hover:bg-green-400 mb-3 md:mb-0 md:ml-4"
        >
          <h1 className="font-bold text-lg ml-3 text-center">+ SELL</h1>
        </div>
      </div>

      {/* Login Popup */}
      {loginPop && <Login setLoginPop={setLoginPop} />}
    </>
  );
}

export default Navbar;
