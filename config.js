import themes from "daisyui/src/theming/themes.js";

const config = {
  // REQUIRED
  appName: "SportsBetter.Ai",
  // REQUIRED: a short description of your app for SEO tags (can be overwritten)
  appDescription: "Sports Prediction Machine Learning Model.",
  // REQUIRED (no https://, not trialing slash at the end, just the naked domain)
  domainName: "SportsBetter.ai",
  crisp: {
    // Crisp website ID. IF YOU DON'T USE CRISP: just remove this => Then add a support email in this config file (mailgun.supportEmail) otherwise customer support won't work.
    id: "",
    // Hide Crisp by default, except on route "/". Crisp is toggled with <ButtonSupport/>. If you want to show Crisp on every routes, just remove this below
    onlyShowOnRoutes: ["/"],
  },
  stripe: {
    // Create multiple plans in your Stripe dashboard, then add them here. You can add as many plans as you want, just make sure to add the priceId
    plans: [
      {
        isWeekly: false,
        //  REQUIRED - Name of the plan, displayed on the pricing page
        name: "Free",
        // A friendly description of the plan, displayed on the pricing page. Tip: explain why this plan and not others
        description: "Trial",
        // The price you want to display, the one user will be charged on Stripe.
        price: 0,
        // If you have an anchor price (i.e. $29) that you want to display crossed out, put it here. Otherwise, leave it empty
        // priceAnchor: 99,
        features: [
          // {
          //   name: "NextJS boilerplate",
          // },
          { name: "Try it now, completely free! No credit card necessary." },
          { name: "Everything in our Basic Plan!" },
        ],
      },
      {
        isWeekly: true,
        // REQUIRED — we use this to find the plan in the webhook (for instance if you want to update the user's credits based on the plan)
        priceId:
          process.env.NODE_ENV === "development"
            ? "price_1OqbRyLPjdnP94eMzofhN1Tc"
            : "price_1OqbRyLPjdnP94eMzofhN1Tc",
        //  REQUIRED - Name of the plan, displayed on the pricing page
        name: "Weekly",
        // A friendly description of the plan, displayed on the pricing page. Tip: explain why this plan and not others
        description: "Basic",
        // The price you want to display, the one user will be charged on Stripe.
        price: 19.99,
        // If you have an anchor price (i.e. $29) that you want to display crossed out, put it here. Otherwise, leave it empty
        // priceAnchor: 99,
        features: [
          // {
          //   name: "NextJS boilerplate",
          // },
          { name: "Weekly access to machine learning predictions" },
          { name: "Limited insights and analysis" },
        ],
      },
      {
        // This plan will look different on the pricing page, it will be highlighted. You can only have one plan with isFeatured: true
        isFeatured: true,
        isWeekly: false,
        priceId:
          process.env.NODE_ENV === "development"
            ? "price_1OqbThLPjdnP94eMbLJG6x1U"
            : "price_1OqbThLPjdnP94eMbLJG6x1U",
        name: "Monthly",
        description: "Premium",
        price: 59.99,
        priceAnchor: 80,
        features: [
          // {
          //   name: "NextJS boilerplate",
          // },
          { name: "Monthly access to advanced machine learning insights" },
          { name: "In-depth analysis and trend reports" },
          { name: "Access to exclusive webinars and tutorials" },
          {
            name: "📆 Advanced Notice for Strategic Bets: Avoid lines changing",
          },
          { name: "🆕🚀 NEW 🚀🆕 Direct access to the models Confidence %" },
        ],
      },
    ],
  },
  aws: {
    // If you use AWS S3/Cloudfront, put values in here
    bucket: "bucket-name",
    bucketUrl: `https://bucket-name.s3.amazonaws.com/`,
    cdn: "https://cdn-id.cloudfront.net/",
  },
  mailgun: {
    // subdomain to use when sending emails, if you don't have a subdomain, just remove it. Highly recommended to have one (i.e. mg.yourdomain.com or mail.yourdomain.com)
    subdomain: "mail.sportsbetterai.com",
    // REQUIRED — Email 'From' field to be used when sending magic login links
    fromNoReply: `sportsbetter <noreply@mg.sportsbetter.ai>`,
    // REQUIRED — Email 'From' field to be used when sending other emails, like abandoned carts, updates etc..
    fromAdmin: `Admin at SportsBetterAi <hello@sportsbetter.ai>`,
    // Email shown to customer if need support. Leave empty if not needed => if empty, set up Crisp above, otherwise you won't be able to offer customer support."
    supportEmail: "hello@sportsbetter.ai",
    // When someone replies to supportEmail sent by the app, forward it to the email below (otherwise it's lost). If you set supportEmail to empty, this will be ignored.
    forwardRepliesTo: "hello@sportsbetter.ai",
  },
  colors: {
    // REQUIRED — The DaisyUI theme to use (added to the main layout.js). Leave blank for default (light & dark mode). If you any other theme than light/dark, you need to add it in config.tailwind.js in daisyui.themes.
    theme: "bettors",
    // REQUIRED — This color will be reflected on the whole app outside of the document (loading bar, Chrome tabs, etc..). By default it takes the primary color from your DaisyUI theme (make sure to update your the theme name after "data-theme=")
    // OR you can just do this to use a custom color: main: "#f37055". HEX only.
    main: themes[`[data-theme=bettor]`],
  },
  auth: {
    // REQUIRED — the path to log in users. It's use to protect private routes (like /dashboard). It's used in apiClient (/libs/api.js) upon 401 errors from our API
    loginUrl: "/api/login",
    // REQUIRED — the path you want to redirect users after successfull login (i.e. /dashboard, /private). This is normally a private page for users to manage their accounts. It's used in apiClient (/libs/api.js) upon 401 errors from our API & in ButtonSignin.js
    callbackUrl: "/dashboard",
  },
};

export default config;
