// File: /components/Footer.js

import Link from "next/link";
import Image from "next/image";
import config from "@/config";
import logo from "@/app/icon.png";

// Add the Footer to the bottom of your landing page and more.
// The support link is connected to the config.js file. If there's no config.mailgun.supportEmail, the link won't be displayed.

const Footer = () => {
  return (
    <footer
      className="bg-base-200 border-t border-base-content/10"
      style={{
        background: "linear-gradient(to right, #1c1f2e, #4a6274, #1c1f2e)",
      }}
    >
      <div className="max-w-7xl mx-auto px-8 py-12">
        <div className="flex flex-wrap justify-between">
          {/* Column 1: Logo, Description, and Copyright */}
          <div className="w-full md:w-[40%] px-4 mb-8 md:mb-0">
            <Link
              href="/"
              aria-current="page"
              className="flex gap-2 justify-start items-center mb-4"
            >
              <Image
                src={logo}
                alt={`${config.appName} logo`}
                priority={true}
                className="w-6 h-6"
                width={24}
                height={24}
              />
              <strong className="ml-2 font-extrabold tracking-tight text-base md:text-lg text-teal-400">
                {config.appName}
              </strong>
            </Link>
            <p className="text-sm text-base-content/80">
              {config.appDescription ||
                "Sports Prediction Machine Learning Model"}
            </p>
            <p className="mt-2 text-sm text-base-content/60">
              Copyright © {new Date().getFullYear()} - All rights reserved
            </p>
          </div>

          {/* Column 2: Links */}
          <div className="w-full md:w-[20%] px-4 mb-8 md:mb-0">
            <h3 className="font-semibold text-teal-400 tracking-widest text-sm mb-4">
              LINKS
            </h3>
            <div className="flex flex-col gap-2 text-sm text-base-content/80">
              <Link href="/#pricing" className="link link-hover">
                Pricing
              </Link>
              <Link href="/blog" className="link link-hover">
                Blog
              </Link>
              {config.mailgun.supportEmail && (
                <a
                  href={`mailto:${config.mailgun.supportEmail}`}
                  target="_blank"
                  className="link link-hover"
                  aria-label="Contact Support"
                >
                  Support
                </a>
              )}
            </div>
          </div>

          {/* Column 3: Legal */}
          <div className="w-full md:w-[20%] px-4 mb-8 md:mb-0">
            <h3 className="font-semibold text-teal-400 tracking-widest text-sm mb-4">
              LEGAL
            </h3>
            <div className="flex flex-col gap-2 text-sm text-base-content/80">
              <Link href="/tos" className="link link-hover">
                Terms of Services
              </Link>
              <Link href="/privacy-policy" className="link link-hover">
                Privacy Policy
              </Link>
              <Link href="/disclaimer" className="link link-hover">
                Disclaimer
              </Link>
            </div>
          </div>

          {/* Column 4: Contact */}
          <div className="w-full md:w-[20%] px-4">
            <h3 className="font-semibold text-teal-400 tracking-widest text-sm mb-4">
              CONTACT
            </h3>
            <div className="flex flex-col gap-2 text-sm text-base-content/80">
              <a
                href={`mailto:${config.mailgun.supportEmail}`}
                className="link link-hover"
              >
                {config.mailgun.supportEmail || "hello@sportsbetter.ai"}
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
