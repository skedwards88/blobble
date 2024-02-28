import React from "react";
import {handleShare, handleCopy} from "../common/handleShare";

export default function Share({appName, text, seed, url}) {
  const fullUrl = seed ? `${url}?id=${seed}` : url;

  if (navigator.canShare) {
    return (
      <button onClick={() => handleShare({appName, text, fullUrl})}>
        Share
      </button>
    );
  } else {
    return (
      <button onClick={() => handleCopy({text, fullUrl})}>
        Copy sharing link
      </button>
    );
  }
}
