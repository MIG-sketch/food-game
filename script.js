// =====================================================
// DISHUP! — SCRIPT.JS COMPLETO
// =====================================================

// ---------------------
// LINGUE
// ---------------------

const translations = {
  "Scegli come giocare": "Choose how to play",
  "Party (stesso schermo)": "Party (shared screen)",
  "Giocatori (separati da virgole)": "Players (comma-separated)",
  "Inizia": "Start",
  "Partita finita!": "Game over!",
  "Nuova partita": "New game",
  "Origine": "Origin",
  "Conferma risposte": "Submit answers",
  "Continua →": "Continue →",
  "Calorie (kcal)": "Calories (kcal)",
  "Proteine (g)": "Protein (g)",
  "Grassi (g)": "Fat (g)",
  "Carboidrati (g)": "Carbohydrates (g)",
  "Secolo di origine:": "Century of origin:",
  "secolo": "century",
  "Turno di": "Turn for",
  "Risultati": "Results",
  "Risultati del round": "Round results",
  "Paese": "Country",
  "Secolo": "Century",
  "corretto:": "correct:",
  "punti": "points",
  "Tempo scaduto": "Time is up",
  "tempo scaduto": "time expired",
  "Risposte salvate!": "Answers saved!",
  "Inizia il turno": "Start turn",
  "Tutti hanno risposto!": "Everyone has answered!",
  "Rivela le risposte": "Reveal answers",
  "Nota storica:": "Historical note:",
  "Classifica finale →": "Final leaderboard →",
  "Prossimo piatto →": "Next dish →",
  "Classifica generale": "Overall leaderboard",
  "Rivedi le risposte": "Review answers",
  "Mostra risposte": "Show answers",
  "Risposte corrette:": "Correct answers:",
  "Risposta": "Answer",
  "Corretta": "Correct",
  "Punti": "Points",
  "Italia": "Italy",
  "Giappone": "Japan",
  "Messico": "Mexico",
  "India": "India",
  "Francia": "France",
  "Perù": "Peru",
  "Libano": "Lebanon",
  "Stati Uniti": "United States",
  "Regno Unito": "United Kingdom",
  "Tu": "You",
  "Giocatore 1": "Player 1",
  "Nessun paese selezionato": "No country selected",
  "Origine — seleziona un paese sulla mappa":
    "Origin — select a country on the map",
  "Tocca un paese per selezionarlo. Puoi ingrandire e spostare la mappa.":
    "Tap a country to select it. You can zoom and move the map.",
  "Indovina il paese d’origine, il secolo e i valori nutrizionali per 100 g. I secoli sono riferimenti storici convenzionali e talvolta controversi.":
    "Guess the country of origin, century and nutritional values per 100 g. Centuries are conventional historical references and sometimes disputed.",
  "Nessuna risposta è stata rivelata. Il prossimo giocatore vedrà lo stesso piatto e avrà 60 secondi.":
    "No answers have been revealed. The next player will see the same dish and have 60 seconds.",
  "Ora possiamo rivelare le risposte e aggiornare la classifica.":
    "Now we can reveal the answers and update the leaderboard.",
  "Apri un piatto per confrontare le risposte di tutti i giocatori. I risultati sono visibili solo a partita conclusa.":
    "Open a dish to compare all players' answers. Results are only available after the game ends.",
  "Valori nutrizionali dimostrativi; fonti e ricette standard da verificare prima della pubblicazione.":
    "Illustrative nutritional values; sources and standard recipes must be verified before publication.",
  "Il multiplayer online richiede un server per sincronizzare le stanze. Questa demo include Single Player e Party Mode.":
    "Online multiplayer requires a server to synchronize rooms. This demo includes Single Player and Party Mode."
};

let language = "it";
let translating = false;

function t(value) {
  const text = String(value);

  if (language === "it") return text;

  if (translations[text]) return translations[text];

  return text.replace(
    /Stati Uniti|Regno Unito|Giappone|Messico|Francia|Italia|India|Perù|Libano|Calorie \(kcal\)|Proteine \(g\)|Grassi \(g\)|Carboidrati \(g\)|proteine|grassi|carboidrati|corretto:|secolo|punti|Tempo scaduto|tempo scaduto|Turno di|Risultati|Paese|Secolo|Origine|Risposta|Corretta|Punti|Mostra risposte|Inizia|Conferma risposte|Nuova partita|Continua →|Risposte salvate!/g,
    match => translations[match] || match
  );
}

function translateVisible() {
  if (translating) return;

  translating = true;

  document.documentElement.lang = language;

  const languageLabel = document.getElementById("languageLabel");

  if (languageLabel) {
    languageLabel.textContent =
      language === "en" ? "Language" : "Lingua";
  }

  const languageSelect = document.getElementById("languageSelect");

  if (languageSelect) {
    languageSelect.value = language;
  }

  const walker = document.createTreeWalker(
    document.body,
    NodeFilter.SHOW_TEXT
  );

  let node;

  while ((node = walker.nextNode())) {
    if (
      node.parentElement?.closest(
        "script,style,#languagePanel,#origin,#mapAnswer"
      )
    ) {
      continue;
    }

    const raw = node.textContent;

    if (
      node.__lastRendered !== undefined &&
      raw !== node.__lastRendered
    ) {
      node.__itText = raw;
    }

    if (node.__itText === undefined) {
      node.__itText = raw;
    }

    const original = node.__itText;
    const clean = original.trim();

    const translated =
      language === "en" ? t(clean) : clean;

    const output = clean
      ? original.replace(clean, translated)
      : original;

    if (raw !== output) {
      node.textContent = output;
    }

    node.__lastRendered = output;
  }

  const img = document.getElementById("dishPhoto");

  if (img) {
    img.alt =
      language === "en"
        ? "Photo of the dish"
        : "Fotografia del piatto";
  }

  translating = false;
}

function setLanguage(value) {
  language = value === "en" ? "en" : "it";

  try {
    localStorage.setItem("foodgame-language", language);
  } catch (error) {}

  refreshLanguage();
}

function refreshLanguage() {
  syncOriginOptions();

  if (!document.getElementById("finish").classList.contains("hidden")) {
    renderDiscovery();

    document.getElementById("leaderboard").innerHTML =
      renderFinalHistory();
  }

  updateMapLanguage();
  translateVisible();
}

// ---------------------
// PIATTI
// ---------------------

const foods = [
  {
    name: "Pizza Margherita",
    emoji: "🍕",
    origin: "Italia",
    year: 1889,
    yearNote:
      "1889 è la data tradizionalmente associata alla dedica alla regina Margherita; l’origine della ricetta è dibattuta.",
    cal: 250,
    protein: 11,
    fat: 9,
    carbs: 31
  },
  {
    name: "Caesar salad",
    emoji: "🥗",
    origin: "Messico",
    year: 1924,
    yearNote:
      "Attribuita a Caesar Cardini a Tijuana nel 1924.",
    cal: 190,
    protein: 7,
    fat: 16,
    carbs: 5
  },
  {
    name: "Nachos",
    emoji: "🧀",
    origin: "Messico",
    year: 1943,
    yearNote:
      "Generalmente attribuiti a Ignacio Anaya nel 1943.",
    cal: 310,
    protein: 9,
    fat: 18,
    carbs: 29
  },
  {
    name: "Tiramisù",
    emoji: "🍰",
    origin: "Italia",
    year: 1970,
    yearNote:
      "Data indicativa: la storia del tiramisù moderno e la sua attribuzione sono controverse.",
    cal: 290,
    protein: 6,
    fat: 19,
    carbs: 25
  },
  {
    name: "Tacos al pastor",
    emoji: "🌮",
    origin: "Messico",
    year: 1960,
    yearNote:
      "Data indicativa del consolidamento della versione moderna; deriva da tradizioni precedenti.",
    cal: 220,
    protein: 12,
    fat: 10,
    carbs: 20
  },
  {
    name: "Chicken tikka masala",
    emoji: "🍛",
    origin: "Regno Unito",
    year: 1970,
    yearNote:
      "Origine e data dibattute; 1970 è una stima convenzionale, non un anno accertato.",
    cal: 160,
    protein: 13,
    fat: 9,
    carbs: 7
  },
  {
    name: "Pasta alla carbonara",
    emoji: "🍝",
    origin: "Italia",
    year: 1944,
    yearNote:
      "Anno indicativo associato alle ricostruzioni del dopoguerra; esistono versioni contrastanti.",
    cal: 280,
    protein: 12,
    fat: 13,
    carbs: 28
  },
  {
    name: "Banana split",
    emoji: "🍌",
    origin: "Stati Uniti",
    year: 1904,
    yearNote:
      "Una delle attribuzioni più note risale al 1904 in Pennsylvania.",
    cal: 210,
    protein: 3,
    fat: 9,
    carbs: 31
  }
];

const specs = [
  ["cal", "Calorie (kcal)", 900],
  ["protein", "Proteine (g)", 100],
  ["fat", "Grassi (g)", 100],
  ["carbs", "Carboidrati (g)", 100]
];

// ---------------------
// STATO DEL GIOCO
// ---------------------

let history = [];
let mode = "solo";
let players = ["Tu"];
let scores = {};
let round = 0;
let turn = 0;
let order = [];
let timerId = null;
let remaining = 60;
let submitted = false;
let guesses = [];

function century(year) {
  return Math.ceil(year / 100);
}

function roman(number) {
  const numbers = [
    [10, "X"],
    [9, "IX"],
    [5, "V"],
    [4, "IV"],
    [1, "I"]
  ];

  let result = "";

  for (const [value, symbol] of numbers) {
    while (number >= value) {
      result += symbol;
      number -= value;
    }
  }

  return result;
}

function show(id, visible) {
  const element = document.getElementById(id);

  if (element) {
    element.classList.toggle("hidden", !visible);
  }
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function updateBanner() {
  const banner = document.getElementById("scoreBanner");

  banner.classList.remove("hidden");

  banner.innerHTML = players
    .map(
      (player, index) => `
      <div class="${index === turn ? "active" : ""}">
        ${escapeHtml(player)}: ${scores[player]} pt
        ${index === turn ? " ●" : ""}
      </div>
    `
    )
    .join("");
}

// ---------------------
// TIMER
// ---------------------

function stopTimer() {
  if (timerId !== null) {
    clearInterval(timerId);
    timerId = null;
  }
}

function startTimer() {
  stopTimer();

  remaining = 60;

  document.getElementById("timer").textContent = "⏱ 60 s";

  timerId = setInterval(() => {
    remaining--;

    document.getElementById("timer").textContent =
      `⏱ ${remaining} s`;

    if (remaining <= 0) {
      stopTimer();
      submitGuess(true);
    }
  }, 1000);
}

// ---------------------
// MODALITÀ
// ---------------------

function setMode(selectedMode) {
  mode = selectedMode;

  if (mode === "online") {
    document.getElementById("notice").textContent =
      "Il multiplayer online richiede un server per sincronizzare le stanze. Questa demo include Single Player e Party Mode.";

    return;
  }

  if (mode === "party") {
    show("partySetup", true);
    return;
  }

  start();
}

function start() {
  if (mode === "party") {
    players = document
      .getElementById("names")
      .value.split(",")
      .map(name => name.trim())
      .filter(Boolean)
      .slice(0, 8);
  }

  if (!players.length) {
    players = ["Giocatore 1"];
  }

  scores = {};

  players.forEach(player => {
    scores[player] = 0;
  });

  order = [...foods]
    .sort(() => Math.random() - 0.5)
    .slice(0, 5);

  round = 0;
  turn = 0;
  guesses = [];
  history = [];

  show("setup", false);
  show("game", true);

  render();
}

// ---------------------
// FOTOGRAFIE
// ---------------------

const wikiTitles = {
  "Pizza Margherita": ["Pizza Margherita", "Pizza"],
  "Caesar salad": ["Caesar salad"],
  "Nachos": ["Nachos"],
  "Tiramisù": ["Tiramisu"],
  "Tacos al pastor": ["Tacos al pastor", "Al pastor"],
  "Chicken tikka masala": ["Chicken tikka masala"],
  "Pasta alla carbonara": ["Carbonara"],
  "Banana split": ["Banana split"]
};

const photoCache = {};
let photoRequestNumber = 0;

function loadImageCandidate(url) {
  return new Promise((resolve, reject) => {
    const image = new Image();

    image.onload = () => resolve(url);
    image.onerror = () => reject(new Error("Image failed"));

    image.src = url;
  });
}

async function wikipediaPhoto(title) {
  const api =
    "https://en.wikipedia.org/w/api.php?action=query&format=json&origin=*&prop=pageimages&piprop=thumbnail&pithumbsize=900&redirects=1&titles=" +
    encodeURIComponent(title);

  const rest =
    "https://en.wikipedia.org/api/rest_v1/page/summary/" +
    encodeURIComponent(title.replace(/ /g, "_"));

  const endpoints = [
    async () => {
      const response = await fetch(rest);

      if (!response.ok) throw Error("REST");

      const data = await response.json();

      return data.thumbnail?.source || data.originalimage?.source;
    },
    async () => {
      const response = await fetch(api);

      if (!response.ok) throw Error("API");

      const data = await response.json();

      return Object.values(data.query?.pages || {})[0]?.thumbnail?.source;
    }
  ];

  for (const getPhoto of endpoints) {
    try {
      const url = await getPhoto();

      if (url) return url;
    } catch (error) {}
  }

  return null;
}

async function showDishPhoto(food) {
  const img = document.getElementById("dishPhoto");
  const emoji = document.getElementById("food");
  const credit = document.getElementById("photoCredit");

  const request = ++photoRequestNumber;

  const isCurrent = () =>
    request === photoRequestNumber &&
    order[round]?.name === food.name;

  img.style.display = "none";
  img.removeAttribute("src");

  emoji.style.display = "block";

  credit.classList.add("hidden");
  credit.textContent = "Foto: Wikimedia Commons / Wikipedia";
  credit.onclick = null;
  credit.style.cursor = "";

  const titles = wikiTitles[food.name] || [food.name];
  const urls = [];

  if (photoCache[food.name]) {
    urls.push(photoCache[food.name]);
  }

  for (const title of titles) {
    const url = await wikipediaPhoto(title);

    if (!isCurrent()) return;

    if (url && !urls.includes(url)) {
      urls.push(url);
    }
  }

  for (const url of urls) {
    try {
      await loadImageCandidate(url);

      if (!isCurrent()) return;

      img.alt = "Fotografia di " + food.name;
      img.src = url;
      img.style.display = "block";

      emoji.style.display = "none";
      credit.classList.remove("hidden");

      photoCache[food.name] = url;

      return;
    } catch (error) {}
  }

  if (isCurrent()) {
    credit.classList.remove("hidden");

    credit.textContent =
      language === "en"
        ? "Photo unavailable. Open on Wikipedia"
        : "Foto non disponibile. Apri su Wikipedia";

    credit.style.cursor = "pointer";

    credit.onclick = () => {
      window.open(
        "https://en.wikipedia.org/wiki/" +
          encodeURIComponent(titles[0].replace(/ /g, "_")),
        "_blank"
      );
    };
  }
}

// ---------------------
// MAPPA INTERATTIVA
// ---------------------

let countryMap = null;
let countryLayer = null;
let selectedLayer = null;
let selectedMapCountry = null;
let selectedCountryName = null;
let mapLoading = false;
let mapReady = false;

const countryAliases = {
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
  Türkiye: "Turchia",
  Turkey: "Turchia",
  "South Korea": "Corea del Sud"
};

function canonicalCountry(value) {
  const map = {
    Italy: "Italia",
    Japan: "Giappone",
    Mexico: "Messico",
    France: "Francia",
    Peru: "Perù",
    Lebanon: "Libano",
    "United States": "Stati Uniti",
    "United States of America": "Stati Uniti",
    "United Kingdom": "Regno Unito"
  };

  const name = String(value || "").trim();

  return map[name] || countryAliases[name] || name;
}

function updateMapLanguage() {
  const label = document.getElementById("mapLabel");
  const selected = document.getElementById("selectedCountry");
  const help = document.getElementById("mapHelp");

  if (label) {
    label.textContent =
      language === "en"
        ? "Origin — select a country on the map"
        : "Origine — seleziona un paese sulla mappa";
  }

  if (selected) {
    selected.textContent = selectedCountryName
      ? (language === "en" ? "Selected: " : "Selezionato: ") +
        selectedCountryName
      : language === "en"
        ? "No country selected"
        : "Nessun paese selezionato";
  }

  if (help && mapReady) {
    help.textContent =
      language === "en"
        ? "Tap a country to select it. You can zoom and move the map."
        : "Tocca un paese per selezionarlo. Puoi ingrandire e spostare la mappa.";
  }
}

function resetCountryMap() {
  selectedMapCountry = null;
  selectedCountryName = null;

  if (selectedLayer && countryLayer) {
    countryLayer.resetStyle(selectedLayer);
  }

  selectedLayer = null;

  show("mapAnswer", true);
  show("originFallback", false);

  const mapElement = document.getElementById("worldMap");

  if (mapElement) {
    mapElement.style.display = "block";
  }

  updateMapLanguage();

  if (mapReady && countryMap) {
    setTimeout(() => {
      countryMap.invalidateSize();
    }, 100);
  } else {
    initializeCountryMap();
  }
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
        data &&
        data.type === "FeatureCollection" &&
        Array.isArray(data.features) &&
        data.features.length > 0
      ) {
        return data;
      }
    } catch (error) {
      console.warn("Map source unavailable:", url);
    }
  }

  throw new Error("Unable to load country boundaries");
}

async function initializeCountryMap() {
  if (mapLoading || mapReady) return;

  const mapElement = document.getElementById("worldMap");
  const help = document.getElementById("mapHelp");

  if (!mapElement) return;

  mapLoading = true;

  mapElement.style.display = "block";

  if (help) {
    help.textContent =
      language === "en"
        ? "Loading world map..."
        : "Caricamento della mappa del mondo...";
  }

  if (typeof window.L === "undefined") {
    mapLoading = false;
    showMapFallback(
      "Leaflet non è stato caricato. Controlla la connessione Internet."
    );
    return;
  }

  try {
    if (!countryMap) {
      countryMap = L.map("worldMap", {
        minZoom: 1,
        maxZoom: 6,
        worldCopyJump: true,
        zoomControl: true
      }).setView([18, 8], 2);

      L.tileLayer(
        "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
        {
          attribution:
            "&copy; OpenStreetMap contributors &copy; CARTO",
          maxZoom: 19
        }
      ).addTo(countryMap);
    }

    const data = await fetchCountryData();

    if (countryLayer) {
      countryMap.removeLayer(countryLayer);
    }

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
          "Unknown";

        layer.bindTooltip(name, {
          sticky: true
        });

        layer.on("click", () => {
          if (selectedLayer && countryLayer) {
            countryLayer.resetStyle(selectedLayer);
          }

          selectedLayer = layer;

          layer.setStyle({
            fillColor: "#ffad4f",
            fillOpacity: 0.85,
            color: "#07577c",
            weight: 2
          });

          if (layer.bringToFront) {
            layer.bringToFront();
          }

          selectedMapCountry = canonicalCountry(name);
          selectedCountryName = name;

          updateMapLanguage();

          const origin = document.getElementById("origin");

          if (origin) {
            const matchingOption = [...origin.options].find(
              option =>
                canonicalCountry(option.value) ===
                selectedMapCountry
            );

            if (matchingOption) {
              origin.value = matchingOption.value;
            }
          }
        });
      }
    }).addTo(countryMap);

    mapReady = true;
    mapLoading = false;

    show("originFallback", false);

    updateMapLanguage();

    setTimeout(() => {
      countryMap.invalidateSize();
    }, 150);
  } catch (error) {
    console.error("World map error:", error);

    mapLoading = false;

    showMapFallback(error.message);
  }
}

function showMapFallback(message = "") {
  const help = document.getElementById("mapHelp");
  const mapElement = document.getElementById("worldMap");

  if (mapElement) {
    mapElement.style.display = "block";
  }

  if (help) {
    help.textContent =
      language === "en"
        ? "World map could not load. Check your connection and reload the page."
        : "La mappa non è stata caricata. Controlla la connessione e ricarica la pagina.";

    if (message) {
      console.warn("Map loading problem:", message);
    }
  }

  // Il menu rimane nascosto: la mappa è la modalità
  // principale per scegliere la nazione.
  show("originFallback", false);
}

// ---------------------
// MENU PAESI (COMPATIBILITÀ)
// ---------------------

function syncOriginOptions() {
  const element = document.getElementById("origin");

  if (!element) return;

  for (const option of element.options) {
    const stable = canonicalCountry(option.value);

    option.value = stable;
    option.textContent =
      language === "en" ? t(stable) : stable;
  }
}

// ---------------------
// SCHERMATA DI GIOCO
// ---------------------

function render() {
  submitted = false;

  const food = order[round];

  updateBanner();

  document.getElementById("status").textContent =
    `Round ${round + 1}/${order.length} · Turno di ${players[turn]}`;

  document.getElementById("food").textContent = food.emoji;

  showDishPhoto(food);

  document.getElementById("dish").textContent = food.name;

  syncOriginOptions();

  document.getElementById("origin").value = "Italia";

  document.getElementById("sliders").innerHTML =
    '<label>Secolo di origine: <select id="century">' +
    Array.from(
      { length: 22 },
      (_, index) =>
        `<option value="${index + 1}" ${
          index === 19 ? "selected" : ""
        }>${roman(index + 1)} secolo</option>`
    ).join("") +
    "</select></label>" +
    specs
      .map(([key, name, max]) => {
        const initial = Math.floor(max / 2);

        return `
          <label>
            ${name}: <output id="out_${key}">${initial}</output>
            <br>
            <input
              type="range"
              id="${key}"
              min="0"
              max="${max}"
              step="1"
              value="${initial}"
              oninput="document.getElementById('out_${key}').textContent=this.value"
            >
          </label>
        `;
      })
      .join("");

  document.getElementById("results").innerHTML = "";

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

// ---------------------
// RISPOSTE
// ---------------------

function submitGuess(timedOut = false) {
  if (submitted) return;

  // Il giocatore deve selezionare un paese,
  // salvo quando scade il tempo.
  if (!selectedMapCountry && !timedOut) {
    alert(
      language === "en"
        ? "Select a country on the map first!"
        : "Seleziona prima un paese sulla mappa!"
    );

    return;
  }

  submitted = true;

  stopTimer();

  const answer = {
    origin: selectedMapCountry || "",
    century: +document.getElementById("century").value
  };

  for (const [key] of specs) {
    answer[key] = +document.getElementById(key).value;
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
    const nextPlayer = players[turn + 1];

    document.getElementById("handoffTitle").textContent =
      timedOut
        ? "Tempo scaduto — risposte salvate"
        : "Risposte salvate!";

    document.getElementById("handoffText").textContent =
      `Passa il dispositivo a ${nextPlayer}. Nessuna risposta è stata rivelata. Il prossimo giocatore vedrà lo stesso piatto e avrà 60 secondi.`;

    document.getElementById("handoffButton").textContent =
      `Inizia: ${nextPlayer}`;

    show("handoffButton", true);
  } else {
    document.getElementById("handoffTitle").textContent =
      "Tutti hanno risposto!";

    document.getElementById("handoffText").textContent =
      "Ora possiamo rivelare le risposte e aggiornare la classifica.";

    document.getElementById("handoffButton").textContent =
      "Rivela le risposte";
  }
}

function beginNextPlayer() {
  if (guesses.length === players.length) {
    revealRound();
    return;
  }

  turn++;

  render();
}

// ---------------------
// PUNTEGGI
// ---------------------

function scoreAnswer(answer, food) {
  const correctCountry =
    canonicalCountry(answer.origin) ===
    canonicalCountry(food.origin);

  let points = correctCountry ? 7 : 0;

  const realCentury = century(food.year);

  const distance = Math.abs(
    answer.century - realCentury
  );

  const centuryPoints =
    distance === 0 ? 10 : distance === 1 ? 7 : 0;

  points += centuryPoints;

  const details = [
    `Paese: ${answer.origin || "—"} (corretto: ${food.origin}) — ${
      correctCountry ? 7 : 0
    } pt`,
    `Secolo: ${roman(answer.century)} (corretto: ${roman(realCentury)}) — ${centuryPoints} pt`
  ];

  for (const [key, name] of specs) {
    const difference = Math.abs(
      answer[key] - food[key]
    );

    const tolerance = key === "cal" ? 50 : 5;

    const awarded =
      difference <= tolerance
        ? 7
        : difference <= tolerance * 2
          ? 3
          : 0;

    points += awarded;

    details.push(
      `${name}: ${answer[key]} (corretto: ${food[key]}) — ${awarded} pt`
    );
  }

  return {
    pts: points,
    details
  };
}

// ---------------------
// RISULTATI DEL ROUND
// ---------------------

function revealRound() {
  stopTimer();

  show("handoff", false);
  show("results", true);
  show("next", true);
  show("mapAnswer", false);
  show("originFallback", false);

  document.getElementById("status").textContent =
    `Round ${round + 1}/${order.length} · Risultati`;

  const food = order[round];

  document.getElementById("food").textContent =
    food.emoji;

  showDishPhoto(food);

  document.getElementById("dish").textContent =
    food.name;

  show("food", true);
  show("dish", true);

  let html = "<h2>Risultati del round</h2>";

  for (const guess of guesses) {
    const result = scoreAnswer(
      guess.answer,
      food
    );

    const name = players[guess.playerIndex];

    scores[name] += result.pts;

    html += `
      <div class="summary">
        <h3>
          ${escapeHtml(name)} — +${result.pts} punti
          ${guess.timedOut ? "(tempo scaduto)" : ""}
        </h3>
        ${result.details.map(detail => `<p>${escapeHtml(detail)}</p>`).join("")}
      </div>
    `;
  }

  history.push({
    food,
    entries: guesses.map(guess => ({
      player: players[guess.playerIndex],
      answer: { ...guess.answer },
      timedOut: guess.timedOut,
      result: scoreAnswer(guess.answer, food)
    }))
  });

  html += `
    <p class="muted">
      <b>Nota storica:</b>
      ${escapeHtml(food.yearNote)}
    </p>
    <small>
      Valori nutrizionali dimostrativi; fonti e ricette standard da verificare prima della pubblicazione.
    </small>
  `;

  document.getElementById("results").innerHTML =
    html;

  updateBanner();

  document.getElementById("next").textContent =
    round === order.length - 1
      ? "Classifica finale →"
      : "Prossimo piatto →";
}

// ---------------------
// CLASSIFICA FINALE
// ---------------------

function renderFinalHistory() {
  const ranking = Object.entries(scores).sort(
    (a, b) => b[1] - a[1]
  );

  let html =
    '<h3>Classifica generale</h3><div class="final-ranking">';

  html += ranking
    .map(
      ([name, score], index) => `
        <div class="rank-row">
          <strong>${index + 1}° ${escapeHtml(name)}</strong>
          <strong>${score} pt</strong>
        </div>
      `
    )
    .join("");

  html += "</div>";

  html += `
    <h3>Rivedi le risposte</h3>
    <p class="muted">
      Apri un piatto per confrontare le risposte di tutti i giocatori.
      I risultati sono visibili solo a partita conclusa.
    </p>
  `;

  for (let index = 0; index < history.length; index++) {
    const item = history[index];
    const food = item.food;

    html += `
      <details class="history-round">
        <summary>
          Round ${index + 1} · ${escapeHtml(food.name)}
          <span class="muted">Mostra risposte</span>
        </summary>
    `;

    html += `
      <p class="muted">
        Risposte corrette:
        ${escapeHtml(food.origin)} ·
        ${roman(century(food.year))} secolo ·
        ${food.cal} kcal ·
        ${food.protein} g proteine ·
        ${food.fat} g grassi ·
        ${food.carbs} g carboidrati
        (per 100 g)
      </p>
    `;

    for (const entry of item.entries) {
      const answer = entry.answer;
      const result = entry.result;

      const rows = [
        ["Paese", answer.origin || "—", food.origin],
        [
          "Secolo",
          roman(answer.century),
          roman(century(food.year))
        ],
        ["Calorie", answer.cal + " kcal", food.cal + " kcal"],
        ["Proteine", answer.protein + " g", food.protein + " g"],
        ["Grassi", answer.fat + " g", food.fat + " g"],
        ["Carboidrati", answer.carbs + " g", food.carbs + " g"]
      ];

      const centuryDifference = Math.abs(
        answer.century - century(food.year)
      );

      const pointValues = [
        canonicalCountry(answer.origin) ===
        canonicalCountry(food.origin)
          ? 7
          : 0,

        centuryDifference === 0
          ? 10
          : centuryDifference === 1
            ? 7
            : 0,

        ...specs.map(([key]) => {
          const difference = Math.abs(
            answer[key] - food[key]
          );

          const tolerance =
            key === "cal" ? 50 : 5;

          return difference <= tolerance
            ? 7
            : difference <= tolerance * 2
              ? 3
              : 0;
        })
      ];

      html += `
        <div class="history-player">
          <h4>
            ${escapeHtml(entry.player)}
            · +${result.pts} punti
            ${entry.timedOut ? "· Tempo scaduto" : ""}
          </h4>
          <div class="history-scroll">
            <table>
              <thead>
                <tr>
                  <th>Categoria</th>
                  <th>Risposta</th>
                  <th>Corretta</th>
                  <th>Punti</th>
                </tr>
              </thead>
              <tbody>
      `;

      rows.forEach((row, rowIndex) => {
        html += `
          <tr>
            <td>${escapeHtml(row[0])}</td>
            <td>${escapeHtml(row[1])}</td>
            <td>${escapeHtml(row[2])}</td>
            <td><strong>+${pointValues[rowIndex]}</strong></td>
          </tr>
        `;
      });

      html += `
              </tbody>
            </table>
          </div>
        </div>
      `;
    }

    html += "</details>";
  }

  return html;
}

// ---------------------
// PROSSIMO PIATTO
// ---------------------

function advance() {
  stopTimer();

  round++;
  turn = 0;
  guesses = [];

  if (round >= order.length) {
    show("game", false);
    show("finish", true);

    document.getElementById("leaderboard").innerHTML =
      renderFinalHistory();

    renderDiscovery();

    return;
  }

  render();
}

// ---------------------
// SCOPRI RISTORANTI
// ---------------------

function renderDiscovery() {
  const area = document.getElementById("dishLinks");

  if (!area) return;

  const city = document
    .getElementById("cityInput")
    .value.trim();

  area.innerHTML = "";

  for (const entry of history) {
    const dish = entry.food.name;

    const link = document.createElement("a");

    link.className = "dish-link";
    link.target = "_blank";
    link.rel = "noopener noreferrer";

    link.href =
      "https://www.google.com/maps/search/?api=1&query=" +
      encodeURIComponent(dish + " restaurant " + city);

    link.textContent =
      entry.food.emoji + " " + dish + " ↗";

    area.appendChild(link);
  }

  const english = language === "en";

  document.getElementById("discoverTitle").textContent =
    english
      ? "Find these dishes in your city"
      : "Scopri i piatti nella tua città";

  document.getElementById("discoverIntro").textContent =
    english
      ? "Explore restaurants that may serve the dishes from your game. Search results open in Google Maps; DISHUP! does not yet verify menus or availability."
      : "Hai giocato con questi piatti: ora puoi cercare ristoranti che potrebbero servirli. I risultati si aprono su Google Maps; DISHUP! non verifica ancora menu o disponibilità.";

  document.getElementById("cityLabel").firstChild.textContent =
    english ? "City " : "Città ";

  document.getElementById("cityInput").placeholder =
    english ? "e.g. Barcelona" : "Es. Barcelona";

  document.getElementById("discoverNote").textContent =
    english
      ? "External search only; Glovo integration is planned, not live."
      : "Questa è una ricerca esterna; l’integrazione con Glovo è prevista, non attiva.";
}

// ---------------------
// AVVIO
// ---------------------

document
  .getElementById("cityInput")
  .addEventListener("input", renderDiscovery);

try {
  language =
    localStorage.getItem("foodgame-language") === "en"
      ? "en"
      : "it";
} catch (error) {}

document.getElementById("languageSelect").value =
  language;

syncOriginOptions();

const languageObserver = new MutationObserver(() => {
  translateVisible();
});

languageObserver.observe(document.body, {
  subtree: true,
  childList: true,
  characterData: true
});

translateVisible();
updateMapLanguage();
