// File: /app/LoginRegisterModal.js

"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import apiClient from "@/libs/api/apiClient";

export default function LoginRegisterModal({ isOpen, onClose }) {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true); // Toggle between login and register
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(""); // State to store the error message

  // Function to handle user registration
  const onSignUp = async () => {
    try {
      setLoading(true);
      const referralCode = localStorage.getItem("referralCode");
      const payload = { ...user };
      if (referralCode) {
        payload.referralCode = referralCode;
      }

      const response = await apiClient.post("/register", payload);
      console.log("signup okay", response);

      if (response && response.message === "User created successfully") {
        const { token } = response;

        // Store the token in cookies
        document.cookie = `token=${token}; path=/;`;

        // Directly set the state without using Cookies
        await fetchUserData(token);

        // Redirect on successful registration
        router.push("/dashboard");
      } else {
        setErrorMessage(response.error || "Registration failed.");
        console.log(response);
        console.log(response.error);
      }
    } catch (error) {
      console.log("Error during registration:", error);
      console.log("Error response:", error.response);
      console.log("Error response data:", error.response?.data);
      setErrorMessage(
        error.response?.data?.error
          ? error.response.data.error
          : "Failed to sign up! Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // Function to handle user login
  const processLogin = async () => {
    try {
      setLoading(true);
      const response = await apiClient.post("/login", {
        email: user.email,
        password: user.password,
      });
      console.log("login okay", response);

      if (response && response.message === "Login successful") {
        await fetchUserData(response.token);
        router.push("/dashboard");
      } else {
        setErrorMessage(response.error || "Login failed.");
        console.log(response);
        console.log(response.error);
      }
    } catch (error) {
      console.log("Error during login:", error);
      console.log("Error response:", error.response);
      console.log("Error response data:", error.response?.data);
      setErrorMessage(
        error.response?.data?.error
          ? error.response.data.error
          : "Login failed. Please check your credentials and try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // Update buttonDisabled state based on user input
  useEffect(() => {
    setButtonDisabled(!(user.email && user.password));
  }, [user]);

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    setErrorMessage("");
    isLogin ? processLogin() : onSignUp();
  };

  // Client-side example: Fetch user data using the token from cookies
  const fetchUserData = async () => {
    try {
      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("token="))
        ?.split("=")[1];

      if (!token) throw new Error("Token not found");

      const response = await apiClient.get("/user/data", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("Fetched user data:", response.data);
    } catch (error) {
      console.error("Failed to fetch user data:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg max-w-sm w-full relative">
        <button
          className="absolute top-2 right-2 text-gray-700 text-2xl"
          onClick={onClose}
        >
          &times;
        </button>
        <h2 className="font-semibold text-lg mb-4 text-black">
          {isLogin ? "Login" : "Register"}
        </h2>
        {errorMessage && (
          <div className="text-red-500 text-sm mb-3">{errorMessage}</div>
        )}
        <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            className="border p-2 rounded-md bg-white text-black"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="border p-2 rounded-md bg-white text-black"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            required
          />
          <button
            type="submit"
            className={`mt-4 bg-blue-500 text-white p-2 rounded-md ${
              buttonDisabled || loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={buttonDisabled || loading}
          >
            {loading ? "Processing..." : isLogin ? "Login" : "Register"}
          </button>
        </form>
        <button
          className="mt-4 text-blue-500"
          onClick={() => setIsLogin(!isLogin)}
        >
          {isLogin
            ? "Need an account? Register"
            : "Already have an account? Login"}
        </button>
      </div>
    </div>
  );
}
