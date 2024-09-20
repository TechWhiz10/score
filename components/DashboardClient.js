"use client"; // This marks the component as a Client Component

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import apiClient from "@/libs/api/apiClient";
import DashboardHeader from "@/components/DashboardHeader";
import Stats from "@/components/Stats";
import ProfileModal from "@/components/ProfileModal";
import NewsAlerts from "@/components/NewsAlerts";
import GameAlerts from "@/components/GameAlerts";
import FeedComponent from "@/components/FeedComponent";
import AnalysisComponent from "@/components/AnalysisComponent";
import {
  formatDate,
  displayFormattedDate,
  formatMonthDay,
  timeHHMM,
} from "@/utils/dateUtils";

// Generate date boxes for the last 5 days
const generateDateBoxes = (numDays, alerts = []) => {
  const today = new Date();
  const stats = [];

  for (let i = 0; i < numDays; i++) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    stats.push({
      date: date,
      formattedDate: formatDate(date),
      games: 0,
      wins: 0,
    });
  }

  alerts.forEach((alert) => {
    const alertDate = formatDate(new Date(alert.date));
    const stat = stats.find((s) => s.formattedDate === alertDate);

    if (stat) {
      stat.games += 1;
      if (alert.status === "Finished" && alert.result === "Won") {
        stat.wins += 1;
      }
    }
  });

  return stats.reverse();
};

const calculateTimeLeft = (trialEndTime, subscriptionEndTime, userStatus) => {
  const now = new Date();
  const endTime =
    userStatus === "trialist" ? trialEndTime : subscriptionEndTime;
  const difference = endTime ? endTime - now : 0;

  let timeLeft = {};
  if (difference > 0) {
    timeLeft = {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / (1000 * 60)) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  } else {
    timeLeft = {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    };
  }
  return timeLeft;
};

function DashboardClient({ initialGames, initialNews }) {
  const router = useRouter();
  const [userEmail, setUserEmail] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const dropdownRef = useRef(null);
  const [alerts, setAlerts] = useState({
    predictions: [],
    games: initialGames || [], // Initialize with server-fetched games
    news: initialNews || [], // Initialize with server-fetched news
    analysis: [],
  });
  const [dashboardData, setDashboardData] = useState({
    stats: generateDateBoxes(5, initialGames),
  });

  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [trialEndTime, setTrialEndTime] = useState(null);
  const [isSubscriptionActivated, setIsSubscriptionActivated] = useState(false);
  const [subscriptionEndTime, setSubscriptionEndTime] = useState(null);
  const [isPremiumMember, setIsPremiumMember] = useState(false);
  const [userStatus, setUserStatus] = useState("");
  const [referralCode, setReferralCode] = useState("");
  const [activeTab, setActiveTab] = useState("Predictions");

  const toggleDropdown = () => {
    setIsProfileModalOpen(!isProfileModalOpen);
  };
  const formatDateToYMD = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await apiClient.get("/user/data");
        if (response.email) setUserEmail(response.email);
        if (response.trialEndTime)
          setTrialEndTime(new Date(response.trialEndTime));
        if (response.isSubscriptionActivated)
          setIsSubscriptionActivated(response.isSubscriptionActivated);
        if (response.subscriptionEndTime)
          setSubscriptionEndTime(new Date(response.subscriptionEndTime));
        if (response.isSubscriptionActivated) setIsPremiumMember(true);
        if (response.userStatus) setUserStatus(response.userStatus);
        if (response.referralCode) setReferralCode(response.referralCode);
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    };

    fetchUserData();

    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [router]);

  // Update dashboardData when alerts.games changes
  useEffect(() => {
    setDashboardData({
      stats: generateDateBoxes(5, alerts.games),
    });
  }, [alerts.games]);

  // Client-side fetching when the selectedDate or activeTab changes
  useEffect(() => {
    const fetchDataForSelectedDate = async () => {
      try {
        const formattedDate = formatDateToYMD(selectedDate);

        // Fetch games for the selected date
        const gamesResponse = await fetch(
          `/api/getGamesData?date=${selectedDate.toISOString()}`
        );
        const gamesData = await gamesResponse.json();

        // Fetch articles for the selected date
        const articlesResponse = await fetch(
          `/api/articles?date=${formattedDate}`
        );
        const articlesData = await articlesResponse.json();

        // Update state with fetched games and news
        setAlerts((prevAlerts) => ({
          ...prevAlerts,
          games: gamesData.games || [],
          news: articlesData.articles || [],
        }));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchDataForSelectedDate();
  }, [selectedDate]);

  // Timer Logic for Subscription
  const [timeLeft, setTimeLeft] = useState(
    calculateTimeLeft(trialEndTime, subscriptionEndTime, userStatus)
  );

  useEffect(() => {
    if (trialEndTime || subscriptionEndTime) {
      setTimeLeft(
        calculateTimeLeft(trialEndTime, subscriptionEndTime, userStatus)
      );
    }
  }, [trialEndTime, subscriptionEndTime, userStatus]);

  useEffect(() => {
    const timer = setInterval(() => {
      if (trialEndTime || subscriptionEndTime) {
        setTimeLeft(
          calculateTimeLeft(trialEndTime, subscriptionEndTime, userStatus)
        );
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [trialEndTime, subscriptionEndTime, userStatus]);

  // Handle date click
  const handleDateClick = (dateStats) => {
    if (dateStats.date instanceof Date && !isNaN(dateStats.date.getTime())) {
      setSelectedDate(dateStats.date);
    } else {
      console.error("Invalid date selected:", dateStats.date);
    }
  };

  const renderAlert = (alert) => {
    if (activeTab === "Predictions") {
      const {
        status,
        scoreA,
        scoreB,
        teamA,
        teamB,
        date,
        time,
        league,
        confidence,
        odds,
        prediction,
      } = alert;

      const displayDateTime = `${timeHHMM(time, date)}`;
      let betStatus = "Bet In Progress";
      if (status === "Finished") {
        const isOverUnderBet =
          prediction.toLowerCase().includes("over") ||
          prediction.toLowerCase().includes("under");
        const totalScore = scoreA + scoreB;

        if (isOverUnderBet) {
          const [betType, overUnderValue] = prediction.split(" ");
          const overUnderScore = parseFloat(overUnderValue);

          if (betType.toLowerCase() === "over") {
            betStatus = totalScore > overUnderScore ? "Won" : "Lost";
          } else if (betType.toLowerCase() === "under") {
            betStatus = totalScore < overUnderScore ? "Won" : "Lost";
          }
        } else {
          const [team, pointSpread] = prediction.includes(" +")
            ? prediction.split(" +")
            : prediction.split(" -");
          const pointSpreadValue = parseFloat(pointSpread);

          if (team.trim() === teamA) {
            betStatus = scoreA + pointSpreadValue > scoreB ? "Won" : "Lost";
          } else if (team.trim() === teamB) {
            betStatus = scoreB + pointSpreadValue > scoreA ? "Won" : "Lost";
          }
        }
      }

      const isPremiumUser = isPremiumMember;

      return (
        <div
          key={alert.id}
          className="flex flex-col md:flex-row justify-between items-center border border-white bg-white bg-opacity-10 p-4 rounded-lg text-white space-y-4 md:space-y-0 md:space-x-4"
        >
          <div className="flex flex-col md:flex-row items-center space-x-4">
            <div className="text-lg font-semibold text-purple-400">
              {displayDateTime}
            </div>

            <div className="flex flex-col items-center space-y-1">
              <div className="text-sm md:text-base font-semibold">
                Prediction:
              </div>
              <div className="bg-black text-white p-2 rounded-lg">
                {prediction}
              </div>
            </div>

            <div className="flex flex-col items-center space-y-1">
              <div className="text-sm md:text-base font-semibold">
                Confidence:
              </div>
              <div
                className={`p-2 rounded-lg ${
                  isPremiumUser ? "text-white" : "blur-md"
                }`}
              >
                {isPremiumUser ? `${confidence.toFixed(0)}%` : "*******"}
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <img
                src={`/Logos/${teamA.replace(/\s+/g, "-")}.png`}
                alt={teamA}
                className="h-8 w-8 md:h-10 md:w-10"
              />
              <span className="font-semibold">{teamA}</span>
            </div>

            <div className="text-xl font-bold">{`${scoreA ?? 0} - ${
              scoreB ?? 0
            }`}</div>

            <div className="flex items-center space-x-2">
              <img
                src={`/Logos/${teamB.replace(/\s+/g, "-")}.png`}
                alt={teamB}
                className="h-8 w-8 md:h-10 md:w-10"
              />
              <span className="font-semibold">{teamB}</span>
            </div>
          </div>

          <div className="flex flex-col items-center space-y-1">
            <div className="text-sm md:text-base font-semibold">Odds:</div>
            <div className="bg-white bg-opacity-30 text-white p-2 rounded-lg">
              {odds}
            </div>
          </div>

          <div className="flex flex-col items-center space-y-1">
            <div
              className={`p-2 rounded-lg ${
                betStatus === "Won"
                  ? "bg-green-500"
                  : betStatus === "Lost"
                  ? "bg-red-500"
                  : "bg-yellow-500"
              } text-white`}
            >
              {betStatus}
            </div>
          </div>
        </div>
      );
    } else if (activeTab === "News") {
      return (
        <a
          key={alert.url}
          href={alert.url}
          target="_blank"
          rel="noopener noreferrer"
          className="block border border-white bg-white bg-opacity-10 p-4 rounded-lg text-white mb-2"
        >
          {alert.title}
        </a>
      );
    } else if (activeTab === "Games") {
      const { status, scoreA, scoreB, teamA, teamB, date, time, league } =
        alert;
      const displayDateTime = `${timeHHMM(time, date)}`;

      return (
        <div
          key={alert.id}
          className="flex flex-col md:flex-row justify-between items-center border border-white bg-white bg-opacity-10 p-4 rounded-lg text-white space-y-4 md:space-y-0"
        >
          <div className="flex-shrink-0 text-left w-full md:w-auto">
            <div className="font-semibold">{displayDateTime}</div>
            <div className="font-semibold text-sm">
              League:
              <span className="ml-1">{league}</span>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-4 w-full md:w-auto">
            <div className="flex items-center space-x-2">
              <img
                src={`/Logos/${teamA.replace(/\s+/g, "-")}.png`}
                alt={teamA}
                className="h-10 w-10"
              />
              <span>{teamA}</span>
            </div>

            <div className="text-xl font-bold">{`${scoreA ?? 0} - ${
              scoreB ?? 0
            }`}</div>

            <div className="flex items-center space-x-2">
              <img
                src={`/Logos/${teamB.replace(/\s+/g, "-")}.png`}
                alt={teamB}
                className="h-10 w-10"
              />
              <span>{teamB}</span>
            </div>
          </div>

          <div className="flex-shrink-0 text-right md:text-left w-full md:w-auto">
            <div className="font-bold">Status:</div>
            <div>{status}</div>
          </div>
        </div>
      );
    }
  };

  const filteredAlerts = (() => {
    if (!selectedDate) return [];

    const selectedDateObj = new Date(selectedDate);
    selectedDateObj.setHours(0, 0, 0, 0); // Set time to start of the day

    let alertsToShow = [];

    try {
      if (activeTab === "Predictions") {
        alertsToShow = alerts.games.filter((alert) => {
          const alertDate = new Date(alert.date);
          alertDate.setHours(0, 0, 0, 0);
          return (
            alertDate.getTime() === selectedDateObj.getTime() &&
            alert.confidence > 60
          );
        });
      } else if (activeTab === "News") {
        alertsToShow = alerts.news.filter((alert) => {
          const publishedDate = new Date(alert.publishedAt);
          publishedDate.setHours(0, 0, 0, 0); // Normalize to midnight
          console.log(
            "Comparing Published Date:",
            publishedDate,
            "with Selected Date:",
            selectedDateObj
          );
          return publishedDate.getTime() === selectedDateObj.getTime();
        });
      } else if (activeTab === "Games") {
        alertsToShow = alerts.games.filter((game) => {
          const gameDate = new Date(game.date);
          gameDate.setHours(0, 0, 0, 0);
          return gameDate.getTime() === selectedDateObj.getTime();
        });
      } else if (activeTab === "Analysis") {
        alertsToShow = alerts.analysis;
      }
      alertsToShow.sort((a, b) => new Date(a.date) - new Date(b.date));
    } catch (error) {
      console.error("Error filtering alerts:", error);
    }

    return alertsToShow;
  })();

  return (
    <div className="min-h-screen p-6 text-white">
      <DashboardHeader
        userEmail={userEmail}
        timeLeft={timeLeft}
        isSubscriptionActivated={isSubscriptionActivated}
        isDropdownOpen={isDropdownOpen}
        toggleDropdown={toggleDropdown}
        dropdownRef={dropdownRef}
        setIsProfileModalOpen={setIsProfileModalOpen}
      />
      {/* Modals */}
      {isProfileModalOpen && (
        <ProfileModal
          isOpen={isProfileModalOpen}
          setIsOpen={setIsProfileModalOpen}
          userEmail={userEmail}
          trialEndTime={trialEndTime}
          subscriptionEndTime={subscriptionEndTime}
          userStatus={userStatus}
          referralCode={referralCode}
        />
      )}
      {/* Tab Navigation */}
      <div className="flex justify-around space-x-1 mb-4">
        <button
          className={`flex-1 py-2 px-1 rounded-lg ${
            activeTab === "Predictions" ? "bg-yellow-500" : "bg-blue-500"
          }`}
          onClick={() => handleTabClick("Predictions")}
        >
          Predictions
        </button>
        <button
          className={`flex-1 py-2 px-1 rounded-lg ${
            activeTab === "Games" ? "bg-yellow-500" : "bg-blue-500"
          }`}
          onClick={() => handleTabClick("Games")}
        >
          Games
        </button>
        <button
          className={`flex-1 py-2 px-1 rounded-lg ${
            activeTab === "Analysis" ? "bg-yellow-500" : "bg-blue-500"
          }`}
          onClick={() => handleTabClick("Analysis")}
        >
          Analysis
        </button>
        <button
          className={`flex-1 py-2 px-1 rounded-lg ${
            activeTab === "News" ? "bg-yellow-500" : "bg-blue-500"
          }`}
          onClick={() => handleTabClick("News")}
        >
          News
        </button>
      </div>
      {/* Content for each tab */}
      <div>
        {activeTab === "Predictions" && <FeedComponent />}
        {activeTab === "Games" && (
          <GameAlerts setAlerts={setAlerts} selectedDate={selectedDate} />
        )}
        {activeTab === "Analysis" && <AnalysisComponent />}
        {activeTab === "News" && (
          <NewsAlerts setAlerts={setAlerts} selectedDate={selectedDate} />
        )}
      </div>
      {/* Date Selection */}
      <div className="flex justify-around space-x-1 mb-4">
        {dashboardData.stats.map((stat, index) => (
          <button
            key={index}
            className={`flex-1 py-2 px-1 md:px-4 rounded-lg ${
              selectedDate &&
              selectedDate.getDate() === stat.date.getDate() &&
              selectedDate.getMonth() === stat.date.getMonth() &&
              selectedDate.getFullYear() === stat.date.getFullYear()
                ? "bg-gradient-to-r from-blue-500 to-teal-500 border-2 border-yellow-400"
                : "bg-gradient-to-r from-blue-500 to-teal-500"
            } text-white font-semibold text-xs md:text-lg`}
            onClick={() => handleDateClick(stat)}
          >
            <div>{stat.formattedDate}</div>
          </button>
        ))}
      </div>

      {/* Alerts Rendering */}
      <div className="grid grid-cols-1 gap-4">
        {filteredAlerts.length > 0 ? (
          filteredAlerts.map((alert, index) => {
            console.log(`Rendering alert at index ${index}: `, alert); // Log the alert being rendered
            return <div key={index}>{renderAlert(alert)}</div>;
          })
        ) : (
          <div className="text-center bg-purple-800 p-4 rounded-lg md:col-span-2 lg:col-span-5">
            {activeTab === "Predictions" &&
              `No Predictions available for ${formatMonthDay(selectedDate)}.`}
            {activeTab === "Games" &&
              `No Games available for ${formatMonthDay(selectedDate)}.`}
            {activeTab === "News" &&
              `No News available for ${formatMonthDay(selectedDate)}.`}
            {activeTab === "Analysis" &&
              `No Analysis available for ${formatMonthDay(selectedDate)}.`}
          </div>
        )}
      </div>
    </div>
  );
}

export default DashboardClient;
