import React from "react";
import "./assets/Sustainability.css";
import sus from "./assets/sus1.png";
const Sustainability = () => {
  return (
    <div className="hello1">
    <div  className="bg-white text-gray-900 min-h-screen">
        <br></br>
      <header className="bg-blue-500 text-white text-center p-6">
        <br></br>
        <h1 className="hello">Sustainability at Arosia Water</h1>
        <p className="text-lg mt-2">Ensuring Clean Water access while preserving the Planet</p>
      </header>

      <section className="max-w-6xl mx-auto py-12 px-6 grid md:grid-cols-2 gap-10">
        <div className="flex flex-col justify-center">
          <h2 className="text-3xl font-semibold">Our Commitment</h2>
          <p className="mt-4 text-lg">
            Arosia Water is dedicated to providing safe, affordable, and sustainable water solutions. Our initiatives focus on reducing water waste, minimizing plastic usage, and ensuring long-term environmental impact.
          </p>
        </div>
        <img src={sus} alt="Sustainability" className="rounded-lg shadow-md" />
      </section>

      <section className="bg-gray-100 py-12">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="hello">Key Initiatives</h2>
          <div className="grid md:grid-cols-3 gap-6 mt-8">
            <div className="p-6 bg-white shadow-md rounded-lg">
              <h3 className="text-xl font-semibold">Water Conservation</h3>
              <p className="mt-2">Our smart kiosks optimize water usage, ensuring minimal wastage and maximum impact.</p>
            </div>
            <div className="p-6 bg-white shadow-md rounded-lg">
              <h3 className="text-xl font-semibold">Plastic Reduction</h3>
              <p className="mt-2">Encouraging reusable containers and reducing reliance on single-use plastics.</p>
            </div>
            <div className="p-6 bg-white shadow-md rounded-lg">
              <h3 className="text-xl font-semibold">Community Impact</h3>
              <p className="mt-2">Empowering communities with clean water access and education on sustainability.</p>
            </div>
          </div>
        </div>
      </section>

    </div>
    </div>
  );
};

export default Sustainability;
