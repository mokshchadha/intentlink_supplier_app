import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

const DEVICES = {
  ANDROID: "ANDROID",
  IOS: "IOS",
  OTHER: "OTHER",
};

const appLink = "sourceone.supplierapp://details";

function App() {
  const deviceType = getDeviceType();

  return (
    <div className="App">
      <p className="read-the-docs">
        <a>V2</a>
        <br />
        <br />
        <a href="https://apps.apple.com/in/app/sell-source/id1622946590">
          Go to app store
        </a>
        <br />
        <br />
        <a href="#">Go to play store</a>
        <br />
        <br />
        <a href={appLink}>Open app directly</a>
      </p>
    </div>
  );
}

export default App;

function getDeviceType() {
  // Check if the user agent string contains "Android"
  if (navigator.userAgent.indexOf("Android") !== -1) {
    console.log("This device is running Android.");
    return DEVICES.ANDROID;
  }

  // Check if the user agent string contains "iPhone" or "iPad"
  if (
    navigator.userAgent.indexOf("iPhone") !== -1 ||
    navigator.userAgent.indexOf("iPad") !== -1
  ) {
    console.log("This device is running iOS.");
    return DEVICES.IOS;
  }
  return DEVICES.OTHER;
}
