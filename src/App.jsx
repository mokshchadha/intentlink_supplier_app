import { useState, useRef, useEffect } from "react";
import "./App.css";
import { ClipLoader } from "react-spinners";

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

function App() {
  console.log("V16");
  const deviceType = getDeviceType();
  const fallbackUrl = getURLBasedOnDevice(deviceType);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const anchorTag = document.createElement("a");
    anchorTag.href = appLink;

    setTimeout(() => {
      window.location.href = fallbackUrl;
      setLoading(false);
    }, 1600);
  }, []);

  if (isLoading)
    return (
      <div style={{ width: 50 }}>
        <ClipLoader />
      </div>
    );

  return (
    <div className="App">
      <p className="read-the-docs">
        <br />
        <br />

        {!fallbackUrl ? (
          <>
            <a>V17</a>
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
          </>
        ) : (
          <>
            <a href={fallbackUrl}>Download App</a>
          </>
        )}
        <br />
        <br />
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
  else if (deviceType === DEVICES.IOS) return LINKS.IOS;
  return "";
}
