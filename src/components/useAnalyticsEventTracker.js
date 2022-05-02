import React from "react";
import ReactGA from "react-ga";

const useAnalyticsEventTracker = (category="sin category") => {
  const eventTracker = (action = "sin action", label = "sin label") => {
    ReactGA.event({category, action, label});
  }
  return eventTracker;
}
export default useAnalyticsEventTracker;
