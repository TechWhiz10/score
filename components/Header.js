"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import ButtonGradient from "@/components/ButtonGradient";
import logo from "@/app/icon.png";
import config from "@/config";
import FAQModal from "@/components/FAQModal";
import SimpleModal from "@/components/SimpleModal";
import LoginRegisterModal from "@/app/LoginRegisterModal"; // The modal component we just created

const links = [
  {
    href: "/#pricing",
    label: "Pricing",
  },
  // {
  //   href: "/#testimonials",
  //   label: "Reviews",
  // },
  {
    href: "/#faq",
    label: "FAQ",
  },
];

// const cta = <ButtonGradient title="Proof of Concept" onClick={handleClick} />; // extraStyle="btn-primary"

// A header with a logo on the left, links in the center (like Pricing, etc...), and a CTA (like Get Started or Login) on the right.
// The header is responsive, and on mobile, the links are hidden behind a burger button.
const Header = () => {
  const [isFAQModalOpen, setIsFAQModalOpen] = useState(false);
  const [isSimpleModalOpen, setIsSimpleModalOpen] = useState(false);
  const [isLoginRegisterModalOpen, setIsLoginRegisterModalOpen] =
    useState(false);

  // Function to toggle FAQ Modal
  const toggleFAQModal = () => setIsFAQModalOpen(!isFAQModalOpen);
  const toggleSimpleModal = () => setIsSimpleModalOpen(!isSimpleModalOpen);
  const toggleLoginRegisterModal = () =>
    setIsLoginRegisterModalOpen(!isLoginRegisterModalOpen);
  const searchParams = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);

  const cta = (
    <div className="flex flex-wrap gap-4">
      {" "}
      {/* Adjust gap as needed */}
      <ButtonGradient title="Proof of Concept" onClick={toggleSimpleModal} />
      <ButtonGradient
        title="Member Portal"
        onClick={toggleLoginRegisterModal}
      />
    </div>
  );

  // setIsOpen(false) when the route changes (i.e: when the user clicks on a link on mobile)
  // useEffect(() => {
  //   setIsOpen(false);
  // }, [searchParams]);
  useEffect(() => {
    // This function checks if any of the modals are open
    const isAnyModalOpen =
      isFAQModalOpen || isSimpleModalOpen || isLoginRegisterModalOpen;

    if (isAnyModalOpen) {
      // If any modal is open, prevent body from scrolling
      document.body.style.overflow = "hidden";
    } else {
      // If all modals are closed, allow body to scroll
      document.body.style.overflow = "auto";
    }

    // Cleanup function to reset overflow when the component unmounts
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isFAQModalOpen, isSimpleModalOpen, isLoginRegisterModalOpen]); // Depend on all modal open state variables

  return (
    <header
      className="bg-base-200 fixed w-full top-0 z-50"
      style={{
        background: "linear-gradient(to right, #1c1f2e, #4a6274, #1c1f2e)",
      }}
    >
      <nav
        className="container flex items-center justify-between px-8 py-2 mx-auto"
        aria-label="Global"
      >
        {/* Your logo/name on large screens */}
        <div className="flex lg:flex-1">
          <Link
            className="flex items-center gap-2 shrink-0 text-teal-400"
            href="/"
            title={`${config.appName} hompage`}
          >
            <Image
              src={logo}
              alt={`${config.appName} logo`}
              className="w-8"
              // placeholder="blur"
              priority={true}
              width={32}
              height={32}
            />
            <span className="font-extrabold text-lg text-teal-400">
              {config.appName}
            </span>
          </Link>
        </div>
        {/* Burger button to open menu on mobile */}
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5"
            onClick={() => setIsOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 text-base-content"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </button>
        </div>

        {/* Your links on large screens */}
        <div className="hidden lg:flex lg:justify-center lg:gap-12 lg:items-center text-teal-400 font-bold">
          {links.map((link) => {
            // Check if the link is "FAQPOPUP"
            if (link.label === "FAQPOPUP") {
              return (
                // Ensure the opening parenthesis is on the same line as return
                <button
                  key={link.label}
                  className="link link-hover cursor-pointer"
                  onClick={toggleFAQModal} // Attach the toggle function directly for FAQPOPUP
                  title={link.label}
                >
                  {link.label}
                </button>
              );
            } else {
              return (
                <Link
                  href={link.href}
                  key={link.href}
                  className="link link-hover"
                  title={link.label}
                >
                  {link.label}
                </Link>
              );
            }
          })}
        </div>

        {/* CTA on large screens */}
        <div className="hidden lg:flex lg:justify-end lg:flex-1">{cta}</div>
      </nav>

      {/* Mobile menu, show/hide based on menu state. */}
      <div className={`relative z-50 ${isOpen ? "" : "hidden"}`}>
        <div
          className={`fixed inset-y-0 right-0 z-10 w-full px-8 py-2 overflow-y-auto bg-base-200 sm:max-w-sm sm:ring-1 sm:ring-neutral/10 transform origin-right transition ease-in-out duration-300`}
        >
          {/* Your logo/name on small screens */}
          <div className="flex items-center justify-between">
            <Link
              className="flex items-center gap-2 shrink-0 "
              title={`${config.appName} hompage`}
              href="/"
            >
              <Image
                src={logo}
                alt={`${config.appName} logo`}
                className="w-8"
                // placeholder="blur"
                priority={true}
                width={32}
                height={32}
              />
              <span className="font-extrabold text-lg">{config.appName}</span>
            </Link>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5"
              onClick={() => setIsOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Your links on small screens */}
          <div className="flow-root mt-6">
            <div className="py-2">
              <div className="flex flex-col gap-y-4 items-start">
                {links.map((link) => {
                  if (link.label === "FAQPOPUP") {
                    // For "FAQPOPUP", render a button or span that, when clicked, toggles the FAQ modal
                    return (
                      <button
                        key={link.label}
                        className="link link-hover cursor-pointer"
                        onClick={toggleFAQModal} // Function to toggle the FAQ modal
                        title={link.label}
                      >
                        {link.label}
                      </button>
                    );
                  } else {
                    // Render other links normally
                    return (
                      <Link
                        href={link.href}
                        key={link.href}
                        className="link link-hover"
                        title={link.label}
                      >
                        {link.label}
                      </Link>
                    );
                  }
                })}
              </div>
            </div>
            <div className="divider"></div>
            {/* Your CTA on small screens */}
            <div className="flex flex-col">{cta}</div>
          </div>
        </div>
      </div>
      <div>{/* Adjust this part as per your actual implementation */}</div>
      <FAQModal
        isModalOpen={isFAQModalOpen}
        setIsModalOpen={setIsFAQModalOpen}
      />
      <LoginRegisterModal
        isOpen={isLoginRegisterModalOpen}
        onClose={toggleLoginRegisterModal}
      ></LoginRegisterModal>

      <SimpleModal
        isOpen={isSimpleModalOpen}
        onClose={toggleSimpleModal}
      ></SimpleModal>
    </header>
  );
};

export default Header;
