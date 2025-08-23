import React from "react";
import Share from "@skedwards88/shared-components/src/components/Share";

export default function Heart({setDisplay, appName, repoName}) {
  return (
    <div className="App info">
      <h1>{appName}</h1>
      <div className="infoText">
        {"Like this game? Share it with your friends.\n\n"}
        {
          <Share
            appName="Blobble"
            text="Check out this word puzzle!"
            url="https://skedwards88.github.io/blobble/"
            origin="heart"
            content="Share"
          ></Share>
        }
        {`\n`}
        {<hr></hr>}
        {`\n`}
        {`Want more games? Check out `}
        <a href="https://crossjig.com">Crossjig</a>
        {" and "}
        <a href="https://lexlet.com">Lexlet</a>
        {" or see all of our puzzle games "}
        <a href="https://skedwards88.github.io/">here</a>
        {`. `}
        {`\n\n`}
        {<hr></hr>}
        {`\n`}
        {"Feedback? "}
        <a
          href={`https://github.com/skedwards88/${repoName}/issues/new/choose`}
        >
          Open an issue
        </a>
        {" on GitHub or email SECTgames@gmail.com."}
        {`\n\n`}
        {<hr></hr>}
        {`\n`}
        {`Thanks to the word frequency data sources attributed in `}
        <a href="https://github.com/skedwards88/word_lists">
          skedwards88/word_lists
        </a>
        {`.`}
        {`\n\n`}
        {<hr></hr>}
        {`\n`}
        <a href="./privacy.html">Privacy policy</a>
      </div>
      <button className="close" onClick={() => setDisplay("game")}>
        Close
      </button>
    </div>
  );
}
