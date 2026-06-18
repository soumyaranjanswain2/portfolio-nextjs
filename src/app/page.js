"use client";

import { useState, useEffect } from "react";
import Loader from "../components/Loader";

import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import About from "../components/About";
import Experience from "../components/Experience";
import Projects from "../components/Projects";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import CursorGlow from "../components/CursorGlow";
// import GithubStats from "../components/GithubStats";

export default function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2200);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <Navbar />
      <Hero />
      <About />
      <Experience />
      <Projects />
      {/* <GithubStats /> */}
      <Contact />
      <Footer />
      <CursorGlow />
      
    </>
  );
}