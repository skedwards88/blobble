import React from "react";
import {handleShare, handleCopy} from "../common/handleShare";

export default function Share({appName, text, seed, url, className = ""}) {
  const fullUrl = seed ? `${url}?id=${seed}` : url;

  if (navigator.canShare) {
    return (
      <button
        className={className}
        onClick={() => handleShare({appName, text, fullUrl})}
      >
        Share
      </button>
    );
  } else {
    return (
      <button className={className} onClick={() => handleCopy({text, fullUrl})}>
        Copy sharing link
      </button>
    );
  }
}
