import { useState, useRef } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

const DEVICES = {
  ANDROID: "ANDROID",
  IOS: "IOS",
  OTHER: "OTHER",
};

const LINKS = {
  ANDROID:
    "https://play.google.com/store/apps/details?id=com.sourceone.supplier",
  IOS: "https://apps.apple.com/in/app/sell-source/id1622946590",
};

const appLink = "sourceonesupplierapp://details";

async function checkIntentLink() {
  try {
    const result = await fetch(appLink);

    if (result.ok) return true;
  } catch (error) {
    return false;
  }
}

function App() {
  const deviceType = getDeviceType();

  const [isValid, setValid] = useState("false");
  const linkRef = useRef(null);

  checkIntentLink().then((isValid) => {
    if (isValid) {
      console.log(" the result is valid");
      setValid(true);
      setTimeout(() => {
        console.log("clicking ");
        linkRef.current.click();
      }, 1000);
    }
    if (!isValid) {
      console.log("isValid is false");
      if (deviceType === DEVICES.ANDROID) window.location.href = LINKS.ANDROID;
      else if (deviceType === DEVICES.IOS) window.location.href = LINKS.IOS;
    }
  });

  return (
    <div className="App">
      <p className="read-the-docs">
        <a>V11 Deeplink {isValid ? "Valid" : ""}</a>
        <br />
        <br />
        <a href={LINKS.IOS}>Go to app store</a>
        <br />
        <br />
        <a href={LINKS.ANDROID}>Go to play store</a>
        <br />
        <br />
        <a href={appLink} ref={linkRef} target="_blank">
          Open app directly
        </a>
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
