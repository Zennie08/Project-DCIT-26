import React from "react";
import Title from "../components/Title";
import { assets } from "../assets/assets";

const Contact = () => {
  return (
    <div>
      <div className="text-center text-2xl pt-10 border-t">
        <Title text1={"CONTACT"} text2={"US"} />
      </div>

      <div className="my-10 flex flex-col justify-center md:flex-row gap-10 mb-28">
        <img className="w-full md:max-w-[480px]" src={assets.logo_2} alt="" />
        <div className="flex flex-col justify-center items-start gap-6">
          <p className="font-semibold text-xl text-gray-600">Our Store</p>
          <p className="text-gray-500">Rosario, Philippines, 4106</p>
          <p className="text-gray-600">
            Phone No: 09123456789 <br /> Email: lemonprints@gmail.com
          </p>
          <p className="font-semibold text-xl text-gray-600">
            Printing Service · Arts & Crafts Store · Gift Shop
          </p>
          <div className="my-5 flex items-center gap-4">
            <div className="flex gap-4">
              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  className="w-10 h-10 cursor-pointer transition-transform duration-300 ease-in-out transform hover:scale-110 hover:shadow-lg rounded-full"
                  src={assets.facebook_logo}
                  alt="Facebook Logo"
                />
              </a>
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  className="w-10 h-10 cursor-pointer transition-transform duration-300 ease-in-out transform hover:scale-110 hover:shadow-lg rounded-full"
                  src={assets.instagram_logo}
                  alt="Instagram Logo"
                />
              </a>
              <a
                href="https://www.tiktok.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  className="w-10 h-10 cursor-pointer transition-transform duration-300 ease-in-out transform hover:scale-110 hover:shadow-lg rounded-full"
                  src={assets.tiktok_logo}
                  alt="TikTok Logo"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
