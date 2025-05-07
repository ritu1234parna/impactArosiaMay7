// App.js
import React from 'react';
import './assets/Overview.css';


function Overview() {
  return (
    <div className="app">
      <Header />
      <HeroSection />
      <SustainabilityFocus />
      
    </div>
  );
}

function Header() {
  return (
    <header>
      <nav>
        {/* Replace with your logo and navigation links */}
        
        
      </nav>
    </header>
  );
}

function HeroSection() {
  return (
    <section className="hero">
      <div className="hero-content">
       
      </div>
    </section>
  );
}

function SustainabilityFocus() {
  return (
    <section className="sustainability-focus">
      <h2>Our Key Focus Areas</h2>
      <div className="focus-areas">
        <div className="focus-area">
          <h3>Water</h3>
          <p>Clean water is the foundation of good health. Every drop dispensed safeguards lives and nurtures communities.</p>
        </div>
        <div className="focus-area">
          <h3>Sustainability</h3>
          <p>Protecting ecosystems and reducing our environmental footprint.</p>
        </div>
        {/* ... more focus areas */}
      </div>
    </section>
  );
}


export default Overview;