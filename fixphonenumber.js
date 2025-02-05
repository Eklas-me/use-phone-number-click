// ==UserScript==
// @name         Auto Click 'Use Phone Number Instead' on Snapchat with Footer Text
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Automatically clicks 'Use Phone Number Instead' and adds footer text
// @author       You
// @match        https://accounts.snapchat.com/accounts/v2/login*
// @grant        none
// ==/UserScript==

(function () {
  "use strict";

  // Run when the page is fully loaded
  window.addEventListener("load", function () {
    const checkInterval = 10; // Check every 10ms for the 'Use phone number instead' link
    let attempts = 0; // To limit the number of attempts (prevents infinite loops)

    // Keep checking for the link until it's clicked or max attempts are reached
    const interval = setInterval(() => {
      // Select the 'Use phone number instead' link
      let phoneOption = document.querySelector(".additional-action a");

      // If the link exists and contains the text "Use phone number instead", click it
      if (
        phoneOption &&
        phoneOption.innerText.includes("Use phone number instead")
      ) {
        phoneOption.click();
        console.log('Auto-clicked the "Use Phone Number Instead" option');
        clearInterval(interval); // Stop checking once clicked
      }

      // Stop checking after 50 attempts to avoid an infinite loop
      attempts++;
      if (attempts > 50) {
        clearInterval(interval);
        console.log("Max attempts reached, stopped trying.");
      }
    }, checkInterval); // Check every 10ms

    // Add custom text to the footer
    const footer = document.createElement("div");
    footer.style.position = "fixed";
    footer.style.bottom = "10px";
    footer.style.left = "0";
    footer.style.right = "0";
    footer.style.backgroundColor = "rgba(0, 0, 0, 0.7)";
    footer.style.color = "white";
    footer.style.textAlign = "center";
    footer.style.padding = "10px";
    footer.style.fontSize = "14px";
    footer.innerText = "Auto-click by Tampermonkey";

    document.body.appendChild(footer);
  });
})();
