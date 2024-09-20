// File: /components/DashboardHeader.js

import React from "react";
import Image from "next/image";
import Link from "next/link";
import logo from "@/app/icon.png"; // Your logo path

const DashboardHeader = ({
  userEmail,
  timeLeft,
  isSubscriptionActivated,
  isDropdownOpen,
  toggleDropdown,
  dropdownRef,
  setIsProfileModalOpen,
}) => {
  return (
    <div className="flex justify-between items-center mb-4">
      <Link href="/" title="SportsBetter.Ai homepage" legacyBehavior>
        <a className="flex items-center gap-2 shrink-0 text-teal-400 no-underline">
          <Image
            src={logo}
            alt="SportsBetter.Ai logo"
            className="w-8"
            priority={true}
            width={32}
            height={32}
          />
          <span className="font-extrabold text-lg text-teal-400">
            SportsBetter.Ai
          </span>
        </a>
      </Link>
      <div className="flex flex-col items-end space-y-1">
        <div className="flex flex-col items-center space-y-1">
          {isSubscriptionActivated ? (
            <span className="bg-green-600 text-white text-xs font-bold py-1 px-2 rounded-full">
              Subscriber ✅
            </span>
          ) : (
            <span
              className={`${
                userEmail ? "bg-red-600" : "bg-purple-600"
              } text-white text-xs font-bold py-1 px-2 rounded-full`}
            >
              {userEmail
                ? `Free Trial (${timeLeft.days}d ${timeLeft.hours}h ${timeLeft.minutes}m ${timeLeft.seconds}s)`
                : "Free Trial Ended"}
            </span>
          )}
        </div>
        <div className="relative">
          <button
            onClick={toggleDropdown}
            className="bg-purple-700 text-white font-bold py-1 px-2 rounded-full text-xs hover:bg-purple-800 transition-colors duration-200 focus:outline-none"
          >
            Account ▼
          </button>
          {isDropdownOpen && (
            <div
              ref={dropdownRef}
              className="origin-top-right absolute right-0 mt-1 w-48 rounded-md shadow-lg bg-purple-700 divide-y divide-purple-800 z-10"
            >
              <div className="py-1">
                <button
                  onClick={() => setIsProfileModalOpen(true)}
                  className="block w-full text-left px-4 py-2 text-sm text-white hover:bg-purple-800"
                >
                  Profile
                </button>
                <a
                  href="/"
                  className="block w-full text-left px-4 py-2 text-sm text-white hover:bg-purple-800"
                >
                  Logout
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
