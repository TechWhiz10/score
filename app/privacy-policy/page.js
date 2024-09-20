// File Name: app/privacy-policy/page.js
import Link from "next/link";
import { getSEOTags } from "@/libs/seo";
import config from "@/config";

export const metadata = getSEOTags({
  title: `Privacy Policy | ${config.appName}`,
  canonicalUrlRelative: "/privacy-policy",
});

const PrivacyPolicy = () => {
  return (
    <main
      className="max-w-3xl mx-auto py-12 px-6"
      style={{
        background: "linear-gradient(to right, #1c1f2e, #4a6274, #1c1f2e)",
      }}
    >
      <div className="pb-6">
        <Link
          href="/"
          className="btn btn-ghost text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-500 mb-4 inline-flex items-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="w-5 h-5"
          >
            <path
              fillRule="evenodd"
              d="M15 10a.75.75 0 01-.75.75H7.612l2.158 1.96a.75.75 0 11-1.04 1.08l-3.5-3.25a.75.75 0 010-1.08l3.5-3.25a.75.75 0 111.04 1.08L7.612 9.25h6.638A.75.75 0 0115 10z"
              clipRule="evenodd"
            />
          </svg>
          <span className="ml-2">Back</span>
        </Link>
        <h1 className="text-4xl font-extrabold text-center mb-6 pb-2 border-b border-transparent text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-500">
          Privacy Policy
        </h1>
        <h2 className="text-lg text-center text-gray-300 mb-8">
          Effective Date: February 29, 2024
        </h2>
      </div>

      <section className="mb-8">
        <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-500 mb-4">
          1. Data Collection
        </h2>
        <p className="leading-relaxed text-gray-300">
          We collect personal data such as name, email, and payment information
          to process orders. Non-personal data like web cookies are collected to
          improve the Service.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-500 mb-4">
          2. Purpose of Data Collection
        </h2>
        <p className="leading-relaxed text-gray-300">
          The data collected is used solely for order processing and improving
          the Service.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-500 mb-4">
          3. Data Sharing
        </h2>
        <p className="leading-relaxed text-gray-300">
          We do not share any user data with third parties.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-500 mb-4">
          4. Children's Privacy
        </h2>
        <p className="leading-relaxed text-gray-300">
          Our Service does not address anyone under the age of 13. We do not
          knowingly collect personal identifiable information from children.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-500 mb-4">
          5. Updates to the Privacy Policy
        </h2>
        <p className="leading-relaxed text-gray-300">
          We may update our Privacy Policy from time to time. We will notify you
          of any changes by emailing you.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-500 mb-4">
          6. Contact Information
        </h2>
        <p className="leading-relaxed text-gray-300">
          If you have any questions about this Privacy Policy, please contact us
          at:
          <br />
          Email:{" "}
          <a
            href="mailto:hello@sportsbetter.ai"
            className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-500"
          >
            hello@sportsbetter.ai
          </a>
          .
        </p>
      </section>
    </main>
  );
};

export default PrivacyPolicy;
