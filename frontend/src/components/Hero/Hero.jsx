import React from "react";
import ImageSlider from "../ImageSlider/ImageSlider";
import { SliderData } from "../ImageSlider/SliderData";

const Hero = () => {
  return (
    <>
      <div className="w-[90%] mx-auto cursor-pointer">
        {/* Below Navbar Section */}
        <div className="flex">
          <ImageSlider slides={SliderData} />
          <img
            src="https://ii2.pepperfry.com/media/wysiwyg/banners/Web_Scandinavian_RHS_26042022.jpg"
            alt="SideImage"
            className="h-[450px] w-[330px]"
          />
        </div>

        {/* Rectangular Block */}
        <div>
          <img
            src="https://ii3.pepperfry.com/media/wysiwyg/banners/2021_web_regBanner_21042022.jpg"
            alt="T&C"
            className="mt-[4%] w-full mb-[2%]"
          />
        </div>

        {/* Shop By Room */}
        <h1 className="text-2xl font-bold">Shop By Room</h1>
        <div className="grid grid-cols-4 mt-[1%] mb-[2%] gap-[1%]">
          <div>
            <img
              src="https://ii1.pepperfry.com/media/wysiwyg/banners/Homepage_Rooms_Section_Web_1_2x_31032022.jpg"
              alt="Living"
              className="h-[250px] w-full"
            />
            <div className="text-xl">Living Room</div>
          </div>
          <div>
            <img
              src="https://ii2.pepperfry.com/media/wysiwyg/banners/Homepage_Rooms_Section_Web_2_2x_31032022.jpg"
              alt="WFH"
              className="h-[250px] w-full"
            />
            <div className="text-xl">Work From Home</div>
          </div>
          <div>
            <img
              src="https://ii3.pepperfry.com/media/wysiwyg/banners/Homepage_Rooms_Section_Web_3_2x_31032022.jpg"
              alt="Bedroom"
              className="h-[250px] w-full"
            />
            <div className="text-xl">Bedroom</div>
          </div>
          <div>
            <img
              src="https://ii1.pepperfry.com/media/wysiwyg/banners/Homepage_Rooms_Section_Web_4_2x_31032022.jpg"
              alt="KidsRoom"
              className="h-[250px] w-full"
            />
            <div className="text-xl">Kids Room</div>
          </div>
        </div>

        {/* What's Everyone Eyeing */}
        <h1 className="text-2xl font-bold">What's Everyone Eyeing</h1>
        <div className="grid grid-cols-3 mt-[1%] mb-[2%] gap-[1%]">
          <div>
            <img
              src="https://ii2.pepperfry.com/media/wysiwyg/banners/Homepage_Trend_Section_WEB_1_2x_31032022.jpg"
              alt="Wardrobes"
              className="h-[450px] w-full"
            />
          </div>
          <div>
            <img
              src="https://ii3.pepperfry.com/media/wysiwyg/banners/Homepage_Trend_Section_WEB_2_2x_31032022.jpg"
              alt="WallArt"
              className="h-[450px] w-full"
            />
          </div>
          <div className="grid grid-cols-2 gap-[3%]">
            <div>
              <img
                src="https://ii1.pepperfry.com/media/wysiwyg/banners/Homepage_Trend_Section_WEB_3_2x_31032022.jpg"
                alt="ShoeRack"
                className="h-[27vh] w-full"
              />
            </div>
            <div>
              <img
                src="https://ii3.pepperfry.com/media/wysiwyg/banners/Homepage_Trend_Section_WEB_4_2x_31032022.jpg"
                alt="KingSizeBed"
                className="h-[27vh] w-full"
              />
            </div>
            <div>
              <img
                src="https://ii2.pepperfry.com/media/wysiwyg/banners/Homepage_Trend_Section_WEB_5_2x_31032022.jpg"
                alt="SeaterSofa"
                className="h-[27vh] w-full"
              />
            </div>
            <div>
              <img
                src="https://ii1.pepperfry.com/media/wysiwyg/banners/Homepage_Trend_Section_WEB_6_2x_31032022.jpg"
                alt="HangingLights"
                className="h-[27vh] w-full"
              />
            </div>
          </div>
        </div>

        {/* Your Pocket-Friendly Shoppe */}
        <h1 className="text-2xl font-bold">Your Pocket-Friendly Shoppe</h1>
        <div className="grid grid-cols-4 gap-[1%] mt-[1%] mb-[2%]">
          <div>
            <img
              src="https://ii2.pepperfry.com/media/wysiwyg/banners/Homepage_Budget_Block_WEB_1_2x_31032022.jpg"
              alt="QueenSizeBeds"
              className="h-[350px] w-full"
            />
            <div className="text-xl font-bold">Queen Size Beds</div>
            <div className="text-sm">Under Rs. 20,000</div>
          </div>
          <div>
            <img
              src="https://ii3.pepperfry.com/media/wysiwyg/banners/Homepage_Budget_Block_WEB_2_2x_31032022.jpg"
              alt="StudyTables"
              className="h-[350px] w-full"
            />
            <div className="text-xl font-bold">Study Tables</div>
            <div className="text-sm">Under Rs. 10,000</div>
          </div>
          <div>
            <img
              src="https://ii1.pepperfry.com/media/wysiwyg/banners/Homepage_Budget_Block_WEB_3_2x_31032022.jpg"
              alt="PortableTables"
              className="h-[350px] w-full"
            />
            <div className="text-xl font-bold">Portable Tables</div>
            <div className="text-sm">Under Rs. 3,000</div>
          </div>
          <div>
            <img
              src="https://ii2.pepperfry.com/media/wysiwyg/banners/Homepage_Budget_Block_WEB_4_2x_31032022.jpg"
              alt="OfficeChairs"
              className="h-[350px] w-full"
            />
            <div className="text-xl font-bold">Office Chairs</div>
            <div className="text-sm">Under Rs. 9,000</div>
          </div>
        </div>

        {/* Ready For The New? */}
        <h1 className="text-2xl font-bold">Ready For The New?</h1>
        <div className="grid grid-cols-3 mt-[1%] mb-[2%] gap-[1%]">
          <div>
            <img
              src="https://ii2.pepperfry.com/media/wysiwyg/banners/Homepage_Collection_Block_WEB_1_2x_31032022.jpg"
              alt="Aelber"
              className="h-[450px] w-full"
            />
            <div className="text-xl font-bold">Aelber Collection</div>
            <div className="text-sm">So Plush</div>
          </div>
          <div>
            <img
              src="https://ii3.pepperfry.com/media/wysiwyg/banners/Homepage_Collection_Block_WEB_2_2x_31032022.jpg"
              alt="Alabaster"
              className="h-[450px] w-full"
            />
            <div className="text-xl font-bold">Alabaster Collection</div>
            <div className="text-sm">Winsome Whites</div>
          </div>
          <div>
            <img
              src="https://ii1.pepperfry.com/media/wysiwyg/banners/Homepage_Collection_Block_WEB_3_2x_31032022.jpg"
              alt="DisneyCollection"
              className="h-[450px] w-full"
            />
            <div className="text-xl font-bold">Disney Collection</div>
            <div className="text-sm">The Happiest Collection</div>
          </div>
        </div>

        {/* Home Décor You Can't Ignore */}
        <h1 className="text-2xl font-bold">Home Décor You Can't Ignore</h1>
        <div className="grid grid-cols-4 gap-[1%] mt-[1%] mb-[2%]">
          <div>
            <img
              src="https://ii2.pepperfry.com/media/wysiwyg/banners/Homepage_Decor_Block_WEB_1_2x_31032022.jpg"
              alt="BedSheets"
              className="h-[350px] w-full"
            />
            <div className="text-xl font-bold">Bed Sheets</div>
            <div className="text-sm">Fresh & Breezy</div>
          </div>
          <div>
            <img
              src="https://ii3.pepperfry.com/media/wysiwyg/banners/Homepage_Decor_Block_WEB_2_2x_31032022.jpg"
              alt="WallArt"
              className="h-[350px] w-full"
            />
            <div className="text-xl font-bold">Metal Wall Art</div>
            <div className="text-sm">Oh So Glam</div>
          </div>
          <div>
            <img
              src="https://ii1.pepperfry.com/media/wysiwyg/banners/Homepage_Decor_Block_WEB_3_2x_31032022.jpg"
              alt="Figurines"
              className="h-[350px] w-full"
            />
            <div className="text-xl font-bold">Figurines</div>
            <div className="text-sm">Starting Rs. 265</div>
          </div>
          <div>
            <img
              src="https://ii2.pepperfry.com/media/wysiwyg/banners/Homepage_Decor_Block_WEB_4_2x_31032022.jpg"
              alt="CushionCovers"
              className="h-[350px] w-full"
            />
            <div className="text-xl font-bold">Cushion Covers</div>
            <div className="text-sm">Quick Makeovers</div>
          </div>
        </div>

        {/* We've Got Your Style */}
        <div className="grid grid-cols-4 gap-[1%] mt-[1%] mb-[2%] bg-[#e9f1f5] p-12">
          <div>
            <h1 className="text-2xl font-bold">We've Got Your Style</h1>
            <br />
            <p>
              Your home is a reflection of you. Nail your aesthetic with
              products our stylists love and recommend
            </p>
            <br />
            <div className="text-[#ff7035]">View all Styles</div>
          </div>
          <div>
            <img
              src="https://ii2.pepperfry.com/media/wysiwyg/banners/Homepage_Style_Block_Web_1_2x_31032022.jpg"
              alt="Modern"
              className="h-[170px] w-full"
            />
            <div className="text-xl font-bold">Modern</div>
            <div className="text-sm">Form Meets Function</div>
          </div>
          <div>
            <img
              src="https://ii3.pepperfry.com/media/wysiwyg/banners/Homepage_Style_Block_Web_2_2x_31032022.jpg"
              alt="Traditional"
              className="h-[170px] w-full"
            />
            <div className="text-xl font-bold">Traditional</div>
            <div className="text-sm">Old World Charm</div>
          </div>
          <div>
            <img
              src="https://ii1.pepperfry.com/media/wysiwyg/banners/Homepage_Style_Block_Web_3_2x_31032022.jpg"
              alt="Industrial"
              className="h-[170px] w-full"
            />
            <div className="text-xl font-bold">Industrial</div>
            <div className="text-sm">Prefect Imperfections</div>
          </div>
        </div>

        {/* Top Brands To Choose From */}
        <h1 className="text-2xl font-bold">Top Brands To Choose From</h1>
        <div className="grid grid-cols-6 gap-[1%] mt-[1%] mb-[3%]">
          <img
            src="https://ii2.pepperfry.com/media/wysiwyg/banners/Homepage_Brands_WEB_1_2x_31032022.jpg"
            alt="Industrial"
            className="h-[270px] w-full"
          />
          <img
            src="https://ii3.pepperfry.com/media/wysiwyg/banners/Homepage_Brands_WEB_2_2x_31032022.jpg"
            alt="Industrial"
            className="h-[270px] w-full"
          />
          <img
            src="https://ii1.pepperfry.com/media/wysiwyg/banners/Homepage_Brands_WEB_3_2x_31032022.jpg"
            alt="Industrial"
            className="h-[270px] w-full"
          />
          <img
            src="https://ii2.pepperfry.com/media/wysiwyg/banners/Homepage_Brands_WEB_4_2x_31032022.jpg"
            alt="Industrial"
            className="h-[270px] w-full"
          />
          <img
            src="https://ii3.pepperfry.com/media/wysiwyg/banners/Homepage_Brands_WEB_5_2x_31032022.jpg"
            alt="Industrial"
            className="h-[270px] w-full"
          />
          <img
            src="https://ii1.pepperfry.com/media/wysiwyg/banners/Homepage_Brands_WEB_6_2x_31032022.jpg"
            alt="Industrial"
            className="h-[270px] w-full"
          />
        </div>

        {/* Two Big Images */}
        <div className="grid grid-cols-2 gap-[1%] mb-[3%]">
          <img
            src="https://ii2.pepperfry.com/media/wysiwyg/banners/Mattress_Block_Web_2X_04032022.jpg"
            alt="ShopNowOne"
            className="h-[570px] w-full"
          />
          <img
            src="https://ii3.pepperfry.com/media/wysiwyg/banners/Modular_Block_Web_2X_04032022.jpg"
            alt="ShopNowTwo"
            className="h-[570px] w-full"
          />
        </div>

        {/* More From The Store */}
        <div className="relative">
          <img
            src="https://ii1.pepperfry.com/images/hp_more_from_store_bg.jpg"
            alt="SofaImage"
            className="w-full"
          />
          <div className="absolute top-2 left-4 p-2">
            <h1 className="text-2xl font-bold">More From The Store</h1>
            <br />
            <div className="grid grid-cols-5 gap-8">
              <div>
                <h3 className="font-semibold">Furniture</h3>
                <ul>
                  <li className="list-none leading-relaxed text-xs cursor-pointer hover:text-[#ff7035]">
                    Sofas & Recliners
                  </li>
                  <li className="list-none leading-relaxed text-xs cursor-pointer hover:text-[#ff7035]">
                    Seating
                  </li>
                  <li className="list-none leading-relaxed text-xs cursor-pointer hover:text-[#ff7035]">
                    Chairs
                  </li>
                  <li className="list-none leading-relaxed text-xs cursor-pointer hover:text-[#ff7035]">
                    Beds
                  </li>
                  <li className="list-none leading-relaxed text-xs cursor-pointer hover:text-[#ff7035]">
                    Cabinetry
                  </li>
                  <li className="list-none leading-relaxed text-xs cursor-pointer hover:text-[#ff7035]">
                    Tables
                  </li>
                  <li className="list-none leading-relaxed text-xs cursor-pointer hover:text-[#ff7035]">
                    Dining
                  </li>
                  <li className="list-none leading-relaxed text-xs cursor-pointer hover:text-[#ff7035]">
                    Kids & Teens
                  </li>
                  <li className="list-none leading-relaxed text-xs cursor-pointer hover:text-[#ff7035]">
                    Home Office
                  </li>
                  <li className="list-none leading-relaxed text-xs cursor-pointer hover:text-[#ff7035]">
                    Sofa Chairs
                  </li>
                  <li className="list-none leading-relaxed text-xs cursor-pointer hover:text-[#ff7035]">
                    Entertainment Units
                  </li>
                  <li className="list-none leading-relaxed text-xs cursor-pointer hover:text-[#ff7035]">
                    Outdoor
                  </li>
                  <li className="list-none leading-relaxed text-xs cursor-pointer hover:text-[#ff7035]">
                    Bar Furniture
                  </li>
                  <li className="list-none leading-relaxed text-xs cursor-pointer hover:text-[#ff7035]">
                    Furniture & Home Services
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold">Sofas & Recliners</h3>
                <ul>
                  <li className="list-none leading-relaxed text-xs cursor-pointer hover:text-[#ff7035]">
                    By size
                  </li>
                  <li className="list-none leading-relaxed text-xs cursor-pointer hover:text-[#ff7035]">
                    By Types
                  </li>
                  <li className="list-none leading-relaxed text-xs cursor-pointer hover:text-[#ff7035]">
                    By Style
                  </li>
                  <li className="list-none leading-relaxed text-xs cursor-pointer hover:text-[#ff7035]">
                    By Material
                  </li>
                  <li className="list-none leading-relaxed text-xs cursor-pointer hover:text-[#ff7035]">
                    Soda Chairs
                  </li>
                </ul>
                <br />
                <h3 className="font-semibold">Décor</h3>
                <ul>
                  <li className="list-none leading-relaxed text-xs cursor-pointer hover:text-[#ff7035]">
                    Wall Shelves & Cabinets
                  </li>
                  <li className="list-none leading-relaxed text-xs cursor-pointer hover:text-[#ff7035]">
                    Clocks
                  </li>
                  <li className="list-none leading-relaxed text-xs cursor-pointer hover:text-[#ff7035]">
                    Wall Art
                  </li>
                  <li className="list-none leading-relaxed text-xs cursor-pointer hover:text-[#ff7035]">
                    Table Décor
                  </li>
                  <li className="list-none leading-relaxed text-xs cursor-pointer hover:text-[#ff7035]">
                    Spiritual
                  </li>
                  <li className="list-none leading-relaxed text-xs cursor-pointer hover:text-[#ff7035]">
                    Home Garden
                  </li>
                  <li className="list-none leading-relaxed text-xs cursor-pointer hover:text-[#ff7035]">
                    Tableware
                  </li>
                  <li className="list-none leading-relaxed text-xs cursor-pointer hover:text-[#ff7035]">
                    Kids Décor
                  </li>
                  <li className="list-none leading-relaxed text-xs cursor-pointer hover:text-[#ff7035]">
                    Mirrors
                  </li>
                  <li className="list-none leading-relaxed text-xs cursor-pointer hover:text-[#ff7035]">
                    Photo Frames
                  </li>
                  <li className="list-none leading-relaxed text-xs cursor-pointer hover:text-[#ff7035]">
                    Accent Furniture
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold">Beds</h3>
                <ul>
                  <li className="list-none leading-relaxed text-xs cursor-pointer hover:text-[#ff7035]">
                    By Size
                  </li>
                  <li className="list-none leading-relaxed text-xs cursor-pointer hover:text-[#ff7035]">
                    By Storage
                  </li>
                  <li className="list-none leading-relaxed text-xs cursor-pointer hover:text-[#ff7035]">
                    Kids & Teens
                  </li>
                  <li className="list-none leading-relaxed text-xs cursor-pointer hover:text-[#ff7035]">
                    By Material
                  </li>
                  <li className="list-none leading-relaxed text-xs cursor-pointer hover:text-[#ff7035]">
                    By Style
                  </li>
                  <li className="list-none leading-relaxed text-xs cursor-pointer hover:text-[#ff7035]">
                    Mattresses
                  </li>
                </ul>
                <br />
                <h3 className="font-semibold">Furnishings</h3>
                <ul>
                  <li className="list-none leading-relaxed text-xs cursor-pointer hover:text-[#ff7035]">
                    Bed Linen
                  </li>
                  <li className="list-none leading-relaxed text-xs cursor-pointer hover:text-[#ff7035]">
                    Blankets & Comforters
                  </li>
                  <li className="list-none leading-relaxed text-xs cursor-pointer hover:text-[#ff7035]">
                    Carpets
                  </li>
                  <li className="list-none leading-relaxed text-xs cursor-pointer hover:text-[#ff7035]">
                    Curtains
                  </li>
                  <li className="list-none leading-relaxed text-xs cursor-pointer hover:text-[#ff7035]">
                    Cushion & Covers
                  </li>
                  <li className="list-none leading-relaxed text-xs cursor-pointer hover:text-[#ff7035]">
                    Bath Linen
                  </li>
                  <li className="list-none leading-relaxed text-xs cursor-pointer hover:text-[#ff7035]">
                    Kids Furnishings
                  </li>
                  <li className="list-none leading-relaxed text-xs cursor-pointer hover:text-[#ff7035]">
                    Home Services
                  </li>
                  <li className="list-none leading-relaxed text-xs cursor-pointer hover:text-[#ff7035]">
                    Flooring
                  </li>
                  <li className="list-none leading-relaxed text-xs cursor-pointer hover:text-[#ff7035]">
                    Table Linen
                  </li>
                  <li className="list-none leading-relaxed text-xs cursor-pointer hover:text-[#ff7035]">
                    Essentials
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold">Cabinetry</h3>
                <ul>
                  <li className="list-none leading-relaxed text-xs cursor-pointer hover:text-[#ff7035]">
                    Wardrobes
                  </li>
                  <li className="list-none leading-relaxed text-xs cursor-pointer hover:text-[#ff7035]">
                    Shoe Racks
                  </li>
                  <li className="list-none leading-relaxed text-xs cursor-pointer hover:text-[#ff7035]">
                    Storage
                  </li>
                  <li className="list-none leading-relaxed text-xs cursor-pointer hover:text-[#ff7035]">
                    Entertainment Units
                  </li>
                  <li className="list-none leading-relaxed text-xs cursor-pointer hover:text-[#ff7035]">
                    Bar
                  </li>
                  <li className="list-none leading-relaxed text-xs cursor-pointer hover:text-[#ff7035]">
                    Kids Storage
                  </li>
                </ul>
                <br />
                <h3 className="font-semibold">Lighting</h3>
                <ul>
                  <li className="list-none leading-relaxed text-xs cursor-pointer hover:text-[#ff7035]">
                    Floor Lamps
                  </li>
                  <li className="list-none leading-relaxed text-xs cursor-pointer hover:text-[#ff7035]">
                    Chandeliers
                  </li>
                  <li className="list-none leading-relaxed text-xs cursor-pointer hover:text-[#ff7035]">
                    Wall Lights
                  </li>
                  <li className="list-none leading-relaxed text-xs cursor-pointer hover:text-[#ff7035]">
                    Smart Lights
                  </li>
                  <li className="list-none leading-relaxed text-xs cursor-pointer hover:text-[#ff7035]">
                    Festive Lights
                  </li>
                  <li className="list-none leading-relaxed text-xs cursor-pointer hover:text-[#ff7035]">
                    Lampshades
                  </li>
                  <li className="list-none leading-relaxed text-xs cursor-pointer hover:text-[#ff7035]">
                    Ceiling Lights
                  </li>
                  <li className="list-none leading-relaxed text-xs cursor-pointer hover:text-[#ff7035]">
                    LED Lights
                  </li>
                  <li className="list-none leading-relaxed text-xs cursor-pointer hover:text-[#ff7035]">
                    Outdoor Lights
                  </li>
                  <li className="list-none leading-relaxed text-xs cursor-pointer hover:text-[#ff7035]">
                    Table Lamps
                  </li>
                  <li className="list-none leading-relaxed text-xs cursor-pointer hover:text-[#ff7035]">
                    Kids Lighting
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold">Appliances</h3>
                <ul>
                  <li className="list-none leading-relaxed text-xs cursor-pointer hover:text-[#ff7035]">
                    Mixers & Processors
                  </li>
                  <li className="list-none leading-relaxed text-xs cursor-pointer hover:text-[#ff7035]">
                    Breakfast Appliances
                  </li>
                  <li className="list-none leading-relaxed text-xs cursor-pointer hover:text-[#ff7035]">
                    Chinmeys
                  </li>
                  <li className="list-none leading-relaxed text-xs cursor-pointer hover:text-[#ff7035]">
                    Built-in Appliances
                  </li>
                  <li className="list-none leading-relaxed text-xs cursor-pointer hover:text-[#ff7035]">
                    Heating & Cooling Appliances
                  </li>
                  <li className="list-none leading-relaxed text-xs cursor-pointer hover:text-[#ff7035]">
                    Cleaning
                  </li>
                  <li className="list-none leading-relaxed text-xs cursor-pointer hover:text-[#ff7035]">
                    Refrigerators
                  </li>
                  <li className="list-none leading-relaxed text-xs cursor-pointer hover:text-[#ff7035]">
                    OTGs
                  </li>
                  <li className="list-none leading-relaxed text-xs cursor-pointer hover:text-[#ff7035]">
                    Food Makers
                  </li>
                  <li className="list-none leading-relaxed text-xs cursor-pointer hover:text-[#ff7035]">
                    Cocktops
                  </li>
                  <li className="list-none leading-relaxed text-xs cursor-pointer hover:text-[#ff7035]">
                    Bar Appliances
                  </li>
                  <li className="list-none leading-relaxed text-xs cursor-pointer hover:text-[#ff7035]">
                    Purifiers
                  </li>
                  <li className="list-none leading-relaxed text-xs cursor-pointer hover:text-[#ff7035]">
                    Laundry
                  </li>
                  <li className="list-none leading-relaxed text-xs cursor-pointer hover:text-[#ff7035]">
                    Televisions
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="my-8">
          <h1 className="text-2xl font-bold mb-4">Happy Customers, Happy Us</h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <img
                src="https://ii1.pepperfry.com/media/wysiwyg/banners/Testimonial_web_261221_7.jpg"
                alt=""
                className="h-[250px] w-full object-cover"
              />
              <p className="font-bold mb-2">
                Bought these two grey puffy stools from pepperfry. Found them to
                be surprisingly strong! Blends perfectly...
              </p>
              <div className="text-lg font-medium">Suman Senapatia</div>
              <div className="text-sm text-gray-500">Visakhapatnam</div>
            </div>
            <div>
              <img
                src="https://ii3.pepperfry.com/media/wysiwyg/banners/Testimonial_web_261221_8.jpg"
                alt=""
                className="h-[250px] w-full object-cover"
              />
              <p className="font-bold mb-2">
                I purchased Candy Study Chair in Pink Colour by Alex Daisy from
                pepperfry looks awesome and My daughter...
              </p>
              <div className="text-lg font-medium">Satya Madhana</div>
              <div className="text-sm text-gray-500">Secunderabad</div>
            </div>
            <div>
              <img
                src="https://ii2.pepperfry.com/media/wysiwyg/banners/Testimonial_web_261221_9.jpg"
                alt=""
                className="h-[250px] w-full object-cover"
              />
              <p className="font-bold mb-2">
                Purchased an ergonomic chair, I thought it would not be fitting
                for me but once it got delivered, got it...
              </p>
              <div className="text-lg font-medium">Baba Kattubadi</div>
              <div className="text-sm text-gray-500">Hyderabad</div>
            </div>
          </div>
        </div>

        <div className="mb-12">
          <h1 className="text-2xl font-bold mb-4">Need Help Buying</h1>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mt-4">
            <div>
              <img
                src="https://ii1.pepperfry.com/media/wysiwyg/banners/hp_need_help_p_1.jpg"
                alt=""
                className="h-[28vh] w-full object-cover"
              />
              <div className="mt-2 text-sm font-medium">
                Here's How To Choose The Right Sofa
              </div>
            </div>
            <div>
              <img
                src="https://ii2.pepperfry.com/media/wysiwyg/banners/hp_need_help_p_2.jpg"
                alt=""
                className="h-[28vh] w-full object-cover"
              />
              <div className="mt-2 text-sm font-medium">
                How To Buy A Perfect Bed For Your Room
              </div>
            </div>
            <div>
              <img
                src="https://ii3.pepperfry.com/media/wysiwyg/banners/hp_need_help_p_3.jpg"
                alt=""
                className="h-[28vh] w-full object-cover"
              />
              <div className="mt-2 text-sm font-medium">
                Your Guide To Buy The Perfect Mattress
              </div>
            </div>
            <div>
              <img
                src="https://ii1.pepperfry.com/media/wysiwyg/banners/hp_need_help_p_4.jpg"
                alt=""
                className="h-[28vh] w-full object-cover"
              />
              <div className="mt-2 text-sm font-medium">
                Everything About Cabinets And Sideboards
              </div>
            </div>
            <div>
              <img
                src="https://ii2.pepperfry.com/media/wysiwyg/banners/hp_need_help_p_5.jpg"
                alt=""
                className="h-[28vh] w-full object-cover"
              />
              <div className="mt-2 text-sm font-medium">
                What To Look For While Buying A Chair
              </div>
            </div>
            <div>
              <img
                src="https://ii3.pepperfry.com/media/wysiwyg/banners/hp_need_help_p_6.jpg"
                alt=""
                className="h-[28vh] w-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;
