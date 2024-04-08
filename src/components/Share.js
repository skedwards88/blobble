import React from "react";
import {handleShare, handleCopy} from "../common/handleShare";

export default function Share({appName, text, url, seed}) {

  if (navigator.canShare) {
    return (
      <button onClick={() => handleShare({appName, text, url, seed})}>
        Share
      </button>
    );
  } else {
    return (
      <button onClick={() => handleCopy({text, url, seed})}>
        Copy sharing link
      </button>
    );
  }
}
