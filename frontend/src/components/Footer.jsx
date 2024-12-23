import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaLinkedin,
  FaLocationDot,
  FaYoutube,
  FaInstagram,
  FaFacebook,
  FaTelegram,
} from "react-icons/fa6";
import { BsFillTelephoneFill } from "react-icons/bs";
import { IoMdMail } from "react-icons/io";
import { LiaCopyrightSolid } from "react-icons/lia";
const Community_footer = () => {
  return (
    <div className="flex flex-col">
      <div className="w-full bg-[#36454F] pt-4 md:pl-20">
        <div className="mb-2 flex w-full items-center md:mb-4">
          <div className="mb-2 flex w-full flex-col items-center justify-around rounded-full p-2 sm:w-1/3 sm:flex-row lg:bg-white">
            <input
              className="mb-2 w-80 rounded-full bg-white px-4 py-2 leading-tight text-gray-700 focus:border-teal-500 focus:outline-none sm:mb-0"
              id="email"
              type="text"
              placeholder="Email address to subscribe"
            />
            <button
              className="w-36 rounded-full bg-[#36454F] px-4 py-2 text-sm text-white hover:bg-[#f5f5f5] hover:text-black sm:ml-2 sm:w-32"
              type="button"
            >
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* Middle Footer Section that contain all matter and links and about part */}
      <div>
        <div className="-mt-1 w-full bg-[#36454F] px-4 py-2 text-white">
          <div className="w-full bg-[#36454F] text-white md:px-8">
            <div className="w-full bg-[#36454F] py-2 text-white md:px-6">
              <div className="flex w-full flex-col justify-between space-y-6 lg:flex-row lg:space-x-6 lg:space-y-0">
                <div className="mr-4 w-full lg:w-1/3">
                  <div className="font-serif">
                    <h2 className="text-xl font-bold lg:text-2xl">
                      SRM UNIVERSITY
                    </h2>
                    <h3 className="text-xs lg:text-sm">
                      Make Yourself Future Fit
                    </h3>
                    <p className="mt-4 text-sm leading-relaxed lg:text-base">
                      At SRM Education, we’re passionate about empowering
                      B.TEch aspirants to reach their full potential. Our team
                      is committed to providing you with the best learning
                      experience possible.
                    </p>
                  </div>
                </div>

                <div className="grid w-full grid-cols-2 gap-2 lg:w-2/3 lg:grid-cols-3">
                  <div className="w-full">
                    <h3 className="text-lg font-semibold">Quick Links</h3>
                    <ul className="text-base  flex flex-col gap-1 md:gap-2 mt-4 style={{ color: 'teal' }">
                      <p>
                        <Link  className="hover:underline">
                          Why choose us
                        </Link>
                      </p>
                      <p>
                        <a
                          href="#navigation_for_contactus"
                          className="hover:underline"
                        >
                          Contact us
                        </a>
                      </p>
                      <p>
                        <Link className="hover:underline">
                          Terms and conditions
                        </Link>
                      </p>
                      <p>
                        <Link className="hover:underline">
                          Privacy policy
                        </Link>
                      </p>
                      <p>
                        <Link  className="hover:underline">
                          FAQs and Help
                        </Link>
                      </p>
                    </ul>
                  </div>
                  <div className="w-full">
                    <h3 className="text-lg font-semibold">Business Hours</h3>
                    <p className="mt-4 flex flex-col gap-1 text-base leading-relaxed md:gap-2">
                      Mon - Fri
                      <br />
                      9.00 am to 07.00 pm
                      <br />
                      Saturday
                      <br />
                      9.00 am to 06.00 pm
                      <br />
                      Sunday also available
                    </p>
                  </div>
                  <div className="flex w-full flex-col">
                    <div className="mt-6 lg:mt-0">
                      <h3 className="text-lg font-semibold">Contact Info</h3>
                      <p className="mt-2 flex flex-col gap-1 text-base leading-relaxed md:mt-4 md:gap-2">
                        {[
                          { icon: FaLocationDot, text: "SRM UNIVERSITY, India" },
                          {
                            icon: BsFillTelephoneFill,
                            text: "+91 99999 99999",
                            link: "tel:+918059458609",
                          },
                          {
                            icon: IoMdMail,
                            text: "support@srm.tech",
                            link: "mailto:support@srm.tech",
                          },
                        ].map((item, idx) => (
                          <div
                            className="flex flex-row items-center space-x-2"
                            key={idx}
                          >
                            <item.icon className="h-4 w-4" />
                            {item.link ? (
                              <a
                                className="duration-400 group transform rounded-lg font-bold text-white transition hover:-translate-y-1 focus:text-[#50eddb] md:hover:text-[#50eddb]"
                                href={item.link}
                              >
                                {item.text}
                              </a>
                            ) : (
                              <span>{item.text}</span>
                            )}
                          </div>
                        ))}

                        <div className="mt-2 hidden flex-row space-x-4 lg:flex">
                          {[
                            {
                              
                              icon: FaLinkedin,
                            },
                            {
                             
                              icon: FaYoutube,
                            },
                            {

                              icon: FaInstagram,
                            },
                            {
                              icon: FaFacebook,
                            },
                            {
                              icon: FaTelegram,
                            },
                          ].map((item, idx) => (
                            <a
                              key={idx}
                              href={item.link}
                              className="duration-400 group transform rounded-lg font-bold text-white transition hover:-translate-y-1"
                            >
                              <item.icon className="h-6 w-6 text-white group-hover:text-[#50eddb]" />
                            </a>
                          ))}
                        </div>
                      </p>
                    </div>
                  </div>
                  <div className="mt-2 flex w-full flex-col justify-center md:mt-0 md:hidden">
                    <div className="mt-2 grid grid-cols-3 items-center justify-center gap-x-2 gap-y-4">
                      {[
                        {
                          link: "https://www.linkedin.com/company/writo-learning-solutions/",
                          icon: FaLinkedin,
                        },
                        {
                          link: "https://youtube.com/@writoacademy?si=ySierizfl6kPGwGl",
                          icon: FaYoutube,
                        },
                        {
                          link: "https://www.instagram.com/writoeducation?igsh=dHI1N2Q1N3FhaXEz",
                          icon: FaInstagram,
                        },
                        {
                          link: "https://www.facebook.com/profile.php?id=61558449281363&mibextid=ZbWKwL",
                          icon: FaFacebook,
                        },
                        {
                          link: "https://t.me/writoacedamy",
                          icon: FaTelegram,
                        },
                      ].map((item, idx) => (
                        <a
                          key={idx}
                          href={item.link}
                          className="duration-400 group transform rounded-lg px-2 py-1 font-bold text-white transition hover:-translate-y-1"
                        >
                          <item.icon className="h-6 w-6 text-white group-focus:text-[#50eddb]" />
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Last Part -> Copy rights Part */}
        <div className="w-full bg-[#36454F] p-2 text-white">
          <div className="ml-4 flex flex-row items-center justify-center space-x-4">
            <LiaCopyrightSolid className="h-6 w-6 font-bold text-white" />
            <Link to={"/"}>
              <p className="font-semibold text-white">SRM UNIVERSITY</p>
            </Link>
            <Link to={"/copyrights"}>
              <p className="text-sm text-gray-500 hover:text-gray-400">
                All rights reserved
              </p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Community_footer;