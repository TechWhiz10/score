// File: utils/dateUtils.js

// Format date as "Jul 26th"
export const formatDate = (date) => {
  if (!(date instanceof Date) || isNaN(date.getTime())) {
    console.error("Invalid date object provided:", date);
    return "Invalid Date";
  }

  const options = { month: "short", day: "numeric" };
  const formattedDate = date.toLocaleDateString("en-US", options);
  const day = date.getDate();
  let suffix = "th";

  if (day % 10 === 1 && day !== 11) suffix = "st";
  else if (day % 10 === 2 && day !== 12) suffix = "nd";
  else if (day % 10 === 3 && day !== 13) suffix = "rd";

  return `${formattedDate.split(" ")[0]} ${day}${suffix}`;
};

// Display formatted date as "Saturday, July 26, 2024"
export const displayFormattedDate = (dateInput) => {
  try {
    let date;

    if (typeof dateInput === "string") {
      date = new Date(dateInput);
    } else if (dateInput instanceof Date) {
      date = dateInput;
    } else {
      throw new Error("Invalid date input type");
    }

    if (isNaN(date.getTime())) {
      throw new Error("Constructed date is invalid");
    }

    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return date.toLocaleDateString("en-US", options);
  } catch (error) {
    console.error("Error formatting date:", error);
    return "Invalid Date";
  }
};

// Format month and day as "July 29th"
export const formatMonthDay = (date) => {
  if (!(date instanceof Date) || isNaN(date.getTime())) {
    console.error("Invalid date object provided:", date);
    return "Invalid Date";
  }

  const options = { month: "long", day: "numeric" };
  const formattedDate = date.toLocaleDateString("en-US", options);
  const day = date.getDate();
  let suffix = "th";

  if (day % 10 === 1 && day !== 11) suffix = "st";
  else if (day % 10 === 2 && day !== 12) suffix = "nd";
  else if (day % 10 === 3 && day !== 13) suffix = "rd";

  return `${formattedDate.split(" ")[0]} ${day}${suffix}`;
};

// Format time to "5:05 PM"
export const timeHHMM = (time, date) => {
  try {
    const [hours, minutes] = time.split(":");
    const dateObj = new Date(date);
    dateObj.setUTCHours(hours, minutes);

    return dateObj.toLocaleTimeString([], {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  } catch (error) {
    console.error("Error formatting time:", error);
    return "Invalid Time";
  }
};
