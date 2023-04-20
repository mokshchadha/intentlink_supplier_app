import { useState, useRef } from "react";
import { useHistory } from "react-router-dom";
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
    new URL(appLink);
  } catch (error) {
    console.log("error happened");
    return false;
  }
  window.location.href = appLink;
  return true;
}

function App() {
  const deviceType = getDeviceType();
  const history = useHistory();

  const [isValid, setValid] = useState("false");

  useEffect(() => {
    const appLink = document.createElement("a");
    appLink.href = "sourceonesupplierapp://details";

    const fallbackUrl = getURLBasedOnDevice(deviceType);

    appLink.addEventListener("error", (e) => {
      e.preventDefault();
      window.location.href = fallbackUrl;
    });

    document.body.appendChild(appLink);
    appLink.click();
  }, [history]);

  return (
    <div className="App">
      <p className="read-the-docs">
        <a>V15 Deeplink {isValid ? "Valid" : ""}</a>
        <br />
        <br />
        <a href={LINKS.IOS}>Go to app store</a>
        <br />
        <br />
        <a href={LINKS.ANDROID}>Go to play store</a>
        <br />
        <br />
        <a href={appLink} target="_blank">
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

function getURLBasedOnDevice(deviceType) {
  if (deviceType === DEVICES.ANDROID) return LINKS.ANDROID;
  else if (deviceType === DEVICES.IOS) LINKS.IOS;
}

// checkIntentLink().then((isValid) => {
//   if (isValid) {
//     window.location.href = appLink;
//   }
//   if (!isValid) {
//     if (deviceType === DEVICES.ANDROID) window.location.href = LINKS.ANDROID;
//     else if (deviceType === DEVICES.IOS) window.location.href = LINKS.IOS;
//   }
// });
