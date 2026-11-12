
"use strict";

// =====================================================
// DISHUP! — 100 DISHES EDITION
// =====================================================

const $ = id => document.getElementById(id);
const english = () => language === "en";

let language = "it";

try {
  language = localStorage.getItem("foodgame-language") === "en" ? "en" : "it";
} catch (e) {}

const words = {
  "Scegli come giocare": "Choose how to play",
  "Party (stesso schermo)": "Party (shared screen)",
  "Giocatori (separati da virgole)": "Players (comma-separated)",
  "Inizia": "Start",
  "Partita finita!": "Game over!",
  "Nuova partita": "New game",
  "Conferma risposte": "Submit answers",
  "Italia": "Italy",
  "Giappone": "Japan",
  "Messico": "Mexico",
  "India": "India",
  "Francia": "France",
  "Perù": "Peru",
  "Libano": "Lebanon",
  "Stati Uniti": "United States",
  "Regno Unito": "United Kingdom",
  "Spagna": "Spain",
  "Grecia": "Greece",
  "Turchia": "Turkey",
  "Cina": "China",
  "Corea del Sud": "South Korea",
  "Thailandia": "Thailand",
  "Vietnam": "Vietnam",
  "Indonesia": "Indonesia",
  "Filippine": "Philippines",
  "Malesia": "Malaysia",
  "Singapore": "Singapore",
  "Pakistan": "Pakistan",
  "Nepal": "Nepal",
  "Sri Lanka": "Sri Lanka",
  "Bangladesh": "Bangladesh",
  "Iran": "Iran",
  "Iraq": "Iraq",
  "Israele": "Israel",
  "Egitto": "Egypt",
  "Marocco": "Morocco",
  "Tunisia": "Tunisia",
  "Etiopia": "Ethiopia",
  "Nigeria": "Nigeria",
  "Ghana": "Ghana",
  "Senegal": "Senegal",
  "Sudafrica": "South Africa",
  "Brasile": "Brazil",
  "Argentina": "Argentina",
  "Colombia": "Colombia",
  "Venezuela": "Venezuela",
  "Cile": "Chile",
  "Canada": "Canada",
  "Germania": "Germany",
  "Austria": "Austria",
  "Svizzera": "Switzerland",
  "Belgio": "Belgium",
  "Paesi Bassi": "Netherlands",
  "Portogallo": "Portugal",
  "Polonia": "Poland",
  "Ucraina": "Ukraine",
  "Russia": "Russia",
  "Ungheria": "Hungary",
  "Repubblica Ceca": "Czechia",
  "Svezia": "Sweden",
  "Danimarca": "Denmark",
  "Finlandia": "Finland",
  "Australia": "Australia",
  "Nuova Zelanda": "New Zealand",
  "Giamaica": "Jamaica",
  "Cuba": "Cuba",
  "Repubblica Dominicana": "Dominican Republic",
  "Arabia Saudita": "Saudi Arabia",
  "Giordania": "Jordan",
  "Georgia": "Georgia"
};

function tr(value) {
  return english() ? (words[value] || value) : value;
}

function setText(id, value) {
  if ($(id)) $(id).textContent = value;
}

function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, c => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  })[c]);
}

function show(id, visible) {
  if ($(id)) $(id).classList.toggle("hidden", !visible);
}

// =====================================================
// FOOD DATABASE
// Format:
// Name | Emoji | Country | Year | kcal | protein | fat | carbs
// Nutrition is an approximate gameplay estimate per 100 g.
// Dates are approximate historical reference points.
// =====================================================

const rawFoods = [
  // 01–10 ITALY
  ["Pizza Margherita","🍕","Italia",1889,250,11,9,31],
  ["Pasta alla carbonara","🍝","Italia",1944,280,12,13,28],
  ["Tiramisù","🍰","Italia",1970,290,6,19,25],
  ["Lasagne alla bolognese","🍝","Italia",1900,180,10,9,16],
  ["Risotto alla milanese","🍚","Italia",1809,180,4,7,25],
  ["Pesto alla genovese","🌿","Italia",1863,450,5,44,7],
  ["Arancini","🍙","Italia",1850,230,7,10,28],
  ["Gnocchi di patate","🥔","Italia",1700,150,4,2,29],
  ["Panna cotta","🍮","Italia",1900,240,3,18,17],
  ["Parmigiana di melanzane","🍆","Italia",1800,160,7,11,9],

  // 11–20 EAST ASIA
  ["Sushi nigiri","🍣","Giappone",1820,150,7,2,26],
  ["Ramen","🍜","Giappone",1910,110,5,4,13],
  ["Tempura","🍤","Giappone",1700,220,8,13,19],
  ["Okonomiyaki","🥞","Giappone",1930,180,7,10,15],
  ["Takoyaki","🐙","Giappone",1935,190,7,9,21],
  ["Peking duck","🦆","Cina",1400,330,19,28,1],
  ["Mapo tofu","🌶️","Cina",1860,140,9,10,4],
  ["Xiaolongbao","🥟","Cina",1875,220,9,10,23],
  ["Bibimbap","🍚","Corea del Sud",1900,145,6,4,22],
  ["Kimchi","🥬","Corea del Sud",1600,25,2,1,4],

  // 21–30 SOUTHEAST ASIA
  ["Pad Thai","🍜","Thailandia",1930,190,8,7,24],
  ["Tom yum","🍲","Thailandia",1900,55,5,2,5],
  ["Green curry","🍛","Thailandia",1900,160,9,11,7],
  ["Pho","🍜","Vietnam",1900,80,6,2,10],
  ["Banh mi","🥖","Vietnam",1950,250,11,9,31],
  ["Goi cuon","🥬","Vietnam",1900,110,7,3,14],
  ["Nasi goreng","🍚","Indonesia",1900,190,6,7,26],
  ["Rendang","🥩","Indonesia",1900,250,16,19,5],
  ["Satay","🍢","Indonesia",1900,230,19,15,5],
  ["Chicken adobo","🍗","Filippine",1700,180,20,10,3],

  // 31–40 SOUTH ASIA
  ["Chicken tikka masala","🍛","Regno Unito",1970,160,13,9,7],
  ["Butter chicken","🍛","India",1950,190,14,13,5],
  ["Biryani","🍚","India",1700,190,9,7,22],
  ["Samosa","🥟","India",1400,260,5,14,29],
  ["Palak paneer","🥬","India",1900,180,10,13,6],
  ["Masala dosa","🥞","India",1900,170,4,7,23],
  ["Nihari","🥩","Pakistan",1800,190,16,12,5],
  ["Momo","🥟","Nepal",1900,190,9,6,24],
  ["Kottu roti","🍛","Sri Lanka",1970,210,9,10,20],
  ["Hilsa curry","🐟","Bangladesh",1900,200,16,14,4],

  // 41–50 MIDDLE EAST
  ["Hummus","🫘","Libano",1700,170,7,10,14],
  ["Tabbouleh","🥗","Libano",1900,110,3,7,11],
  ["Falafel","🧆","Egitto",1900,330,13,18,31],
  ["Koshari","🍚","Egitto",1900,160,6,3,29],
  ["Shakshuka","🍳","Tunisia",1900,100,5,7,5],
  ["Couscous","🍚","Marocco",1400,130,4,2,25],
  ["Tagine di pollo","🍲","Marocco",1800,140,12,8,6],
  ["Iskender kebab","🥙","Turchia",1867,230,13,13,15],
  ["Baklava","🍯","Turchia",1500,430,6,26,45],
  ["Ghormeh sabzi","🍲","Iran",1800,160,13,9,7],

  // 51–60 AFRICA
  ["Injera","🥞","Etiopia",1500,165,5,1,34],
  ["Doro wat","🍗","Etiopia",1900,180,17,11,5],
  ["Jollof rice","🍚","Nigeria",1900,180,4,6,28],
  ["Egusi soup","🍲","Nigeria",1900,220,11,17,8],
  ["Suya","🍢","Nigeria",1900,270,25,17,4],
  ["Waakye","🍚","Ghana",1900,170,7,3,29],
  ["Thieboudienne","🐟","Senegal",1900,160,10,5,19],
  ["Bobotie","🥘","Sudafrica",1900,200,13,12,10],
  ["Bunny chow","🍞","Sudafrica",1940,210,8,8,27],
  ["Chakalaka","🌶️","Sudafrica",1900,90,2,5,10],

  // 61–70 MEXICO AND CENTRAL AMERICA
  ["Tacos al pastor","🌮","Messico",1960,220,12,10,20],
  ["Nachos","🧀","Messico",1943,310,9,18,29],
  ["Caesar salad","🥗","Messico",1924,190,7,16,5],
  ["Guacamole","🥑","Messico",1900,160,2,15,9],
  ["Enchiladas","🌯","Messico",1900,200,10,10,18],
  ["Chiles en nogada","🌶️","Messico",1821,210,8,13,16],
  ["Pozole","🍲","Messico",1600,100,7,4,9],
  ["Mole poblano","🍫","Messico",1700,230,7,16,17],
  ["Tamales","🫔","Messico",1500,190,6,9,23],
  ["Pupusas","🫓","El Salvador",1900,240,9,11,26],

  // 71–80 SOUTH AMERICA
  ["Ceviche","🐟","Perù",1900,110,17,2,6],
  ["Lomo saltado","🥩","Perù",1900,180,15,9,10],
  ["Aji de gallina","🍗","Perù",1900,190,12,12,9],
  ["Feijoada","🫘","Brasile",1900,180,11,9,15],
  ["Pão de queijo","🧀","Brasile",1900,340,7,18,38],
  ["Moqueca","🐟","Brasile",1900,150,12,10,5],
  ["Asado argentino","🥩","Argentina",1800,280,26,19,0],
  ["Empanadas argentinas","🥟","Argentina",1800,260,10,14,25],
  ["Arepas","🫓","Colombia",1500,210,5,5,37],
  ["Pabellón criollo","🍛","Venezuela",1900,180,11,7,20],

  // 81–90 EUROPE
  ["Paella valenciana","🥘","Spagna",1850,170,10,5,21],
  ["Tortilla española","🥔","Spagna",1800,180,7,12,11],
  ["Gazpacho","🍅","Spagna",1900,50,1,3,5],
  ["Croissant","🥐","Francia",1900,406,8,21,45],
  ["Ratatouille","🍆","Francia",1900,70,2,4,7],
  ["Crêpes","🥞","Francia",1900,220,6,10,27],
  ["Moussaka","🍆","Grecia",1920,170,10,11,8],
  ["Souvlaki","🍢","Grecia",1900,210,20,12,4],
  ["Fish and chips","🐟","Regno Unito",1860,250,12,13,23],
  ["Shepherd's pie","🥧","Regno Unito",1800,150,9,8,12],

  // 91–100 WORLD SPECIALTIES
  ["Hamburger","🍔","Stati Uniti",1900,260,14,14,20],
  ["Hot dog","🌭","Stati Uniti",1900,290,11,20,18],
  ["Banana split","🍌","Stati Uniti",1904,210,3,9,31],
  ["Poutine","🍟","Canada",1950,270,7,17,24],
  ["Wiener schnitzel","🍖","Austria",1850,280,18,17,14],
  ["Bratwurst","🌭","Germania",1400,300,13,27,2],
  ["Pierogi","🥟","Polonia",1700,220,6,8,31],
  ["Goulash","🍲","Ungheria",1800,140,13,8,5],
  ["Jerk chicken","🍗","Giamaica",1700,190,22,10,4],
  ["Meat pie","🥧","Australia",1900,270,10,16,23]
];

const foods = rawFoods.map(row => ({
  name: row[0],
  emoji: row[1],
  origin: row[2],
  year: row[3],
  cal: row[4],
  protein: row[5],
  fat: row[6],
  carbs: row[7],
  yearNote: "Data storica indicativa: l'origine e l'evoluzione della ricetta possono essere controverse."
}));

console.assert(foods.length === 100, "Expected exactly 100 dishes");

const specs = [
  ["cal", "Calorie (kcal)", 900],
  ["protein", "Proteine (g)", 100],
  ["fat", "Grassi (g)", 100],
  ["carbs", "Carboidrati (g)", 100]
];

// =====================================================
// GAME STATE
// =====================================================

let mode = "solo";
let players = ["Tu"];
let scores = {};
let order = [];
let history = [];
let guesses = [];
let round = 0;
let turn = 0;
let submitted = false;
let remaining = 60;
let timerId = null;

function century(year) {
  return Math.ceil(year / 100);
}

function roman(n) {
  const parts = [
    [10, "X"], [9, "IX"], [5, "V"],
    [4, "IV"], [1, "I"]
  ];

  let result = "";

  for (const [number, letter] of parts) {
    while (n >= number) {
      result += letter;
      n -= number;
    }
  }

  return result;
}

function shuffle(items) {
  const array = [...items];

  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }

  return array;
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
      english()
        ? "Online multiplayer is not available yet."
        : "Il multiplayer online non è ancora disponibile."
    );
    return;
  }

  mode = selected;
  show("partySetup", mode === "party");

  if (mode === "solo") start();
}

function start() {
  players = mode === "party"
    ? [...new Set($("names").value
        .split(",")
        .map(name => name.trim())
        .filter(Boolean)
        .slice(0, 8))]
    : ["Tu"];

  if (!players.length) players = ["Giocatore 1"];

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

// =====================================================
// PHOTOGRAPHS
// =====================================================

const photoCache = {};
let photoRequest = 0;

async function showDishPhoto(food) {
  const request = ++photoRequest;
  const img = $("dishPhoto");
  const emoji = $("food");
  const credit = $("photoCredit");

  img.style.display = "none";
  img.removeAttribute("src");
  emoji.style.display = "block";
  show("photoCredit", false);

  try {
    let url = photoCache[food.name];

    if (!url) {
      const endpoint =
        "https://en.wikipedia.org/w/api.php" +
        "?action=query&format=json&origin=*" +
        "&prop=pageimages&piprop=thumbnail" +
        "&pithumbsize=900&redirects=1&titles=" +
        encodeURIComponent(food.name);

      const response = await fetch(endpoint);
      if (!response.ok) throw Error("Wikipedia request failed");

      const data = await response.json();
      const page = Object.values(data.query?.pages || {})[0];

      url = page?.thumbnail?.source;

      if (!url) throw Error("No photograph");

      photoCache[food.name] = url;
    }

    await new Promise((resolve, reject) => {
      const test = new Image();
      test.onload = resolve;
      test.onerror = reject;
      test.src = url;
    });

    if (request !== photoRequest) return;

    img.src = url;
    img.alt = food.name;
    img.style.display = "block";
    emoji.style.display = "none";

    setText("photoCredit", "Foto: Wikipedia / Wikimedia Commons");
    show("photoCredit", true);
  } catch (error) {
    if (request !== photoRequest) return;
    emoji.style.display = "block";
    show("photoCredit", false);
  }
}

// =====================================================
// WORLD MAP — OPENSTREETMAP
// =====================================================

let countryMap = null;
let countryLayer = null;
let selectedLayer = null;
let selectedCountry = "";
let mapReady = false;
let mapLoading = false;
let mapFailed = false;

const aliases = {
  Italy: "Italia",
  Japan: "Giappone",
  Mexico: "Messico",
  India: "India",
  France: "Francia",
  Peru: "Perù",
  Lebanon: "Libano",
  "United States of America": "Stati Uniti",
  "United States": "Stati Uniti",
  "United Kingdom": "Regno Unito",
  Spain: "Spagna",
  Greece: "Grecia",
  Turkey: "Turchia",
  Türkiye: "Turchia",
  China: "Cina",
  "South Korea": "Corea del Sud",
  "Republic of Korea": "Corea del Sud",
  Thailand: "Thailandia",
  Vietnam: "Vietnam",
  Indonesia: "Indonesia",
  Philippines: "Filippine",
  Malaysia: "Malesia",
  Singapore: "Singapore",
  Pakistan: "Pakistan",
  Nepal: "Nepal",
  "Sri Lanka": "Sri Lanka",
  Bangladesh: "Bangladesh",
  Iran: "Iran",
  Iraq: "Iraq",
  Israel: "Israele",
  Egypt: "Egitto",
  Morocco: "Marocco",
  Tunisia: "Tunisia",
  Ethiopia: "Etiopia",
  Nigeria: "Nigeria",
  Ghana: "Ghana",
  Senegal: "Senegal",
  "South Africa": "Sudafrica",
  Brazil: "Brasile",
  Argentina: "Argentina",
  Colombia: "Colombia",
  Venezuela: "Venezuela",
  Chile: "Cile",
  Canada: "Canada",
  Germany: "Germania",
  Austria: "Austria",
  Switzerland: "Svizzera",
  Belgium: "Belgio",
  Netherlands: "Paesi Bassi",
  Portugal: "Portogallo",
  Poland: "Polonia",
  Ukraine: "Ucraina",
  Russia: "Russia",
  Hungary: "Ungheria",
  Czechia: "Repubblica Ceca",
  Sweden: "Svezia",
  Denmark: "Danimarca",
  Finland: "Finlandia",
  Australia: "Australia",
  "New Zealand": "Nuova Zelanda",
  Jamaica: "Giamaica",
  Cuba: "Cuba",
  "Dominican Republic": "Repubblica Dominicana",
  "Saudi Arabia": "Arabia Saudita",
  Jordan: "Giordania",
  Georgia: "Georgia",
  "El Salvador": "El Salvador"
};

function canonicalCountry(value) {
  const name = String(value || "").trim();
  return aliases[name] || name;
}

function updateMapLabels() {
  setText(
    "mapLabel",
    english()
      ? "Origin — select a country on the map"
      : "Origine — seleziona un paese sulla mappa"
  );

  setText(
    "selectedCountry",
    selectedCountry
      ? `${english() ? "Selected" : "Selezionato"}: ${tr(selectedCountry)}`
      : english() ? "No country selected" : "Nessun paese selezionato"
  );

  if (mapReady) {
    setText(
      "mapHelp",
      english()
        ? "Tap a country to select it. Zoom and drag to explore."
        : "Tocca un paese per selezionarlo. Puoi ingrandire e spostare la mappa."
    );
  }
}

function selectCountry(name, layer = null) {
  if (selectedLayer && countryLayer) {
    countryLayer.resetStyle(selectedLayer);
  }

  selectedCountry = canonicalCountry(name);
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

  if (selectedLayer && countryLayer) {
    countryLayer.resetStyle(selectedLayer);
  }

  selectedLayer = null;
  $("origin").value = "";

  show("mapAnswer", true);
  show("originFallback", false);

  if (mapReady && countryMap) {
    setTimeout(() => countryMap.invalidateSize(), 100);
  } else if (mapFailed) {
    showMapFallback();
  } else {
    initializeCountryMap();
  }

  updateMapLabels();
}

async function fetchCountryData() {
  const sources = [
    "https://raw.githubusercontent.com/datasets/geo-countries/master/data/countries.geojson",
    "https://cdn.jsdelivr.net/gh/datasets/geo-countries@master/data/countries.geojson",
    "https://raw.githubusercontent.com/datasets/geo-countries/main/data/countries.geojson"
  ];

  for (const url of sources) {
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
      console.warn("Map source unavailable:", url);
    }
  }

  throw Error("Country boundaries unavailable");
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
    english()
      ? "Loading world map..."
      : "Caricamento della mappa del mondo..."
  );

  try {
    if (typeof L === "undefined") {
      throw Error("Leaflet unavailable");
    }

    if (!countryMap) {
      countryMap = L.map("worldMap", {
        minZoom: 1,
        maxZoom: 6,
        zoomControl: true,
        worldCopyJump: true
      }).setView([18, 8], 2);

      L.tileLayer(
        "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
        {
          attribution: "&copy; OpenStreetMap contributors",
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
        const p = feature.properties || {};

        const name =
          p.ADMIN ||
          p.name ||
          p.NAME ||
          p.NAME_EN ||
          "Unknown";

        layer.bindTooltip(name, { sticky: true });

        layer.on("click", () => selectCountry(name, layer));
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
    english()
      ? "Map unavailable. Select a country below."
      : "Mappa non disponibile. Seleziona un paese dal menu."
  );

  $("origin").onchange = function () {
    selectCountry(this.value);
  };
}

function setupOriginOptions() {
  const names = [...new Set(foods.map(food => food.origin))].sort();

  $("origin").innerHTML =
    '<option value="">—</option>' +
    names.map(name =>
      `<option value="${escapeHTML(name)}">${escapeHTML(tr(name))}</option>`
    ).join("");
}

// =====================================================
// GAME RENDER
// =====================================================

function render() {
  submitted = false;

  const food = order[round];

  setText(
    "status",
    `Round ${round + 1}/${order.length} · ${english() ? "Turn for" : "Turno di"} ${players[turn]}`
  );

  setText("food", food.emoji);
  setText("dish", food.name);

  updateBanner();
  showDishPhoto(food);

  const centuryLabel = english()
    ? "Century of origin"
    : "Secolo di origine";

  let html = `
    <label>
      ${centuryLabel}:
      <select id="century">
        ${Array.from({ length: 22 }, (_, i) => {
          const n = i + 1;
          return `<option value="${n}" ${n === 20 ? "selected" : ""}>
            ${roman(n)} ${english() ? "century" : "secolo"}
          </option>`;
        }).join("")}
      </select>
    </label>
  `;

  for (const [key, italianLabel, max] of specs) {
    const initial = Math.floor(max / 2);

    const labels = {
      cal: "Calories (kcal)",
      protein: "Protein (g)",
      fat: "Fat (g)",
      carbs: "Carbohydrates (g)"
    };

    const label = english() ? labels[key] : italianLabel;

    html += `
      <label>
        ${label}: <output id="out_${key}">${initial}</output>
        <br>
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

// =====================================================
// SCORING
// =====================================================

function scoreAnswer(answer, food) {
  const countryPoints =
    canonicalCountry(answer.origin) === canonicalCountry(food.origin)
      ? 7 : 0;

  const distance = Math.abs(answer.century - century(food.year));

  const centuryPoints =
    distance === 0 ? 10 : distance === 1 ? 7 : 0;

  let total = countryPoints + centuryPoints;
  const values = {};

  for (const [key] of specs) {
    const difference = Math.abs(answer[key] - food[key]);
    const tolerance = key === "cal" ? 50 : 5;

    const points =
      difference <= tolerance ? 7 :
      difference <= tolerance * 2 ? 3 : 0;

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

function submitGuess(timedOut = false) {
  if (submitted) return;

  if (!selectedCountry && !timedOut) {
    alert(
      english()
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

  guesses.push({ playerIndex: turn, answer, timedOut });

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
      english() ? "Answers saved!" : "Risposte salvate!"
    );

    setText(
      "handoffText",
      english()
        ? `Pass the device to ${next}. Answers remain secret.`
        : `Passa il dispositivo a ${next}. Le risposte rimangono segrete.`
    );

    setText(
      "handoffButton",
      english() ? `Start: ${next}` : `Inizia: ${next}`
    );
  } else {
    setText(
      "handoffTitle",
      english() ? "Everyone has answered!" : "Tutti hanno risposto!"
    );

    setText(
      "handoffText",
      english()
        ? "You can now reveal the answers."
        : "Ora puoi rivelare le risposte."
    );

    setText(
      "handoffButton",
      english() ? "Reveal answers" : "Rivela le risposte"
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
    `Round ${round + 1}/${order.length} · ${english() ? "Results" : "Risultati"}`
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

  let html = `<h2>${english() ? "Round results" : "Risultati del round"}</h2>`;

  for (const entry of entries) {
    const a = entry.answer;
    const r = entry.result;

    html += `
      <div class="summary">
        <h3>${escapeHTML(entry.player)} — +${r.pts} pt</h3>
        <p>${english() ? "Country" : "Paese"}:
          ${escapeHTML(a.origin || "—")}
          (${escapeHTML(food.origin)}) — ${r.countryPoints} pt
        </p>
        <p>${english() ? "Century" : "Secolo"}:
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
      <b>${english() ? "Historical note" : "Nota storica"}:</b>
      ${escapeHTML(food.yearNote)}
    </p>
    <small>
      ${english()
        ? "Dates and nutrition values are approximate gameplay estimates."
        : "Date e valori nutrizionali sono stime indicative per il gioco."}
    </small>
  `;

  $("results").innerHTML = html;
  updateBanner();

  setText(
    "next",
    round === order.length - 1
      ? english() ? "Final leaderboard →" : "Classifica finale →"
      : english() ? "Next dish →" : "Prossimo piatto →"
  );
}

// =====================================================
// FINAL RESULTS
// =====================================================

function renderFinalHistory() {
  const ranking = Object.entries(scores)
    .sort((a, b) => b[1] - a[1]);

  let html = `
    <h3>${english() ? "Overall leaderboard" : "Classifica generale"}</h3>
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
  html += `<h3>${english() ? "Review answers" : "Rivedi le risposte"}</h3>`;

  history.forEach((item, index) => {
    const food = item.food;

    html += `
      <details class="history-round">
        <summary>
          Round ${index + 1} · ${escapeHTML(food.name)}
          <span class="muted">${english() ? "Show answers" : "Mostra risposte"}</span>
        </summary>
    `;

    for (const entry of item.entries) {
      const a = entry.answer;
      const r = entry.result;

      const rows = [
        ["Paese", a.origin || "—", food.origin, r.countryPoints],
        ["Secolo", roman(a.century), roman(century(food.year)), r.centuryPoints],
        ["Calorie", a.cal, food.cal, r.values.cal],
        ["Proteine", a.protein, food.protein, r.values.protein],
        ["Grassi", a.fat, food.fat, r.values.fat],
        ["Carboidrati", a.carbs, food.carbs, r.values.carbs]
      ];

      html += `
        <div class="history-player">
          <h4>${escapeHTML(entry.player)} · +${r.pts} pt</h4>
          <div class="history-scroll">
            <table>
              <thead>
                <tr>
                  <th>${english() ? "Category" : "Categoria"}</th>
                  <th>${english() ? "Answer" : "Risposta"}</th>
                  <th>${english() ? "Correct" : "Corretta"}</th>
                  <th>${english() ? "Points" : "Punti"}</th>
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
    }

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

// =====================================================
// DISCOVER RESTAURANTS
// =====================================================

function renderDiscovery() {
  const city = $("cityInput").value.trim();

  setText(
    "discoverTitle",
    english()
      ? "Find these dishes in your city"
      : "Scopri i piatti nella tua città"
  );

  setText(
    "discoverIntro",
    english()
      ? "Find restaurants that may serve the dishes from your game. Results open in Google Maps."
      : "Trova ristoranti che potrebbero servire i piatti del gioco. I risultati si aprono su Google Maps."
  );

  setText(
    "discoverNote",
    english()
      ? "External search only. Glovo integration is not active."
      : "Ricerca esterna. L'integrazione con Glovo non è ancora attiva."
  );

  $("cityInput").placeholder = english() ? "e.g. Barcelona" : "Es. Barcelona";

  $("dishLinks").innerHTML = history.map(item => {
    const food = item.food;

    const query = [food.name, "restaurant", city]
      .filter(Boolean)
      .join(" ");

    const url =
      "https://www.google.com/maps/search/?api=1&query=" +
      encodeURIComponent(query);

    return `
      <a
        class="dish-link"
        href="${escapeHTML(url)}"
        target="_blank"
        rel="noopener noreferrer"
      >
        ${food.emoji} ${escapeHTML(food.name)} ↗
      </a>
    `;
  }).join("");
}

function renderFinal() {
  $("leaderboard").innerHTML = renderFinalHistory();
  renderDiscovery();
}

// =====================================================
// LANGUAGE
// =====================================================

function updateLanguage() {
  document.documentElement.lang = language;
  $("languageSelect").value = language;

  setText("languageLabel", english() ? "Language" : "Lingua");

  document.querySelectorAll(
    "#setup h2, #setup button, #partySetup p, #partySetup button, #finish > h2, #finish > button"
  ).forEach(element => {
    if (!element.dataset.originalText) {
      element.dataset.originalText = element.textContent.trim();
    }

    element.textContent = tr(element.dataset.originalText);
  });

  setupOriginOptions();
  updateMapLabels();

  if (!$("finish").classList.contains("hidden")) {
    renderFinal();
  }
}

function setLanguage(value) {
  language = value === "en" ? "en" : "it";

  try {
    localStorage.setItem("foodgame-language", language);
  } catch (e) {}

  updateLanguage();
}

// =====================================================
// INITIALIZATION
// =====================================================

function initialize() {
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
