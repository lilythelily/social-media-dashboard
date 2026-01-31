"use strict";

// === toggle button conrol ===
const body = document.querySelector("body");
const topBg = document.querySelector(".top-bg");
const toggleBtn = document.querySelector(".toggle-btn");
const toggleCircle = document.querySelector(".toggle-circle");
const totalFollowers = document.querySelector(".total-followers");
const mode = document.querySelector(".mode");
const h2 = document.querySelector("h2");

function textLight(item) {
  item.classList.toggle("text-light");
}
function textBlack(item) {
  item.classList.toggle("text-black");
}

function cardLight(item) {
  item.classList.toggle("card-light");
}

toggleBtn.addEventListener("click", () => {
  body.classList.toggle("body-light");
  topBg.classList.toggle("top-light");
  toggleCircle.classList.toggle("toggle-active");
  toggleBtn.classList.toggle("toggle-light");
  textLight(totalFollowers);
  textLight(mode);
  textLight(h2);
});

// === dynamically populate data into stats section ===
const statsContainer = document.querySelector(".section__stats");

async function fetchData() {
  try {
    const response = await fetch("./json/data.json");
    if (!response.ok) {
      throw new Error(`error status: ${response.status}`);
    }
    const data = await response.json();
    const statsHtml = data.map((item) => {
      let border = "";
      function borderTop() {
        if (item.social.includes("instagram")) {
          border = "border-topIg";
        } else if (item.social.includes("youtube")) {
          border = "border-topYt";
        } else if (item.social.includes("twitter")) {
          border = "border-topTw";
        } else if (item.social.includes("facebook")) {
          border = "border-topFb";
        }
      }
      borderTop();

      let colorClass = "";
      function upDown() {
        if (item.mark.includes("up")) {
          colorClass = "section__movement";
        } else if (item.mark.includes("down")) {
          colorClass = "color-red";
        }
      }

      upDown();

      return `
             <div class="section__stats-card">
                 <div class="icon-handle">
            <div class="section__stats-card-icon" style="background-image: url(${item.social})"></div>
            <p class="handle-name">${item.name}</p>
          </div>

          <p class="section__stats-number">${item.number}</p>
          <p class="section__stats-followers">${item.followers}</p>
          <div class="mark-movement">
            <div class="section__mark" style="background-image:url(${item.mark})"></div>
            <p class="${colorClass}">${item.movement}</p>
          </div>
          <div class="border-top ${border}"></div></div>
            `;
    });
    statsContainer.innerHTML = statsHtml.join("");

    //   --- dark mode control ---
    const names = document.querySelectorAll(".handle-name");
    const statsCards = document.querySelectorAll(".section__stats-card");
    const statsNumbers = document.querySelectorAll(".section__stats-number");
    toggleBtn.addEventListener("click", () => {
      names.forEach((name) => {
        textLight(name);
      });
      statsCards.forEach((card) => {
        cardLight(card);
      });
      statsNumbers.forEach((number) => {
        textBlack(number);
      });
    });
  } catch (error) {
    console.error("error", error);
  }
}

// === populate data into overview section ===

const overviewContainer = document.querySelector(".cards-container");

async function fetchOverview() {
  try {
    const response = await fetch("./json/data2.json");
    if (!response.ok) {
      throw new Error(`error status: ${response.status}`);
    }
    const data = await response.json();
    const overviewHtml = data.map((item) => {
      let colorClass = "";
      function upDown() {
        if (item.mark.includes("up")) {
          colorClass = "overview-movement";
        } else if (item.mark.includes("down")) {
          colorClass = "color-red";
        }
      }

      upDown();

      return `
              <div class="section__overview-card">
          <p class="section__overview-title">${item.title}</p>
          <div class="section__overview-social" style="background-image: url(${item.social})"></div>
          <p class="section__overview-number">${item.number}</p>
          <div class="overview-markMovement">
            <div class="overview-mark" style="background-image: url(${item.mark}")></div>
            <p class="${colorClass}">${item.movement}</p>
          </div></div>
            `;
    });
      overviewContainer.innerHTML = overviewHtml.join("");
      

    //   --- dark mode control ---
    const titles = document.querySelectorAll(".section__overview-title");
    const overviewCards = document.querySelectorAll(".section__overview-card");
    const overviewNumbers = document.querySelectorAll(
      ".section__overview-number"
    );
    toggleBtn.addEventListener("click", () => {
      titles.forEach((title) => {
        textLight(title);
      });
      overviewCards.forEach((card) => {
        cardLight(card);
      });
      overviewNumbers.forEach((number) => {
        textBlack(number);
      });
    });
  } catch (error) {
    console.error("error", error);
  }
}

fetchData();
fetchOverview();
