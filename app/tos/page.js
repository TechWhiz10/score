// File Name: app/tos/page.js
import Link from "next/link";
import { getSEOTags } from "@/libs/seo";
import config from "@/config";

export const metadata = getSEOTags({
  title: `Terms and Conditions | ${config.appName}`,
  canonicalUrlRelative: "/tos",
});

const TOS = () => {
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
          className="btn btn-ghost mb-4 inline-flex items-center text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-500"
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
          Terms and Conditions
        </h1>
        <h2 className="text-lg text-center text-gray-300 mb-8">
          Effective Date: February 29, 2024
        </h2>
      </div>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-500">
          1. Acceptance of Terms
        </h2>
        <p className="leading-relaxed text-gray-300">
          Welcome to {config.appName}. These Terms of Service ("Terms") govern
          your use of the {config.appName} website and its associated services
          (collectively, the "Service"), operated by {config.appName} ("us",
          "we", or "our"). By accessing or using the Service, you agree to be
          bound by these Terms.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-500">
          2. Use of Service
        </h2>
        <p className="leading-relaxed text-gray-300">
          The Service is intended for personal, non-commercial use only. You
          agree not to use the Service for any commercial purposes without our
          explicit permission.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-500">
          3. Account Registration & Security
        </h2>
        <p className="leading-relaxed text-gray-300 mb-2">
          To access certain features of the Service, you must create an account.
          You are responsible for maintaining the confidentiality of your
          account and password and for restricting access to your computer, and
          you agree to accept responsibility for all activities that occur under
          your account or password.
        </p>
        <p className="leading-relaxed text-gray-300 mb-2">
          You are responsible for safeguarding the password that you use to
          access the Service and for any activities or actions under your
          password, whether your password is with our Service or a third-party
          service. You agree to keep your password secure and confidential, not
          disclose it to any third party, and use a password that is not used
          for any other online service. Notify us immediately upon becoming
          aware of any breach of security or unauthorized use of your account.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-500">
          4. Free Trials
        </h2>
        <p className="leading-relaxed text-gray-300">
          We may offer a free trial period for new users, allowing access to
          premium features of the Service for a limited number of messages
          exchanged with our LLM model. The specific details of your free trial
          will be provided at the start of the trial. Unless you cancel your
          subscription before the end of the trial period, your subscription
          will automatically renew into a paid subscription, and your payment
          method will be charged accordingly. You can manage your subscription
          and cancel by visiting your account settings.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-500">
          5. Subscription Fees
        </h2>
        <p className="leading-relaxed text-gray-300">
          Access to premium features of the Service requires payment of
          subscription fees. Details regarding the fees, billing cycles, and
          payment methods are available on our pricing page. All fees are
          non-refundable, except as required by law or as explicitly stated in
          our refund policy.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-500">
          6. Intellectual Property
        </h2>
        <p className="leading-relaxed text-gray-300">
          All content provided on {config.appName}, including but not limited to
          text, graphics, logos, and software, is the property of{" "}
          {config.appName} or its content suppliers and is protected by
          intellectual property laws.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-500">
          7. Disclaimer of Warranties
        </h2>
        <p className="leading-relaxed text-gray-300">
          {config.appName} provides its service on an "as is" and "as available"
          basis. We do not warrant that the service will be uninterrupted,
          timely, secure, or error-free.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-500">
          8. Limitation of Liability
        </h2>
        <p className="leading-relaxed text-gray-300">
          {config.appName} shall not be liable for any direct, indirect,
          incidental, special, consequential, or exemplary damages, including
          but not limited to damages for loss of profits, goodwill, use, data,
          or other intangible losses resulting from the use or the inability to
          use the service.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-500">
          9. User Conduct
        </h2>
        <p className="leading-relaxed text-gray-300 mb-2">
          You agree not to use the service to:
        </p>
        <ul className="list-disc list-inside leading-relaxed text-gray-300 mb-2">
          <li>
            Upload, post, email, or otherwise transmit any content that is
            unlawful, harmful, threatening, abusive, harassing, tortious,
            defamatory, vulgar, obscene, libelous, invasive of another's
            privacy, hateful, or racially, ethnically, or otherwise
            objectionable.
          </li>
          <li>Harm minors in any way.</li>
          <li>
            Impersonate any person or entity, including, but not limited to, a{" "}
            {config.appName} official, or falsely state or otherwise
            misrepresent your affiliation with a person or entity.
          </li>
          <li>
            Distribute, share, or publish any content obtained through the
            service, including but not limited to information from a paid
            subscription, on any public platform or for any unauthorized
            commercial purpose without the express written consent of{" "}
            {config.appName}. This includes, but is not limited to, reproducing,
            distributing, or making available the service's content in any form
            to third parties not authorized by {config.appName}.
          </li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-500">
          10. Data Privacy
        </h2>
        <p className="leading-relaxed text-gray-300">
          Your privacy is important to us. Our Privacy Policy explains how we
          collect, use, safeguard, and disclose information that results from
          your use of our web pages. We take steps to protect the personal
          information you provide against unauthorized access, disclosure,
          alteration, or destruction. We encourage you to read our Privacy
          Policy carefully and contact us with any questions at privacy contact
          privacy@{config.appName}.ai and visit our{" "}
          <Link href="/privacy-policy" className="text-gradient">
            Privacy Policy
          </Link>{" "}
          page.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-500">
          11. Termination
        </h2>
        <p className="leading-relaxed text-gray-300">
          We may terminate or suspend your account and bar access to the Service
          for any reason, at our sole discretion, with or without prior notice.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-500">
          12. Governing Law
        </h2>
        <p className="leading-relaxed text-gray-300">
          These Terms shall be governed and construed in accordance with the
          laws of the United States, excluding its conflicts of law rules.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-500 mb-4">
          13. Contact Information
        </h2>
        <p className="leading-relaxed text-gray-300">
          If you have any questions about these terms, please contact us at:
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

export default TOS;
