// File: /components/GameAlerts.js
import { useEffect } from "react";

function GameAlerts({ setAlerts, selectedDate }) {
  useEffect(() => {
    const fetchGames = async () => {
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

        // Fetch the games data from the backend for the selected date
        const response = await fetch(
          `/api/getGamesData?date=${dateObject.toISOString()}`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Fetched game data:", data);

        if (data.games && data.games.length > 0) {
          setAlerts((prevAlerts) => ({
            ...prevAlerts,
            games: data.games,
          }));
          console.log("Updated games alerts:", data.games);
        } else {
          console.log("No games found in API response.");
          setAlerts((prevAlerts) => ({
            ...prevAlerts,
            games: [],
          }));
        }
      } catch (error) {
        console.error("Error fetching games:", error);
        setAlerts((prevAlerts) => ({
          ...prevAlerts,
          games: [],
        }));
      }
    };

    if (selectedDate) {
      fetchGames();
    }
  }, [selectedDate, setAlerts]);

  return null;
}

export default GameAlerts;
