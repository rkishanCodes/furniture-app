import React from "react";
import Apple from "../../Images/FooterImages/apple.png";
import GooglePlay from "../../Images/FooterImages/googleplay.png";
import Visa from "../../Images/FooterImages/footer-visacard-logo.png";
import MasterCard from "../../Images/FooterImages/footer-mastercard-logo.png";
import MaestroCard from "../../Images/FooterImages/footer-maestrocard-logo.png";
import AmericanExpress from "../../Images/FooterImages/footer-amexcard-logo.png";
import RuPay from "../../Images/FooterImages/footer-rupaycard-logo.png";
import DinnersCard from "../../Images/FooterImages/footer-dinnerscard-logo.png";
import Wallet from "../../Images/FooterImages/footer-wallet-logo.png";
import InternetBanking from "../../Images/FooterImages/footer-internet-banking-logo.png";
import Facebook from "../../Images/FooterImages/footer-facebook-logo.png";
import Twitter from "../../Images/FooterImages/footer-twitter-logo.png";
import Youtube from "../../Images/FooterImages/footer-youtube-logo.png";
import Instagram from "../../Images/FooterImages/footer-facebook-logo.png";
import Linkedin from "../../Images/FooterImages/footer-linkedin-logo.png";
import Pinterest from "../../Images/FooterImages/footer-pinterest-logo.png";

const Footer = () => {
  return (
    <div className="bg-gray-100 w-full">
      {/* First Half */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-10 px-8 py-12">
        <div>
          <ul>
            <li className="text-black font-semibold mb-4">Useful Links</li>
            <li className="text-gray-500 text-sm mb-2">About Us</li>
            <li className="text-gray-500 text-sm mb-2">Our Blog</li>
            <li className="text-gray-500 text-sm mb-2">Careers</li>
            <li className="text-gray-500 text-sm mb-2">Corporate Governance</li>
            <li className="text-gray-500 text-sm mb-2">
              Pepperfry In the News
            </li>
            <li className="text-gray-500 text-sm mb-2">Find A Studio</li>
            <li className="text-gray-500 text-sm mb-2">Gift Cards</li>
            <li className="text-gray-500 text-sm mb-2">Brands</li>
            <li className="text-gray-500 text-sm mb-2">Customer Reviews</li>
          </ul>
        </div>

        <div>
          <ul>
            <li className="text-black font-semibold mb-4">Partners</li>
            <li className="text-gray-500 text-sm mb-2">Sell With Us</li>
            <li className="text-gray-500 text-sm mb-2">Become a Franchisee</li>
            <li className="text-gray-500 text-sm mb-2">Design For Us</li>
            <li className="text-gray-500 text-sm mb-2">Marketplace Policies</li>
            <li className="text-gray-500 text-sm mb-2">Merchant Dashboard</li>
            <li className="text-gray-500 text-sm mb-2">GST and You</li>
            <li className="text-gray-500 text-sm mb-2">Corporate Enquiries</li>
          </ul>
        </div>

        <div>
          <ul>
            <li className="text-black font-semibold mb-4">Need Help?</li>
            <li className="text-gray-500 text-sm mb-2">Contact Us</li>
            <li className="text-gray-500 text-sm mb-2">Returns & Refund</li>
            <li className="text-gray-500 text-sm mb-2">Track Your Order</li>
            <li className="text-gray-500 text-sm mb-2">FAQs</li>
            <li className="text-gray-500 text-sm mb-2">Buy on Phone</li>
          </ul>
        </div>

        <div>
          <h2 className="font-serif text-lg font-bold mb-2">Download App</h2>
          <img src={Apple} alt="AppStore" className="mb-3 h-[60px] w-[165px]" />
          <img
            src={GooglePlay}
            alt="GooglePlay"
            className="h-[60px] w-[165px]"
          />
        </div>
      </div>

      {/* Second Half */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-8 pb-12">
        <div>
          <h1 className="text-black text-base font-medium mb-2">
            Popular Categories
          </h1>
          <p className="text-gray-500 text-sm leading-relaxed">
            Queen Size Beds, King Size Beds, Coffee Tables, Dining Sets,
            Recliners...
          </p>
        </div>
        <div>
          <h1 className="text-black text-base font-medium mb-2">
            Popular Brands
          </h1>
          <p className="text-gray-500 text-sm leading-relaxed">
            Mintwud, Woodsworth, CasaCraft, Amberville, Mudramark...
          </p>
        </div>
        <div>
          <h1 className="text-black text-base font-medium mb-2">
            Cities we deliver to
          </h1>
          <p className="text-gray-500 text-sm leading-relaxed">
            Bengaluru, Mumbai, Navi Mumbai, Delhi, Hyderabad...
          </p>
        </div>
      </div>

      <hr className="border-gray-300 mx-8" />

      {/* Third Half */}
      <div className="flex flex-col md:flex-row justify-between px-8 py-6 gap-6">
        <div>
          <h1 className="text-black text-base font-medium mb-2">We accept</h1>
          <div className="flex flex-wrap gap-2">
            {[
              Visa,
              MasterCard,
              MaestroCard,
              AmericanExpress,
              RuPay,
              DinnersCard,
              Wallet,
              InternetBanking,
            ].map((img, idx) => (
              <img key={idx} src={img} alt="payment" className="h-8" />
            ))}
          </div>
        </div>

        <div>
          <h1 className="text-black text-base font-medium mb-2">
            Like what you see? You'll like us even more here
          </h1>
          <div className="flex flex-wrap gap-2">
            {[Facebook, Twitter, Youtube, Instagram, Linkedin, Pinterest].map(
              (img, idx) => (
                <img key={idx} src={img} alt="social" className="h-8" />
              )
            )}
          </div>
        </div>
      </div>

      <hr className="border-gray-300 mx-8" />

      {/* Fourth Half */}
      <div className="flex flex-col md:flex-row justify-between px-8 py-6">
        <div className="flex gap-4 text-gray-700 text-sm font-medium">
          <span>Buy In Bulk</span>
          <span>Write A Testimonial</span>
        </div>
        <div className="flex flex-wrap gap-4 text-gray-700 text-sm font-medium mt-4 md:mt-0">
          <span>Whitehat</span>
          <span>Site Map</span>
          <span>Terms Of Use</span>
          <span>Privacy Policy</span>
          <span>Your Data & Security</span>
          <span>Grievance Redressal</span>
        </div>
      </div>
    </div>
  );
};

export default Footer;
