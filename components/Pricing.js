// File: /components/Pricing.js

import { useState, useEffect } from "react";
import config from "@/config";
import ButtonCheckout from "./ButtonCheckout";
import TestimonialRating from "@/components/TestimonialRating";
import LoginRegisterModal from "@/app/LoginRegisterModal"; // The modal component we just created
import { getUsersCount } from "@/app/api/apiUtils"; // Correctly import the function

// <Pricing/> displays the pricing plans for your app
// It's your Stripe config in config.js.stripe.plans[] that will be used to display the plans
// <ButtonCheckout /> renders a button that will redirect the user to Stripe checkout called the /api/stripe/create-checkout API endpoint with the correct priceId

const Pricing = () => {
  const [isLoginRegisterModalOpen, setIsLoginRegisterModalOpen] =
    useState(false);
  const [userCount, setUserCount] = useState(0);

  const toggleLoginRegisterModal = () =>
    setIsLoginRegisterModalOpen(!isLoginRegisterModalOpen);

  useEffect(() => {
    // Fetch the user count from the database or API
    const fetchUserCount = async () => {
      const count = await getUsersCount();
      setUserCount(count);
    };

    fetchUserCount();
  }, []);

  return (
    <section
      className="overflow-hidden text-black"
      style={{
        background: "linear-gradient(to right, #1c1f2e, #4a6274, #1c1f2e)",
      }}
      id="pricing"
    >
      <div className="py-24 px-8 max-w-5xl mx-auto">
        <div className="flex flex-col text-center w-full mb-20">
          <p className="font-extrabold text-4xl md:text-5xl tracking-tight mb-8 text-teal-400">
            <span
              style={{
                display: "inline-block",
                background: "linear-gradient(to right, #5FF9CE, #00A3FF)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Our Pricing
            </span>
          </p>
          <h2 className="font-bold text-xl lg:text-2xl tracking-tight mb-2 text-base-content/80">
            Unlock unparalleled success with cutting-edge algorithms, elevating
            your sports knowledge to new heights.
          </h2>
        </div>
        <div className="relative flex justify-center flex-col lg:flex-row items-center lg:items-stretch gap-8">
          {config.stripe.plans.map((plan) => (
            <div
              key={plan.name}
              className="relative w-full max-w-md bg-[#2a2d3a] p-6 rounded-lg shadow-md flex flex-col justify-between min-h-[300px] lg:min-h-[350px]"
            >
              {plan.isFeatured && (
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
                  <span className="badge text-xs font-semibold bg-teal-400 text-primary-content py-1 px-3 rounded-full">
                    Most Popular
                  </span>
                </div>
              )}
              <div className="flex flex-col h-full gap-5 lg:gap-6 z-10 p-4">
                <div className="flex flex-col items-center text-center">
                  <p
                    className="text-lg lg:text-xl font-bold"
                    style={{
                      background: "linear-gradient(to right, #5FF9CE, #00A3FF)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    {plan.name}
                  </p>
                  {plan.description && (
                    <p className="text-base-content/80 mt-2 text-gray-300">
                      {plan.description}
                    </p>
                  )}
                </div>
                <div className="flex justify-center items-baseline gap-2">
                  {plan.priceAnchor && (
                    <div className="flex flex-col justify-end mb-[4px] text-lg">
                      <p className="relative inline-block text-teal-400">
                        <span
                          className="absolute w-full h-[7px] bg-red-500"
                          style={{ top: "50%", transform: "translateY(-50%)" }}
                        ></span>
                        <span className="relative">${plan.priceAnchor}</span>
                      </p>
                    </div>
                  )}
                  <p
                    className="text-4xl tracking-tight font-extrabold"
                    style={{
                      background: "linear-gradient(to right, #5FF9CE, #00A3FF)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    ${plan.price}
                  </p>
                  <div className="flex flex-col justify-end mb-[4px]">
                    <p className="text-xs text-base-content/60 uppercase font-semibold">
                      USD
                    </p>
                  </div>
                </div>
                {plan.features && (
                  <ul className="space-y-2 leading-relaxed text-base text-gray-300">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <span
                          role="img"
                          aria-label="checkmark"
                          className="text-green-500 text-md"
                        >
                          ✅
                        </span>
                        <span>{feature.name}</span>
                      </li>
                    ))}
                  </ul>
                )}
                <div className="space-y-2 mt-auto">
                  {plan.name === "Free" ? (
                    <button
                      onClick={toggleLoginRegisterModal}
                      className="btn btn-primary w-full"
                    >
                      <span>Try {config?.appName}</span>
                    </button>
                  ) : (
                    <ButtonCheckout priceId={plan.priceId} />
                  )}
                  {plan.name === "Free" ? (
                    <p className="text-sm text-center text-base-content/80 font-medium text-gray-300">
                      Free 2 Day Trial.
                    </p>
                  ) : plan.isWeekly ? (
                    <p className="text-sm text-center text-base-content/80 font-medium text-gray-300">
                      Billed Weekly.
                    </p>
                  ) : (
                    <p className="text-sm text-center text-base-content/80 font-medium text-gray-300">
                      Billed Monthly.
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <TestimonialRating userCount={userCount} />
      <LoginRegisterModal
        isOpen={isLoginRegisterModalOpen}
        onClose={toggleLoginRegisterModal}
      />
    </section>
  );
};

export default Pricing;
