// File: /components/Stats.js

import React from "react";

const Stats = ({ stats, selectedDate, handleDateClick }) => {
  return (
    <div className="flex justify-around space-x-1 mb-4">
      {stats.map((stat, idx) => (
        <button
          key={idx}
          onClick={() => handleDateClick(stat)}
          className={`flex-1 py-2 px-1 md:px-4 rounded-lg ${
            selectedDate === stat.date
              ? "bg-gradient-to-r from-purple-500 to-purple-700 border-2 border-yellow-400"
              : "bg-gradient-to-r from-purple-500 to-purple-700"
          } text-white font-semibold text-xs md:text-lg`}
        >
          <div>{stat.date}</div>
          <div>
            {stat.games}/{stat.wins}
            {stat.games > 0
              ? ` ${((stat.wins / stat.games) * 100).toFixed(0)}%`
              : "0%"}
          </div>
        </button>
      ))}
    </div>
  );
};

export default Stats;
