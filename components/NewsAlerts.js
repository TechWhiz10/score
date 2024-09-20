// File: /components/NewsAlerts.js
import { useEffect } from "react";

function NewsAlerts({ setAlerts, selectedDate }) {
  useEffect(() => {
    const fetchNews = async () => {
      try {
        console.log("Raw selectedDate:", selectedDate);

        // Ensure selectedDate is a Date object
        let dateObject = new Date(selectedDate);
        if (isNaN(dateObject.getTime())) {
          console.error(
            "Invalid Date object created from selectedDate:",
            selectedDate
          );
          throw new Error("Invalid date");
        }

        console.log("Valid Date object:", dateObject);

        // Fetch the articles from the backend for the selected date
        const response = await fetch(
          `/api/articles?date=${dateObject.toISOString()}`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Fetched articles:", data.articles);

        setAlerts((prevAlerts) => ({
          ...prevAlerts,
          news: data.articles,
        }));
      } catch (error) {
        console.error("Error fetching news:", error);
        setAlerts((prevAlerts) => ({
          ...prevAlerts,
          news: [],
        }));
      }
    };

    if (selectedDate) {
      fetchNews();
    }
  }, [selectedDate, setAlerts]);

  return null;
}

export default NewsAlerts;
