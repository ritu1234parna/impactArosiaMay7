import React from "react";
import "./assets/Impact.css";
import { FaArrowRight } from "react-icons/fa";
import hero from "./assets/beauty.png";

const ImpactPage = () => {
  return (
    <div className="impact-container">
      {/* Hero Section */}
      <div className="hero-section">
        <img src={hero} alt="Hero" className="hero-image" />
        <div className="hero-content">
          <h1>Your impact.<br /> Your story.<br /> Our better future.</h1>

          <button className="cta-button">JOIN NOW <FaArrowRight /></button>
        </div>
        
      </div>
      <p padding-left="120px">
            Arosia Water is here to make an impact now and make a difference.Tell an inspiring story, rooted in impressive numbers. That's the way to grow as a non-profit or social enterprise. We've worked with thousands of mission-driven organizations over 15+ years, so we know what it takes to move people. We built this tool to share what we've learned and support your impact journey.

Start tracking your impact now!
          </p>

      {/* Services Section */}
      <div className="services-section">
        <h2>WHAT CAN WE HELP YOU DO?</h2>
        <div className="services-grid">
          <div className="service-card">
            <img src="/assets/storytelling.png" alt="Storytelling" />
            <h3>Tell your story</h3>
            <p>
              We'll help you focus on the right questions and find the right
              metrics to craft a compelling story.
            </p>
          </div>
          <div className="service-card">
            <img src="/assets/numbers.png" alt="Numbers" />
            <h3>Own your numbers</h3>
            <p>
              A simple, centralized tool for tracking, organizing, and
              visualizing impact data.
            </p>
          </div>
          <div className="service-card">
            <img src="/assets/impact.png" alt="Impact" />
            <h3>Share your impact</h3>
            <p>
              Align your impact with global frameworks and generate insightful
              reports.
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer>
        <p>Impact Dashboard powered by Arosia Water</p>
        <div className="footer-links">
          <a href="#">Terms of Service</a>
          <a href="#">Privacy Policy</a>
          <a href="#">About Us</a>
        </div>
      </footer>
    </div>
  );
};

export default ImpactPage;
