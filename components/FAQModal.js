import React, { useState } from "react";

const faqs = [
  {
    question: "Can I Get a Refund?",
    answer:
      "Yes! If, during your payment period (Weekly/Monthly), the model's predictions accuracy falls below 50%, you are eligible to request a refund. Rest assured, our model is continuously evolving to provide increasingly accurate predictions over time.",
  },
  {
    question: "Can I Use The Predictions For All Sports?",
    answer:
      "At this time, our specialized machine learning models are designed to deliver cutting-edge predictions for the NBA, MLB, and NFL, harnessing the power of AI to provide you with the most accurate insights in these leagues. We are excited about the future, as we are actively working on expanding our capabilities to include esports, soccer, tennis, and hockey. Stay tuned for updates as we broaden our sports coverage to bring you top-notch betting tips across a wider array of sports.",
  },
  {
    question: "How Do I Use It?",
    answer:
      "Upon subscription, you're set to receive our meticulously curated betting predictions directly to your inbox. Depending on your selected plan, whether it's weekly or monthly, you'll get daily picks delivered in a comprehensive PDF document. This document not only outlines crucial game insights but also provides you with our expert AI-driven betting predictions, designed to enhance your betting strategy and decision-making process.",
  },
  {
    question: "How Do Our Predictions Work?",
    answer:
      "Our system analyzes vast amounts of player and team data through advanced algorithms and machine learning, including Logistic and Linear Regression for trend analysis, Bayesian Networks for probabilistic outcomes, and Neural Networks for pattern recognition and learning from complex data. This blend of techniques enables us to generate accurate and dynamic sports betting predictions, constantly improving as more data becomes available. For a deeper dive into how our technology transforms data into predictions, check out our blog",
  },
  // Add more FAQs as needed
];

const FAQModal = ({ isModalOpen, setIsModalOpen }) => {
  const [openFAQ, setOpenFAQ] = useState(null);

  // Inline styles for the FAQModal component
  const styles = {
    modalBox: {
      position: "relative",
      backgroundColor: "rgba(48, 48, 48, 0.95)",
      padding: "20px",
      maxWidth: "600px",
      margin: "auto",
      fontSize: "10px",
      borderRadius: "8px",
    },
    closeModalButton: {
      position: "absolute",
      top: "0",
      right: "0",
      margin: "10px",
      fontSize: "24px",
      fontWeight: "bold",
      cursor: "pointer",
      color: "white",
    },
    question: {
      marginBottom: "1px",
      padding: "20px",
      backgroundColor: "#303030",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      cursor: "pointer",
      color: "white",
    },
    answer: {
      backgroundColor: "#303030",
      color: "white",
      padding: "20px",
      display: "flex",
      overflow: "hidden",
    },
    faqItem: {
      marginBottom: "8px",
      listStyleType: "none",
    },
  };

  return (
    <>
      {isModalOpen && (
        <dialog
          className="modal"
          open={isModalOpen}
          style={{ border: "none" }}
          onClick={() => setIsModalOpen(false)}
        >
          <div style={styles.modalBox} onClick={(e) => e.stopPropagation()}>
            <button
              style={styles.closeModalButton}
              onClick={() => setIsModalOpen(false)}
              aria-label="Close modal"
            >
              &times;
            </button>
            <h3 className="font-bold text-lg" style={{ color: "white" }}>
              Frequently Asked Questions:
            </h3>
            <ul style={{ width: "100%" }}>
              {faqs.map((faq, index) => (
                <li key={index} style={styles.faqItem}>
                  <div
                    style={styles.question}
                    onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
                  >
                    {faq.question}
                  </div>
                  {openFAQ === index && (
                    <div style={styles.answer}>{faq.answer}</div>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </dialog>
      )}
    </>
  );
};

export default FAQModal;
