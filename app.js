const DATA = LEARNOVA_DATA;
const OWL = LEARNOVA_OWL;

const state = {
  role: "student",
  view: "home",
  plan: "free",
  library:{ tab:"papers", level:"all", sort:"Newest", search:"" },
  quiz:{ tab:"play", difficulty:"Low", myRanks:{} },
  board:{ sort:"By rank", search:"" },
  compete:{ tab:"rooms", monthlyCategory:"form5-sci", monthlyMode:"individual" },
  classes:{ sort:"Top rated", search:"" },
  notices:{ tab:"official" },
  credits:480,
  hasUnlocked:false,
  registeredMonthly:false,
  registeredHackathon:false,
  paymentHistory: loadPaymentHistory()
};

const ICONS = {
  paper:'<svg viewBox="0 0 24 24" fill="none"><path d="M7 3h7l4 4v14H7V3Z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/><path d="M10 12h5M10 15h5M10 9h2" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>',
  note:'<svg viewBox="0 0 24 24" fill="none"><path d="M5 4h14v16H5z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/><path d="M8 9h8M8 13h8M8 17h5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>',
  video:'<svg viewBox="0 0 24 24" fill="none"><rect x="3" y="5" width="14" height="14" rx="2" stroke="currentColor" stroke-width="1.6"/><path d="m17 10 4-2v8l-4-2" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/></svg>',
  desk:'<svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.6"/><path d="M12 8v4l3 2" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>',
  crown:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M3 8l4 3 5-6 5 6 4-3-2 10H5L3 8Z"/></svg>',
  shield:'<svg viewBox="0 0 24 24" fill="none"><path d="M12 3l7 3v6c0 4.5-3 8-7 9-4-1-7-4.5-7-9V6l7-3Z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/></svg>',
  phone:'<svg viewBox="0 0 24 24" fill="none"><rect x="7" y="2" width="10" height="20" rx="2" stroke="currentColor" stroke-width="1.7"/><path d="M11 18h2" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>',
  check:'<svg viewBox="0 0 24 24" fill="none"><path d="m5 13 4 4 10-10" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  dot:'<svg viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="4"/></svg>',
  checkCircle:'<svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.7"/><path d="m8 12.5 2.5 2.5 5-5.5" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  print:'<svg viewBox="0 0 24 24" width="15" height="15" fill="none"><path d="M7 8V3h10v5M7 17H5a1 1 0 0 1-1-1v-5a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1h-2" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/><rect x="7" y="14" width="10" height="7" stroke="currentColor" stroke-width="1.6"/></svg>',
  download:'<svg viewBox="0 0 24 24" width="15" height="15" fill="none"><path d="M12 3v12m0 0 4-4m-4 4-4-4M5 19h14" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  receipt:'<svg viewBox="0 0 24 24" fill="none"><path d="M6 3h12v18l-3-2-3 2-3-2-3 2V3Z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/><path d="M9 8h6M9 12h6" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>'
};

const QUIZ_QUESTIONS = [
  { q:"Simplify: 3x + 5x", options:["8x","15x","8x\u00b2","2x"], answer:0 },
  { q:"Which gas do plants absorb for photosynthesis?", options:["Oxygen","Nitrogen","Carbon dioxide","Hydrogen"], answer:2 },
  { q:"The capital of Cameroon is:", options:["Douala","Yaound\u00e9","Bamenda","Buea"], answer:1 },
  { q:"Solve: 12 \u00f7 4 + 3 \u00d7 2", options:["9","12","15","6"], answer:1 },
  { q:"Which of these is a noble gas?", options:["Chlorine","Neon","Sodium","Sulfur"], answer:1 }
];

function $(sel, root=document){ return root.querySelector(sel); }
function $all(sel, root=document){ return Array.from(root.querySelectorAll(sel)); }

function applyTheme(pref){
  const root = document.documentElement;
  let actual = pref;
  if(pref === "system"){
    actual = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }
  root.setAttribute("data-theme", actual);
  $all(".radio-opt[data-theme-choice]").forEach(el=>{
    el.classList.toggle("active", el.dataset.themeChoice === pref);
  });
}

function initTheme(){
  const stored = localStorage.getItem("learnova_theme") || "system";
  applyTheme(stored);
  window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", ()=>{
    if((localStorage.getItem("learnova_theme")||"system") === "system") applyTheme("system");
  });
  $("#themeToggle").addEventListener("click", ()=>{
    const current = document.documentElement.getAttribute("data-theme");
    const next = current === "dark" ? "light" : "dark";
    localStorage.setItem("learnova_theme", next);
    applyTheme(next);
  });
  $all(".radio-opt[data-theme-choice]").forEach(el=>{
    el.addEventListener("click", ()=>{
      const choice = el.dataset.themeChoice;
      localStorage.setItem("learnova_theme", choice);
      applyTheme(choice);
    });
  });
}

function loadPaymentHistory(){
  try { return JSON.parse(localStorage.getItem("learnova_payment_history") || "[]"); }
  catch(e){ return []; }
}

function savePaymentHistory(){
  localStorage.setItem("learnova_payment_history", JSON.stringify(state.paymentHistory));
}

function formatFcfa(amount){
  return amount.toLocaleString("en-US") + " FCFA";
}

function updateWalletUI(){
  const el = $("#walletBalance");
  if(el) el.textContent = state.credits + " L-Credits";
}

function generateReceiptPdf(record){
  const safe = (value) => value.replace(/[()\\]/g, "\\$&");
  const lines = [
    "LEARNOVA - PAYMENT RECEIPT",
    "Transaction: " + record.ref,
    "Item: " + record.label,
    "Payment method: " + (record.method === "mtn" ? "MTN Mobile Money" : "Orange Money"),
    "Amount paid: " + formatFcfa(record.amount),
    "Date: " + new Date(record.date).toLocaleDateString("en-GB", { day:"2-digit", month:"long", year:"numeric" }),
    "Status: PAID"
  ];
  const nl = String.fromCharCode(10);
  const content = ["BT", "/F1 15 Tf", "50 780 Td", "(" + safe(lines[0]) + ") Tj", "/F1 10 Tf",
    ...lines.slice(1).map(line => "0 -30 Td (" + safe(line) + ") Tj"), "ET"].join(nl);
  const objects = [
    "<< /Type /Catalog /Pages 2 0 R >>",
    "<< /Type /Pages /Kids [3 0 R] /Count 1 >>",
    "<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Resources << /Font << /F1 4 0 R >> >> /Contents 5 0 R >>",
    "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>",
    "<< /Length " + content.length + " >>" + nl + "stream" + nl + content + nl + "endstream"
  ];
  let pdf = "%PDF-1.4" + nl;
  const offsets = [0];
  objects.forEach((object, index) => {
    offsets.push(pdf.length);
    pdf += (index + 1) + " 0 obj" + nl + object + nl + "endobj" + nl;
  });
  const xref = pdf.length;
  pdf += "xref" + nl + "0 " + (objects.length + 1) + nl + "0000000000 65535 f " + nl;
  offsets.slice(1).forEach(offset => { pdf += String(offset).padStart(10, "0") + " 00000 n " + nl; });
  pdf += "trailer" + nl + "<< /Size " + (objects.length + 1) + " /Root 1 0 R >>" + nl + "startxref" + nl + xref + nl + "%%EOF";
  const blob = new Blob([pdf], { type:"application/pdf" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "learnova-receipt-" + record.ref + ".pdf";
  link.click();
  URL.revokeObjectURL(url);
}

function startPayment(label, amount, onSuccess){
  const pay = { method:"mtn", phone:"" };
  function renderMethodStep(){
    openModal(`
      <div class="modal-head"><h3>${label}</h3><button class="icon-btn" onclick="closeModal()">\u2715</button></div>
      <p style="font-size:12.5px;color:var(--text-secondary);margin-bottom:6px;">Amount due</p>
      <p style="font-family:var(--font-display);font-weight:800;font-size:24px;margin-bottom:14px;">${formatFcfa(amount)}</p>
      <div class="pay-methods">
        <button class="pay-method mtn ${pay.method==="mtn"?"active":""}" data-method="mtn"><strong>MTN</strong><span>Mobile Money</span></button>
        <button class="pay-method orange ${pay.method==="orange"?"active":""}" data-method="orange"><strong>Orange</strong><span>Money</span></button>
      </div>
      <div class="pay-phone"><span>+237</span><input id="payPhoneInput" placeholder="6XX XX XX XX" value="${pay.phone}" inputmode="tel"></div>
      <div class="pay-note">${ICONS.shield}<span>Simulation mode: you will see the full confirmation journey, but no real mobile money transaction is initiated.</span></div>
      <button class="btn btn-primary btn-block" id="payConfirmBtn">Pay \u00b7 ${formatFcfa(amount)}</button>`);
    $all(".pay-method").forEach(btn=>{
      btn.onclick = ()=>{ pay.method = btn.dataset.method; renderMethodStep(); };
    });
    $("#payPhoneInput").oninput = (e)=>{ pay.phone = e.target.value; };
    $("#payConfirmBtn").onclick = ()=>{
      if(!pay.phone.trim()){ toast("Enter your mobile money number first.", "error"); return; }
      renderProcessingStep();
    };
  }
  function renderProcessingStep(){
    openModal(`
      <div class="modal-head"><h3>Processing payment</h3></div>
      <div class="pay-processing">
        <div class="pay-loader">${ICONS.phone}</div>
        <strong>Confirming with ${pay.method==="mtn"?"MTN Mobile Money":"Orange Money"}</strong>
        <div class="pay-steps">
          <span class="done">${ICONS.check}<span>Request sent</span></span>
          <span class="current">${ICONS.dot}<span>Operator validation</span></span>
          <span>${ICONS.dot}<span>Learnova confirmation</span></span>
        </div>
      </div>`);
    window.setTimeout(renderSuccessStep, 1500);
  }
  function renderSuccessStep(){
    const record = {
      ref: "LN-" + Date.now().toString(36).toUpperCase(),
      label, amount, method:pay.method, date:new Date().toISOString()
    };
    state.paymentHistory.unshift(record);
    savePaymentHistory();
    if(onSuccess) onSuccess();
    openModal(`
      <div class="modal-head"><h3>Payment confirmed</h3><button class="icon-btn" onclick="closeModal()">\u2715</button></div>
      <div class="pay-success">
        ${ICONS.checkCircle}
        <strong>You're all set.</strong>
        <span>${label} is now active on your account.</span>
        <div class="receipt-block">
          <div class="receipt-head"><strong>LEARNOVA</strong><span>PAID</span></div>
          <div class="receipt-row"><span>Transaction</span><b>${record.ref}</b></div>
          <div class="receipt-row"><span>Item</span><b>${label}</b></div>
          <div class="receipt-row"><span>Method</span><b>${pay.method==="mtn"?"MTN Mobile Money":"Orange Money"}</b></div>
          <div class="receipt-row"><span>Date</span><b>${new Date(record.date).toLocaleDateString("en-GB",{day:"2-digit",month:"long",year:"numeric"})}</b></div>
          <div class="receipt-total"><span>Total paid</span><strong>${formatFcfa(amount)}</strong></div>
        </div>
        <div class="receipt-actions">
          <button class="btn btn-outline" id="receiptPrintBtn">${ICONS.print} Print</button>
          <button class="btn btn-outline" id="receiptPdfBtn">${ICONS.download} PDF</button>
          <button class="btn btn-primary" id="receiptDoneBtn">Done</button>
        </div>
      </div>`);
    $("#receiptPrintBtn").onclick = ()=> window.print();
    $("#receiptPdfBtn").onclick = ()=> generateReceiptPdf(record);
    $("#receiptDoneBtn").onclick = ()=>{ closeModal(); if(state.view === "profile") renderProfile(); };
  }
  renderMethodStep();
}

function renderPaymentHistory(){
  const list = $("#paymentHistoryList");
  if(!list) return;
  if(state.paymentHistory.length === 0){
    list.innerHTML = `<div class="empty-note">No payments yet. Your receipts will appear here.</div>`;
    return;
  }
  list.innerHTML = state.paymentHistory.slice(0,8).map((r,i)=>`
    <div class="history-item reveal ${directionClass(i)}">
      <div class="history-icon">${ICONS.receipt}</div>
      <div class="history-main"><strong>${r.label}</strong><span>${r.ref} \u00b7 ${r.method==="mtn"?"MTN MoMo":"Orange Money"}</span></div>
      <div class="history-side"><b>${formatFcfa(r.amount)}</b></div>
    </div>`).join("");
  revealIn(list);
}

function toast(message, kind=""){
  const stack = $("#toastStack");
  const el = document.createElement("div");
  el.className = "toast" + (kind ? " " + kind : "");
  el.textContent = message;
  stack.appendChild(el);
  setTimeout(()=>{
    el.style.opacity = "0";
    el.style.transform = "translateY(-8px)";
    el.style.transition = "opacity .3s ease, transform .3s ease";
    setTimeout(()=>el.remove(), 320);
  }, 2400);
}

function openModal(html){
  $("#modalSheet").innerHTML = '<div class="modal-handle"></div>' + html;
  $("#modalRoot").classList.add("open");
}
function closeModal(){
  $("#modalRoot").classList.remove("open");
}
$("#modalRoot").addEventListener("click", (e)=>{
  if(e.target.id === "modalRoot") closeModal();
});

function revealIn(container){
  const els = $all(".reveal", container);
  els.forEach((el,i)=>{
    el.classList.remove("in");
    void el.offsetWidth;
    setTimeout(()=>el.classList.add("in"), i*65);
  });
}

function directionClass(i){
  return ["reveal-up","reveal-left","reveal-right"][i % 3];
}

function rankBadge(rank){
  return `<span class="rank-badge" data-rank="${rank}">${rank}</span>`;
}

function closeSideMenu(){
  $("#sideMenu").classList.remove("open");
  $("#menuOverlay").classList.remove("open");
}

function showView(view){
  state.view = view;
  $all(".view").forEach(v=>v.classList.remove("active"));
  $(`#view-${view}`).classList.add("active");
  $all(".tab-btn").forEach(b=>b.classList.toggle("active", b.dataset.view === view));
  $all(".menu-list button[data-view]").forEach(b=>b.classList.toggle("active", b.dataset.view === view));
  $all(".nav-link[data-view]").forEach(b=>b.classList.toggle("active", b.dataset.view === view));
  window.scrollTo({ top:0, behavior:"smooth" });
  closeSideMenu();
  renderView(view);
  const tip = OWL.tips[view];
  if(tip) showOwlBubble(tip, view);
}

function renderView(view){
  if(view === "home") renderHome();
  if(view === "library") renderLibrary();
  if(view === "quizzes") renderQuizzes();
  if(view === "compete") renderCompete();
  if(view === "classes") renderClasses();
  if(view === "lai" && !$("#chatWrap").dataset.init) initChat();
  if(view === "profile") renderProfile();
  if(view === "about") renderAbout();
  if(view === "terms") renderTerms();
  if(view === "privacy") renderPrivacy();
  if(view === "notices") renderNotices();
  revealIn($(`#view-${view}`));
}

function renderHome(){
  const grid = $("#homeSubjectGrid");
  grid.innerHTML = DATA.subjects.slice(0,6).map((s,i)=>`
    <div class="tile reveal ${directionClass(i)}" data-goto-subject="${s}">
      <div class="tile-icon">${ICONS.paper}</div>
      <strong>${s}</strong>
      <span>Papers, notes & quizzes</span>
    </div>`).join("");
  $all("[data-goto-subject]", grid).forEach(el=>{
    el.addEventListener("click", ()=>showView("library"));
  });

  const week = $("#homeWeekList");
  const notice = DATA.officialNotices[0];
  week.innerHTML = `
    <div class="resource-card reveal reveal-left">
      <div class="resource-thumb">${ICONS.desk}</div>
      <div class="resource-info"><strong>${notice.title}</strong><span>${notice.date}</span></div>
    </div>
    <div class="resource-card reveal reveal-right">
      <div class="resource-thumb">${ICONS.note}</div>
      <div class="resource-info"><strong>Monthly competition \u2013 register now</strong><span>250 FCFA \u00b7 closes in 4 days</span></div>
    </div>`;
  $all(".resource-card", week)[1].addEventListener("click", ()=>showView("compete"));
  revealIn($("#view-home"));
}

function renderLibrary(){
  const tabs = $("#libraryTabs");
  $all("button", tabs).forEach(b=>{
    b.classList.toggle("active", b.dataset.tab === state.library.tab);
    b.onclick = ()=>{ state.library.tab = b.dataset.tab; renderLibrary(); };
  });

  const levels = state.library.tab === "concours" ? [] : ["all","O'Level","A'Level","Concours"];
  const levelChips = $("#libraryLevelChips");
  levelChips.style.display = levels.length ? "flex" : "none";
  levelChips.innerHTML = levels.map(l=>`<button class="chip ${state.library.level===l?"active":""}" data-level="${l}">${l==="all"?"All levels":l}</button>`).join("");
  $all("button", levelChips).forEach(b=>{
    b.onclick = ()=>{ state.library.level = b.dataset.level; renderLibrary(); };
  });

  $("#librarySortBtn").onclick = ()=>{
    const options = ["Newest","Most downloaded","A-Z"];
    const idx = (options.indexOf(state.library.sort)+1) % options.length;
    state.library.sort = options[idx];
    renderLibrary();
  };
  $("#librarySortLabel").textContent = state.library.sort;
  $("#librarySearch").oninput = (e)=>{ state.library.search = e.target.value.toLowerCase(); renderLibrary(); };

  const list = $("#libraryList");
  const s = state.library.search;

  if(state.library.tab === "papers"){
    let items = DATA.pastPapers.filter(p => state.library.level==="all" || p.level===state.library.level);
    if(s) items = items.filter(p => p.subject.toLowerCase().includes(s) || String(p.year).includes(s));
    items = sortItems(items, state.library.sort, "subject","downloads","year");
    list.innerHTML = items.map((p,i)=>`
      <div class="resource-card reveal ${directionClass(i)}">
        <div class="resource-thumb">${ICONS.paper}</div>
        <div class="resource-info">
          <strong>${p.subject} \u2013 ${p.year}</strong>
          <div class="resource-meta"><span>${p.level}</span><span class="pill">${p.downloads} downloads</span></div>
        </div>
        <button class="btn btn-outline btn-sm" data-unlock="${p.price}">${p.price} L-Cr</button>
      </div>`).join("") || `<div class="empty-note">No past papers match your search.</div>`;
    $all("[data-unlock]", list).forEach(btn=>{
      btn.onclick = ()=>unlockDocument(parseInt(btn.dataset.unlock));
    });
  }

  if(state.library.tab === "notes"){
    let items = DATA.notes.filter(n => state.library.level==="all" || n.level===state.library.level);
    if(s) items = items.filter(n => n.subject.toLowerCase().includes(s) || n.topic.toLowerCase().includes(s));
    list.innerHTML = items.map((n,i)=>`
      <div class="resource-card reveal ${directionClass(i)}">
        <div class="resource-thumb">${ICONS.note}</div>
        <div class="resource-info">
          <strong>${n.topic}</strong>
          <div class="resource-meta"><span>${n.subject} \u00b7 ${n.level}</span><span class="pill ${n.free?"pill-free":"pill-locked"}">${n.free?"Free":"Locked"}</span></div>
        </div>
        <button class="btn btn-outline btn-sm" data-note="${n.free?0:n.price}">${n.free?"Open":n.price+" L-Cr"}</button>
      </div>`).join("") || `<div class="empty-note">No notes match your search.</div>`;
    $all("[data-note]", list).forEach(btn=>{
      btn.onclick = ()=>{
        const price = parseInt(btn.dataset.note);
        if(price===0) toast("Opening note...");
        else unlockDocument(price);
      };
    });
  }

  if(state.library.tab === "videos"){
    let items = DATA.videoLessons;
    if(s) items = items.filter(v => v.subject.toLowerCase().includes(s) || v.topic.toLowerCase().includes(s));
    list.innerHTML = items.map((v,i)=>`
      <div class="resource-card reveal ${directionClass(i)}">
        <div class="resource-thumb">${ICONS.video}</div>
        <div class="resource-info"><strong>${v.topic}</strong><span>${v.subject} \u00b7 ${v.duration}</span></div>
        <button class="btn btn-outline btn-sm" data-play="1">Play</button>
      </div>`).join("");
    $all("[data-play]", list).forEach(btn=> btn.onclick = ()=>toast("Playing video lesson..."));
  }

  if(state.library.tab === "concours"){
    let items = DATA.concoursDesk;
    if(s) items = items.filter(c => c.name.toLowerCase().includes(s));
    list.innerHTML = items.map((c,i)=>`
      <div class="resource-card reveal ${directionClass(i)}" data-concours="${c.id}">
        <div class="resource-thumb">${ICONS.desk}</div>
        <div class="resource-info"><strong>${c.name}</strong><span>Deadline: ${c.deadline}</span></div>
      </div>`).join("");
    $all("[data-concours]", list).forEach(card=>{
      card.onclick = ()=>{
        const c = DATA.concoursDesk.find(x=>x.id==card.dataset.concours);
        openModal(`
          <div class="modal-head"><h3>${c.name}</h3><button class="icon-btn" onclick="closeModal()">\u2715</button></div>
          <div class="legal-block">
            <h3>Application deadline</h3><p>${c.deadline}</p>
            <h3>Examination centres</h3><p>${c.centers}</p>
            <h3>Required documents</h3><p>${c.docs}</p>
          </div>
          <button class="btn btn-primary btn-block" id="askLaiConcours">Ask L-Ai for more details</button>`);
        $("#askLaiConcours").onclick = ()=>{
          closeModal();
          showView("lai");
          pushChat("bot", `Here's what I have on ${c.name}: deadline ${c.deadline}, centres in ${c.centers}. You'll need ${c.docs.toLowerCase()}.`);
        };
      };
    });
  }
  revealIn($("#view-library"));
}

function sortItems(items, sort, nameKey, countKey, yearKey){
  const copy = [...items];
  if(sort === "Newest") copy.sort((a,b)=> (b[yearKey]||0) - (a[yearKey]||0));
  if(sort === "Most downloaded") copy.sort((a,b)=> (b[countKey]||0) - (a[countKey]||0));
  if(sort === "A-Z") copy.sort((a,b)=> a[nameKey].localeCompare(b[nameKey]));
  return copy;
}

function unlockDocument(price){
  if(state.credits >= price){
    const firstEver = !state.hasUnlocked;
    state.hasUnlocked = true;
    state.credits -= price;
    updateWalletUI();
    toast(`Unlocked for ${price} L-Credits. Balance: ${state.credits}`, "success");
    if(firstEver) showOwlBubble(OWL.moments.firstSave, state.view, true);
  } else {
    toast("Not enough L-Credits. Visit your Wallet to top up.", "error");
  }
}

function renderQuizzes(){
  const tabs = $("#quizTabs");
  $all("button", tabs).forEach(b=>{
    b.classList.toggle("active", b.dataset.tab === state.quiz.tab);
    b.onclick = ()=>{ state.quiz.tab = b.dataset.tab; renderQuizzes(); };
  });
  $("#quizPlayPane").style.display = state.quiz.tab === "play" ? "block" : "none";
  $("#quizBoardPane").style.display = state.quiz.tab === "board" ? "block" : "none";

  $all("#quizDifficultyChips .chip").forEach(c=>{
    c.classList.toggle("active", c.dataset.diff === state.quiz.difficulty);
    c.onclick = ()=>{ state.quiz.difficulty = c.dataset.diff; renderQuizzes(); };
  });

  const grid = $("#quizGrid");
  const subs = DATA.subjects.slice(0,6);
  grid.innerHTML = subs.map((s,i)=>{
    const key = s+state.quiz.difficulty;
    const rank = state.quiz.myRanks[key] || "NR";
    return `
      <div class="quiz-card reveal ${directionClass(i)}">
        <div class="quiz-card-top"><strong>${s}</strong>${rankBadge(rank)}</div>
        <span class="diff-tag">${state.quiz.difficulty} difficulty</span>
        <button class="btn btn-primary btn-sm" data-start="${s}">Start quiz</button>
      </div>`;
  }).join("");
  $all("[data-start]", grid).forEach(btn=>{
    btn.onclick = ()=> startQuiz(btn.dataset.start, state.quiz.difficulty);
  });

  $("#boardSortBtn").onclick = ()=>{
    const options = ["By rank","By score","By name"];
    state.board.sort = options[(options.indexOf(state.board.sort)+1)%options.length];
    renderLeaderboard();
  };
  $("#boardSearch").oninput = (e)=>{ state.board.search = e.target.value.toLowerCase(); renderLeaderboard(); };
  renderLeaderboard();
  revealIn($("#view-quizzes"));
}

function renderLeaderboard(){
  $("#boardSortLabel").textContent = state.board.sort;
  let items = [...DATA.leaderboard];
  if(state.board.search) items = items.filter(p=>p.name.toLowerCase().includes(state.board.search));
  if(state.board.sort === "By rank" || state.board.sort === "By score") items.sort((a,b)=>b.score-a.score);
  if(state.board.sort === "By name") items.sort((a,b)=>a.name.localeCompare(b.name));
  const list = $("#leaderboardList");
  list.innerHTML = items.map((p,i)=>`
    <div class="leader-row reveal ${directionClass(i)}">
      <div class="leader-pos">${i+1}</div>
      <div class="avatar-circle" style="width:36px;height:36px;font-size:12px;">${p.name.split(" ").map(n=>n[0]).join("").slice(0,2)}</div>
      <div class="leader-info"><strong>${p.name}${p.premium?` <span class="pill pill-premium" style="margin-left:4px;">${ICONS.crown}Premium</span>`:""}</strong><span>${p.school}</span></div>
      ${rankBadge(p.rank)}
      <div class="leader-score">${p.score}%</div>
    </div>`).join("");
  revealIn(list);
}

function startQuiz(subject, difficulty){
  let idx = 0;
  const answers = [];
  function renderStep(){
    const item = QUIZ_QUESTIONS[idx];
    openModal(`
      <div class="modal-head"><h3>${subject} \u2013 Question ${idx+1}/${QUIZ_QUESTIONS.length}</h3><button class="icon-btn" onclick="closeModal()">\u2715</button></div>
      <p style="font-size:14.5px;font-weight:600;margin-bottom:14px;">${item.q}</p>
      <div id="quizOptions" style="display:flex;flex-direction:column;gap:10px;">
        ${item.options.map((o,i)=>`<button class="btn btn-outline btn-block" data-opt="${i}" style="justify-content:flex-start;">${o}</button>`).join("")}
      </div>`);
    $all("[data-opt]", $("#quizOptions")).forEach(btn=>{
      btn.onclick = ()=>{
        answers.push(parseInt(btn.dataset.opt) === item.answer);
        idx++;
        if(idx < QUIZ_QUESTIONS.length) renderStep();
        else finishQuiz();
      };
    });
  }
  function finishQuiz(){
    const correct = answers.filter(Boolean).length;
    const pct = Math.round((correct/QUIZ_QUESTIONS.length)*100);
    const rank = DATA.rankFromScore(pct);
    state.quiz.myRanks[subject+difficulty] = rank;
    openModal(`
      <div class="modal-head"><h3>Quiz complete</h3><button class="icon-btn" onclick="closeModal()">\u2715</button></div>
      <div style="text-align:center;padding:10px 0 20px;">
        <div style="font-family:var(--font-display);font-size:40px;font-weight:800;">${pct}%</div>
        <p style="color:var(--text-secondary);font-size:13px;margin:8px 0 14px;">${correct} of ${QUIZ_QUESTIONS.length} correct</p>
        ${rankBadge(rank)}
      </div>
      <button class="btn btn-primary btn-block" id="closeQuizResult">Back to quizzes</button>`);
    $("#closeQuizResult").onclick = ()=>{
      closeModal(); renderQuizzes();
      if(rank === "SSS" || rank === "SS" || rank === "S") showOwlBubble(OWL.moments.quizTopRank, "quizzes", true);
      else if(rank !== "NR") showOwlBubble(OWL.moments.quizPass, "quizzes", true);
      else toast("Leaderboard updated with your best attempt.");
    };
  }
  renderStep();
}

function renderCompete(){
  const tabs = $("#competeTabs");
  $all("button", tabs).forEach(b=>{
    b.classList.toggle("active", b.dataset.tab === state.compete.tab);
    b.onclick = ()=>{ state.compete.tab = b.dataset.tab; renderCompete(); };
  });
  $("#competeRoomsPane").style.display = state.compete.tab==="rooms" ? "block":"none";
  $("#competeMonthlyPane").style.display = state.compete.tab==="monthly" ? "block":"none";
  $("#competeHackathonPane").style.display = state.compete.tab==="hackathon" ? "block":"none";

  $("#createRoomTile").onclick = ()=>{
    openModal(`
      <div class="modal-head"><h3>Create a competition room</h3><button class="icon-btn" onclick="closeModal()">\u2715</button></div>
      <div class="form-field"><label>Room name</label><input type="text" id="roomNameInput" placeholder="Form 5 Science Squad"></div>
      <div class="form-field"><label>Difficulty</label><select id="roomDiffSelect"><option>Low</option><option>Medium</option><option selected>High</option></select></div>
      <button class="btn btn-primary btn-block" id="genLinkBtn">Generate invite link</button>
      <div id="genLinkResult" style="margin-top:14px;"></div>`);
    $("#genLinkBtn").onclick = ()=>{
      const name = $("#roomNameInput").value.trim() || "My Room";
      const diff = $("#roomDiffSelect").value;
      const code = "LRN-" + Math.floor(10000 + Math.random()*89999);
      $("#genLinkResult").innerHTML = `
        <div class="glass-card" style="padding:12px;">
          <p style="font-size:12px;color:var(--text-secondary);">Share this code with your friends</p>
          <p style="font-family:var(--font-display);font-weight:800;font-size:16px;margin-top:4px;">${code}</p>
        </div>`;
      toast(`Room "${name}" created.`, "success");
      showOwlBubble(OWL.moments.roomCreated, "compete", true);
    };
  };
  $("#joinRoomTile").onclick = ()=>{
    openModal(`
      <div class="modal-head"><h3>Join a room</h3><button class="icon-btn" onclick="closeModal()">\u2715</button></div>
      <div class="form-field"><label>Invite code</label><input type="text" id="joinCodeInput" placeholder="e.g. LRN-48213"></div>
      <button class="btn btn-primary btn-block" id="joinRoomBtn">Join room</button>`);
    $("#joinRoomBtn").onclick = ()=>{
      const code = $("#joinCodeInput").value.trim();
      if(!code){ toast("Enter an invite code first.", "error"); return; }
      closeModal();
      toast(`Joined room ${code}.`, "success");
    };
  };

  const teacherBtn = $("#teacherRoomBtn");
  const teacherCard = $("#teacherRoomCard");
  function refreshTeacherRoomCard(){
    if(state.role === "teacher"){
      teacherCard.querySelector("h4").textContent = "Host a competition room";
      teacherBtn.textContent = "Create teacher room";
      teacherBtn.onclick = ()=>{
        openModal(`
        <div class="modal-head"><h3>Host a competition</h3><button class="icon-btn" onclick="closeModal()">\u2715</button></div>
        <div class="form-field"><label>Questions document</label><div class="upload-field">Tap to upload .pdf or .docx</div></div>
        <div class="form-field"><label>Answers document</label><div class="upload-field">Tap to upload .pdf or .docx</div></div>
        <div class="form-field"><label>Time allowed (minutes)</label><input type="number" value="30"></div>
        <div class="checkbox-row"><input type="checkbox" id="rewardToggle"><p>Attach a cash reward for the first participants (amount transferred to Learnova in advance for validation)</p></div>
        <button class="btn btn-primary btn-block" id="createTeacherRoom">Publish competition</button>`);
        $("#createTeacherRoom").onclick = ()=>{ closeModal(); toast("Competition room published.", "success"); };
      };
    } else {
      teacherCard.querySelector("h4").textContent = "Teacher-hosted room";
      teacherBtn.textContent = "Switch to Teacher preview";
      teacherBtn.onclick = ()=>{ state.role = "teacher"; syncRole(); renderCompete(); toast("Previewing as Teacher"); };
    }
  }
  refreshTeacherRoomCard();

  const catChips = $("#monthlyCategoryChips");
  catChips.innerHTML = DATA.monthlyCompetitionCategories.map(c=>`<button class="chip ${c.id===state.compete.monthlyCategory?"active":""}" data-cat="${c.id}">${c.label}</button>`).join("");
  $all("button", catChips).forEach(b=> b.onclick = ()=>{ state.compete.monthlyCategory = b.dataset.cat; renderCompete(); });

  $all("#monthlyModeToggle button").forEach(b=>{
    b.classList.toggle("active", b.dataset.mode === state.compete.monthlyMode);
    b.onclick = ()=>{ state.compete.monthlyMode = b.dataset.mode; renderCompete(); };
  });

  const days = ["Monday","Tuesday","Wednesday","Thursday","Friday"];
  const subjPick = ["Mathematics","English Language","Biology","Physics","General Paper"];
  $("#monthlySchedule").innerHTML = days.map((d,i)=>`
    <div style="display:flex;justify-content:space-between;padding:8px 0;border-bottom:1px solid var(--surface-border);font-size:12.5px;">
      <span style="color:var(--text-secondary);">${d}</span><span style="font-weight:700;">${subjPick[i]}</span>
    </div>`).join("");

  const regBtn = $("#registerMonthlyBtn");
  regBtn.textContent = state.registeredMonthly ? "Registered \u2713" : "Register \u2013 250 FCFA";
  regBtn.onclick = ()=>{
    if(state.registeredMonthly){ toast("You are already registered for this month."); return; }
    if(state.compete.monthlyMode === "school"){
      toast("School entry needs at least 10 registered students from your school.");
      return;
    }
    startPayment("Monthly competition entry", 250, ()=>{
      state.registeredMonthly = true;
      renderCompete();
      showOwlBubble(OWL.moments.monthly, "compete", true);
    });
  };

  const olevelChips = $("#olevelClassChips");
  olevelChips.innerHTML = DATA.examClasses.filter(c=>c.group==="olevel").map(c=>`<button class="chip" data-class="${c.id}">${c.label}</button>`).join("");
  $all("button", olevelChips).forEach(b=> b.onclick = ()=>{
    $all("button", olevelChips).forEach(x=>x.classList.remove("active"));
    b.classList.add("active");
    toast(`Top 3 of ${b.textContent} per school qualify for the Hackathon.`);
  });

  const seriesGrid = $("#seriesGrid");
  seriesGrid.innerHTML = Object.keys(DATA.series).map((key,i)=>`
    <div class="series-card reveal ${directionClass(i)}" data-series="${key}">
      <strong>${key}</strong><span>${DATA.series[key].track}</span>
    </div>`).join("");
  $all("[data-series]", seriesGrid).forEach(card=>{
    card.onclick = ()=>{
      const s = DATA.series[card.dataset.series];
      openModal(`
        <div class="modal-head"><h3>Series ${card.dataset.series} \u2013 ${s.track}</h3><button class="icon-btn" onclick="closeModal()">\u2715</button></div>
        <div class="legal-block">
          <h3>Series combination</h3><p>${s.core.join(", ")}</p>
          <h3>Additional subjects</h3><p>${s.additional.join(", ")}</p>
          <h3>Career opportunities</h3>
          <div class="chip-row" style="flex-wrap:wrap;overflow:visible;">${s.careers.map(c=>`<span class="pill" style="margin:3px 4px 3px 0;">${c}</span>`).join("")}</div>
        </div>
        <p style="font-size:11.5px;color:var(--text-muted);margin-bottom:12px;">Qualification: top 3 students of this series per school, from the monthly competition.</p>
        <button class="btn btn-primary btn-block" id="hackathonRegisterBtn">${state.registeredHackathon?"Registered \u2713":"Register for Hackathon \u2013 500 FCFA"}</button>`);
      $("#hackathonRegisterBtn").onclick = ()=>{
        if(state.registeredHackathon){ toast("You are already registered for the Hackathon."); return; }
        startPayment("National Hackathon \u2013 Series " + card.dataset.series, 500, ()=>{
          state.registeredHackathon = true;
          closeModal();
          showOwlBubble(OWL.moments.hackathon, "compete", true);
        });
      };
    };
  });
  revealIn($("#view-compete"));
}

function renderClasses(){
  $("#classSortBtn").onclick = ()=>{
    const options = ["Top rated","Newest","Price"];
    state.classes.sort = options[(options.indexOf(state.classes.sort)+1)%options.length];
    renderClasses();
  };
  $("#classSortLabel").textContent = state.classes.sort;
  $("#classSearch").oninput = (e)=>{ state.classes.search = e.target.value.toLowerCase(); renderClasses(); };

  $("#teacherCreateBanner").style.display = state.role === "teacher" ? "block" : "none";
  $("#openCreateClass").onclick = ()=>{
    openModal(`
    <div class="modal-head"><h3>Create a class</h3><button class="icon-btn" onclick="closeModal()">\u2715</button></div>
    <div class="form-field"><label>Subject</label><select>${DATA.subjects.map(s=>`<option>${s}</option>`).join("")}</select></div>
    <div class="form-field"><label>Price per student (FCFA)</label><input type="number" value="2500"></div>
    <div class="form-field"><label>Description</label><textarea rows="3" placeholder="What will students get from this class?"></textarea></div>
    <button class="btn btn-primary btn-block" id="publishClassBtn">Publish class</button>`);
    $("#publishClassBtn").onclick = ()=>{ closeModal(); toast("Class published. Visible to students now.", "success"); };
  };

  $("#openCertification").onclick = ()=>{
    openModal(`
    <div class="modal-head"><h3>Teacher certification</h3><button class="icon-btn" onclick="closeModal()">\u2715</button></div>
    <div class="grid-3">${DATA.certificationPlans.map(p=>`
      <div class="tile"><strong>${p.name}</strong><span>${p.price}</span><span>${p.groups} groups</span><button class="btn btn-outline btn-sm" data-plan="${p.id}">Choose</button></div>`).join("")}</div>`);
    $all("[data-plan]").forEach(b=> b.onclick = ()=>{
      const plan = DATA.certificationPlans.find(p=>p.id===b.dataset.plan);
      startPayment("Teacher certification \u2013 " + plan.name, plan.amount, ()=>{
        toast(plan.id==="lifetime" ? "Welcome, Learnova Partner!" : `Certification (${plan.name}) submitted for review.`, "success");
        showOwlBubble(OWL.moments.certified, "classes", true);
      });
    });
  };

  let items = [...DATA.teachers];
  if(state.classes.search) items = items.filter(t=>t.name.toLowerCase().includes(state.classes.search) || t.subject.toLowerCase().includes(state.classes.search));
  if(state.classes.sort === "Top rated") items.sort((a,b)=>b.rating-a.rating);
  if(state.classes.sort === "Newest") items.sort((a,b)=>b.id-a.id);
  if(state.classes.sort === "Price") items.sort((a,b)=>a.price-b.price);

  const list = $("#teacherList");
  list.innerHTML = items.map((t,i)=>`
    <div class="teacher-card reveal ${directionClass(i)}" data-teacher="${t.id}">
      <div class="teacher-avatar">${t.name.split(" ").map(n=>n[0]).join("").slice(0,2)}${t.certified?'<span class="badge-verified"><svg viewBox="0 0 24 24" fill="none"><path d="m5 13 4 4 10-10" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg></span>':''}</div>
      <div class="teacher-info">
        <h4>${t.name}</h4>
        <div class="teacher-sub">${t.subject} \u00b7 ${t.students} students</div>
        <div style="display:flex;align-items:center;gap:8px;margin-top:6px;">
          <div class="stars">\u2605 ${t.rating.toFixed(1)}</div>
          <span class="cert-chip ${t.certified?"is-certified":"is-standard"}">${t.certified?ICONS.shield+"Certified":"Verified profile"}</span>
        </div>
        <div class="teacher-price">${t.price.toLocaleString()} FCFA / month</div>
      </div>
    </div>`).join("") || `<div class="empty-note">No teachers match your search.</div>`;

  $all("[data-teacher]", list).forEach(card=>{
    card.onclick = ()=>{
      const t = DATA.teachers.find(x=>x.id==card.dataset.teacher);
      openModal(`
        <div class="modal-head"><h3>${t.name}</h3><button class="icon-btn" onclick="closeModal()">\u2715</button></div>
        <p style="font-size:12.5px;color:var(--text-secondary);line-height:1.6;">${t.bio}</p>
        <div class="stars" style="margin:10px 0;">\u2605 ${t.rating.toFixed(1)} / 5 \u00b7 ${t.students} students \u00b7 ${t.certified?"Certified teacher":"Standard teacher"}</div>
        <div class="checkbox-row"><input type="checkbox" id="disclosureCheck"><p>I understand that any interaction inside this class is strictly between me and the teacher, and that Learnova only manages the payment escrow. I should only join classes hosted by teachers I trust.</p></div>
        <button class="btn btn-primary btn-block" id="joinClassBtn" disabled>Join class \u2013 ${t.price.toLocaleString()} FCFA</button>`);
      const check = $("#disclosureCheck");
      const joinBtn = $("#joinClassBtn");
      check.onchange = ()=>{ joinBtn.disabled = !check.checked; joinBtn.style.opacity = check.checked ? "1":"0.5"; };
      joinBtn.style.opacity = "0.5";
      joinBtn.onclick = ()=>{
        if(!check.checked) return;
        closeModal();
        startPayment(t.name + "'s class \u2013 first month", t.price, ()=>{
          toast(`Joined ${t.name}'s class. Funds held in escrow for 30 days.`, "success");
          showOwlBubble(OWL.moments.classJoined, "classes", true);
        });
      };
    };
  });
  revealIn($("#view-classes"));
}

function initChat(){
  $("#chatWrap").dataset.init = "1";
  pushChat("bot", "Hi, I'm L-Ai. Ask me anything school-related \u2014 a topic explanation, revision help, or Concours information.");
  $("#chatSend").onclick = sendChat;
  $("#chatInput").addEventListener("keydown", (e)=>{ if(e.key === "Enter") sendChat(); });
}

function pushChat(role, text){
  const wrap = $("#chatWrap");
  const bubble = document.createElement("div");
  bubble.className = "chat-bubble " + (role === "bot" ? "bot" : "user");
  bubble.textContent = text;
  wrap.appendChild(bubble);
  window.scrollTo({ top: document.body.scrollHeight, behavior:"smooth" });
}

function sendChat(){
  const input = $("#chatInput");
  const text = input.value.trim();
  if(!text) return;
  pushChat("user", text);
  input.value = "";
  const lower = text.toLowerCase();
  setTimeout(()=>{
    if(["unlock","download","free credit","pay for","bypass"].some(k=>lower.includes(k))){
      pushChat("bot", "I can't help with unlocking paid content or payments \u2014 that request touches a paid service of the app.");
    } else if(lower.includes("concours")){
      pushChat("bot", "Tell me which Concours you mean (for example ENAM or FMSB) and I'll pull the deadline, documents and centres from the Information Desk.");
    } else {
      pushChat("bot", "Here's a quick way to think about it: break the topic into smaller parts, work one past-paper question on it, then check the corrected answer in your Library.");
    }
  }, 500);
}

function syncRole(){
  $all("#roleToggle button").forEach(b=> b.classList.toggle("active", b.dataset.role === state.role));
  const roleLabel = state.role === "teacher" ? "Teacher \u00b7 Mathematics" : "Student \u00b7 GBHS Bamenda";
  $("#sideRole").textContent = roleLabel;
  $("#railRole").textContent = roleLabel;
  $("#teacherCertSection").style.display = state.role === "teacher" ? "block" : "none";
}

function planLabel(){
  if(state.plan === "free") return "";
  const plan = DATA.premiumPlans.find(p=>p.id===state.plan);
  return plan ? plan.name + " Premium" : "";
}

function renderProfile(){
  $all("#roleToggle button").forEach(b=>{
    b.onclick = ()=>{ state.role = b.dataset.role; syncRole(); renderProfile(); toast(`Previewing as ${b.dataset.role[0].toUpperCase()+b.dataset.role.slice(1)}`); };
  });
  syncRole();
  updateWalletUI();

  const chip = $("#profilePlanChip");
  const label = planLabel();
  chip.innerHTML = label ? `<span class="pill pill-premium">${ICONS.crown}${label}</span>` : "";

  $("#premiumGrid").innerHTML = DATA.premiumPlans.map((p,i)=>`
    <div class="tile reveal ${directionClass(i)}">
      <strong>${p.name}</strong>
      <span>${p.price}</span>
      <span>${p.credits} credits/mo \u00b7 ${p.devices} devices</span>
      <button class="btn btn-outline btn-sm" data-premium="${p.id}">${state.plan===p.id?"Current plan":"Choose"}</button>
    </div>`).join("");
  $all("[data-premium]").forEach(b=> b.onclick = ()=>{
    const plan = DATA.premiumPlans.find(p=>p.id===b.dataset.premium);
    if(state.plan === plan.id){ toast("This is already your active plan."); return; }
    startPayment(plan.name + " Premium plan", plan.amount, ()=>{
      state.plan = plan.id;
      state.credits += plan.credits;
      renderProfile();
      showOwlBubble(OWL.moments.premium, "profile", true);
    });
  });

  $("#certGrid").innerHTML = DATA.certificationPlans.map((p,i)=>`
    <div class="tile reveal ${directionClass(i)}">
      <strong>${p.name}</strong><span>${p.price}</span><span>${p.groups} groups</span>
      <button class="btn btn-outline btn-sm" data-cert="${p.id}">Choose</button>
    </div>`).join("");
  $all("[data-cert]").forEach(b=> b.onclick = ()=>{
    const plan = DATA.certificationPlans.find(p=>p.id===b.dataset.cert);
    startPayment("Teacher certification \u2013 " + plan.name, plan.amount, ()=>{
      toast(plan.id==="lifetime" ? "Welcome, Learnova Partner!" : `Certification (${plan.name}) submitted for review.`, "success");
      showOwlBubble(OWL.moments.certified, "profile", true);
    });
  });

  $("#buyCreditsBtn").onclick = ()=>{
    openModal(`
    <div class="modal-head"><h3>Top up L-Credits</h3><button class="icon-btn" onclick="closeModal()">\u2715</button></div>
    <div class="grid-3">
      ${DATA.creditPacks.map(pack=>`<div class="tile"><strong>${pack.credits}</strong><span>${formatFcfa(pack.amount)}</span><button class="btn btn-outline btn-sm" data-buy="${pack.credits}" data-amount="${pack.amount}">Buy</button></div>`).join("")}
    </div>`);
    $all("[data-buy]").forEach(b=> b.onclick = ()=>{
      const credits = parseInt(b.dataset.buy);
      const amount = parseInt(b.dataset.amount);
      startPayment(credits + " L-Credits top-up", amount, ()=>{
        state.credits += credits;
        renderProfile();
        showOwlBubble(OWL.moments.credits, "profile", true);
      });
    });
  };

  $("#editProfileBtn").onclick = ()=> toast("Profile editing form coming soon.");
  $("#changePwBtn").onclick = ()=> toast("Password change form coming soon.");
  $("#logoutBtn").onclick = ()=> toast("Logged out (demo).");
  renderPaymentHistory();
  revealIn($("#view-profile"));
}

function renderAbout(){
  $("#founderGrid").innerHTML = DATA.founders.map((f,i)=>`
    <div class="founder-card reveal ${directionClass(i)}">
      <div class="founder-photo"><span>${f.initials}</span><img src="${f.photo}" alt="${f.name}" onerror="this.remove()"></div>
      <h4>${f.name}</h4>
      <div class="founder-role">${f.role}</div>
      <p>${f.bio}</p>
    </div>`).join("");
  revealIn($("#view-about"));
}

const TERMS_SECTIONS = [
  { title:"1. Acceptance of Terms", body:"By creating a Learnova account as a student or a teacher, you agree to these Terms of Service and to the Privacy Policy. If you are under 18, a parent or guardian should review these Terms with you." },
  { title:"2. Accounts & Verification", body:"Students register with an email or phone number and a password. Teachers additionally provide their full legal name, National Identity Card (CNI) details and photos, subject(s) taught and location, for identity verification before any paid feature is activated." },
  { title:"3. One Device at a Time", body:"A standard account may be signed in on a single device. Changing devices does not erase your saved progress, but a previously purchased document will need to be unlocked again on the new device. Premium plans allow more simultaneous sessions." },
  { title:"4. Payments, L-Credits & Refunds", body:"Certain resources require a one-off payment or L-Credits, Learnova's internal currency granted through Premium subscriptions. Document and pack purchases are final. Online class fees are refundable on request, subject to administrative review." },
  { title:"5. Competitions & Fees", body:"Monthly official competitions cost 250 FCFA per individual entrant; the Learnova National Hackathon costs 500 FCFA per qualified participant. Leaving a timed activity before it ends results in grading based on answers already submitted." },
  { title:"6. Online Classes & Escrow", body:"Payments for a teacher's class are held by Learnova for 30 days before release: 85% to standard teachers, 90% to certified teachers. Any interaction inside a class is strictly between the student and the teacher; Learnova is not responsible for issues arising from that relationship, especially where personal information is exchanged or the relationship moves off the platform." },
  { title:"7. Content Protection", body:"Screenshots and screen recording are disabled throughout the app. Downloaded documents are only accessible inside the Learnova app, including offline, and cannot be exported to any device's file system." },
  { title:"8. Conduct & Moderation", body:"Learnova applies anti-link and anti-word filtering in class chats and may warn, suspend or ban any account for cheating, harassment, fraud or misuse of L-Ai, following an administrative review of reports." },
  { title:"9. Termination", body:"Learnova may suspend or close an account that violates these Terms, engages in payment fraud, or repeatedly receives credible misconduct reports, following the appropriate investigation." },
  { title:"10. Governing Law", body:"These Terms are governed by the laws of the Republic of Cameroon. Any dispute will first be addressed through Learnova's administration before any other recourse." },
  { title:"11. Contact", body:"Questions about these Terms can be sent to legal@learnova.app." }
];

const PRIVACY_SECTIONS = [
  { title:"1. Data We Collect", body:"Account data (email, phone number, username), profile data (school, photos), and for teachers, KYC data: legal name, CNI number, CNI scan, and identity-matching photos. Payment metadata is processed through our mobile money partners; Learnova does not store full financial account credentials." },
  { title:"2. Why We Process It", body:"To create and secure your account, verify teacher identity before certification, operate quizzes, competitions and leaderboards, process payments and escrow, and personalise revision content." },
  { title:"3. Minors' Data", body:"Many students on Learnova are minors. We collect the minimum data required for the service, and a parent/tutor read-only mode is being introduced under a controlled invitation and consent process, in line with Law No. 2024/017 on personal data protection in Cameroon." },
  { title:"4. Access Control", body:"Raw CNI files and identity-matching photos are restricted to authorised verification staff and are never shown on a public profile." },
  { title:"5. Retention", body:"Identity, payment and moderation records are kept for as long as needed for legal, security and dispute-resolution purposes, then archived or deleted according to our retention schedule." },
  { title:"6. Your Rights", body:"You may request a copy of your data, ask for a correction, or request deletion of your account, subject to legal retention obligations." },
  { title:"7. Security", body:"Access to identity and financial data is logged and audited. Teacher accounts additionally benefit from step-up verification before sensitive actions such as changing payout details." },
  { title:"8. Contact", body:"Privacy questions can be sent to privacy@learnova.app." }
];

function renderTerms(){
  $("#termsContent").innerHTML = TERMS_SECTIONS.map((s,i)=>`
    <div class="legal-block reveal ${directionClass(i)}"><h3>${s.title}</h3><p>${s.body}</p></div>`).join("");
}
function renderPrivacy(){
  $("#privacyContent").innerHTML = PRIVACY_SECTIONS.map((s,i)=>`
    <div class="legal-block reveal ${directionClass(i)}"><h3>${s.title}</h3><p>${s.body}</p></div>`).join("");
}

function renderNotices(){
  $all("#noticesTabs button").forEach(b=>{
    b.classList.toggle("active", b.dataset.tab === state.notices.tab);
    b.onclick = ()=>{ state.notices.tab = b.dataset.tab; renderNotices(); };
  });
  const items = state.notices.tab === "official" ? DATA.officialNotices : DATA.learnovaUpdates;
  $("#noticesList").innerHTML = items.map((n,i)=>`
    <div class="glass-card reveal ${directionClass(i)}" style="margin-bottom:12px;">
      <h4 style="font-size:14px;">${n.title}</h4>
      <span style="font-size:11px;color:var(--text-muted);">${n.date}</span>
      <p style="font-size:12.5px;color:var(--text-secondary);margin-top:8px;line-height:1.6;">${n.body}</p>
    </div>`).join("");
  revealIn($("#view-notices"));
}

function showOwlBubble(text, view, celebrate){
  const bubble = $("#owlBubble");
  const textEl = $("#owlText");
  const avatar = $("#owlAvatar");
  bubble.classList.add("show");
  avatar.classList.add("talking");
  window.setTimeout(()=> avatar.classList.remove("talking"), 650);
  if(celebrate){
    textEl.innerHTML = `${OWL.name} is typing<span class="owl-typing"><span></span><span></span><span></span></span>`;
    window.setTimeout(()=>{ textEl.textContent = text; }, 700);
  } else {
    textEl.textContent = text;
  }
  OWL.markSeen(view);
  clearTimeout(window.__owlTimer);
  window.__owlTimer = setTimeout(()=> bubble.classList.remove("show"), 6500);
}

function initOwl(){
  $("#owlAvatar").innerHTML = OWL.svg;
  $("#owlAvatar").addEventListener("click", ()=>{
    const bubble = $("#owlBubble");
    if(bubble.classList.contains("show")){ bubble.classList.remove("show"); return; }
    const next = OWL.nextUnseenTip();
    if(next){ showView(next.view); }
    else showOwlBubble(OWL.tips[state.view] || "You've explored every corner of Learnova. Keep up the streak!", state.view);
  });
  $("#owlNextBtn").addEventListener("click", ()=> $("#owlBubble").classList.remove("show"));
}

function initNav(){
  $all(".tab-btn").forEach(b=> b.addEventListener("click", ()=> showView(b.dataset.view)));
  $all(".menu-list button[data-view]").forEach(b=> b.addEventListener("click", ()=> showView(b.dataset.view)));
  $all(".nav-link[data-view]").forEach(b=> b.addEventListener("click", ()=> showView(b.dataset.view)));
  $all("[data-goto]").forEach(b=> b.addEventListener("click", ()=> showView(b.dataset.goto)));
  $("#hamburgerBtn").addEventListener("click", ()=>{
    const isOpen = $("#sideMenu").classList.contains("open");
    if(isOpen) closeSideMenu();
    else {
      $("#sideMenu").classList.add("open");
      $("#menuOverlay").classList.add("open");
    }
  });
  $("#menuOverlay").addEventListener("click", closeSideMenu);
  $("#laiShortcut").addEventListener("click", ()=> showView("lai"));
}

document.addEventListener("DOMContentLoaded", ()=>{
  initTheme();
  initNav();
  initOwl();
  showView("home");
  setTimeout(()=>{
    if(state.view !== "home") return;
    const next = OWL.nextUnseenTip();
    if(next && next.view !== "home") showOwlBubble(next.text, next.view);
  }, 1400);
});
