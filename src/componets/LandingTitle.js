import React, { useState, useEffect } from "react";

const TITLES = [
  "Create your Tawasol profile and connect with other developers",
  "TawaSol is the first website in the Arab World to connect engineer",
  "Bulid a professional network with other developers",
];
// let randomTitle = TITLES[Math.floor(Math.random() * TITLES.length)];
const LandingTitle = () => {
  // To Create State In Function Component
  // Take One Paremeter (Default Value For thisState)
  // return Array Of Two items, first Item It Variable have Content Of State, two Item=> function use it to setState
  // If want to define Multiple state => (more multiple lines)
  // Destructuting for Output from Array
  const [titleIndex, setTitleIndex] = useState(0);
  const [fadeIn, setFadeIn] = useState(true);

  //  componentDidMount, componentWillUnount, componentDidUpdate In One Hook useEffect
  // work mount when every render not as componentDidMount just when mount on DOM (To Simulate should send [] in second parameter).
  // first Parameter callbackfunction execute when render Application , and return as cleanup
  useEffect(() => {
    let timeout = null;
    let titleInterval = null;
    titleInterval = setInterval(() => {
      const index = (titleIndex + 1) % TITLES.length;
      setTitleIndex(index);
      setFadeIn(true);
      timeout = setTimeout(() => {
        setFadeIn(true);
      }, 2000);
    }, 4000);
    timeout = setTimeout(() => {
      setFadeIn(false);
    }, 2000);

    // Will Turn Function before render Completed Not When Exit Or Go To Another Page
    return function cleanup() {
      clearInterval(titleInterval);
      clearTimeout(timeout);
    };
  }, [titleIndex]);
  // Re-render Just When Change Happen In State In Array
  //If put State (debedencies) Array To Simulate lifeCyclies Method

  return (
    <p className={fadeIn ? "title-fade-in" : "title-fade-out"}>
      {TITLES[titleIndex]}
    </p>
  );
};

export default LandingTitle;
