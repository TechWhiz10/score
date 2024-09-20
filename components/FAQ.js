"use client";

import { useRef, useState } from "react";

// <FAQ> component is a list of <Item> components
// Just import the FAQ & add your FAQ content to the const faqList

const faqList = [
  {
    question: "Can I Get a Refund?",
    answer: (
      <p className="text-base-content/80">
        <span className="font-bold text-teal-400"> Yes!</span> If, during your
        payment period (Weekly/Monthly), the model&apos;s predictions accuracy
        falls below 50%, you are eligible to request a refund. Rest assured, our
        model is continuously evolving to provide increasingly accurate
        predictions over time.
      </p>
    ),
  },
  {
    question: "Can I Use The Predictions For All Sports?",
    answer: (
      <div className="space-y-2 leading-relaxed text-base-content/80">
        At this time, our specialized machine learning models are designed to
        deliver cutting-edge predictions for the
        <span className="font-bold text-teal-400"> NBA</span>,
        <span className="font-bold text-teal-400"> NFL</span>, and
        <span className="font-bold text-teal-400"> MLB</span>, harnessing the
        power of AI to provide you with the most accurate insights in these
        leagues. We are excited about the future, as we are actively working on
        expanding our capabilities to include esports, soccer, tennis, and
        hockey. Stay tuned for updates as we broaden our sports coverage to
        bring you top-notch betting tips across a wider array of sports.
      </div>
    ),
  },
  {
    question: "How Do I Use It?",
    answer: (
      <div className="space-y-2 leading-relaxed text-base-content/80">
        Upon subscription, you&apos;ll gain full access to our dashboard, where
        you&apos;ll find meticulously curated{" "}
        <span className="font-bold text-teal-400"> +EV</span> (Expected Value)
        plays. This access provides you with our expert AI-driven predictions
        and crucial game insights, designed to enhance your decision-making
        process and help you make informed decisions. No more waiting for emails
        or PDFs—everything you need is available directly on the platform.
      </div>
    ),
  },
  {
    question: "How Do Our Predictions Work?",
    answer: (
      <div className="space-y-2 leading-relaxed text-base-content/80">
        Our system analyzes vast amounts of player and team{" "}
        <span className="font-bold text-teal-400"> data </span>
        through advanced algorithms and machine learning, including Logistic and
        Linear Regression for trend analysis,{" "}
        <span className="font-bold text-teal-400"> Bayesian Networks </span>
        for probabilistic outcomes, and{" "}
        <span className="font-bold text-teal-400"> Neural Networks </span>
        for pattern recognition and learning from complex data. This blend of
        techniques enables us to generate accurate and dynamic sports betting
        predictions, constantly improving as more data becomes available. For a
        deeper dive into how our technology transforms data into predictions,
        check out{" "}
        <a href="/blog" style={{ color: "blue" }}>
          our blog
        </a>
        !
      </div>
    ),
  },
];

const Item = ({ item }) => {
  const accordion = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <li className="w-full max-w-3xl mx-auto">
      <button
        className="relative flex gap-2 items-center w-full py-5 text-base font-semibold text-left border-t border-gray-300 md:text-lg"
        onClick={(e) => {
          e.preventDefault();
          setIsOpen(!isOpen);
        }}
        aria-expanded={isOpen}
      >
        <span className={`flex-1 ${isOpen ? "text-primary" : "text-teal-300"}`}>
          {item?.question}
        </span>
        <svg
          className={`flex-shrink-0 w-4 h-4 ml-auto fill-current text-gray-300`}
          viewBox="0 0 16 16"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            y="7"
            width="16"
            height="2"
            rx="1"
            className={`transform origin-center transition duration-200 ease-out ${
              isOpen && "rotate-180"
            }`}
          />
          <rect
            y="7"
            width="16"
            height="2"
            rx="1"
            className={`transform origin-center rotate-90 transition duration-200 ease-out ${
              isOpen && "rotate-180 hidden"
            }`}
          />
        </svg>
      </button>

      <div
        ref={accordion}
        className={`transition-all duration-300 ease-in-out overflow-hidden`}
        style={
          isOpen
            ? { maxHeight: accordion?.current?.scrollHeight, opacity: 1 }
            : { maxHeight: 0, opacity: 0 }
        }
      >
        <div className="pb-5 leading-relaxed text-gray-300">{item?.answer}</div>
      </div>
    </li>
  );
};

const FAQ = () => {
  return (
    <section
      className="bg-base-200 text-teal-400"
      id="faq"
      style={{
        background: "linear-gradient(to right, #1c1f2e, #4a6274, #1c1f2e)",
      }}
    >
      <div className="py-24 px-8 max-w-7xl mx-auto flex flex-col items-center gap-12">
        <div className="flex flex-col text-center">
          <p className="font-extrabold text-4xl md:text-5xl tracking-tight mb-6 md:mb-8 text-white">
            <span
              style={{
                display: "inline-block",
                background: "linear-gradient(to right, #5FF9CE, #00A3FF)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Frequently Asked Questions
            </span>
          </p>
        </div>

        <ul className="w-full max-w-3xl mx-auto">
          {faqList.map((item, i) => (
            <Item key={i} item={item} />
          ))}
        </ul>
      </div>
    </section>
  );
};

export default FAQ;
