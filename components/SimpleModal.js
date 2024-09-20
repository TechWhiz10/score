// File: /components/SimpleModal.js
import React, { useEffect, useRef } from "react";

const SimpleModal = ({ isOpen, onClose }) => {
  const modalRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0,0,0,0.6)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1050,
        overflowY: "auto", // Allow page scroll if content exceeds viewport
      }}
    >
      <div
        ref={modalRef}
        style={{
          position: "relative",
          backgroundColor: "#1c1f2e",
          borderRadius: "10px",
          width: "90%",
          maxWidth: "600px",
          maxHeight: "90vh",
          padding: "2rem",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          overflowY: "auto", // Allow content to scroll if it exceeds modal height
        }}
      >
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: "1rem",
            right: "1rem",
            background: "none",
            border: "none",
            color: "#4a6274",
            fontSize: "1.5rem",
            cursor: "pointer",
          }}
          aria-label="Close"
        >
          &times;
        </button>

        <h2
          style={{
            textAlign: "center",
            color: "#00c8c8",
            marginBottom: "1rem",
          }}
        >
          Our Solution Overview
        </h2>

        <div style={{ lineHeight: "1.6", fontSize: "0.95rem", color: "white" }}>
          <h3 style={{ color: "#00c8c8", margin: "1rem 0 0.5rem" }}>
            Case Studies
          </h3>
          <p>Detailed analysis of our predictive model.</p>
          <p>
            This section provides in-depth examples of how our predictive models
            have been applied in real-world scenarios. These case studies
            showcase the effectiveness and reliability of our solution by
            highlighting specific instances where our predictions have
            accurately anticipated outcomes in sports events. The detailed
            analysis covers the entire process, from data collection to the
            final prediction, demonstrating the robustness of our models.
          </p>

          <h3 style={{ color: "#00c8c8", margin: "1rem 0 0.5rem" }}>
            Algorithm Explanation
          </h3>
          <p>
            Our models leverage advanced ML techniques for dynamic, real-time
            predictions.
          </p>

          <h3 style={{ color: "#00c8c8", margin: "1rem 0 0.5rem" }}>
            Testimonials
          </h3>
          <ul>
            <li>&quot;Transformed my sports knowledge.&quot; - Jack F.</li>
            <li>&quot;Impressive accuracy and insights.&quot; - Harrison M.</li>
          </ul>

          <h3 style={{ color: "#00c8c8", margin: "1rem 0 0.5rem" }}>
            Interactive Demo
          </h3>
          <p>
            Explore the capabilities of our tool through an interactive
            platform.
          </p>

          <h3 style={{ color: "#00c8c8", margin: "1rem 0 0.5rem" }}>
            Comparative Analysis
          </h3>
          <p>See how our tool stacks up against others.</p>

          <h3 style={{ color: "#00c8c8", margin: "1rem 0 0.5rem" }}>
            Technology Stack Overview
          </h3>
          <p>
            Our solution is built on cutting-edge technology ensuring
            reliability and speed.
          </p>

          <h3 style={{ color: "#00c8c8", margin: "1rem 0 0.5rem" }}>
            Research and Development Insights
          </h3>
          <p>
            Continuous improvement through ongoing research in data analytics
            and ML.
          </p>

          <h3 style={{ color: "#00c8c8", margin: "1rem 0 0.5rem" }}>
            Future Roadmap
          </h3>
          <p>Exciting upcoming features:</p>
        </div>
      </div>
    </div>
  );
};

export default SimpleModal;
