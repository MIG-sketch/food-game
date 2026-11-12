
"use strict";

// DISHUP! — Complete JavaScript
// Compatible with the existing index.html and style.css

const $ = id => document.getElementById(id);

const translations = {
  "Scegli come giocare": "Choose how to play",
  "Party (stesso schermo)": "Party (shared screen)",
  "Giocatori (separati da virgole)": "Players (comma-separated)",
  "Inizia": "Start",
  "Partita finita!": "Game over!",
  "Nuova partita": "New game",
  "Conferma risposte": "Submit answers",
  "Indovina il paese d’origine, il secolo e i valori nutrizionali per 100 g. I secoli sono riferimenti storici convenzionali e talvolta controversi.": "Guess the country of origin, century and nutritional values per 100 g. Historical dates may be approximate or disputed.",
  "Italia": "Italy",
  "Messico": "Mexico",
  "Giappone": "Japan",
  "India": "India",
  "Francia": "France",
  "Perù": "Peru",
  "Libano": "Lebanon",
  "Stati Uniti": "United States",
  "Regno Unito": "United Kingdom",
  "Tu": "You"
};

let language = "it";

try {
  language = localStorage.getItem("foodgame-language") || "it";
} catch (error) {}

function tr(text) {
  return language === "en"
    ? (translations[text] || text)
    : text;
}

function setText(id, text) {
  if ($(id)) $(id).textContent = text;
}

function setLanguage(value) {
  language = value === "en" ? "en" : "it";

  try {
    localStorage.setItem("foodgame-language", language);
  } catch (error) {}

  updateLanguage();

  if (!$("finish").classList.contains("hidden")) {
    renderFinal();
  }
}

function updateLanguage() {
  document.documentElement.lang = language;
  $("languageSelect").value = language;

  setText("languageLabel", language === "en" ? "Language" : "Lingua");

  document.querySelectorAll("#setup h2, #setup button, #partySetup p, #partySetup button, #finish > h2, #finish > button").forEach(element => {
    if (!element.dataset.originalText) {
      element.dataset.originalText = element.textContent.trim();
    }

    element.textContent = tr(element.dataset.originalText);
  });

  updateMapLabels();
}

const foods = [
  {
    name: "Pizza Margherita",
    emoji: "🍕",
    origin: "Italia",
    year: 1889,
    note: "1889 è la data tradizionalmente associata alla dedica alla regina Margherita; la storia è dibattuta.",
    cal: 250, protein: 11, fat: 9, carbs: 31
  },
  {
    name: "Caesar salad",
    emoji: "🥗",
    origin: "Messico",
    year: 1924,
    note: "Attribuita a Caesar Cardini a Tijuana nel 1924.",
    cal: 190, protein: 7, fat: 16, carbs: 5
  },
  {
    name: "Nachos",
    emoji: "🧀",
    origin: "Messico",
    year: 1943,
    note: "Generalmente attribuiti a Ignacio Anaya nel 1943.",
    cal: 310, protein: 9, fat: 18, carbs: 29
  },
  {
    name: "Tiramisù",
    emoji: "🍰",
    origin: "Italia",
    year: 1970,
    note: "La data e l'attribuzione del tiramisù moderno sono controverse.",
    cal: 290, protein: 6, fat: 19, carbs: 25
  },
  {
    name: "Tacos al pastor",
    emoji: "🌮",
    origin: "Messico",
    year: 1960,
    note: "Data indicativa del consolidamento della ricetta moderna.",
    cal: 220, protein: 12, fat: 10, carbs: 20
  },
  {
    name: "Chicken tikka masala",
    emoji: "🍛",
    origin: "Regno Unito",
    year: 1970,
    note: "Origine e data dibattute; il 1970 è una stima convenzionale.",
    cal: 160, protein: 13, fat: 9, carbs: 7
  },
  {
    name: "Pasta alla carbonara",
    emoji: "🍝",
    origin: "Italia",
    year: 1944,
    note: "Anno indicativo associato alle ricostruzioni del dopoguerra.",
    cal: 280, protein: 12, fat: 13, carbs: 28
  },
  {
    name: "Banana split",
    emoji: "🍌",
    origin: "Stati Uniti",
    year: 1904,
    note: "Una delle attribuzioni più note risale al 1904 in Pennsylvania.",
    cal: 210, protein: 3, fat: 9, carbs: 31
  }
];

const specs = [
  ["cal", "Calorie (kcal)", 900],
  ["protein", "Proteine (g)", 100],
  ["fat", "Grassi (g)", 100],
  ["carbs", "Carboidrati (g)", 100]
];

const countries = [
  "Italia", "Giappone", "Messico", "India",
  "Francia", "Perù", "Libano", "Stati Uniti",
  "Regno Unito"
];

let mode = "solo";
let players = ["Tu"];
let scores = {};
let order = [];
let history = [];
let guesses = [];
let round = 0;
let turn = 0;
let remaining = 60;
let timerId = null;
let submitted = false;

function show(id, visible) {
  if ($(id)) $(id).classList.toggle("hidden", !visible);
}

function escapeHTML(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function century(year) {
  return Math.ceil(year / 100);
}

function roman(number) {
  const values = [
    [10, "X"], [9, "IX"], [5, "V"],
    [4, "IV"], [1, "I"]
  ];

  let output = "";

  for (const [value, symbol] of values) {
    while (number >= value) {
      output += symbol;
      number -= value;
    }
  }

  return output;
}

function shuffle(array) {
  const result = [...array];

  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }

  return result;
}

function updateBanner() {
  show("scoreBanner", true);

  $("scoreBanner").innerHTML = players.map((name, index) => `
    <div class="${index === turn ? "active" : ""}">
      ${escapeHTML(name)}: ${scores[name]} pt
      ${index === turn ? "●" : ""}
    </div>
  `).join("");
}

function stopTimer() {
  if (timerId !== null) {
    clearInterval(timerId);
    timerId = null;
  }
}

function startTimer() {
  stopTimer();
  remaining = 60;
  setText("timer", "⏱ 60 s");

  timerId = setInterval(() => {
    remaining--;
    setText("timer", `⏱ ${remaining} s`);

    if (remaining <= 0) {
      stopTimer();
      submitGuess(true);
    }
  }, 1000);
}

function setMode(selected) {
  if (selected === "online") {
    setText(
      "notice",
      language === "en"
        ? "Online multiplayer is not available yet. Single Player and Party Mode are ready."
        : "Il multiplayer online non è ancora disponibile. Puoi giocare in Single Player o Party Mode."
    );
    return;
  }

  mode = selected;
  show("partySetup", mode === "party");

  if (mode === "solo") start();
}

function start() {
  if (mode === "party") {
    players = $("names").value
      .split(",")
      .map(name => name.trim())
      .filter(Boolean)
      .slice(0, 8);

    players = [...new Set(players)];

    if (!players.length) {
      players = ["Giocatore 1"];
    }
  } else {
    players = ["Tu"];
  }

  scores = Object.fromEntries(players.map(name => [name, 0]));
  order = shuffle(foods).slice(0, 5);
  history = [];
  guesses = [];
  round = 0;
  turn = 0;

  show("setup", false);
  show("finish", false);
  show("game", true);

  render();
}

// -----------------------------------------------------
// FOOD PHOTOS
// -----------------------------------------------------

const wikiTitles = {
  "Pizza Margherita": "Pizza Margherita",
  "Caesar salad": "Caesar salad",
  "Nachos": "Nachos",
  "Tiramisù": "Tiramisu",
  "Tacos al pastor": "Al pastor",
  "Chicken tikka masala": "Chicken tikka masala",
  "Pasta alla carbonara": "Carbonara",
  "Banana split": "Banana split"
};

let photoRequest = 0;
const photoCache = {};

async function showDishPhoto(food) {
  const request = ++photoRequest;
  const img = $("dishPhoto");
  const emoji = $("food");
  const credit = $("photoCredit");

  img.style.display = "none";
  img.removeAttribute("src");
  emoji.style.display = "block";
  credit.classList.add("hidden");
  credit.onclick = null;

  try {
    let url = photoCache[food.name];

    if (!url) {
      const title = wikiTitles[food.name] || food.name;

      const endpoint =
        "https://en.wikipedia.org/w/api.php" +
        "?action=query&format=json&origin=*" +
        "&prop=pageimages&piprop=thumbnail" +
        "&pithumbsize=800&redirects=1&titles=" +
        encodeURIComponent(title);

      const response = await fetch(endpoint);

      if (!response.ok) throw new Error("Wikipedia unavailable");

      const data = await response.json();
      const page = Object.values(data.query.pages)[0];

      url = page.thumbnail?.source;

      if (!url) throw new Error("No image available");

      photoCache[food.name] = url;
    }

    await new Promise((resolve, reject) => {
      const probe = new Image();
      probe.onload = resolve;
      probe.onerror = reject;
      probe.src = url;
    });

    if (request !== photoRequest) return;

    img.src = url;
    img.alt = food.name;
    img.style.display = "block";
    emoji.style.display = "none";
    credit.textContent = "Foto: Wikipedia / Wikimedia Commons";
    credit.classList.remove("hidden");
  } catch (error) {
    if (request !== photoRequest) return;

    emoji.style.display = "block";
    credit.textContent =
      language === "en"
        ? "Photo unavailable"
        : "Foto non disponibile";
    credit.classList.remove("hidden");
  }
}

// -----------------------------------------------------
// WORLD MAP
// -----------------------------------------------------

let countryMap = null;
let countryLayer = null;
let selectedLayer = null;
let selectedCountry = "";
let selectedCountryLabel = "";
let mapReady = false;
let mapLoading = false;
let mapFailed = false;

const countryNames = {
  Italy: "Italia",
  Italia: "Italia",
  Japan: "Giappone",
  Giappone: "Giappone",
  Mexico: "Messico",
  Messico: "Messico",
  India: "India",
  France: "Francia",
  Francia: "Francia",
  Peru: "Perù",
  Perú: "Perù",
  Perù: "Perù",
  Lebanon: "Libano",
  Libano: "Libano",
  "United States": "Stati Uniti",
  "United States of America": "Stati Uniti",
  "Stati Uniti": "Stati Uniti",
  "United Kingdom": "Regno Unito",
  "Regno Unito": "Regno Unito"
};

function canonicalCountry(value) {
  const name = String(value || "").trim();
  return countryNames[name] || name;
}

function updateMapLabels() {
  setText(
    "mapLabel",
    language === "en"
      ? "Origin — select a country on the map"
      : "Origine — seleziona un paese sulla mappa"
  );

  setText(
    "selectedCountry",
    selectedCountry
      ? `${language === "en" ? "Selected" : "Selezionato"}: ${language === "en" ? tr(selectedCountry) : selectedCountry}`
      : language === "en"
        ? "No country selected"
        : "Nessun paese selezionato"
  );

  if (mapReady) {
    setText(
      "mapHelp",
      language === "en"
        ? "Tap a country to select it. Zoom and drag to explore."
        : "Tocca un paese per selezionarlo. Puoi ingrandire e spostare la mappa."
    );
  }
}

function selectCountry(country, label, layer = null) {
  if (selectedLayer && countryLayer) {
    countryLayer.resetStyle(selectedLayer);
  }

  selectedCountry = canonicalCountry(country);
  selectedCountryLabel = label || selectedCountry;
  selectedLayer = layer;

  if (layer) {
    layer.setStyle({
      fillColor: "#ffad4f",
      fillOpacity: 0.85,
      color: "#07577c",
      weight: 2
    });

    layer.bringToFront();
  }

  $("origin").value = selectedCountry;
  updateMapLabels();
}

function resetCountryMap() {
  selectedCountry = "";
  selectedCountryLabel = "";

  if (selectedLayer && countryLayer) {
    countryLayer.resetStyle(selectedLayer);
  }

  selectedLayer = null;

  $("origin").value = "";

  show("mapAnswer", true);
  show("originFallback", false);

  if (mapReady && countryMap) {
    setTimeout(() => countryMap.invalidateSize(), 100);
  } else {
    initializeCountryMap();
  }

  updateMapLabels();
}

async function fetchCountryData() {
  const urls = [
    "https://raw.githubusercontent.com/datasets/geo-countries/master/data/countries.geojson",
    "https://cdn.jsdelivr.net/gh/datasets/geo-countries@master/data/countries.geojson",
    "https://raw.githubusercontent.com/datasets/geo-countries/main/data/countries.geojson"
  ];

  for (const url of urls) {
    try {
      const response = await fetch(url);

      if (!response.ok) continue;

      const data = await response.json();

      if (
        data.type === "FeatureCollection" &&
        Array.isArray(data.features) &&
        data.features.length
      ) {
        return data;
      }
    } catch (error) {
      console.warn("Map source failed:", url, error);
    }
  }

  throw new Error("Country boundaries unavailable");
}

async function initializeCountryMap() {
  if (mapReady || mapLoading) return;

  if (mapFailed) {
    showMapFallback();
    return;
  }

  mapLoading = true;

  setText(
    "mapHelp",
    language === "en"
      ? "Loading world map..."
      : "Caricamento della mappa del mondo..."
  );

  try {
    if (typeof window.L === "undefined") {
      throw new Error("Leaflet library unavailable");
    }

    if (!countryMap) {
      countryMap = L.map("worldMap", {
        minZoom: 1,
        maxZoom: 6,
        zoomControl: true,
        worldCopyJump: true
      }).setView([18, 8], 2);

      L.tileLayer(
        "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
        {
          attribution: "&copy; OpenStreetMap contributors &copy; CARTO",
          maxZoom: 19
        }
      ).addTo(countryMap);
    }

    const data = await fetchCountryData();

    countryLayer = L.geoJSON(data, {
      style: {
        color: "#4288a9",
        weight: 1,
        fillColor: "#8ed6ee",
        fillOpacity: 0.45
      },

      onEachFeature(feature, layer) {
        const properties = feature.properties || {};

        const name =
          properties.ADMIN ||
          properties.name ||
          properties.NAME ||
          properties.NAME_EN ||
          properties.ADMIN_EN ||
          "Unknown";

        layer.bindTooltip(name, { sticky: true });

        layer.on("click", () => {
          selectCountry(name, name, layer);
        });
      }
    }).addTo(countryMap);

    mapReady = true;
    mapFailed = false;

    show("originFallback", false);
    $("worldMap").style.display = "block";

    updateMapLabels();

    setTimeout(() => countryMap.invalidateSize(), 150);
  } catch (error) {
    console.error("DISHUP! map error:", error);
    mapFailed = true;
    showMapFallback();
  } finally {
    mapLoading = false;
  }
}

function showMapFallback() {
  $("worldMap").style.display = "none";
  show("originFallback", true);

  setText(
    "mapHelp",
    language === "en"
      ? "The map could not load. Select a country using the menu below."
      : "La mappa non è disponibile. Seleziona un paese dal menu qui sotto."
  );

  $("origin").onchange = function () {
    selectCountry(this.value, this.value);
  };
}

function setupOriginOptions() {
  $("origin").innerHTML =
    '<option value="">—</option>' +
    countries.map(country =>
      `<option value="${escapeHTML(country)}">${escapeHTML(tr(country))}</option>`
    ).join("");
}

// -----------------------------------------------------
// GAME SCREEN
// -----------------------------------------------------

function render() {
  submitted = false;

  const food = order[round];

  setText(
    "status",
    `Round ${round + 1}/${order.length} · ${language === "en" ? "Turn for" : "Turno di"} ${players[turn]}`
  );

  setText("dish", food.name);
  setText("food", food.emoji);

  showDishPhoto(food);
  updateBanner();

  const centuryLabel =
    language === "en" ? "Century of origin" : "Secolo di origine";

  let html = `
    <label>
      ${centuryLabel}:
      <select id="century">
        ${Array.from({ length: 22 }, (_, index) => {
          const number = index + 1;
          return `<option value="${number}" ${number === 20 ? "selected" : ""}>
            ${roman(number)} ${language === "en" ? "century" : "secolo"}
          </option>`;
        }).join("")}
      </select>
    </label>
  `;

  for (const [key, italianLabel, max] of specs) {
    const initial = Math.floor(max / 2);

    const label = language === "en"
      ? ({
          cal: "Calories (kcal)",
          protein: "Protein (g)",
          fat: "Fat (g)",
          carbs: "Carbohydrates (g)"
        })[key]
      : italianLabel;

    html += `
      <label>
        ${label}: <output id="out_${key}">${initial}</output>
        <input
          type="range"
          id="${key}"
          min="0"
          max="${max}"
          value="${initial}"
          step="1"
        >
      </label>
    `;
  }

  $("sliders").innerHTML = html;

  for (const [key] of specs) {
    $(key).addEventListener("input", event => {
      setText(`out_${key}`, event.target.value);
    });
  }

  $("results").innerHTML = "";

  show("handoff", false);
  show("submit", true);
  show("next", false);
  show("sliders", true);
  show("food", true);
  show("dish", true);
  show("timer", true);

  resetCountryMap();
  startTimer();
}

// -----------------------------------------------------
// ANSWERS AND SCORING
// -----------------------------------------------------

function submitGuess(timedOut = false) {
  if (submitted) return;

  if (!selectedCountry && !timedOut) {
    alert(
      language === "en"
        ? "Select a country first!"
        : "Seleziona prima un paese!"
    );
    return;
  }

  submitted = true;
  stopTimer();

  const answer = {
    origin: selectedCountry,
    century: Number($("century").value)
  };

  for (const [key] of specs) {
    answer[key] = Number($(key).value);
  }

  guesses.push({
    playerIndex: turn,
    answer,
    timedOut
  });

  show("submit", false);
  show("timer", false);
  show("food", false);
  show("dish", false);
  show("sliders", false);
  show("mapAnswer", false);
  show("originFallback", false);
  show("handoff", true);

  if (guesses.length < players.length) {
    const next = players[turn + 1];

    setText(
      "handoffTitle",
      language === "en" ? "Answers saved!" : "Risposte salvate!"
    );

    setText(
      "handoffText",
      language === "en"
        ? `Pass the device to ${next}. Answers remain secret.`
        : `Passa il dispositivo a ${next}. Le risposte rimangono segrete.`
    );

    setText(
      "handoffButton",
      language === "en" ? `Start: ${next}` : `Inizia: ${next}`
    );
  } else {
    setText(
      "handoffTitle",
      language === "en" ? "Everyone has answered!" : "Tutti hanno risposto!"
    );

    setText(
      "handoffText",
      language === "en"
        ? "You can now reveal the answers."
        : "Ora puoi rivelare le risposte."
    );

    setText(
      "handoffButton",
      language === "en" ? "Reveal answers" : "Rivela le risposte"
    );
  }
}

function beginNextPlayer() {
  if (guesses.length === players.length) {
    revealRound();
  } else {
    turn++;
    render();
  }
}

function scoreAnswer(answer, food) {
  const countryPoints =
    canonicalCountry(answer.origin) === canonicalCountry(food.origin)
      ? 7
      : 0;

  const distance = Math.abs(answer.century - century(food.year));

  const centuryPoints =
    distance === 0 ? 10 : distance === 1 ? 7 : 0;

  let total = countryPoints + centuryPoints;

  const values = {};

  for (const [key] of specs) {
    const difference = Math.abs(answer[key] - food[key]);
    const tolerance = key === "cal" ? 50 : 5;

    const points =
      difference <= tolerance
        ? 7
        : difference <= tolerance * 2
          ? 3
          : 0;

    values[key] = points;
    total += points;
  }

  return {
    pts: total,
    countryPoints,
    centuryPoints,
    values
  };
}

function revealRound() {
  stopTimer();

  const food = order[round];

  show("handoff", false);
  show("results", true);
  show("next", true);
  show("mapAnswer", false);
  show("originFallback", false);
  show("food", true);
  show("dish", true);

  setText("food", food.emoji);
  setText("dish", food.name);

  showDishPhoto(food);

  setText(
    "status",
    `Round ${round + 1}/${order.length} · ${language === "en" ? "Results" : "Risultati"}`
  );

  const entries = guesses.map(guess => {
    const player = players[guess.playerIndex];
    const result = scoreAnswer(guess.answer, food);

    scores[player] += result.pts;

    return {
      player,
      answer: { ...guess.answer },
      timedOut: guess.timedOut,
      result
    };
  });

  history.push({ food, entries });

  let html = `<h2>${language === "en" ? "Round results" : "Risultati del round"}</h2>`;

  for (const entry of entries) {
    const a = entry.answer;
    const r = entry.result;

    html += `
      <div class="summary">
        <h3>${escapeHTML(entry.player)} — +${r.pts} pt</h3>
        <p>${language === "en" ? "Country" : "Paese"}:
          ${escapeHTML(a.origin || "—")}
          (${escapeHTML(food.origin)}) — ${r.countryPoints} pt
        </p>
        <p>${language === "en" ? "Century" : "Secolo"}:
          ${roman(a.century)}
          (${roman(century(food.year))}) — ${r.centuryPoints} pt
        </p>
    `;

    for (const [key, label] of specs) {
      html += `
        <p>${escapeHTML(label)}:
          ${a[key]} (${food[key]}) — ${r.values[key]} pt
        </p>
      `;
    }

    html += "</div>";
  }

  html += `
    <p class="muted">
      <b>${language === "en" ? "Historical note" : "Nota storica"}:</b>
      ${escapeHTML(food.note)}
    </p>
    <small>
      ${language === "en"
        ? "Nutritional values are illustrative and need verification."
        : "I valori nutrizionali sono indicativi e devono essere verificati."}
    </small>
  `;

  $("results").innerHTML = html;

  updateBanner();

  setText(
    "next",
    round === order.length - 1
      ? (language === "en" ? "Final leaderboard →" : "Classifica finale →")
      : (language === "en" ? "Next dish →" : "Prossimo piatto →")
  );
}

// -----------------------------------------------------
// FINAL LEADERBOARD
// -----------------------------------------------------

function renderFinalHistory() {
  const ranking = Object.entries(scores)
    .sort((a, b) => b[1] - a[1]);

  let html = `
    <h3>${language === "en" ? "Overall leaderboard" : "Classifica generale"}</h3>
    <div class="final-ranking">
  `;

  ranking.forEach(([name, score], index) => {
    html += `
      <div class="rank-row">
        <strong>${index + 1}° ${escapeHTML(name)}</strong>
        <strong>${score} pt</strong>
      </div>
    `;
  });

  html += "</div>";

  html += `<h3>${language === "en" ? "Review answers" : "Rivedi le risposte"}</h3>`;

  history.forEach((item, index) => {
    const food = item.food;

    html += `
      <details class="history-round">
        <summary>
          Round ${index + 1} · ${escapeHTML(food.name)}
          <span class="muted">${language === "en" ? "Show answers" : "Mostra risposte"}</span>
        </summary>
    `;

    item.entries.forEach(entry => {
      const answer = entry.answer;
      const result = entry.result;

      const rows = [
        ["Paese", answer.origin || "—", food.origin, result.countryPoints],
        ["Secolo", roman(answer.century), roman(century(food.year)), result.centuryPoints],
        ["Calorie", answer.cal, food.cal, result.values.cal],
        ["Proteine", answer.protein, food.protein, result.values.protein],
        ["Grassi", answer.fat, food.fat, result.values.fat],
        ["Carboidrati", answer.carbs, food.carbs, result.values.carbs]
      ];

      html += `
        <div class="history-player">
          <h4>${escapeHTML(entry.player)} · +${result.pts} pt</h4>
          <div class="history-scroll">
            <table>
              <thead>
                <tr>
                  <th>${language === "en" ? "Category" : "Categoria"}</th>
                  <th>${language === "en" ? "Answer" : "Risposta"}</th>
                  <th>${language === "en" ? "Correct" : "Corretta"}</th>
                  <th>${language === "en" ? "Points" : "Punti"}</th>
                </tr>
              </thead>
              <tbody>
      `;

      rows.forEach(row => {
        html += `
          <tr>
            <td>${escapeHTML(row[0])}</td>
            <td>${escapeHTML(row[1])}</td>
            <td>${escapeHTML(row[2])}</td>
            <td>+${row[3]}</td>
          </tr>
        `;
      });

      html += "</tbody></table></div></div>";
    });

    html += "</details>";
  });

  return html;
}

function advance() {
  stopTimer();

  round++;
  turn = 0;
  guesses = [];

  if (round >= order.length) {
    show("game", false);
    show("finish", true);
    renderFinal();
    return;
  }

  render();
}

// -----------------------------------------------------
// RESTAURANT DISCOVERY
// -----------------------------------------------------

function renderDiscovery() {
  const city = $("cityInput").value.trim();
  const english = language === "en";

  setText(
    "discoverTitle",
    english
      ? "Find these dishes in your city"
      : "Scopri i piatti nella tua città"
  );

  setText(
    "discoverIntro",
    english
      ? "Find restaurants that may serve the dishes you played with. Results open in Google Maps; menus are not verified."
      : "Trova ristoranti che potrebbero servire i piatti del gioco. I risultati si aprono su Google Maps; i menu non sono verificati."
  );

  setText(
    "discoverNote",
    english
      ? "External search only. Glovo integration is not active."
      : "Ricerca esterna. L'integrazione con Glovo non è ancora attiva."
  );

  $("cityInput").placeholder = english ? "e.g. Barcelona" : "Es. Barcelona";

  const links = history.map(item => {
    const food = item.food;

    const query = [
      food.name,
      "restaurant",
      city
    ].filter(Boolean).join(" ");

    const url =
      "https://www.google.com/maps/search/?api=1&query=" +
      encodeURIComponent(query);

    return `
      <a class="dish-link"
         href="${escapeHTML(url)}"
         target="_blank"
         rel="noopener noreferrer">
        ${food.emoji} ${escapeHTML(food.name)} ↗
      </a>
    `;
  });

  $("dishLinks").innerHTML = links.join("");
}

function renderFinal() {
  $("leaderboard").innerHTML = renderFinalHistory();
  renderDiscovery();
}

// -----------------------------------------------------
// INITIALIZATION
// -----------------------------------------------------

function initialize() {
  setupOriginOptions();

  $("cityInput").addEventListener("input", renderDiscovery);

  updateLanguage();

  show("setup", true);
  show("game", false);
  show("finish", false);
  show("partySetup", false);
  show("scoreBanner", false);
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initialize);
} else {
  initialize();
}
