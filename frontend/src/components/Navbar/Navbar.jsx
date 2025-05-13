import React from 'react';
import Images from '../../Images/logo.png';
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";
import { Link } from 'react-router-dom';
import DropdownMenu from './DropdownMenu';
import "../../style/slider.css"
import "../Login/popup.css"
import { MainLogin } from '../Login/Mainlogin';

const Navbar = () => {
  var user = JSON.parse(localStorage.getItem('userData'));
  const [popup, popupTrig] = React.useState(false);

  return (
    <>
      <nav className="bg-black text-white text-sm h-10 flex items-center justify-between px-10 font-bold">
        <div className="ml-10">
          Super Momma Sale | Up to 60% Off | Use Code <span className="text-[#FF7035]">MOM</span>
        </div>
        <div className="mr-10 font-normal">
          Extra 20% Cashback On All Orders | T&C Apply <a href="/" className="text-[#FF7035]">Sign Up</a>
        </div>
      </nav>

      <div className="w-full">
        <nav className="bg-[#f5f5f5] h-10 text-sm flex items-center justify-between px-10">
          <div className="flex space-x-5 text-[#848484] font-light">
            <span>Sell on Pepperfry</span>
            <span>Become a Franchisee</span>
            <span>Buy in Bulk</span>
            <span>Find a Studio</span>
          </div>
          <div className="flex space-x-3 text-xs font-light">
            <p>Enter Pincode</p>
            <span className="text-[#FF7035]">Find Pepperfry Studio</span>
          </div>
        </nav>

        <div className="border-b border-gray-300">
          <div className="w-[93%] mx-auto flex items-center justify-between py-4">
            <Link to="/">
              <img src={Images} alt="logo" className="h-[45px] w-[170px] pr-5" />
            </Link>
            <input
              className="h-[6vh] w-[850px] px-4 bg-[#f5f5f5] border-none text-[15px] font-light"
              placeholder="Your door to happiness opens with a search"
            />
            <div className="ml-5 flex items-center space-x-4">
              <div>
                <img
                  src="https://ii1.pepperfry.com/images/svg/web21-header-help-icon.svg"
                  alt="help"
                  className="w-[47px] mt-1"
                />
              </div>
              <div>
                <button className="log" onClick={() => popupTrig(true)}>
                  <PermIdentityOutlinedIcon className="text-black w-[30px] h-[38px] cursor-pointer" />
                </button>
              </div>
              <div>
                <FavoriteBorderOutlinedIcon className="text-black w-[30px] h-[38px] cursor-pointer" />
              </div>
              <div>
                <Link to="/cart">
                  <ShoppingCartOutlinedIcon className="text-black w-[30px] h-[38px] cursor-pointer" />
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="popup-div">
          <MainLogin trigger={popup} setTrigger={popupTrig} />
        </div>
        <DropdownMenu />
      </div>
    </>
  );
};

export default Navbar;