import { useState } from "react";
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
  const result = await fetch(appLink);
  console.log({ result });

  if (result.ok) return true;
  throw "Invalid link";
}

function App() {
  const deviceType = getDeviceType();

  const [isValid, setValid] = useState("false");

  if ([DEVICES.ANDROID, DEVICES.IOS].includes(deviceType)) {
    checkIntentLink()
      .then((_) => {
        setValid(true);
        window.location.href = appLink;
      })
      .catch((e) => {
        // if (deviceType === DEVICES.ANDROID)
        //   window.location.href = LINKS.ANDROID;
        // else if (deviceType === DEVICES.IOS) window.location.href = LINKS.IOS;
      });
  }

  return (
    <div className="App">
      <p className="read-the-docs">
        <a>V7 Deeplink {isValid ? "Valid" : ""}</a>
        <br />
        <br />
        <a href={LINKS.IOS}>Go to app store</a>
        <br />
        <br />
        <a href={LINKS.ANDROID}>Go to play store</a>
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
