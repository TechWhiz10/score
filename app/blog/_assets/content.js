import Image from "next/image";
import marcImg from "@/app/blog/_assets/images/authors/marc.png";
import introducingSupabaseImg from "@/public/blog/introducing-supabase/header.png";

// ==================================================================================================================================================================
// BLOG CATEGORIES 🏷️
// ==================================================================================================================================================================

// These slugs are used to generate pages in the /blog/category/[categoryI].js. It's a way to group articles by category.
const categorySlugs = {
  feature: "feature",
  tutorial: "tutorial",
};

// All the blog categories data display in the /blog/category/[categoryI].js pages.
export const categories = [
  {
    // The slug to use in the URL, from the categorySlugs object above.
    slug: categorySlugs.feature,
    // The title to display the category title (h1), the category badge, the category filter, and more. Less than 60 characters.
    title: "New Features",
    // A short version of the title above, display in small components like badges. 1 or 2 words
    titleShort: "Features",
    // The description of the category to display in the category page. Up to 160 characters.
    description:
      "Here are the latest features we've added to ShipFast. I'm constantly improving our product to help you ship faster.",
    // A short version of the description above, only displayed in the <Header /> on mobile. Up to 60 characters.
    descriptionShort: "Latest features added to ShipFast.",
  },
  {
    slug: categorySlugs.tutorial,
    title: "How Tos & Tutorials",
    titleShort: "Tutorials",
    description:
      "Learn how to use ShipFast with these step-by-step tutorials. I'll show you how to ship faster and save time.",
    descriptionShort:
      "Learn how to use ShipFast with these step-by-step tutorials.",
  },
];

// ==================================================================================================================================================================
// BLOG AUTHORS 📝
// ==================================================================================================================================================================

// Social icons used in the author's bio.
const socialIcons = {
  twitter: {
    name: "Twitter",
    svg: (
      <svg
        version="1.1"
        id="svg5"
        x="0px"
        y="0px"
        viewBox="0 0 1668.56 1221.19"
        className="w-9 h-9"
        // Using a dark theme? ->  className="w-9 h-9 fill-white"
      >
        <g id="layer1" transform="translate(52.390088,-25.058597)">
          <path
            id="path1009"
            d="M283.94,167.31l386.39,516.64L281.5,1104h87.51l340.42-367.76L984.48,1104h297.8L874.15,558.3l361.92-390.99   h-87.51l-313.51,338.7l-253.31-338.7H283.94z M412.63,231.77h136.81l604.13,807.76h-136.81L412.63,231.77z"
          />
        </g>
      </svg>
    ),
  },
  linkedin: {
    name: "LinkedIn",
    svg: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-6 h-6"
        // Using a dark theme? ->  className="w-6 h-6 fill-white"
        viewBox="0 0 24 24"
      >
        <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" />
      </svg>
    ),
  },
  github: {
    name: "GitHub",
    svg: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-6 h-6"
        // Using a dark theme? ->  className="w-6 h-6 fill-white"
        viewBox="0 0 24 24"
      >
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
      </svg>
    ),
  },
};

// These slugs are used to generate pages in the /blog/author/[authorId].js. It's a way to show all articles from an author.
const authorSlugs = {
  marc: "marc",
  justin: "justin",
  harrison: "harrison",
  jack: "jack",
};

// All the blog authors data display in the /blog/author/[authorId].js pages.
export const authors = [
  {
    // The slug to use in the URL, from the authorSlugs object above.
    slug: authorSlugs.marc,
    // The name to display in the author's bio. Up to 60 characters.
    name: "Marc Lou",
    // The job to display in the author's bio. Up to 60 characters.
    job: "Maker of ByeDispute",
    // The description of the author to display in the author's bio. Up to 160 characters.
    description:
      "Marc is a developer and an entrepreneur. He's built 20 startups in the last 3 years. 6 were profitable and 3 were acquired. He's currently building ByeDispute, the #1 Stripe Chargebacks Protection tool.",
    // The avatar of the author to display in the author's bio and avatar badge. It's better to use a local image, but you can also use an external image (https://...)
    avatar: marcImg,
    // A list of social links to display in the author's bio.
    socials: [
      {
        name: socialIcons.twitter.name,
        icon: socialIcons.twitter.svg,
        url: "https://twitter.com/marc_louvion",
      },
      {
        name: socialIcons.linkedin.name,
        icon: socialIcons.linkedin.svg,
        url: "https://www.linkedin.com/in/marclouvion/",
      },
      {
        name: socialIcons.github.name,
        icon: socialIcons.github.svg,
        url: "https://github.com/Marc-Lou-Org/ship-fast",
      },
    ],
  },
  {
    // The slug to use in the URL, from the authorSlugs object above.
    slug: authorSlugs.justin,
    // The name to display in the author's bio. Up to 60 characters.
    name: "Justin Hartfield",
    // The job to display in the author's bio. Up to 60 characters.
    job: "SportsBetterAi Founder and CEO",
    // The description of the author to display in the author's bio. Up to 160 characters.
    description:
      "Justin is a software engineer and an entrepreneur, but more importantly a winning sports better. He comes from the software engineering world and has always loved sports betting. He's developed this algorithm to help losing bettors win.",
    // The avatar of the author to display in the author's bio and avatar badge. It's better to use a local image, but you can also use an external image (https://...)
    avatar: marcImg,
    // A list of social links to display in the author's bio.
    socials: [
      {
        name: socialIcons.twitter.name,
        icon: socialIcons.twitter.svg,
        url: "https://twitter.com/SportsBetterAi",
      },
      {
        name: socialIcons.linkedin.name,
        icon: socialIcons.linkedin.svg,
        url: "https://www.linkedin.com/in/Justin-Hartfield/",
      },
    ],
  },
];

// ==================================================================================================================================================================
// BLOG ARTICLES 📚
// ==================================================================================================================================================================

// These styles are used in the content of the articles. When you update them, all articles will be updated.
const styles = {
  h2: "text-2xl lg:text-4xl font-bold tracking-tight mb-4 text-base-content",
  h3: "text-xl lg:text-2xl font-bold tracking-tight mb-2 text-base-content",
  p: "text-base-content/90 leading-relaxed",
  ul: "list-inside list-disc text-base-content/90 leading-relaxed",
  li: "list-item",
  // Altnernatively, you can use the library react-syntax-highlighter to display code snippets.
  code: "text-sm font-mono bg-neutral text-neutral-content p-6 rounded-box my-4 overflow-x-scroll select-all",
  codeInline:
    "text-sm font-mono bg-base-300 px-1 py-0.5 rounded-box select-all",
};

// All the blog articles data display in the /blog/[articleId].js pages.
export const articles = [
  {
    // The unique slug to use in the URL. It's also used to generate the canonical URL.
    slug: "Machine-Learning-Model",
    // The title to display in the article page (h1). Less than 60 characters. It's also used to generate the meta title.
    title: "How our machine learning model works",
    // The description of the article to display in the article page. Up to 160 characters. It's also used to generate the meta description.
    description:
      "Our machine learning model leverages advanced algorithms to analyze historical data and real-time inputs, identifying patterns and insights that predict sports betting outcomes with unprecedented accuracy. It continuously learns from new data, refining its predictions to adapt to changing dynamics in sports events. This model not only enhances the precision of betting tips but also offers a personalized betting experience by understanding individual user preferences and behaviors.",
    // An array of categories of the article. It's used to generate the category badges, the category filter, and more.
    categories: [
      categories.find((category) => category.slug === categorySlugs.feature),
    ],
    // The author of the article. It's used to generate a link to the author's bio page.
    author: authors.find((author) => author.slug === authorSlugs.justin),
    // The date of the article. It's used to generate the meta date.
    publishedAt: "2023-11-20",
    image: {
      // The image to display in <CardArticle /> components.
      src: introducingSupabaseImg,
      // The relative URL of the same image to use in the Open Graph meta tags & the Schema Markup JSON-LD.
      urlRelative: "/blog/Machine-Learning-Model/header.jpg",
      alt: "Machine-Learning-Model",
    },
    // The actual content of the article that will be shown under the <h1> title in the article page.
    content: (
      <>
        <Image
          src={introducingSupabaseImg}
          alt="Machine-Learning-Model"
          width={700}
          height={500}
          priority={true}
          className="rounded-box"
          placeholder="blur"
        />
        <section>
          <h2 className={styles.h2}>Header</h2>
          <p className={styles.p}>Body</p>
        </section>
      </>
    ),
  },
  {
    // The unique slug to use in the URL. It's also used to generate the canonical URL.
    slug: "introducing-supabase",
    // The title to display in the article page (h1). Less than 60 characters. It's also used to generate the meta title.
    title: "From Data to Winnings: Exploring AI's Impact on Sports Betting",
    // The description of the article to display in the article page. Up to 160 characters. It's also used to generate the meta description.
    description:
      "Artificial Intelligence (AI) is revolutionizing sports betting by utilizing vast amounts of data to make precise predictions, thus transforming how bets are placed and odds are calculated. It personalizes the betting experience with tailored suggestions and enhances risk management for both bettors and sportsbooks. As AI technology evolves, it promises a future of real-time betting adjustments, ethical and fair play, and a more engaging, interactive betting environment for enthusiasts.",
    // An array of categories of the article. It's used to generate the category badges, the category filter, and more.
    categories: [
      categories.find((category) => category.slug === categorySlugs.feature),
    ],
    // The author of the article. It's used to generate a link to the author's bio page.
    author: authors.find((author) => author.slug === authorSlugs.marc),
    // The date of the article. It's used to generate the meta date.
    publishedAt: "2023-11-20",
    image: {
      // The image to display in <CardArticle /> components.
      src: introducingSupabaseImg,
      // The relative URL of the same image to use in the Open Graph meta tags & the Schema Markup JSON-LD.
      urlRelative: "/blog/introducing-supabase/header.jpg",
      alt: "Supabase and ShipFast logo combined",
    },
    // The actual content of the article that will be shown under the <h1> title in the article page.
    content: (
      <>
        <Image
          src={introducingSupabaseImg}
          alt="Supabase and ShipFast logo combined"
          width={700}
          height={500}
          priority={true}
          className="rounded-box"
          placeholder="blur"
        />
        <section>
          <h2 className={styles.h2}>Introduction</h2>
          <p className={styles.p}>
            The landscape of sports betting is undergoing a remarkable
            transformation, thanks to the advent of artificial intelligence
            (AI). This fusion of technology and gambling is not just changing
            how bets are placed but also how the odds are calculated, promising
            a future where informed predictions are the norm rather than the
            exception. In this article, we delve into how AI is revolutionizing
            the world of sports betting, turning raw data into potential
            winnings.
          </p>
        </section>
        <section>
          <h3 className={styles.h3}>The Advent of AI in Sports Betting</h3>
          <p className={styles.p}>
            Sports betting has always been a game of skill and luck, with
            bettors relying on a mix of intuition, historical performance, and
            real-time developments to make their picks. However, the integration
            of AI into this arena is shifting the balance towards a more
            analytical approach. By harnessing vast amounts of data, AI
            algorithms can identify patterns and insights that are invisible to
            the human eye, offering a new level of precision in predicting
            outcomes.
          </p>
        </section>
        <section>
          <h3 className={styles.h3}>Data Analytics and Prediction Models</h3>
          <p className={styles.p}>
            At the core of AI&apos;s impact on sports betting is data analytics.
            AI systems sift through extensive datasets, including team
            statistics, player performance, weather conditions, and even social
            media sentiment, to make predictions. These models are not static;
            they learn and evolve with each game, becoming more accurate over
            time. For bettors, this means access to recommendations that are
            based on comprehensive analyses of all factors that could influence
            the outcome of a sporting event.{" "}
          </p>
        </section>
        <section>
          <h3 className={styles.h3}>Customized Betting Experiences</h3>
          <p className={styles.p}>
            AI is personalizing the betting experience. By analyzing a
            bettor&apos;s history and preferences, AI can offer tailored betting
            suggestions, odds, and even alerts on the best times to place a bet.
            This customization not only enhances the user experience but also
            increases the chances of successful bets, creating a more engaging
            and potentially profitable betting journey.
          </p>
        </section>
        <section>
          <h3 className={styles.h3}>Risk Management</h3>
          <p className={styles.p}>
            One of the critical advantages of AI in sports betting is improved
            risk management. By accurately predicting outcomes, AI helps bettors
            and sportsbooks alike in managing their risks more effectively. For
            sportsbooks, this means setting more accurate odds that reflect the
            true probabilities of game outcomes, minimizing losses and ensuring
            a fairer betting environment.
          </p>
        </section>
        <section>
          <h3 className={styles.h3}>The Ethical and Regulatory Landscape</h3>
          <p className={styles.p}>
            The integration of AI in sports betting is not without its
            challenges, primarily concerning ethics and regulation. The
            potential for misuse, such as creating biased or unfair betting
            systems, is a significant concern. Moreover, the regulatory
            landscape is still catching up with these technological
            advancements, striving to ensure a fair and transparent betting
            environment for all participants.
          </p>
        </section>
        <section>
          <h3 className={styles.h3}>The Future of Sports Betting</h3>
          <p className={styles.p}>
            As AI technology continues to evolve, its impact on sports betting
            will only grow. We are moving towards a future where AI-driven
            platforms could offer real-time betting advice, dynamically
            adjusting odds based on live game developments, and even predicting
            future sporting trends. This evolution promises to make sports
            betting more analytical, strategic, and, potentially, more rewarding
            for those who embrace the data-driven approach.
          </p>
        </section>
        <section>
          <h3 className={styles.h3}>Conclusion</h3>
          <p className={styles.p}>
            The intersection of AI and sports betting represents a new frontier
            for gamblers and sports enthusiasts alike. By transforming data into
            actionable insights and winnings, AI is not just changing the game;
            it&apos;s redefining it. As we look forward, the potential of AI in
            sports betting is boundless, promising a future where the odds are
            ever in your favor, guided by the precision and power of artificial
            intelligence.
          </p>
        </section>
        <section>
          <h3 className={styles.h3}>1. Create a supabase account</h3>
          <p className={styles.p}>
            First, go to{" "}
            <a href="https://supabase.com/" className="link link-primary">
              Supabase
            </a>{" "}
            and create an account. It&apos;s free for up to 10,000 rows per
            table.
            <br />
            Then create a new project and a new table. You can use the following
            SQL schema:
          </p>

          <pre className={styles.code}>
            <code>
              {`CREATE TABLE public.users 
              (
                id bigint NOT NULL DEFAULT nextval('users_id_seq'::regclass),
                email text NOT NULL,
                password text NOT NULL,
                created_at timestamp with time zone NOT NULL DEFAULT now(),
                updated_at timestamp with time zone NOT NULL DEFAULT now(),
                CONSTRAINT users_pkey PRIMARY KEY (id)
              );
              `}
            </code>
          </pre>
        </section>

        <section>
          <h3 className={styles.h3}>2. Add your credentials to ShipFast</h3>
          <p className={styles.p}>
            Copy the <span className={styles.codeInline}>API URL</span> and{" "}
            <span className={styles.codeInline}>API Key</span> from your
            Supabase project settings and add them to your ShipFast project
            settings. Add these files to your project:
          </p>

          <ul className={styles.ul}>
            <li className={styles.li}>.env.local</li>
            <li className={styles.li}>.env.production</li>
          </ul>
        </section>
      </>
    ),
  },
  {
    // The unique slug to use in the URL. It's also used to generate the canonical URL.
    slug: "introducing-supabase",
    // The title to display in the article page (h1). Less than 60 characters. It's also used to generate the meta title.
    title: "From Data to Winnings: Exploring AI's Impact on Sports Betting",
    // The description of the article to display in the article page. Up to 160 characters. It's also used to generate the meta description.
    description:
      "Artificial Intelligence (AI) is revolutionizing sports betting by utilizing vast amounts of data to make precise predictions, thus transforming how bets are placed and odds are calculated. It personalizes the betting experience with tailored suggestions and enhances risk management for both bettors and sportsbooks. As AI technology evolves, it promises a future of real-time betting adjustments, ethical and fair play, and a more engaging, interactive betting environment for enthusiasts.",
    // An array of categories of the article. It's used to generate the category badges, the category filter, and more.
    categories: [
      categories.find((category) => category.slug === categorySlugs.feature),
    ],
    // The author of the article. It's used to generate a link to the author's bio page.
    author: authors.find((author) => author.slug === authorSlugs.marc),
    // The date of the article. It's used to generate the meta date.
    publishedAt: "2023-11-20",
    image: {
      // The image to display in <CardArticle /> components.
      src: introducingSupabaseImg,
      // The relative URL of the same image to use in the Open Graph meta tags & the Schema Markup JSON-LD.
      urlRelative: "/blog/introducing-supabase/header.jpg",
      alt: "Supabase and ShipFast logo combined",
    },
    // The actual content of the article that will be shown under the <h1> title in the article page.
    content: (
      <>
        <Image
          src={introducingSupabaseImg}
          alt="Supabase and ShipFast logo combined"
          width={700}
          height={500}
          priority={true}
          className="rounded-box"
          placeholder="blur"
        />
        <section>
          <h2 className={styles.h2}>Introduction</h2>
          <p className={styles.p}>
            The landscape of sports betting is undergoing a remarkable
            transformation, thanks to the advent of artificial intelligence
            (AI). This fusion of technology and gambling is not just changing
            how bets are placed but also how the odds are calculated, promising
            a future where informed predictions are the norm rather than the
            exception. In this article, we delve into how AI is revolutionizing
            the world of sports betting, turning raw data into potential
            winnings.
          </p>
        </section>
        <section>
          <h3 className={styles.h3}>The Advent of AI in Sports Betting</h3>
          <p className={styles.p}>
            Sports betting has always been a game of skill and luck, with
            bettors relying on a mix of intuition, historical performance, and
            real-time developments to make their picks. However, the integration
            of AI into this arena is shifting the balance towards a more
            analytical approach. By harnessing vast amounts of data, AI
            algorithms can identify patterns and insights that are invisible to
            the human eye, offering a new level of precision in predicting
            outcomes.
          </p>
        </section>
        <section>
          <h3 className={styles.h3}>Data Analytics and Prediction Models</h3>
          <p className={styles.p}>
            At the core of AI&apos;s impact on sports betting is data analytics.
            AI systems sift through extensive datasets, including team
            statistics, player performance, weather conditions, and even social
            media sentiment, to make predictions. These models are not static;
            they learn and evolve with each game, becoming more accurate over
            time. For bettors, this means access to recommendations that are
            based on comprehensive analyses of all factors that could influence
            the outcome of a sporting event.{" "}
          </p>
        </section>
        <section>
          <h3 className={styles.h3}>Customized Betting Experiences</h3>
          <p className={styles.p}>
            AI is personalizing the betting experience. By analyzing a
            bettor&apos;s history and preferences, AI can offer tailored betting
            suggestions, odds, and even alerts on the best times to place a bet.
            This customization not only enhances the user experience but also
            increases the chances of successful bets, creating a more engaging
            and potentially profitable betting journey.
          </p>
        </section>
        <section>
          <h3 className={styles.h3}>Risk Management</h3>
          <p className={styles.p}>
            One of the critical advantages of AI in sports betting is improved
            risk management. By accurately predicting outcomes, AI helps bettors
            and sportsbooks alike in managing their risks more effectively. For
            sportsbooks, this means setting more accurate odds that reflect the
            true probabilities of game outcomes, minimizing losses and ensuring
            a fairer betting environment.
          </p>
        </section>
        <section>
          <h3 className={styles.h3}>The Ethical and Regulatory Landscape</h3>
          <p className={styles.p}>
            The integration of AI in sports betting is not without its
            challenges, primarily concerning ethics and regulation. The
            potential for misuse, such as creating biased or unfair betting
            systems, is a significant concern. Moreover, the regulatory
            landscape is still catching up with these technological
            advancements, striving to ensure a fair and transparent betting
            environment for all participants.
          </p>
        </section>
        <section>
          <h3 className={styles.h3}>The Future of Sports Betting</h3>
          <p className={styles.p}>
            As AI technology continues to evolve, its impact on sports betting
            will only grow. We are moving towards a future where AI-driven
            platforms could offer real-time betting advice, dynamically
            adjusting odds based on live game developments, and even predicting
            future sporting trends. This evolution promises to make sports
            betting more analytical, strategic, and, potentially, more rewarding
            for those who embrace the data-driven approach.
          </p>
        </section>
        <section>
          <h3 className={styles.h3}>Conclusion</h3>
          <p className={styles.p}>
            The intersection of AI and sports betting represents a new frontier
            for gamblers and sports enthusiasts alike. By transforming data into
            actionable insights and winnings, AI is not just changing the game;
            it&apos;s redefining it. As we look forward, the potential of AI in
            sports betting is boundless, promising a future where the odds are
            ever in your favor, guided by the precision and power of artificial
            intelligence.
          </p>
        </section>
        <section>
          <h3 className={styles.h3}>2. Add your credentials to ShipFast</h3>
          <p className={styles.p}>
            Copy the <span className={styles.codeInline}>API URL</span> and{" "}
            <span className={styles.codeInline}>API Key</span> from your
            Supabase project settings and add them to your ShipFast project
            settings. Add these files to your project:
          </p>

          <ul className={styles.ul}>
            <li className={styles.li}>.env.local</li>
            <li className={styles.li}>.env.production</li>
          </ul>
        </section>
      </>
    ),
  },
  {
    slug: "Sample", // The unique slug to use in the URL. It's also used to generate the canonical URL.
    title: "Title", // The title to display in the article page (h1). Less than 60 characters. It's also used to generate the meta title.
    // The description of the article to display in the article page. Up to 160 characters. It's also used to generate the meta description.
    description: "Desc",
    categories: [
      // An array of categories of the article. It's used to generate the category badges, the category filter, and more.
      categories.find((category) => category.slug === categorySlugs.feature),
    ],
    author: authors.find((author) => author.slug === authorSlugs.justin),
    publishedAt: "2020-1-20",
    image: {
      src: introducingSupabaseImg,
      urlRelative: "/blog/Sample/header.jpg",
      alt: "Sample",
    },
    content: (
      <>
        <Image
          src={introducingSupabaseImg}
          alt="Sample"
          width={700}
          height={500}
          priority={true}
          className="rounded-box"
          placeholder="blur"
        />
        <section>
          <h2 className={styles.h2}>Header</h2>
          <p className={styles.p}>Body</p>
        </section>
      </>
    ),
  },
];
