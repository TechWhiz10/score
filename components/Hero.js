// File: /components/Hero.js
import React, { useRef } from "react";
import { useState, useEffect } from "react";
import config from "@/config";
import LoginRegisterModal from "@/app/LoginRegisterModal";

const DateDetailsModal = ({ isOpen, date, bets, onClose }) => {
  const modalRef = useRef();

  useEffect(() => {
    if (isOpen) {
      // Prevent body from scrolling
      document.body.style.overflow = "hidden";
    } else {
      // Re-enable scrolling
      document.body.style.overflow = "";
    }
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside); // Support for touch devices

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside); // Corrected from addEventListener
      document.body.style.overflow = ""; // Reset overflow when the component unmounts
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const getColorForBetType = (type) => {
    if (type && type.includes("Win")) return "text-green-400";
    if (type && type.includes("Loss")) return "text-red-400";
    return "text-gray-300";
  };

  return (
    <div
      className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center"
      onClick={onClose}
    >
      <div
        ref={modalRef}
        className="bg-gray-900 text-white p-5 rounded-lg shadow-lg max-w-4xl w-full mx-4 relative"
        style={{
          maxHeight: "90vh",
          overflowY: "auto",
          WebkitOverflowScrolling: "touch",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <h4 className="text-teal-400 font-bold text-2xl mb-4 text-center">
          Bets for March {date}, 2024
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {bets.map((betPair, index) => (
            <div key={index} className="flex flex-col items-center mb-6">
              <p
                className={`font-semibold mb-2 ${getColorForBetType(
                  betPair.result.type
                )}`}
              >
                {betPair.prediction.type} - {betPair.result.type}
              </p>
              <img
                src={betPair.prediction.imageUrl}
                alt="Prediction"
                className="w-full rounded shadow mb-4"
                style={{
                  maxWidth: "100%",
                  maxHeight: "200px",
                  objectFit: "cover",
                }}
              />
              <img
                src={betPair.result.imageUrl}
                alt="Result"
                className="w-full rounded shadow"
                style={{
                  maxWidth: "100%",
                  maxHeight: "200px",
                  objectFit: "cover",
                }}
              />
            </div>
          ))}
        </div>

        <button
          onClick={onClose}
          className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-teal-500 text-white px-6 py-2 rounded-lg shadow-lg"
        >
          Close
        </button>
      </div>
    </div>
  );
};

const Calendar = ({ onDateClick }) => {
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const startDay = new Date(Date.UTC(2024, 5, 1)).getDay();
  const totalDays = 31;

  const positiveDays = [
    2, 3, 4, 5, 7, 9, 10, 11, 13, 15, 18, 19, 20, 22, 23, 28, 29, 31,
  ];
  const negativeDays = [6, 12, 16, 24, 27];

  const emptyDays = Array.from({ length: startDay }).fill(null);
  const days = Array.from({ length: totalDays }, (_, i) => i + 1);

  const getBgColor = (day) => {
    if (positiveDays.includes(day)) return "bg-green-600 hover:bg-green-700";
    if (negativeDays.includes(day)) return "bg-red-600 hover:bg-red-700";
    return "bg-gray-100 hover:bg-gray-300";
  };

  return (
    <div className="grid grid-cols-7 gap-1">
      {daysOfWeek.map((day) => (
        <div
          key={day}
          className="font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-400"
        >
          {day}
        </div>
      ))}
      {emptyDays.map((_, i) => (
        <div
          key={`empty-${i}`}
          className="text-center bg-gray-200 rounded"
        ></div>
      ))}
      {days.map((day) => (
        <div
          key={day}
          className={`text-center py-2 border cursor-pointer ${getBgColor(
            day
          )} text-black rounded transition-colors duration-300`}
          onClick={() => onDateClick(day)}
        >
          {day}
        </div>
      ))}
    </div>
  );
};

const Hero = () => {
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);
  const [isLoginRegisterModalOpen, setIsLoginRegisterModalOpen] =
    useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [betsForDate, setBetsForDate] = useState([]);

  const toggleLoginRegisterModal = () => {
    setIsLoginRegisterModalOpen(!isLoginRegisterModalOpen);
  };

  const outcomes = {
    1: ["Loss", "Win"],
    2: ["Win", "Win"],
    3: ["Win", "Win"],
    4: ["Win", "Win"],
    5: ["Win", "Win"],
    6: ["Loss", "Loss"],
    7: ["Win", "Win"],
    8: ["Loss", "Win"],
    9: ["Win", "Win"],
    10: ["Win", "Win"],
    11: ["Win", "Win"],
    12: ["Loss", "Loss"],
    13: ["Win", "Win"],
    14: ["Win", "Loss"],
    15: ["Win", "Win"],
    16: ["Loss", "Loss"],
    17: ["Win", "Loss"],
    18: ["Win", "Win"],
    19: ["Win", "Win"],
    20: ["Win", "Win"],
    21: ["Loss", "Win"],
    22: ["Win", "Win"],
    23: ["Win", "Win"],
    24: ["Loss", "Loss"],
    25: ["Win", "Loss"],
    26: ["Win", "Loss"],
    27: ["Loss", "Loss"],
    28: ["Win", "Win"],
    29: ["Win", "Win"],
    30: ["Win", "Loss"],
    31: ["Win", "Win"],
  };

  const openDetailsModal = (day) => {
    const mockBets = Object.entries(outcomes).reduce(
      (acc, [dayKey, results]) => {
        acc[dayKey] = results.map((result, index) => {
          return {
            prediction: {
              type:
                index === 0 ? "Spread Prediction:" : "Over/Under Prediction:",
              imageUrl: `/img/M${dayKey}P${index === 0 ? "S" : "O"}.png`,
            },
            result: {
              type: `Result: ${result}`,
              imageUrl: `/img/M${dayKey}${index === 0 ? "S" : "O"}.png`,
            },
          };
        });
        return acc;
      },
      {}
    );

    setSelectedDate(day);
    setBetsForDate(
      mockBets[day] || [{ type: "No bets recorded for this day" }]
    );
    setDetailsModalOpen(true);
  };

  return (
    <section
      className="min-h-screen w-full flex flex-col items-center justify-center gap-8 px-6 sm:px-10 lg:px-16 py-12 lg:py-16 text-center"
      style={{
        background: "linear-gradient(to right, #1c1f2e, #4a6274, #1c1f2e)",
      }}
    >
      <div className="flex flex-col gap-6 items-center text-center lg:w-2/3">
        <h1
          className="font-extrabold text-4xl md:text-5xl tracking-tight text-white leading-tight mb-4 md:mb-6"
          style={{ paddingTop: "0.5em" }} // Added padding to the top
        >
          Sharpen Your{" "}
          <span
            className="shaking-and-rotating"
            style={{
              display: "inline-block",
              fontWeight: "bold",
              background: "linear-gradient(to right, #5FF9CE, #00A3FF)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Edge:
          </span>{" "}
          <span
            style={{
              display: "inline-block",
              background: "linear-gradient(to right, #5FF9CE, #00A3FF)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Machine Learning AI Insights
          </span>
        </h1>
        <style jsx>{`
          @keyframes shake-rotate {
            0% {
              transform: rotate(-7.5deg) translateX(0);
            }
            25% {
              transform: rotate(-7.5deg) translateX(-2px);
            }
            50% {
              transform: rotate(-7.5deg) translateX(2px);
            }
            75% {
              transform: rotate(-7.5deg) translateX(-2px);
            }
            100% {
              transform: rotate(-7.5deg) translateX(0);
            }
          }

          .shaking-and-rotating {
            animation: shake-rotate 0.5s ease-in-out infinite;
          }
        `}</style>
        <style jsx>{`
          @keyframes shake {
            0% {
              transform: translateX(0);
            }
            25% {
              transform: translateX(-2px);
            }
            50% {
              transform: translateX(2px);
            }
            75% {
              transform: translateX(-2px);
            }
            100% {
              transform: translateX(0);
            }
          }

          .shaking {
            animation: shake 0.5s ease-in-out infinite; // Animation properties
          }
        `}</style>
        <p className="font-bold text-xl lg:text-2xl tracking-tight mb-2 text-base-content/80">
          Your AI Advantage for Sports: Insightful Analysis and Confident
          Decisions!
        </p>
        <div className="w-full">
          <h2 className="text-2xl font-semibold text-teal-400 mb-2">
            <span
              style={{
                display: "inline-block",
                background: "linear-gradient(to right, #5FF9CE, #00A3FF)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              March 2024 Results
            </span>
          </h2>
          <p className="text-base font-medium text-base-content/80 mb-2">
            Select a date to see our expert predictions and view bet slips!
          </p>
          <Calendar onDateClick={openDetailsModal} />
          <div className="mt-3 py-3 font-semibold text-base text-black bg-gradient-to-r from-blue-500 to-teal-500 rounded-lg shadow text-center max-w-xs mx-auto">
            <div className="text-white">
              March Results:{" "}
              <span className="text-green-400 font-bold">+26 units</span>
            </div>
            <div className="text-white">
              Spread Win %: 23/31 ={" "}
              <span className="text-green-400 font-bold">74%</span>
            </div>
            <div className="text-white">
              Over/Under Win %: 21/31 ={" "}
              <span className="text-green-400 font-bold">68%</span>
            </div>
          </div>
        </div>
      </div>

      <DateDetailsModal
        isOpen={detailsModalOpen}
        date={selectedDate}
        bets={betsForDate}
        onClose={() => setDetailsModalOpen(false)}
      />
      <LoginRegisterModal
        isOpen={isLoginRegisterModalOpen}
        onClose={toggleLoginRegisterModal}
      />
    </section>
  );
};

export default Hero;
