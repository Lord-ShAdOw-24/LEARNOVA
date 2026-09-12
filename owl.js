const LEARNOVA_OWL = (() => {

const svg = `
<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Learnova owl guide">
  <defs>
    <radialGradient id="owlBodyGrad" cx="35%" cy="30%" r="80%">
      <stop offset="0%" stop-color="#16385f"/>
      <stop offset="100%" stop-color="#0A1E3C"/>
    </radialGradient>
  </defs>
  <ellipse cx="100" cy="118" rx="62" ry="58" fill="url(#owlBodyGrad)"/>
  <path d="M45 70 L95 40 L100 62 L60 92 Z" fill="#0A1E3C"/>
  <path d="M155 70 L105 40 L100 62 L140 92 Z" fill="#0A1E3C"/>
  <path d="M45 70 L95 40 L100 62 L60 92 Z" fill="none" stroke="#FFC107" stroke-width="3" stroke-linejoin="round"/>
  <path d="M155 70 L105 40 L100 62 L140 92 Z" fill="none" stroke="#FFC107" stroke-width="3" stroke-linejoin="round"/>
  <rect x="93" y="34" width="14" height="20" rx="2" fill="#FFC107"/>
  <circle cx="100" cy="34" r="4" fill="#FFC107"/>
  <path d="M28 96 C10 108 8 140 30 156 C42 132 40 108 28 96 Z" fill="#FFC107"/>
  <path d="M172 96 C190 108 192 140 170 156 C158 132 160 108 172 96 Z" fill="#FFC107"/>
  <path d="M32 100 C18 112 18 136 34 148" fill="none" stroke="#FFFFFF" stroke-width="3" stroke-linecap="round" opacity="0.7"/>
  <path d="M168 100 C182 112 182 136 166 148" fill="none" stroke="#FFFFFF" stroke-width="3" stroke-linecap="round" opacity="0.7"/>
  <ellipse cx="100" cy="128" rx="42" ry="44" fill="#FFFFFF"/>
  <circle cx="80" cy="122" r="17" fill="#FFFFFF" stroke="#FFC107" stroke-width="4"/>
  <circle cx="120" cy="122" r="17" fill="#FFFFFF" stroke="#FFC107" stroke-width="4"/>
  <g class="owl-eye-blink"><circle cx="80" cy="122" r="9" fill="#E9A51B"/><circle cx="80" cy="122" r="4.2" fill="#0A0A0A"/><circle cx="77.5" cy="119" r="1.6" fill="#FFFFFF"/></g>
  <g class="owl-eye-blink"><circle cx="120" cy="122" r="9" fill="#E9A51B"/><circle cx="120" cy="122" r="4.2" fill="#0A0A0A"/><circle cx="117.5" cy="119" r="1.6" fill="#FFFFFF"/></g>
  <path d="M96 138 L104 138 L100 146 Z" fill="#FFA500"/>
  <path d="M97 147 Q100 152 103 147" fill="none" stroke="#F25A68" stroke-width="2.4" stroke-linecap="round"/>
  <path d="M64 108 Q72 98 84 104" fill="none" stroke="#0A1E3C" stroke-width="3" stroke-linecap="round"/>
  <path d="M136 108 Q128 98 116 104" fill="none" stroke="#0A1E3C" stroke-width="3" stroke-linecap="round"/>
  <ellipse cx="100" cy="172" rx="46" ry="16" fill="#0A1E3C"/>
  <path d="M64 168 Q100 190 136 168" fill="none" stroke="#FFC107" stroke-width="3" stroke-linecap="round" opacity="0.8"/>
</svg>`;

const name = "Nova";

const tips = {
  home: "Welcome back. Your L-Credits and current streak are right at the top of your Home screen.",
  library: "Use the sort button to order past papers by year or by downloads, then tap a subject to preview it.",
  quizzes: "Every quiz category has its own leaderboard. Only your best attempt ever counts towards your rank.",
  compete: "Choose a series to see its three main subjects and every career it opens, then register for the Hackathon.",
  classes: "Read a teacher's disclosure carefully before joining a paid class \u2014 Learnova only manages the payment escrow.",
  lai: "L-Ai answers school-related questions only. Ask about a Concours deadline and I'll fetch it for you.",
  profile: "Switch between Student and Teacher preview to see how each dashboard looks.",
  about: "Meet the four people building Learnova for Cameroonian learners.",
  terms: "This is the full Terms of Service \u2014 worth a read before you register.",
  privacy: "Your CNI and identity photos are only used for teacher verification, never shown publicly.",
  notices: "Official GCE Board and Concours notices land here first.",
  settings: "You can switch between light, dark or system theme any time."
};

const featureTour = [
  { view:"home", text:"This is your Home dashboard \u2014 streak, rank and L-Credits at a glance." },
  { view:"library", text:"The Library holds every past paper, note and video lesson." },
  { view:"quizzes", text:"Quizzes give you a rank from D to SSS in every subject and difficulty." },
  { view:"compete", text:"Compete rooms, monthly competitions and the National Hackathon all live here." },
  { view:"classes", text:"Book a live paid class with a verified teacher in Classes." },
  { view:"lai", text:"Stuck on a topic? Ask L-Ai, your study assistant." }
];

const moments = {
  firstSave: "Bravo! Your first document is saved. Small habits like this build real momentum.",
  quizPass: "Nice work on that quiz \u2014 your leaderboard position just updated.",
  quizTopRank: "That is an outstanding rank! Keep this streak going and SSS is within reach.",
  premium: "Welcome to Premium. Your L-Credits and device limit just went up.",
  credits: "Your L-Credits balance is topped up and ready to unlock more documents.",
  certified: "Certification submitted. A blue badge and priority placement are on the way.",
  hackathon: "You are registered for the Hackathon \u2014 represent your school with pride.",
  monthly: "Registration confirmed. See you in the competition arena this week.",
  classJoined: "You joined the class. Remember: keep the relationship on-platform and safe.",
  roomCreated: "Your room is live. Share the code and may the best score win."
};

function seenTips(){
  try { return JSON.parse(localStorage.getItem("learnova_owl_seen") || "[]"); }
  catch(e){ return []; }
}

function markSeen(view){
  const seen = seenTips();
  if(!seen.includes(view)){
    seen.push(view);
    localStorage.setItem("learnova_owl_seen", JSON.stringify(seen));
  }
}

function nextUnseenTip(){
  const seen = seenTips();
  return featureTour.find(t => !seen.includes(t.view)) || null;
}

return { svg, name, tips, moments, featureTour, seenTips, markSeen, nextUnseenTip };

})();
