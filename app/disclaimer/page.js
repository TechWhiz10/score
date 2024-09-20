// File Name: app/disclaimer/page.js
import Link from "next/link";
import { getSEOTags } from "@/libs/seo";
import config from "@/config";

export const metadata = getSEOTags({
  title: `Disclaimer | ${config.appName}`,
  canonicalUrlRelative: "/disclaimer",
});

const Disclaimer = () => {
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
          Disclaimer
        </h1>
        <h2 className="text-lg text-center text-gray-300 mb-8">
          Effective Date: February 29, 2024
        </h2>
      </div>

      <section className="mb-8">
        <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-500 mb-4">
          General Information
        </h2>
        <p className="leading-relaxed text-gray-300">
          The information provided by {config.appName} ("we", "us", or "our") on{" "}
          {config.appName} (the "Site") is for general informational purposes
          only. All information on the Site is provided in good faith, however,
          we make no representation or warranty of any kind, express or implied,
          regarding the accuracy, adequacy, validity, reliability, availability,
          or completeness of any information on the Site.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-500 mb-4">
          Machine Learning Sports Betting Tool
        </h2>
        <p className="leading-relaxed text-gray-300">
          Our Site offers a machine learning sports betting tool designed to
          assist bettors. The outcomes and predictions provided by our tool are
          estimates based on data analysis and are not guaranteed. Users should
          bet responsibly and at their own risk.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-500 mb-4">
          Uncertainties and Risks
        </h2>
        <p className="leading-relaxed text-gray-300">
          Predictions are based on machine learning algorithms and are subject
          to inherent uncertainties in sports outcomes. Use information
          responsibly, and be aware of the unpredictability of sporting events.
          Betting involves risks, and decisions should be made with caution. We
          do not guarantee the accuracy of predictions, and results may vary.
          Always gamble responsibly and be aware of the potential risks
          associated with sports betting.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-500 mb-4">
          Children's Privacy
        </h2>
        <p className="leading-relaxed text-gray-300">
          We do not collect personal information from children under 13. Our
          Privacy Policy, which outlines our practices regarding data
          collection, use, and sharing, can be updated, and users will be
          notified via email.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-500 mb-4">
          Contact Information
        </h2>
        <p className="leading-relaxed text-gray-300">
          For any inquiries, or if you require further clarification, please
          contact us at:
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

export default Disclaimer;
