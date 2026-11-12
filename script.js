
const translations={
 'Scegli come giocare':'Choose how to play','Party (stesso schermo)':'Party (shared screen)','Giocatori (separati da virgole)':'Players (comma-separated)','Inizia':'Start','Partita finita!':'Game over!','Nuova partita':'New game','Fotografia del piatto':'Photo of the dish','Foto: Wikimedia Commons / Wikipedia':'Photo: Wikimedia Commons / Wikipedia','Indovina il paese d’origine, il secolo e i valori nutrizionali per 100 g. I secoli sono riferimenti storici convenzionali e talvolta controversi.':'Guess the country of origin, century and nutritional values per 100 g. Centuries are conventional historical references and sometimes disputed.','Origine':'Origin','Conferma risposte':'Submit answers','Continua →':'Continue →','Calorie (kcal)':'Calories (kcal)','Proteine (g)':'Protein (g)','Grassi (g)':'Fat (g)','Carboidrati (g)':'Carbohydrates (g)','Secolo di origine:':'Century of origin:','secolo':'century','Round':'Round','Turno di':'Turn for','Risultati':'Results','Risultati del round':'Round results','Paese':'Country','Secolo':'Century','corretto:':'correct:','punti':'points','Tempo scaduto':'Time is up','tempo scaduto':'time expired','risposte salvate':'answers saved','Risposte salvate!':'Answers saved!','Passa il dispositivo a':'Pass the device to','Nessuna risposta è stata rivelata. Il prossimo giocatore vedrà lo stesso piatto e avrà 60 secondi.':'No answers have been revealed. The next player will see the same dish and have 60 seconds.','Inizia il turno':'Start turn','Tutti hanno risposto!':'Everyone has answered!','Ora possiamo rivelare le risposte e aggiornare la classifica.':'Now we can reveal the answers and update the leaderboard.','Rivela le risposte':'Reveal answers','Nota storica:':'Historical note:','Valori nutrizionali dimostrativi; fonti e ricette standard da verificare prima della pubblicazione.':'Illustrative nutritional values; sources and standard recipes must be verified before publication.','Classifica finale →':'Final leaderboard →','Prossimo piatto →':'Next dish →','Classifica generale':'Overall leaderboard','Rivedi le risposte':'Review answers','Apri un piatto per confrontare le risposte di tutti i giocatori. I risultati sono visibili solo a partita conclusa.':'Open a dish to compare all players’ answers. Results are only available after the game ends.','Mostra risposte':'Show answers','Risposte corrette:':'Correct answers:','proteine':'protein','grassi':'fat','carboidrati':'carbohydrates','per 100 g':'per 100 g','Risposta':'Answer','Corretta':'Correct','Punti':'Points','Italia':'Italy','Giappone':'Japan','Messico':'Mexico','India':'India','Francia':'France','Perù':'Peru','Libano':'Lebanon','Stati Uniti':'United States','Regno Unito':'United Kingdom','Il multiplayer online richiede un server per sincronizzare le stanze. Questa demo include Single Player e Party Mode.':'Online multiplayer requires a server to synchronize rooms. This demo includes Single Player and Party Mode.','Giocatore 1':'Player 1','Tu':'You','è la data tradizionalmente associata alla dedica alla regina Margherita; l’origine della ricetta è dibattuta.':'is traditionally associated with the dedication to Queen Margherita; the recipe’s origin is debated.','Attribuita a Caesar Cardini a Tijuana nel 1924.':'Attributed to Caesar Cardini in Tijuana in 1924.','Generalmente attribuiti a Ignacio Anaya nel 1943.':'Generally attributed to Ignacio Anaya in 1943.','Data indicativa: la storia del tiramisù moderno e la sua attribuzione sono controverse.':'Approximate date: the history and attribution of modern tiramisu are disputed.','Data indicativa del consolidamento della versione moderna; deriva da tradizioni precedenti.':'Approximate date for the modern version; it evolved from earlier traditions.','Origine e data dibattute; 1970 è una stima convenzionale, non un anno accertato.':'Origin and date are disputed; 1970 is a conventional estimate, not a confirmed year.','Anno indicativo associato alle ricostruzioni del dopoguerra; esistono versioni contrastanti.':'Approximate postwar date; competing accounts exist.','Una delle attribuzioni più note risale al 1904 in Pennsylvania.':'One widely cited attribution dates to 1904 in Pennsylvania.'
};
let language='it';
function t(v){if(language==='it')return String(v);let a=String(v);if(translations[a])return translations[a];return a.replace(/Italia|Giappone|Messico|Francia|Perù|Libano|Stati Uniti|Regno Unito|Calorie \(kcal\)|Proteine \(g\)|Grassi \(g\)|Carboidrati \(g\)|proteine|grassi|carboidrati|corretto:|secolo|punti|Tempo scaduto|tempo scaduto|Round|Turno di|Risultati|Paese|Secolo|Origine|Risposta|Corretta|Punti|Mostra risposte|Inizia|Conferma risposte|Nuova partita|Continua →|Risposte salvate!/g,m=>translations[m]||m)}
let translating=false;
function translateVisible(){if(translating)return;translating=true;document.documentElement.lang=language;if(document.getElementById('languageLabel').textContent!==(language==='it'?'Lingua':'Language'))document.getElementById('languageLabel').textContent=language==='it'?'Lingua':'Language';document.getElementById('languageSelect').value=language;const walker=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT);let node;while(node=walker.nextNode()){if(node.parentElement?.closest('script,style,#languagePanel,#origin'))continue;const raw=node.textContent;if(node.__lastRendered!==undefined&&raw!==node.__lastRendered)node.__itText=raw;if(node.__itText===undefined)node.__itText=raw;const original=node.__itText;const clean=original.trim();const translated=language==='en'?t(clean):clean;const out=clean?original.replace(clean,translated):original;if(raw!==out)node.textContent=out;node.__lastRendered=out;}const img=document.getElementById('dishPhoto');img.alt=language==='en'?'Photo of the dish':'Fotografia del piatto';translating=false;}
function setLanguage(l){language=l==='en'?'en':'it';try{localStorage.setItem('foodgame-language',language)}catch(e){}refreshLanguage();}
function refreshLanguage(){if(!document.getElementById('finish').classList.contains('hidden'))renderDiscovery();syncOriginOptions();if(!document.getElementById('finish').classList.contains('hidden'))document.getElementById('leaderboard').innerHTML=renderFinalHistory();translateVisible();}
let lastResultsHtml='';
const foods=[
{name:'Pizza Margherita',emoji:'🍕',origin:'Italia',year:1889,yearNote:'1889 è la data tradizionalmente associata alla dedica alla regina Margherita; l’origine della ricetta è dibattuta.',cal:250,protein:11,fat:9,carbs:31},
{name:'Caesar salad',emoji:'🥗',origin:'Messico',year:1924,yearNote:'Attribuita a Caesar Cardini a Tijuana nel 1924.',cal:190,protein:7,fat:16,carbs:5},
{name:'Nachos',emoji:'🧀',origin:'Messico',year:1943,yearNote:'Generalmente attribuiti a Ignacio Anaya nel 1943.',cal:310,protein:9,fat:18,carbs:29},
{name:'Tiramisù',emoji:'🍰',origin:'Italia',year:1970,yearNote:'Data indicativa: la storia del tiramisù moderno e la sua attribuzione sono controverse.',cal:290,protein:6,fat:19,carbs:25},
{name:'Tacos al pastor',emoji:'🌮',origin:'Messico',year:1960,yearNote:'Data indicativa del consolidamento della versione moderna; deriva da tradizioni precedenti.',cal:220,protein:12,fat:10,carbs:20},
{name:'Chicken tikka masala',emoji:'🍛',origin:'Regno Unito',year:1970,yearNote:'Origine e data dibattute; 1970 è una stima convenzionale, non un anno accertato.',cal:160,protein:13,fat:9,carbs:7},
{name:'Pasta alla carbonara',emoji:'🍝',origin:'Italia',year:1944,yearNote:'Anno indicativo associato alle ricostruzioni del dopoguerra; esistono versioni contrastanti.',cal:280,protein:12,fat:13,carbs:28},
{name:'Banana split',emoji:'🍌',origin:'Stati Uniti',year:1904,yearNote:'Una delle attribuzioni più note risale al 1904 in Pennsylvania.',cal:210,protein:3,fat:9,carbs:31}
];const specs=[['cal','Calorie (kcal)',900],['protein','Proteine (g)',100],['fat','Grassi (g)',100],['carbs','Carboidrati (g)',100]];let history=[];let mode='solo',players=['Tu'],scores={},round=0,turn=0,order=[],timerId=null,remaining=60,submitted=false,guesses=[];
function century(y){return Math.ceil(y/100)}
function roman(n){const nums=[[10,'X'],[9,'IX'],[5,'V'],[4,'IV'],[1,'I']];let a='';for(const [v,c] of nums)while(n>=v){a+=c;n-=v}return a}
function updateBanner(){const b=document.getElementById('scoreBanner');b.classList.remove('hidden');b.innerHTML=players.map((p,i)=>`<div class="${i===turn?'active':''}">${p.replace(/</g,'&lt;')}: ${scores[p]} pt${i===turn?' ●':''}</div>`).join('')}
function stopTimer(){if(timerId!==null){clearInterval(timerId);timerId=null}}
function startTimer(){stopTimer();remaining=60;document.getElementById('timer').textContent='⏱ 60 s';timerId=setInterval(()=>{remaining--;document.getElementById('timer').textContent=`⏱ ${remaining} s`;if(remaining<=0){stopTimer();submitGuess(true)}},1000)}function setMode(m){mode=m;if(m==='online'){document.getElementById('notice').textContent='Il multiplayer online richiede un server per sincronizzare le stanze. Questa demo include Single Player e Party Mode.';return}if(m==='party'){document.getElementById('partySetup').classList.remove('hidden');return}start()}function start(){if(mode==='party')players=document.getElementById('names').value.split(',').map(x=>x.trim()).filter(Boolean).slice(0,8);if(!players.length)players=['Giocatore 1'];players.forEach(p=>scores[p]=0);order=[...foods].sort(()=>Math.random()-.5).slice(0,5);guesses=[];history=[];document.getElementById('setup').classList.add('hidden');document.getElementById('game').classList.remove('hidden');render()}function show(el,visible){document.getElementById(el).classList.toggle('hidden',!visible)}
const wikiTitles={
 'Pizza Margherita':['Pizza Margherita','Pizza'],
 'Caesar salad':['Caesar salad'],
 'Nachos':['Nachos'],
 'Tiramisù':['Tiramisu'],
 'Tacos al pastor':['Tacos al pastor','Al pastor'],
 'Chicken tikka masala':['Chicken tikka masala'],
 'Pasta alla carbonara':['Carbonara'],
 'Banana split':['Banana split']
};
const photoCache={};
let photoRequestNumber=0;
function loadImageCandidate(img,url){
 return new Promise((resolve,reject)=>{
  const test=new Image();
  test.onload=()=>resolve(url);
  test.onerror=()=>reject(new Error('Image failed'));
  test.src=url;
 });
}
async function wikipediaPhoto(title){
 const api='https://en.wikipedia.org/w/api.php?action=query&format=json&origin=*&prop=pageimages&piprop=thumbnail&pithumbsize=900&redirects=1&titles='+encodeURIComponent(title);
 const rest='https://en.wikipedia.org/api/rest_v1/page/summary/'+encodeURIComponent(title.replace(/ /g,'_'));
 const endpoints=[
  async()=>{const r=await fetch(rest);if(!r.ok)throw Error('REST');const d=await r.json();return d.thumbnail?.source||d.originalimage?.source},
  async()=>{const r=await fetch(api);if(!r.ok)throw Error('API');const d=await r.json();return Object.values(d.query?.pages||{})[0]?.thumbnail?.source}
 ];
 for(const get of endpoints){try{const url=await get();if(url)return url}catch(e){}}
 return null;
}
async function showDishPhoto(f){
 const img=document.getElementById('dishPhoto');
 const emoji=document.getElementById('food');
 const credit=document.getElementById('photoCredit');
 const request=++photoRequestNumber;
 const current=()=>request===photoRequestNumber&&order[round]?.name===f.name;
 img.style.display='none';img.removeAttribute('src');emoji.style.display='block';credit.classList.add('hidden');credit.textContent='Foto: Wikimedia Commons / Wikipedia';credit.onclick=null;credit.style.cursor='';
 const titles=wikiTitles[f.name]||[f.name];
 const urls=[];
 if(photoCache[f.name])urls.push(photoCache[f.name]);
 for(const title of titles){
  const url=await wikipediaPhoto(title);
  if(!current())return;
  if(url&&!urls.includes(url))urls.push(url);
 }
 for(const url of urls){
  try{
   await loadImageCandidate(img,url);
   if(!current())return;
   img.alt='Fotografia di '+f.name;
   img.src=url;
   img.style.display='block';emoji.style.display='none';credit.classList.remove('hidden');
   photoCache[f.name]=url;
   return;
  }catch(e){}
 }
 // The local WhatsApp/iOS file viewer may block both Wikipedia APIs.
 // Keep the emoji and offer a direct Wikipedia link rather than a broken image.
 if(current()){
  credit.classList.remove('hidden');
  credit.textContent=(language==='en'?'Photo unavailable in this viewer. Open on Wikipedia':'Foto non disponibile in questo visualizzatore. Apri su Wikipedia');
  credit.style.cursor='pointer';
  credit.onclick=()=>window.open('https://en.wikipedia.org/wiki/'+encodeURIComponent(titles[0].replace(/ /g,'_')),'_blank');
 }
}
function render(){
 submitted=false;
 const f=order[round];
 updateBanner();
 document.getElementById('status').textContent=`Round ${round+1}/${order.length} · Turno di ${players[turn]}`;
 document.getElementById('food').textContent=f.emoji;
 showDishPhoto(f);
 document.getElementById('dish').textContent=f.name;
 syncOriginOptions();document.getElementById('origin').value='Italia';
 document.getElementById('sliders').innerHTML='<label>Secolo di origine: <select id="century">'+Array.from({length:22},(_,i)=>`<option value="${i+1}" ${i===19?'selected':''}>${roman(i+1)} secolo</option>`).join('')+'</select></label>'+specs.map(([k,n,max])=>{let initial=Math.floor(max/2);return `<label>${n}: <output id="out_${k}">${initial}</output><br><input type="range" id="${k}" min="0" max="${max}" step="1" value="${initial}" oninput="document.getElementById('out_${k}').textContent=this.value"></label>`}).join('');
 document.getElementById('results').innerHTML='';
 show('handoff',false);show('submit',true);show('next',false);
 document.getElementById('origin').closest('label').classList.add('hidden');show('mapAnswer',true);resetCountryMap();
 show('sliders',true);show('food',true);show('dish',true);show('timer',true);
 startTimer();
}
function submitGuess(timedOut=false){
 if(submitted)return;
 submitted=true;stopTimer();
 const answer={origin:canonicalCountry(selectedMapCountry||document.getElementById('origin').value),century:+document.getElementById('century').value};
 for(const [k] of specs)answer[k]=+document.getElementById(k).value;
 guesses.push({playerIndex:turn,answer,timedOut});
 // No scoring or correct answers are shown until every player has answered.
 show('submit',false);show('timer',false);show('food',false);show('dish',false);show('sliders',false);
 document.getElementById('origin').closest('label').classList.add('hidden');
 show('mapAnswer',false);show('handoff',true);
 if(guesses.length<players.length){
  const nextPlayer=players[turn+1];
  document.getElementById('handoffTitle').textContent=timedOut?'Tempo scaduto — risposte salvate':'Risposte salvate!';
  document.getElementById('handoffText').textContent=`Passa il dispositivo a ${nextPlayer}. Nessuna risposta è stata rivelata. Il prossimo giocatore vedrà lo stesso piatto e avrà 60 secondi.`;
  document.getElementById('handoffButton').textContent=`Inizia: ${nextPlayer}`;
  show('handoffButton',true);
 }else{
  document.getElementById('handoffTitle').textContent='Tutti hanno risposto!';
  document.getElementById('handoffText').textContent='Ora possiamo rivelare le risposte e aggiornare la classifica.';
  document.getElementById('handoffButton').textContent='Rivela le risposte';
 }
}
function beginNextPlayer(){
 if(guesses.length===players.length){revealRound();return}
 turn++;render();
}
function syncOriginOptions(){
 const el=document.getElementById('origin');
 if(!el)return;
 for(const opt of el.options){
  const stable=canonicalCountry(opt.value);
  opt.value=stable;
  opt.textContent=language==='en'?t(stable):stable;
 }
}
function canonicalCountry(v){const map={'Italy':'Italia','Japan':'Giappone','Mexico':'Messico','France':'Francia','Peru':'Perù','Lebanon':'Libano','United States':'Stati Uniti','United Kingdom':'Regno Unito'};return map[String(v).trim()]||String(v).trim()}
function scoreAnswer(a,f){
 let pts=canonicalCountry(a.origin)===canonicalCountry(f.origin)?7:0;
 const realCentury=century(f.year),distance=Math.abs(a.century-realCentury);
 const centuryPts=distance===0?10:distance===1?7:0;
 pts+=centuryPts;
 const details=[`Paese: ${a.origin} (corretto: ${f.origin}) — ${canonicalCountry(a.origin)===canonicalCountry(f.origin)?7:0} pt`,`Secolo: ${roman(a.century)} (corretto: ${roman(realCentury)}) — ${centuryPts} pt`];
 for(const [k,n] of specs){const d=Math.abs(a[k]-f[k]),t=k==='cal'?50:5,p=d<=t?7:d<=2*t?3:0;pts+=p;details.push(`${n}: ${a[k]} (corretto: ${f[k]}) — ${p} pt`)}
 return {pts,details};
}
function revealRound(){
 stopTimer();show('handoff',false);show('results',true);show('next',true);
 document.getElementById('status').textContent=`Round ${round+1}/${order.length} · Risultati`;
 const f=order[round];
 document.getElementById('food').textContent=f.emoji;
 showDishPhoto(f);document.getElementById('dish').textContent=f.name;
 show('food',true);show('dish',true);show('mapAnswer',false);
 let html='<h2>Risultati del round</h2>';
 for(const g of guesses){
  const result=scoreAnswer(g.answer,f),name=players[g.playerIndex];
  scores[name]+=result.pts;
  const safe=name.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  html+=`<div class="summary"><h3>${safe} — +${result.pts} punti${g.timedOut?' (tempo scaduto)':''}</h3>${result.details.map(d=>`<p>${d}</p>`).join('')}</div>`;
 }
 history.push({food:f,entries:guesses.map(g=>({player:players[g.playerIndex],answer:{...g.answer},timedOut:g.timedOut,result:scoreAnswer(g.answer,f)}))});
 html+=`<p class="muted"><b>Nota storica:</b> ${f.yearNote}</p><small>Valori nutrizionali dimostrativi; fonti e ricette standard da verificare prima della pubblicazione.</small>`;
 document.getElementById('results').innerHTML=html;
 updateBanner();
 document.getElementById('next').textContent=round===order.length-1?'Classifica finale →':'Prossimo piatto →';
}

function escapeHtml(v){return String(v).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;')}
function renderFinalHistory(){
 const ranking=Object.entries(scores).sort((a,b)=>b[1]-a[1]);
 let html='<h3>Classifica generale</h3><div class="final-ranking">'+ranking.map(([name,score],i)=>`<div class="rank-row"><strong>${i+1}° ${escapeHtml(name)}</strong><strong>${score} pt</strong></div>`).join('')+'</div>';
 html+='<h3>Rivedi le risposte</h3><p class="muted">Apri un piatto per confrontare le risposte di tutti i giocatori. I risultati sono visibili solo a partita conclusa.</p>';
 for(let i=0;i<history.length;i++){
  const h=history[i],f=h.food;
  html+=`<details class="history-round"><summary>Round ${i+1} · ${escapeHtml(f.name)} <span class="muted">Mostra risposte</span></summary>`;
  html+=`<p class="muted">Risposte corrette: ${escapeHtml(f.origin)} · ${roman(century(f.year))} secolo · ${f.cal} kcal · ${f.protein} g proteine · ${f.fat} g grassi · ${f.carbs} g carboidrati (per 100 g)</p>`;
  for(const entry of h.entries){
   const a=entry.answer,r=entry.result;
   const rows=[['Paese',a.origin,f.origin],['Secolo',roman(a.century),roman(century(f.year))],['Calorie',a.cal+' kcal',f.cal+' kcal'],['Proteine',a.protein+' g',f.protein+' g'],['Grassi',a.fat+' g',f.fat+' g'],['Carboidrati',a.carbs+' g',f.carbs+' g']];
   const pointValues=[canonicalCountry(a.origin)===canonicalCountry(f.origin)?7:0,Math.abs(a.century-century(f.year))===0?10:Math.abs(a.century-century(f.year))===1?7:0,...specs.map(([k])=>{let d=Math.abs(a[k]-f[k]),t=k==='cal'?50:5;return d<=t?7:d<=t*2?3:0})];
   html+=`<div class="history-player"><h4>${escapeHtml(entry.player)} · +${r.pts} punti${entry.timedOut?' · Tempo scaduto':''}</h4><div class="history-scroll"><table><thead><tr><th>Categoria</th><th>Risposta</th><th>Corretta</th><th>Punti</th></tr></thead><tbody>`;
   rows.forEach((row,j)=>{html+=`<tr><td>${escapeHtml(row[0])}</td><td>${escapeHtml(row[1])}</td><td>${escapeHtml(row[2])}</td><td><strong>+${pointValues[j]}</strong></td></tr>`});
   html+='</tbody></table></div></div>';
  }
  html+='</details>';
 }
 return html;
}

function advance(){
 stopTimer();round++;turn=0;guesses=[];
 if(round>=order.length){
  show('game',false);show('finish',true);
  document.getElementById('leaderboard').innerHTML=renderFinalHistory();
  renderDiscovery();
  return;
 }
 render();
}
function renderDiscovery(){
 const area=document.getElementById('dishLinks');if(!area)return;
 const city=document.getElementById('cityInput').value.trim();
 area.innerHTML='';
 for(const entry of history){
  const dish=entry.food.name;
  const link=document.createElement('a');link.className='dish-link';link.target='_blank';link.rel='noopener noreferrer';
  link.href='https://www.google.com/maps/search/?api=1&query='+encodeURIComponent(dish+' restaurant '+city);
  link.textContent=entry.food.emoji+' '+dish+' ↗';
  area.appendChild(link);
 }
 const en=language==='en';
 document.getElementById('discoverTitle').textContent=en?'Find these dishes in your city':'Scopri i piatti nella tua città';
 document.getElementById('discoverIntro').textContent=en?'Explore restaurants that may serve the dishes from your game. Search results open in Google Maps; FOOD? does not yet verify menus or availability.':'Hai giocato con questi piatti: ora puoi cercare ristoranti che potrebbero servirli. I risultati si aprono su Google Maps; FOOD? non verifica ancora menu o disponibilità.';
 document.getElementById('cityLabel').firstChild.textContent=en?'City ':'Città ';
 document.getElementById('cityInput').placeholder=en?'e.g. Barcelona':'Es. Barcelona';
 document.getElementById('discoverNote').textContent=en?'External search only; Glovo integration is planned, not live.':'Questa è una ricerca esterna; l’integrazione con Glovo è prevista, non attiva.';
}
document.getElementById('cityInput').addEventListener('input',renderDiscovery);
try{language=localStorage.getItem('foodgame-language')==='en'?'en':'it'}catch(e){}document.getElementById('languageSelect').value=language;syncOriginOptions();const languageObserver=new MutationObserver(()=>translateVisible());languageObserver.observe(document.body,{subtree:true,childList:true,characterData:true});translateVisible();

// Country map: geographic data loaded from public GeoJSON dataset.
let countryMap=null, countryLayer=null, selectedLayer=null, selectedMapCountry=null;
const countryAliases={
 'Italy':'Italia','Japan':'Giappone','Mexico':'Messico','India':'India','France':'Francia',
 'Peru':'Perù','Lebanon':'Libano','United States of America':'Stati Uniti',
 'United States':'Stati Uniti','United Kingdom':'Regno Unito',
 'Türkiye':'Turchia','Turkey':'Turchia','South Korea':'Corea del Sud'
};
function resetCountryMap(){
 selectedMapCountry=null;
 document.getElementById('selectedCountry').textContent=language==='en'?'No country selected':'Nessun paese selezionato';
 if(selectedLayer){countryLayer&&countryLayer.resetStyle(selectedLayer);selectedLayer=null;}
 if(!countryMap){initializeCountryMap();}else{setTimeout(()=>countryMap.invalidateSize(),50);}
}
async function initializeCountryMap(){
 if(countryMap||!window.L){showMapFallback();return;}
 countryMap=L.map('worldMap',{minZoom:1,maxZoom:6,worldCopyJump:true}).setView([18,8],2);
 L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png',{
  attribution:'&copy; OpenStreetMap contributors &copy; CARTO',maxZoom:19
 }).addTo(countryMap);
 try{
  const response=await fetch('https://cdn.jsdelivr.net/gh/datasets/geo-countries@master/data/countries.geojson');
  if(!response.ok)throw Error('GeoJSON unavailable');
  const data=await response.json();
  countryLayer=L.geoJSON(data,{
   style:{color:'#4288a9',weight:1,fillColor:'#8ed6ee',fillOpacity:.45},
   onEachFeature(feature,layer){
    const p=feature.properties||{};
    const name=p.ADMIN||p.name||p.NAME||'Unknown';
    layer.bindTooltip(name,{sticky:true});
    layer.on('click',()=>{
     if(selectedLayer)countryLayer.resetStyle(selectedLayer);
     selectedLayer=layer;
     layer.setStyle({fillColor:'#ffad4f',fillOpacity:.85,color:'#07577c',weight:2});
     if(layer.bringToFront)layer.bringToFront();
     selectedMapCountry=countryAliases[name]||name;
     document.getElementById('selectedCountry').textContent=(language==='en'?'Selected: ':'Selezionato: ')+name;
     // Retain original scoring logic; arbitrary world countries are valid guesses.
     document.getElementById('origin').value=selectedMapCountry;
    });
   }
  }).addTo(countryMap);
  setTimeout(()=>countryMap.invalidateSize(),100);
 }catch(err){showMapFallback();}
}
function showMapFallback(){
 document.getElementById('worldMap').style.display='none';
 document.getElementById('mapHelp').textContent=language==='en'?'Map unavailable: choose from the country list below.':'Mappa non disponibile: scegli dal menu qui sotto.';
 document.getElementById('originFallback').classList.remove('hidden');
}
