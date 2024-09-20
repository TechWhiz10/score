import React, { useEffect, useState } from "react";
import Image from "next/image";
import icon from "@/public/img/icon.png";

const ProfileModal = ({
  isOpen,
  setIsOpen,
  userEmail,
  trialEndTime,
  subscriptionEndTime,
  userStatus,
  referralCode,
}) => {
  const [timeLeft, setTimeLeft] = useState({});
  const [copySuccess, setCopySuccess] = useState("");

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const endTime =
        userStatus === "trialist" ? trialEndTime : subscriptionEndTime;
      const difference = new Date(endTime) - now;

      let timeLeft = {};
      if (difference > 0) {
        timeLeft = {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / (1000 * 60)) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        };
      }
      return timeLeft;
    };

    setTimeLeft(calculateTimeLeft());

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [trialEndTime, subscriptionEndTime, userStatus]);

  const copyToClipboard = () => {
    const baseURL = process.env.NEXT_PUBLIC_BASE_URL;
    const referralLink = `${baseURL}/?code=${referralCode}`;
    navigator.clipboard.writeText(referralLink).then(
      () => {
        setCopySuccess("Copied!");
        setTimeout(() => setCopySuccess(""), 2000);
      },
      (err) => {
        console.error("Failed to copy: ", err);
      }
    );
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
      <div className="bg-purple-900 rounded-lg p-4 w-11/12 max-w-sm mx-auto text-white">
        <h2 className="text-lg font-bold mb-4">Profile</h2>
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 bg-gray-400 rounded-full flex items-center justify-center overflow-hidden">
            <Image
              src={icon}
              alt="Profile Icon"
              width={64}
              height={64}
              className="object-cover"
            />
          </div>
          <h3 className="text-lg font-semibold mt-2">
            {userEmail || "EmailNotFound"}
          </h3>
        </div>
        <div className="mt-4 space-y-4 text-sm">
          <button className="flex items-center justify-between w-full bg-blue-700 px-4 py-2 rounded-lg">
            Get Notifications by Email
            <span>{userEmail}</span>
          </button>
          <div className="bg-purple-700 px-4 py-2 rounded-lg">
            {userStatus === "trialist" && (
              <div>
                Free Trial: {timeLeft.days}d {timeLeft.hours}h{" "}
                {timeLeft.minutes}m {timeLeft.seconds}s
              </div>
            )}
            {userStatus === "basic" && (
              <div>
                Basic Membership: {timeLeft.days}d {timeLeft.hours}h{" "}
                {timeLeft.minutes}m {timeLeft.seconds}s
              </div>
            )}
            {userStatus === "premium" && (
              <div>
                Premium Membership: {timeLeft.days}d {timeLeft.hours}h{" "}
                {timeLeft.minutes}m {timeLeft.seconds}s
              </div>
            )}
          </div>
          {userStatus === "trialist" && (
            <a
              href="/#pricing"
              className="block w-full text-center bg-green-700 px-4 py-2 rounded-lg"
            >
              Subscribe
            </a>
          )}
          {userStatus === "basic" && (
            <a
              href="/#pricing"
              className="block w-full text-center bg-green-700 px-4 py-2 rounded-lg"
            >
              Upgrade to Premium
            </a>
          )}

          {/* Referral Program Section */}
          <div>
            <h3 className="text-lg font-bold">Affiliate Program</h3>
            <p className="text-sm mt-2">
              Invite your friends to sign up for SportsBetter.Ai, and receive a
              50% commission from their subscription.
            </p>
            <div className="flex mt-3">
              <input
                readOnly
                value={`${process.env.NEXT_PUBLIC_BASE_URL}/?code=${referralCode}`}
                className="text-center bg-dark-purple rounded p-2 text-white flex-grow"
              />
              <button
                onClick={copyToClipboard}
                className="ml-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Copy
              </button>
            </div>
            {copySuccess && (
              <div className="text-green-500 text-sm mt-2">{copySuccess}</div>
            )}
          </div>
        </div>
        <div className="text-center mt-4">
          <button
            onClick={() => setIsOpen(false)}
            className="bg-purple-700 px-4 py-2 rounded-lg"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileModal;
