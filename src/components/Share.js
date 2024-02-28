import React from "react";
import sendAnalytics from "../common/sendAnalytics";

function handleShare({appName, text, fullUrl}) {
  navigator
    .share({
      title: {appName},
      text: `${text}\n\n`,
      url: fullUrl,
    })
    .then(() => console.log("Successful share"))
    .catch((error) => {
      console.log("Error sharing", error);
    });
  sendAnalytics("share");
}

function handleCopy({text, fullUrl}) {
  try {
    navigator.clipboard.writeText(`${text}\n\n${fullUrl}`);
  } catch (error) {
    console.log("Error copying", error);
  }
}

export default function Share({appName, text, seed, url}) {
  const fullUrl = seed ? `${url}?id=${seed}` : url;

  if (navigator.canShare) {
    return <button onClick={() => handleShare({appName, text, fullUrl})}>Share</button>;
  } else {
    return (
      <button onClick={() => handleCopy({text, fullUrl})}>
        Copy sharing link
      </button>
    );
  }
}
