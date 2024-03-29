import sendAnalytics from "./sendAnalytics";

export function handleShare({appName, text, fullUrl}) {
  navigator
    .share({
      title: appName,
      text: `${text}\n\n`,
      url: fullUrl,
    })
    .then(() => console.log("Successful share"))
    .catch((error) => {
      console.log("Error sharing", error);
    });
  sendAnalytics("share");
}

export function handleCopy({text, fullUrl}) {
  try {
    navigator.clipboard.writeText(`${text}\n\n${fullUrl}`);
  } catch (error) {
    console.log("Error copying", error);
  }
}
