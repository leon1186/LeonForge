import { useEffect, useRef } from "react";
import Hero from "../components/Hero";
import "./HomePage.css";
import NotesSection from "../components/NotesSection";
import Services from "../components/Services";

function HomePage() {




  return (
    <div className="home-page">
      <Hero />
      <Services />
      

      <NotesSection />    
    </div>
  );
}

export default HomePage;
