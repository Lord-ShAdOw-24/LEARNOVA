const LEARNOVA_DATA = (() => {

const subjects = [
  "Mathematics","English Language","French","Biology","Chemistry","Physics",
  "Geography","History","Economics","Literature in English","Further Mathematics",
  "Computer Science","ICT","Food Science and Nutrition","Philosophy","Religious Studies",
  "Commerce","Accounting","Management","Law","Citizenship Education"
];

const examClasses = [
  { id:"form1", label:"Form 1", group:"olevel" },
  { id:"form2", label:"Form 2", group:"olevel" },
  { id:"form3", label:"Form 3", group:"olevel" },
  { id:"form4", label:"Form 4", group:"olevel" },
  { id:"form5", label:"Form 5", group:"olevel" },
  { id:"ls", label:"Lower Sixth", group:"alevel" },
  { id:"us", label:"Upper Sixth", group:"alevel" }
];

const monthlyCompetitionCategories = [
  { id:"form4-sci", label:"Form 4 Science" },
  { id:"form4-art", label:"Form 4 Arts" },
  { id:"form5-sci", label:"Form 5 Science" },
  { id:"form5-art", label:"Form 5 Arts" },
  { id:"ls-sci", label:"Lower Sixth Science" },
  { id:"ls-art", label:"Lower Sixth Arts" },
  { id:"us-sci", label:"Upper Sixth Science" },
  { id:"us-art", label:"Upper Sixth Arts" }
];

const rankOrder = ["NR","D","C","B","A","S","SS","SSS"];

const rankThresholds = [
  { min:0, max:19.999, code:"NR", label:"Not Ranked" },
  { min:20, max:39.999, code:"D", label:"Rank D" },
  { min:40, max:54.999, code:"C", label:"Rank C" },
  { min:55, max:69.999, code:"B", label:"Rank B" },
  { min:70, max:79.999, code:"A", label:"Rank A" },
  { min:80, max:89.999, code:"S", label:"Rank S" },
  { min:90, max:95.999, code:"SS", label:"Rank SS" },
  { min:96, max:100, code:"SSS", label:"Rank SSS" }
];

function rankFromScore(pct){
  const found = rankThresholds.find(r => pct >= r.min && pct <= r.max);
  return found ? found.code : "NR";
}

const series = {
  S1: {
    track:"Science",
    core:["Chemistry","Physics","PMM or PMS"],
    additional:["FMA","BIO","FSN, ICT or CSC"],
    careers:["Aeronautics","Aerospace engineering","Chemical engineering","Civil Engineering","Electrical engineering","Industrial engineering","Mechanical engineering","Renewable energy engineering","Nuclear engineering","Telecommunication engineering","Software engineering","Military enlistment","Teaching","Computer engineering","Petroleum engineering","Scientific researcher","Transportation engineering (transit, rail, infrastructure, multimodal)"]
  },
  S2: {
    track:"Science",
    core:["Chemistry","Physics","Biology"],
    additional:["PMM or PMS","FMA","FSN, ICT or CSC"],
    careers:["Medicine","Nursing","Midwifery","Pharmacy","Public health","Biomedical engineering","Anaesthesiology","Epidemiology","Laboratory technology","Radiology","Telecommunication engineering","Military enlistment","Teaching","Agricultural engineering","Veterinary medicine","Petroleum engineering","Forestry","Soil science","Scientific researcher","Plant health management","Wildlife health","Fisheries and Aquaculture","Fisheries and aquatic science","Pharmacy technician"]
  },
  S3: {
    track:"Science",
    core:["Chemistry","Biology","PMM or PMS"],
    additional:["FSN, ICT or CSC","Physics"],
    careers:["Agricultural science","Chemical engineering","Biotechnology","Medicine","Nursing","Pharmacy","Public health","Pharmacy technician","Anaesthesiology","Laboratory technology","Biomedical engineering","Veterinary medicine","Military enlistment","Teaching","Statistician","Midwifery","Forestry","Food technology","Bioinformatics","Agricultural extension and rural development","Crop production","Horticulture","Soil science","Plant health management","Fisheries and Aquaculture"]
  },
  S4: {
    track:"Science",
    core:["Chemistry","Biology","Geography"],
    additional:["FSN, ICT or CSC","PMM or PMS"],
    careers:["Agricultural engineering","Biotechnology","Geological mining","Geotechnical engineering","Laboratory technology","Midwifery","Nursing","Military enlistment","Teaching","Petroleum engineering","Geological researcher","Meteorology / meteorological engineering","Environmental engineering","Occupational health and safety","Petroleum technology"]
  },
  S5: {
    track:"Science",
    core:["Chemistry","Biology","Food Science and Nutrition"],
    additional:["Geography","PMM or PMS"],
    careers:["Agricultural engineering","Chemical engineering","Food technology","Biotechnology","Geological mining","Midwifery","Nursing","Laboratory technology","Geological researcher","Teaching"]
  },
  A1: {
    track:"Arts",
    core:["French Literature","History","Literature in English"],
    additional:["English Language or Religious Studies","Philosophy, FSN or ICT"],
    careers:["Translation","Interpretation","Translation and intercultural studies","Modern letters","Bilingual letters","Teaching","Theoretical linguistics","Journalism and mass communication","Performing and visual arts","Film and television documentary production","Educational leadership","Educational foundation and administration","Educational psychology","Guidance counseling"]
  },
  A2: {
    track:"Arts",
    core:["History","Geography","Economics"],
    additional:["English Language or Religious Studies","Philosophy, FSN or ICT"],
    careers:["Educational psychology","Guidance counseling","Special education","Teaching","Sociology and Anthropology","Law","Political science","Public administration","Conflict resolution","International relations","Transport planning and logistics","Statistician","Economics","Management","Meteorological engineering","Marketing","Accounting","Entrepreneurship","Banking and Finance","Insurance","Development studies"]
  },
  A3: {
    track:"Arts",
    core:["History","Literature in English","Economics"],
    additional:["Philosophy, FSN or ICT"],
    careers:["Translation","Interpretation","Translation and intercultural studies","Modern letters","Bilingual letters","Teaching","Language and communication","Theoretical linguistics","Journalism and mass communication","Accounting","Marketing","Entrepreneurship","Banking and Finance","Management"]
  },
  A4: {
    track:"Arts",
    core:["PMS","Geography","Economics"],
    additional:["English Language or Religious Studies","Philosophy, FSN or ICT"],
    careers:["Meteorological engineering","Statistician","Transport planning and logistics","Teaching","Insurance","Accounting","Management","Public administration","Law","Development studies","Marketing","Banking and Finance","Entrepreneurship","Certified Public Accounting","Economics","Computer science","Agricultural economics","Agribusiness"]
  },
  A5: {
    track:"Arts",
    core:["History","Literature in English","Philosophy"],
    additional:["English Language or Religious Studies","French Literature or ICT"],
    careers:["Political science","Teaching","Performing and visual arts","Film and television documentary production","Educational psychology","Educational leadership","Educational foundation and administration","Guidance counseling","Language and communication","Theoretical linguistics","Sociology and Anthropology","Journalism and mass communication","Public administration","Law","Modern letters","Bilingual letters","Heritage studies and management","Conflict resolution","International relations","Special education","Interpretation","Translation"]
  }
};

const pastPapers = [
  { id:1, type:"GCE", level:"O'Level", subject:"Mathematics", year:2025, price:150, downloads:812 },
  { id:2, type:"GCE", level:"O'Level", subject:"English Language", year:2025, price:150, downloads:940 },
  { id:3, type:"GCE", level:"A'Level", subject:"Biology", year:2024, price:200, downloads:530 },
  { id:4, type:"GCE", level:"A'Level", subject:"Physics", year:2024, price:200, downloads:410 },
  { id:5, type:"Concours", level:"Concours", subject:"ENAM \u2013 Cycle A", year:2025, price:500, downloads:1220 },
  { id:6, type:"Concours", level:"Concours", subject:"FMSB \u2013 Medicine", year:2025, price:500, downloads:990 },
  { id:7, type:"GCE", level:"O'Level", subject:"Chemistry", year:2023, price:150, downloads:355 },
  { id:8, type:"Concours", level:"Concours", subject:"ENS \u2013 Yaounde", year:2024, price:450, downloads:670 }
];

const notes = [
  { id:1, level:"O'Level", subject:"Mathematics", topic:"Quadratic Equations", free:true },
  { id:2, level:"O'Level", subject:"Biology", topic:"Cell Structure & Function", free:true },
  { id:3, level:"A'Level", subject:"Chemistry", topic:"Organic Reaction Mechanisms", free:false, price:100 },
  { id:4, level:"A'Level", subject:"Economics", topic:"Elasticity of Demand", free:true },
  { id:5, level:"A'Level", subject:"Physics", topic:"Electromagnetic Induction", free:false, price:100 }
];

const videoLessons = [
  { id:1, subject:"Mathematics", topic:"Solving Simultaneous Equations", duration:"08:24" },
  { id:2, subject:"Biology", topic:"Photosynthesis Explained", duration:"11:02" },
  { id:3, subject:"Physics", topic:"Newton's Laws of Motion", duration:"09:47" },
  { id:4, subject:"Literature in English", topic:"Analysing Poetic Devices", duration:"07:15" }
];

const concoursDesk = [
  { id:1, name:"ENAM \u2013 National School of Administration and Magistracy", deadline:"15 March 2027", centers:"Yaounde, Douala, Bamenda, Buea", docs:"Birth certificate, degree/diploma, medical certificate, application fee receipt" },
  { id:2, name:"FMSB \u2013 Faculty of Medicine and Biomedical Sciences", deadline:"30 June 2027", centers:"Yaounde, Douala, Buea", docs:"GCE A'Level certificate, birth certificate, medical certificate" },
  { id:3, name:"ENS \u2013 Higher Teacher Training College", deadline:"20 July 2027", centers:"Yaounde, Bambili, Maroua", docs:"GCE A'Level certificate, birth certificate, application form" },
  { id:4, name:"Police / Gendarmerie Officer Entrance", deadline:"10 August 2027", centers:"Regional delegations nationwide", docs:"Birth certificate, nationality certificate, medical certificate, certificate of good conduct" }
];

const leaderboard = [
  { id:1, name:"Achiri Neba", school:"GBHS Bamenda", subject:"Mathematics", difficulty:"High", score:98, premium:true },
  { id:2, name:"Fon Delphine", school:"Sacred Heart College Bamenda", subject:"Mathematics", difficulty:"High", score:94, premium:true },
  { id:3, name:"Tabe Junior", school:"GBHS Limbe", subject:"Mathematics", difficulty:"High", score:91, premium:false },
  { id:4, name:"Ngu Praise", school:"Baptist High School Buea", subject:"Mathematics", difficulty:"High", score:87, premium:true },
  { id:5, name:"Mbah Collins", school:"GBHS Molyko", subject:"Mathematics", difficulty:"High", score:79, premium:false },
  { id:6, name:"Ashu Merline", school:"Presbyterian Secondary School Nkwen", subject:"Mathematics", difficulty:"High", score:71, premium:false },
  { id:7, name:"Fru Godlove", school:"GBHS Kumba", subject:"Mathematics", difficulty:"High", score:63, premium:false },
  { id:8, name:"Enow Priscilla", school:"CBC Bali", subject:"Mathematics", difficulty:"High", score:54, premium:false },
  { id:9, name:"Nkeng Vivian", school:"GBHS Mankon", subject:"Mathematics", difficulty:"High", score:38, premium:false },
  { id:10, name:"Che Brian", school:"GBHS Muea", subject:"Mathematics", difficulty:"High", score:17, premium:false }
].map(s => ({ ...s, rank: rankFromScore(s.score) }));

const teachers = [
  { id:1, name:"Mr. Ako Simon", subject:"Mathematics", rating:4.8, certified:true, price:3000, students:214, bio:"12 years teaching A'Level Mathematics and Further Mathematics, GCE marker." },
  { id:2, name:"Mrs. Beltha Fomukong", subject:"Biology", rating:4.6, certified:true, price:2500, students:176, bio:"Biology and Food Science specialist, focuses on GCE practical technique." },
  { id:3, name:"Mr. Divine Ntui", subject:"Physics", rating:4.3, certified:false, price:2000, students:58, bio:"Young graduate teacher, engaging problem-solving sessions for Form 5 and Lower Sixth." },
  { id:4, name:"Mrs. Grace Ojong", subject:"Literature in English", rating:4.9, certified:true, price:2500, students:301, bio:"Former GCE Board examiner, specialised in poetry and prose analysis." }
];

const founders = [
  { id:1, name:"Founder Name 1", role:"Founder & CEO", initials:"F1", photo:"assets/founders/ceo.jpg", bio:"Leads Learnova's vision and partnerships with schools and education authorities across Cameroon." },
  { id:2, name:"Founder Name 2", role:"Co-Founder & Chief Technology Officer", initials:"F2", photo:"assets/founders/cofounder-2.jpg", bio:"Oversees the engineering behind the app, the anti-piracy system and the L-Ai assistant." },
  { id:3, name:"Founder Name 3", role:"Partner & Head of Academics", initials:"F3", photo:"assets/founders/cofounder-3.jpg", bio:"Coordinates the pedagogical team, the past-paper library and quiz calibration." },
  { id:4, name:"Founder Name 4", role:"Partner & Head of Growth", initials:"F4", photo:"assets/founders/cofounder-4.jpg", bio:"Builds partnerships with schools, sponsors and the teacher community nationwide." }
];

const officialNotices = [
  { id:1, title:"2027 GCE Registration Calendar Released", date:"3 September 2026", body:"The Cameroon GCE Board has released the registration calendar for the 2027 O'Level and A'Level examinations. Registration opens 1 October 2026." },
  { id:2, title:"Concours Entrance Deadlines Update", date:"28 August 2026", body:"Several professional schools have adjusted their 2027 concours application deadlines. Check the Concours Information Desk for each school." }
];

const learnovaUpdates = [
  { id:1, title:"Free Study Groups are here", date:"2 September 2026", body:"You can now create or join free peer study groups, separate from paid teacher classes." },
  { id:2, title:"Progress Dashboard added to Profile", date:"20 August 2026", body:"Track your performance curve per subject over 7 days, 30 days, term or academic year." }
];

const levelThresholds = [0, 4000, 9000, 16000, 26000, 40000, 60000, 85000, 120000, 170000, 240000];

function levelFromSpend(totalSpent){
  let level = 0;
  for(let i=0;i<levelThresholds.length;i++){
    if(totalSpent >= levelThresholds[i]) level = i;
  }
  return level;
}

function levelTier(level){
  if(level >= 10) return "diamond";
  if(level >= 9) return "gold";
  if(level >= 6) return "silver";
  if(level >= 3) return "bronze";
  return "default";
}

function referralBonusForLevel(level){
  return { referrer: 50 + level * 25, newcomer: 100 + level * 15 };
}

const creditPacks = [
  { credits:200, amount:1000 },
  { credits:500, amount:2200 },
  { credits:1200, amount:4500 }
];

const premiumPlans = [
  { id:"basic", name:"Basic", price:"1 500 FCFA/mo", amount:1500, credits:200, devices:1 },
  { id:"plus", name:"Plus", price:"3 000 FCFA/mo", amount:3000, credits:500, devices:2 },
  { id:"elite", name:"Elite", price:"5 000 FCFA/mo", amount:5000, credits:1200, devices:3 }
];

const certificationPlans = [
  { id:"monthly", name:"Monthly", price:"5 000 FCFA", amount:5000, groups:2 },
  { id:"yearly", name:"Yearly", price:"45 000 FCFA", amount:45000, groups:5 },
  { id:"lifetime", name:"Lifetime (Partner)", price:"250 000 FCFA", amount:250000, groups:"Unlimited" }
];

return {
  subjects, examClasses, monthlyCompetitionCategories, rankOrder, rankThresholds,
  rankFromScore, series, pastPapers, notes, videoLessons, concoursDesk, leaderboard,
  teachers, founders, officialNotices, learnovaUpdates, creditPacks, premiumPlans, certificationPlans,
  levelThresholds, levelFromSpend, levelTier, referralBonusForLevel
};

})();
