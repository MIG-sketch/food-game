
"use strict";

/* ===================================================
   DISHUP! — 100 DISHES · 5 LANGUAGES
   =================================================== */

const $ = id => document.getElementById(id);

const LANGS = ["it", "en", "fr", "es", "de"];

let language = "it";

try {
  const saved = localStorage.getItem("foodgame-language");
  if (LANGS.includes(saved)) language = saved;
} catch (e) {}

/* ===================================================
   TRANSLATIONS
   =================================================== */

const I18N = {
  it: {
    language: "Lingua",
    choose: "Scegli come giocare",
    solo: "🎯 Single player",
    party: "🎉 Party (stesso schermo)",
    online: "🌐 Online multiplayer",
    players: "Giocatori (separati da virgole)",
    start: "Inizia",
    unavailable: "Il multiplayer online non è ancora disponibile.",
    instructions: "Indovina il paese d'origine, il secolo e i valori nutrizionali per 100 g. Le date storiche sono indicative e talvolta controverse.",
    origin: "Origine",
    mapLabel: "Origine — seleziona un paese sulla mappa",
    noCountry: "Nessun paese selezionato",
    selected: "Selezionato",
    mapHelp: "Tocca un paese per selezionarlo. Puoi ingrandire e spostare la mappa.",
    mapLoading: "Caricamento della mappa del mondo...",
    mapFailed: "Mappa non disponibile. Seleziona un paese dal menu.",
    century: "Secolo di origine",
    centuryUnit: "secolo",
    calories: "Calorie (kcal)",
    protein: "Proteine (g)",
    fat: "Grassi (g)",
    carbs: "Carboidrati (g)",
    submit: "Conferma risposte",
    selectCountry: "Seleziona prima un paese!",
    turn: "Turno di",
    saved: "Risposte salvate!",
    passDevice: "Passa il dispositivo a {name}. Le risposte rimangono segrete.",
    startTurn: "Inizia: {name}",
    allAnswered: "Tutti hanno risposto!",
    revealInfo: "Ora puoi rivelare le risposte.",
    reveal: "Rivela le risposte",
    results: "Risultati",
    roundResults: "Risultati del round",
    country: "Paese",
    centuryShort: "Secolo",
    historicalNote: "Nota storica",
    approximate: "Le date e i valori nutrizionali sono stime indicative per il gioco.",
    next: "Prossimo piatto →",
    finalNext: "Classifica finale →",
    gameOver: "Partita finita!",
    leaderboard: "Classifica generale",
    review: "Rivedi le risposte",
    showAnswers: "Mostra risposte",
    category: "Categoria",
    answer: "Risposta",
    correct: "Corretta",
    points: "Punti",
    discover: "Scopri i piatti nella tua città",
    discoverIntro: "Trova ristoranti che potrebbero servire i piatti del gioco. I risultati si aprono su Google Maps; i menu non sono verificati.",
    city: "Città",
    cityPlaceholder: "Es. Barcelona",
    discoverNote: "Ricerca esterna. L'integrazione con Glovo non è ancora attiva.",
    newGame: "Nuova partita",
    confirmExit: "Vuoi tornare al menu principale? La partita attuale andrà persa.",
    photo: "Foto: Wikipedia / Wikimedia Commons",
    yourName: "Tu",
    historicalGeneric: "La data è un riferimento storico indicativo. Le origini della ricetta possono essere controverse."
  },

  en: {
    language: "Language",
    choose: "Choose how to play",
    solo: "🎯 Single player",
    party: "🎉 Party (shared screen)",
    online: "🌐 Online multiplayer",
    players: "Players (comma-separated)",
    start: "Start",
    unavailable: "Online multiplayer is not available yet.",
    instructions: "Guess the country of origin, century and nutritional values per 100 g. Historical dates are approximate and sometimes disputed.",
    origin: "Origin",
    mapLabel: "Origin — select a country on the map",
    noCountry: "No country selected",
    selected: "Selected",
    mapHelp: "Tap a country to select it. Zoom and drag to explore.",
    mapLoading: "Loading world map...",
    mapFailed: "Map unavailable. Select a country from the menu.",
    century: "Century of origin",
    centuryUnit: "century",
    calories: "Calories (kcal)",
    protein: "Protein (g)",
    fat: "Fat (g)",
    carbs: "Carbohydrates (g)",
    submit: "Submit answers",
    selectCountry: "Select a country first!",
    turn: "Turn for",
    saved: "Answers saved!",
    passDevice: "Pass the device to {name}. Answers remain secret.",
    startTurn: "Start: {name}",
    allAnswered: "Everyone has answered!",
    revealInfo: "You can now reveal the answers.",
    reveal: "Reveal answers",
    results: "Results",
    roundResults: "Round results",
    country: "Country",
    centuryShort: "Century",
    historicalNote: "Historical note",
    approximate: "Dates and nutritional values are approximate gameplay estimates.",
    next: "Next dish →",
    finalNext: "Final leaderboard →",
    gameOver: "Game over!",
    leaderboard: "Overall leaderboard",
    review: "Review answers",
    showAnswers: "Show answers",
    category: "Category",
    answer: "Answer",
    correct: "Correct",
    points: "Points",
    discover: "Find these dishes in your city",
    discoverIntro: "Find restaurants that may serve the dishes from your game. Results open in Google Maps; menus are not verified.",
    city: "City",
    cityPlaceholder: "e.g. Barcelona",
    discoverNote: "External search only. Glovo integration is not active.",
    newGame: "New game",
    confirmExit: "Return to the main menu? Your current game will be lost.",
    photo: "Photo: Wikipedia / Wikimedia Commons",
    yourName: "You",
    historicalGeneric: "This date is an approximate historical reference. The dish's origins may be disputed."
  },

  fr: {
    language: "Langue",
    choose: "Choisissez comment jouer",
    solo: "🎯 Joueur solo",
    party: "🎉 Mode groupe (même écran)",
    online: "🌐 Multijoueur en ligne",
    players: "Joueurs (séparés par des virgules)",
    start: "Commencer",
    unavailable: "Le multijoueur en ligne n'est pas encore disponible.",
    instructions: "Devinez le pays d'origine, le siècle et les valeurs nutritionnelles pour 100 g. Les dates historiques sont approximatives et parfois contestées.",
    origin: "Origine",
    mapLabel: "Origine — sélectionnez un pays sur la carte",
    noCountry: "Aucun pays sélectionné",
    selected: "Sélectionné",
    mapHelp: "Touchez un pays pour le sélectionner. Vous pouvez zoomer et déplacer la carte.",
    mapLoading: "Chargement de la carte du monde...",
    mapFailed: "Carte indisponible. Sélectionnez un pays dans le menu.",
    century: "Siècle d'origine",
    centuryUnit: "siècle",
    calories: "Calories (kcal)",
    protein: "Protéines (g)",
    fat: "Lipides (g)",
    carbs: "Glucides (g)",
    submit: "Valider les réponses",
    selectCountry: "Sélectionnez d'abord un pays !",
    turn: "Tour de",
    saved: "Réponses enregistrées !",
    passDevice: "Passez l'appareil à {name}. Les réponses restent secrètes.",
    startTurn: "Commencer : {name}",
    allAnswered: "Tout le monde a répondu !",
    revealInfo: "Vous pouvez maintenant révéler les réponses.",
    reveal: "Révéler les réponses",
    results: "Résultats",
    roundResults: "Résultats de la manche",
    country: "Pays",
    centuryShort: "Siècle",
    historicalNote: "Note historique",
    approximate: "Les dates et les valeurs nutritionnelles sont des estimations pour le jeu.",
    next: "Plat suivant →",
    finalNext: "Classement final →",
    gameOver: "Partie terminée !",
    leaderboard: "Classement général",
    review: "Revoir les réponses",
    showAnswers: "Afficher les réponses",
    category: "Catégorie",
    answer: "Réponse",
    correct: "Correcte",
    points: "Points",
    discover: "Découvrez ces plats dans votre ville",
    discoverIntro: "Trouvez des restaurants susceptibles de servir ces plats. Les résultats s'ouvrent dans Google Maps ; les menus ne sont pas vérifiés.",
    city: "Ville",
    cityPlaceholder: "Ex. Barcelone",
    discoverNote: "Recherche externe uniquement. L'intégration Glovo n'est pas active.",
    newGame: "Nouvelle partie",
    confirmExit: "Retourner au menu principal ? La partie en cours sera perdue.",
    photo: "Photo : Wikipédia / Wikimedia Commons",
    yourName: "Vous",
    historicalGeneric: "Cette date est une référence historique approximative. L'origine du plat peut être contestée."
  },

  es: {
    language: "Idioma",
    choose: "Elige cómo jugar",
    solo: "🎯 Un jugador",
    party: "🎉 Modo fiesta (misma pantalla)",
    online: "🌐 Multijugador en línea",
    players: "Jugadores (separados por comas)",
    start: "Empezar",
    unavailable: "El multijugador en línea todavía no está disponible.",
    instructions: "Adivina el país de origen, el siglo y los valores nutricionales por 100 g. Las fechas históricas son aproximadas y a veces controvertidas.",
    origin: "Origen",
    mapLabel: "Origen — selecciona un país en el mapa",
    noCountry: "Ningún país seleccionado",
    selected: "Seleccionado",
    mapHelp: "Toca un país para seleccionarlo. Puedes ampliar y mover el mapa.",
    mapLoading: "Cargando el mapa del mundo...",
    mapFailed: "Mapa no disponible. Selecciona un país en el menú.",
    century: "Siglo de origen",
    centuryUnit: "siglo",
    calories: "Calorías (kcal)",
    protein: "Proteínas (g)",
    fat: "Grasas (g)",
    carbs: "Carbohidratos (g)",
    submit: "Confirmar respuestas",
    selectCountry: "¡Selecciona primero un país!",
    turn: "Turno de",
    saved: "¡Respuestas guardadas!",
    passDevice: "Pasa el dispositivo a {name}. Las respuestas siguen siendo secretas.",
    startTurn: "Empezar: {name}",
    allAnswered: "¡Todos han respondido!",
    revealInfo: "Ahora puedes revelar las respuestas.",
    reveal: "Revelar respuestas",
    results: "Resultados",
    roundResults: "Resultados de la ronda",
    country: "País",
    centuryShort: "Siglo",
    historicalNote: "Nota histórica",
    approximate: "Las fechas y los valores nutricionales son estimaciones para el juego.",
    next: "Siguiente plato →",
    finalNext: "Clasificación final →",
    gameOver: "¡Partida terminada!",
    leaderboard: "Clasificación general",
    review: "Revisar respuestas",
    showAnswers: "Mostrar respuestas",
    category: "Categoría",
    answer: "Respuesta",
    correct: "Correcta",
    points: "Puntos",
    discover: "Descubre estos platos en tu ciudad",
    discoverIntro: "Encuentra restaurantes que podrían servir estos platos. Los resultados se abren en Google Maps; los menús no están verificados.",
    city: "Ciudad",
    cityPlaceholder: "Ej. Barcelona",
    discoverNote: "Búsqueda externa. La integración con Glovo no está activa.",
    newGame: "Nueva partida",
    confirmExit: "¿Volver al menú principal? Se perderá la partida actual.",
    photo: "Foto: Wikipedia / Wikimedia Commons",
    yourName: "Tú",
    historicalGeneric: "Esta fecha es una referencia histórica aproximada. El origen del plato puede ser controvertido."
  },

  de: {
    language: "Sprache",
    choose: "Wähle deinen Spielmodus",
    solo: "🎯 Einzelspieler",
    party: "🎉 Party-Modus (gleicher Bildschirm)",
    online: "🌐 Online-Mehrspieler",
    players: "Spieler (durch Kommas getrennt)",
    start: "Starten",
    unavailable: "Online-Mehrspieler ist noch nicht verfügbar.",
    instructions: "Errate das Herkunftsland, das Jahrhundert und die Nährwerte pro 100 g. Historische Datierungen sind ungefähr und manchmal umstritten.",
    origin: "Herkunft",
    mapLabel: "Herkunft — wähle ein Land auf der Karte",
    noCountry: "Kein Land ausgewählt",
    selected: "Ausgewählt",
    mapHelp: "Tippe auf ein Land, um es auszuwählen. Du kannst die Karte zoomen und verschieben.",
    mapLoading: "Weltkarte wird geladen...",
    mapFailed: "Karte nicht verfügbar. Wähle ein Land aus dem Menü.",
    century: "Entstehungsjahrhundert",
    centuryUnit: "Jahrhundert",
    calories: "Kalorien (kcal)",
    protein: "Eiweiß (g)",
    fat: "Fett (g)",
    carbs: "Kohlenhydrate (g)",
    submit: "Antworten bestätigen",
    selectCountry: "Wähle zuerst ein Land!",
    turn: "Am Zug:",
    saved: "Antworten gespeichert!",
    passDevice: "Gib das Gerät an {name} weiter. Die Antworten bleiben geheim.",
    startTurn: "Start: {name}",
    allAnswered: "Alle haben geantwortet!",
    revealInfo: "Jetzt kannst du die Antworten aufdecken.",
    reveal: "Antworten aufdecken",
    results: "Ergebnisse",
    roundResults: "Rundenergebnisse",
    country: "Land",
    centuryShort: "Jahrhundert",
    historicalNote: "Historischer Hinweis",
    approximate: "Daten und Nährwerte sind ungefähre Schätzungen für das Spiel.",
    next: "Nächstes Gericht →",
    finalNext: "Endrangliste →",
    gameOver: "Spiel beendet!",
    leaderboard: "Gesamtrangliste",
    review: "Antworten überprüfen",
    showAnswers: "Antworten anzeigen",
    category: "Kategorie",
    answer: "Antwort",
    correct: "Richtig",
    points: "Punkte",
    discover: "Entdecke diese Gerichte in deiner Stadt",
    discoverIntro: "Finde Restaurants, die diese Gerichte anbieten könnten. Die Ergebnisse öffnen sich in Google Maps; Speisekarten wurden nicht überprüft.",
    city: "Stadt",
    cityPlaceholder: "z. B. Barcelona",
    discoverNote: "Nur externe Suche. Die Glovo-Integration ist nicht aktiv.",
    newGame: "Neues Spiel",
    confirmExit: "Zum Hauptmenü zurückkehren? Das aktuelle Spiel geht verloren.",
    photo: "Foto: Wikipedia / Wikimedia Commons",
    yourName: "Du",
    historicalGeneric: "Dieses Datum ist ein ungefährer historischer Bezugspunkt. Die Herkunft des Gerichts kann umstritten sein."
  }
};

function t(key, replacements = {}) {
  let value = I18N[language][key] || I18N.en[key] || key;

  for (const [name, replacement] of Object.entries(replacements)) {
    value = value.replaceAll(`{${name}}`, replacement);
  }

  return value;
}

const countryTranslations = {
  Italia: ["Italia", "Italy", "Italie", "Italia", "Italien"],
  Giappone: ["Giappone", "Japan", "Japon", "Japón", "Japan"],
  Messico: ["Messico", "Mexico", "Mexique", "México", "Mexiko"],
  India: ["India", "India", "Inde", "India", "Indien"],
  Francia: ["Francia", "France", "France", "Francia", "Frankreich"],
  "Stati Uniti": ["Stati Uniti", "United States", "États-Unis", "Estados Unidos", "Vereinigte Staaten"],
  "Regno Unito": ["Regno Unito", "United Kingdom", "Royaume-Uni", "Reino Unido", "Vereinigtes Königreich"],
  Perù: ["Perù", "Peru", "Pérou", "Perú", "Peru"],
  Libano: ["Libano", "Lebanon", "Liban", "Líbano", "Libanon"],
  Cina: ["Cina", "China", "Chine", "China", "China"],
  "Corea del Sud": ["Corea del Sud", "South Korea", "Corée du Sud", "Corea del Sur", "Südkorea"],
  Thailandia: ["Thailandia", "Thailand", "Thaïlande", "Tailandia", "Thailand"],
  Vietnam: ["Vietnam", "Vietnam", "Vietnam", "Vietnam", "Vietnam"],
  Indonesia: ["Indonesia", "Indonesia", "Indonésie", "Indonesia", "Indonesien"],
  Filippine: ["Filippine", "Philippines", "Philippines", "Filipinas", "Philippinen"],
  Pakistan: ["Pakistan", "Pakistan", "Pakistan", "Pakistán", "Pakistan"],
  Nepal: ["Nepal", "Nepal", "Népal", "Nepal", "Nepal"],
  "Sri Lanka": ["Sri Lanka", "Sri Lanka", "Sri Lanka", "Sri Lanka", "Sri Lanka"],
  Bangladesh: ["Bangladesh", "Bangladesh", "Bangladesh", "Bangladés", "Bangladesch"],
  Egitto: ["Egitto", "Egypt", "Égypte", "Egipto", "Ägypten"],
  Tunisia: ["Tunisia", "Tunisia", "Tunisie", "Túnez", "Tunesien"],
  Marocco: ["Marocco", "Morocco", "Maroc", "Marruecos", "Marokko"],
  Turchia: ["Turchia", "Turkey", "Turquie", "Turquía", "Türkei"],
  Iran: ["Iran", "Iran", "Iran", "Irán", "Iran"],
  Etiopia: ["Etiopia", "Ethiopia", "Éthiopie", "Etiopía", "Äthiopien"],
  Nigeria: ["Nigeria", "Nigeria", "Nigeria", "Nigeria", "Nigeria"],
  Ghana: ["Ghana", "Ghana", "Ghana", "Ghana", "Ghana"],
  Senegal: ["Senegal", "Senegal", "Sénégal", "Senegal", "Senegal"],
  Sudafrica: ["Sudafrica", "South Africa", "Afrique du Sud", "Sudáfrica", "Südafrika"],
  "El Salvador": ["El Salvador", "El Salvador", "Salvador", "El Salvador", "El Salvador"],
  Brasile: ["Brasile", "Brazil", "Brésil", "Brasil", "Brasilien"],
  Argentina: ["Argentina", "Argentina", "Argentine", "Argentina", "Argentinien"],
  Colombia: ["Colombia", "Colombia", "Colombie", "Colombia", "Kolumbien"],
  Venezuela: ["Venezuela", "Venezuela", "Venezuela", "Venezuela", "Venezuela"],
  Spagna: ["Spagna", "Spain", "Espagne", "España", "Spanien"],
  Grecia: ["Grecia", "Greece", "Grèce", "Grecia", "Griechenland"],
  Canada: ["Canada", "Canada", "Canada", "Canadá", "Kanada"],
  Austria: ["Austria", "Austria", "Autriche", "Austria", "Österreich"],
  Germania: ["Germania", "Germany", "Allemagne", "Alemania", "Deutschland"],
  Polonia: ["Polonia", "Poland", "Pologne", "Polonia", "Polen"],
  Ungheria: ["Ungheria", "Hungary", "Hongrie", "Hungría", "Ungarn"],
  Giamaica: ["Giamaica", "Jamaica", "Jamaïque", "Jamaica", "Jamaika"],
  Australia: ["Australia", "Australia", "Australie", "Australia", "Australien"]
};

function countryName(name) {
  const values = countryTranslations[name];
  return values ? values[LANGS.indexOf(language)] : name;
}

/* ===================================================
   DATABASE — EXACTLY 100 DISHES
   name, emoji, country, approximate year,
   kcal, protein, fat, carbohydrates per 100 g
   =================================================== */

const rawFoods = [
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
  carbs: row[7]
}));

console.assert(foods.length === 100, "Expected 100 dishes");

const specs = [
  ["cal", "calories", 900],
  ["protein", "protein", 100],
  ["fat", "fat", 100],
  ["carbs", "carbs", 100]
];

/* ===================================================
   HELPERS
   =================================================== */

function setText(id, text) {
  if ($(id)) $(id).textContent = text;
}

function show(id, visible) {
  if ($(id)) $(id).classList.toggle("hidden", !visible);
}

function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, char => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  })[char]);
}

function century(year) {
  return Math.ceil(year / 100);
}

function roman(number) {
  const values = [
    [10, "X"], [9, "IX"], [5, "V"],
    [4, "IV"], [1, "I"]
  ];

  let result = "";

  for (const [value, symbol] of values) {
    while (number >= value) {
      result += symbol;
      number -= value;
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

/* ===================================================
   ANALYTICS — ANONYMOUS GAME EVENTS
   =================================================== */

function trackGameEvent(eventName, details = {}) {
  if (typeof window.gtag !== "function") return;
  try {
    window.gtag("event", eventName, details);
  } catch (error) {
    console.warn("Analytics event unavailable", error);
  }
}

/* ===================================================
   GAME STATE
   =================================================== */

let mode = "solo";
let players = [];
let scores = {};
let order = [];
let history = [];
let guesses = [];

let round = 0;
let turn = 0;
let remaining = 60;
let timerId = null;
let submitted = false;
let phase = "menu";

function updateBanner() {
  if (phase === "menu") {
    show("scoreBanner", false);
    return;
  }

  show("scoreBanner", true);

  $("scoreBanner").innerHTML = players.map((name, index) => `
    <div class="${phase === "playing" && index === turn ? "active" : ""}">
      ${escapeHTML(name)}: ${scores[name]} pt
      ${phase === "playing" && index === turn ? "●" : ""}
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
    setText("notice", t("unavailable"));
    return;
  }

  mode = selected;
  setText("notice", "");

  show("partySetup", selected === "party");

  if (selected === "solo") start();
}

function start() {
  if (mode === "party") {
    players = [...new Set(
      $("names").value
        .split(",")
        .map(name => name.trim())
        .filter(Boolean)
        .slice(0, 8)
    )];

    if (!players.length) players = ["Player 1"];
  } else {
    players = [t("yourName")];
  }

  scores = Object.fromEntries(players.map(name => [name, 0]));
  order = shuffle(foods).slice(0, 5);

  history = [];
  guesses = [];
  round = 0;
  turn = 0;
  phase = "playing";

  show("setup", false);
  show("finish", false);
  show("game", true);

  render();

  trackGameEvent("game_start", {
    game_mode: mode,
    player_count: players.length,
    total_rounds: order.length
  });
}

function returnToMenu() {
  if (phase === "playing" && !confirm(t("confirmExit"))) {
    return;
  }

  if (phase === "playing" || phase === "handoff" || phase === "results") {
    trackGameEvent("game_abandon", {
      game_mode: mode,
      completed_rounds: history.length
    });
  }

  stopTimer();
  photoRequest++;

  phase = "menu";
  mode = "solo";
  players = [];
  scores = {};
  order = [];
  history = [];
  guesses = [];
  round = 0;
  turn = 0;

  show("setup", true);
  show("game", false);
  show("finish", false);
  show("partySetup", false);
  show("scoreBanner", false);

  setText("notice", "");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

/* ===================================================
   PHOTOS
   =================================================== */

const photoCache = {};
let photoRequest = 0;

async function showDishPhoto(food) {
  const request = ++photoRequest;
  const img = $("dishPhoto");

  img.style.display = "none";
  img.removeAttribute("src");

  $("food").style.display = "block";
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

      if (!response.ok) throw Error("Wikipedia unavailable");

      const data = await response.json();
      const page = Object.values(data.query?.pages || {})[0];

      url = page?.thumbnail?.source;

      if (!url) throw Error("No image");

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

    $("food").style.display = "none";
    setText("photoCredit", t("photo"));
    show("photoCredit", true);

  } catch (error) {
    if (request !== photoRequest) return;
    $("food").style.display = "block";
  }
}

/* ===================================================
   INTERACTIVE WORLD MAP
   =================================================== */

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
  "United States": "Stati Uniti",
  "United States of America": "Stati Uniti",
  "United Kingdom": "Regno Unito",
  China: "Cina",
  "South Korea": "Corea del Sud",
  "Republic of Korea": "Corea del Sud",
  Thailand: "Thailandia",
  Vietnam: "Vietnam",
  Indonesia: "Indonesia",
  Philippines: "Filippine",
  Pakistan: "Pakistan",
  Nepal: "Nepal",
  "Sri Lanka": "Sri Lanka",
  Bangladesh: "Bangladesh",
  Egypt: "Egitto",
  Tunisia: "Tunisia",
  Morocco: "Marocco",
  Turkey: "Turchia",
  Türkiye: "Turchia",
  Iran: "Iran",
  Ethiopia: "Etiopia",
  Nigeria: "Nigeria",
  Ghana: "Ghana",
  Senegal: "Senegal",
  "South Africa": "Sudafrica",
  "El Salvador": "El Salvador",
  Brazil: "Brasile",
  Argentina: "Argentina",
  Colombia: "Colombia",
  Venezuela: "Venezuela",
  Spain: "Spagna",
  Greece: "Grecia",
  Canada: "Canada",
  Austria: "Austria",
  Germany: "Germania",
  Poland: "Polonia",
  Hungary: "Ungheria",
  Jamaica: "Giamaica",
  Australia: "Australia"
};

function canonicalCountry(value) {
  const name = String(value || "").trim();
  return aliases[name] || name;
}

function updateMapLabels() {
  setText("mapLabel", t("mapLabel"));

  setText(
    "selectedCountry",
    selectedCountry
      ? `${t("selected")}: ${countryName(selectedCountry)}`
      : t("noCountry")
  );

  setText(
    "mapHelp",
    mapFailed
      ? t("mapFailed")
      : mapLoading && !mapReady
        ? t("mapLoading")
        : t("mapHelp")
  );
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

  if (mapFailed) {
    showMapFallback();
  } else {
    show("originFallback", false);
    $("worldMap").style.display = "block";

    if (mapReady && countryMap) {
      setTimeout(() => countryMap.invalidateSize(), 150);
    } else {
      initializeCountryMap();
    }
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
      console.warn("Country data unavailable:", url);
    }
  }

  throw Error("Country data unavailable");
}

async function initializeCountryMap() {
  if (mapReady || mapLoading) return;

  mapLoading = true;
  updateMapLabels();

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

    setTimeout(() => countryMap.invalidateSize(), 150);

  } catch (error) {
    console.error("Map error:", error);
    mapFailed = true;
    showMapFallback();

  } finally {
    mapLoading = false;
    updateMapLabels();
  }
}

function showMapFallback() {
  $("worldMap").style.display = "none";
  show("originFallback", true);

  $("origin").onchange = function () {
    selectCountry(this.value);
  };

  updateMapLabels();
}

function setupOriginOptions() {
  const previous = $("origin").value;

  const countries = [...new Set(foods.map(food => food.origin))]
    .sort((a, b) => countryName(a).localeCompare(countryName(b), language));

  $("origin").innerHTML =
    '<option value="">—</option>' +
    countries.map(country => `
      <option value="${escapeHTML(country)}">
        ${escapeHTML(countryName(country))}
      </option>
    `).join("");

  $("origin").value = previous || selectedCountry || "";
}

/* ===================================================
   GAME SCREEN
   =================================================== */

function render() {
  phase = "playing";
  submitted = false;

  const food = order[round];

  setText(
    "status",
    `Round ${round + 1}/${order.length} · ${t("turn")} ${players[turn]}`
  );

  setText("food", food.emoji);
  setText("dish", food.name);
  setText("submit", t("submit"));

  updateBanner();
  showDishPhoto(food);

  let html = `
    <label>
      ${escapeHTML(t("century"))}:
      <select id="century">
        ${Array.from({ length: 22 }, (_, i) => {
          const number = i + 1;

          return `
            <option value="${number}" ${number === 20 ? "selected" : ""}>
              ${roman(number)} ${escapeHTML(t("centuryUnit"))}
            </option>
          `;
        }).join("")}
      </select>
    </label>
  `;

  for (const [key, labelKey, max] of specs) {
    const initial = Math.floor(max / 2);

    html += `
      <label>
        ${escapeHTML(t(labelKey))}:
        <output id="out_${key}">${initial}</output>
        <br>
        <input
          type="range"
          id="${key}"
          min="0"
          max="${max}"
          step="1"
          value="${initial}"
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

/* ===================================================
   SCORING — MAXIMUM 45 POINTS
   =================================================== */

function scoreAnswer(answer, food) {
  const countryPoints =
    canonicalCountry(answer.origin) === canonicalCountry(food.origin)
      ? 7 : 0;

  const difference = Math.abs(answer.century - century(food.year));

  const centuryPoints =
    difference === 0 ? 10 :
    difference === 1 ? 7 : 0;

  const values = {};
  let total = countryPoints + centuryPoints;

  for (const [key] of specs) {
    const delta = Math.abs(answer[key] - food[key]);
    const tolerance = key === "cal" ? 50 : 5;

    const points =
      delta <= tolerance ? 7 :
      delta <= tolerance * 2 ? 3 : 0;

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
  if (submitted || phase !== "playing") return;

  if (!selectedCountry && !timedOut) {
    alert(t("selectCountry"));
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

  phase = "handoff";

  show("submit", false);
  show("timer", false);
  show("food", false);
  show("dish", false);
  show("sliders", false);
  show("mapAnswer", false);
  show("originFallback", false);
  show("handoff", true);

  renderHandoff();
}

function renderHandoff() {
  if (guesses.length < players.length) {
    const next = players[turn + 1];

    setText("handoffTitle", t("saved"));
    setText("handoffText", t("passDevice", { name: next }));
    setText("handoffButton", t("startTurn", { name: next }));
  } else {
    setText("handoffTitle", t("allAnswered"));
    setText("handoffText", t("revealInfo"));
    setText("handoffButton", t("reveal"));
  }
}

function beginNextPlayer() {
  if (phase !== "handoff") return;

  if (guesses.length === players.length) {
    revealRound();
  } else {
    turn++;
    render();
  }
}

function renderRoundResults() {
  const item = history[history.length - 1];
  if (!item) return;

  const food = item.food;

  let html = `<h2>${escapeHTML(t("roundResults"))}</h2>`;

  for (const entry of item.entries) {
    const a = entry.answer;
    const r = entry.result;

    html += `
      <div class="summary">
        <h3>${escapeHTML(entry.player)} — +${r.pts} pt</h3>
        <p>${escapeHTML(t("country"))}:
          ${escapeHTML(a.origin ? countryName(a.origin) : "—")}
          (${escapeHTML(countryName(food.origin))}) — ${r.countryPoints} pt
        </p>
        <p>${escapeHTML(t("centuryShort"))}:
          ${roman(a.century)}
          (${roman(century(food.year))}) — ${r.centuryPoints} pt
        </p>
    `;

    for (const [key, labelKey] of specs) {
      html += `
        <p>${escapeHTML(t(labelKey))}:
          ${a[key]} (${food[key]}) — ${r.values[key]} pt
        </p>
      `;
    }

    html += "</div>";
  }

  html += `
    <p class="muted">
      <b>${escapeHTML(t("historicalNote"))}:</b>
      ${escapeHTML(t("historicalGeneric"))}
    </p>
    <small>${escapeHTML(t("approximate"))}</small>
  `;

  $("results").innerHTML = html;

  setText(
    "next",
    round === order.length - 1 ? t("finalNext") : t("next")
  );
}

function revealRound() {
  stopTimer();

  phase = "results";
  const food = order[round];

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
    `Round ${round + 1}/${order.length} · ${t("results")}`
  );

  renderRoundResults();
  updateBanner();
}

function advance() {
  if (phase !== "results") return;

  stopTimer();

  round++;
  turn = 0;
  guesses = [];

  if (round >= order.length) {
    phase = "finished";

    show("game", false);
    show("finish", true);

    renderFinal();
    updateBanner();

    trackGameEvent("game_complete", {
      game_mode: mode,
      player_count: players.length,
      total_rounds: order.length
    });
    return;
  }

  render();
}

/* ===================================================
   FINAL RESULTS
   =================================================== */

function renderFinalHistory() {
  const ranking = Object.entries(scores)
    .sort((a, b) => b[1] - a[1]);

  let html = `
    <h3>${escapeHTML(t("leaderboard"))}</h3>
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
  html += `<h3>${escapeHTML(t("review"))}</h3>`;

  history.forEach((item, index) => {
    const food = item.food;

    html += `
      <details class="history-round">
        <summary>
          Round ${index + 1} · ${escapeHTML(food.name)}
          <span class="muted">${escapeHTML(t("showAnswers"))}</span>
        </summary>
    `;

    for (const entry of item.entries) {
      const a = entry.answer;
      const r = entry.result;

      const rows = [
        [t("country"), a.origin ? countryName(a.origin) : "—", countryName(food.origin), r.countryPoints],
        [t("centuryShort"), roman(a.century), roman(century(food.year)), r.centuryPoints],
        ...specs.map(([key, labelKey]) => [
          t(labelKey), a[key], food[key], r.values[key]
        ])
      ];

      html += `
        <div class="history-player">
          <h4>${escapeHTML(entry.player)} · +${r.pts} pt</h4>
          <div class="history-scroll">
            <table>
              <thead>
                <tr>
                  <th>${escapeHTML(t("category"))}</th>
                  <th>${escapeHTML(t("answer"))}</th>
                  <th>${escapeHTML(t("correct"))}</th>
                  <th>${escapeHTML(t("points"))}</th>
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

/* ===================================================
   RESTAURANT DISCOVERY
   =================================================== */

function renderDiscovery() {
  const city = $("cityInput").value.trim();

  setText("discoverTitle", t("discover"));
  setText("discoverIntro", t("discoverIntro"));
  setText("discoverNote", t("discoverNote"));
  setText("cityLabel", t("city"));

  $("cityInput").placeholder = t("cityPlaceholder");

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
  setText("finishTitle", t("gameOver"));
  setText("newGameButton", t("newGame"));

  $("leaderboard").innerHTML = renderFinalHistory();
  renderDiscovery();
}

/* ===================================================
   LANGUAGE SWITCHING
   =================================================== */

function updateLanguage() {
  document.documentElement.lang = language;
  $("languageSelect").value = language;

  setText("languageLabel", t("language"));
  setText("setupTitle", t("choose"));
  setText("soloButton", t("solo"));
  setText("partyButton", t("party"));
  setText("onlineButton", t("online"));
  setText("playersLabel", t("players"));
  setText("startButton", t("start"));
  setText("instructions", t("instructions"));
  setText("fallbackLabel", t("origin"));
  setText("submit", t("submit"));

  setupOriginOptions();
  updateMapLabels();

  if (phase === "playing") {
    // Preserve all current slider and century values.
    const current = {};

    for (const [key] of specs) {
      if ($(key)) current[key] = $(key).value;
    }

    const oldCentury = $("century")?.value;

    // Rebuild only the answer controls.
    const centuryOptions = Array.from({ length: 22 }, (_, i) => {
      const number = i + 1;

      return `
        <option value="${number}">
          ${roman(number)} ${escapeHTML(t("centuryUnit"))}
        </option>
      `;
    }).join("");

    let html = `
      <label>
        ${escapeHTML(t("century"))}:
        <select id="century">${centuryOptions}</select>
      </label>
    `;

    for (const [key, labelKey, max] of specs) {
      const value = current[key] ?? Math.floor(max / 2);

      html += `
        <label>
          ${escapeHTML(t(labelKey))}:
          <output id="out_${key}">${value}</output>
          <br>
          <input type="range"
            id="${key}"
            min="0"
            max="${max}"
            step="1"
            value="${value}">
        </label>
      `;
    }

    $("sliders").innerHTML = html;

    $("century").value = oldCentury || "20";

    for (const [key] of specs) {
      $(key).addEventListener("input", event => {
        setText(`out_${key}`, event.target.value);
      });
    }

    setText(
      "status",
      `Round ${round + 1}/${order.length} · ${t("turn")} ${players[turn]}`
    );
  }

  if (phase === "handoff") {
    renderHandoff();
  }

  if (phase === "results") {
    setText(
      "status",
      `Round ${round + 1}/${order.length} · ${t("results")}`
    );
    renderRoundResults();
  }

  if (phase === "finished") {
    renderFinal();
  }

  if ($("notice").textContent.trim()) {
    setText("notice", t("unavailable"));
  }

  if (!$("photoCredit").classList.contains("hidden")) {
    setText("photoCredit", t("photo"));
  }
}

function setLanguage(value) {
  if (!LANGS.includes(value)) return;

  language = value;

  try {
    localStorage.setItem("foodgame-language", language);
  } catch (e) {}

  updateLanguage();
}

/* ===================================================
   INITIALIZATION
   =================================================== */

function initialize() {
  $("cityInput").addEventListener("input", renderDiscovery);

  $("origin").addEventListener("change", function () {
    if (mapFailed) selectCountry(this.value);
  });

  phase = "menu";

  show("setup", true);
  show("game", false);
  show("finish", false);
  show("partySetup", false);
  show("scoreBanner", false);

  updateLanguage();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initialize);
} else {
  initialize();
}
