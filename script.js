const GITHUB_USERNAME = "CyberSly0312";
const translations = {
 en: {
  navAbout:"About",navStack:"Stack",navProjects:"Projects",navActivity:"Activity",navContact:"Contact",
  heroEyebrow:"SYSTEM ONLINE · CONTINUOUSLY LEARNING",heroHello:"Hello, I'm",heroRole:'Cybersecurity Student <span class="role-divider">/</span> Developer',
  heroDescription:"I explore how systems work, build useful digital solutions and learn how to make technology more secure.",viewWork:"Explore my work",getInTouch:"Get in touch",metaFocus:"Security · Development · Linux",portraitCaption:"HUMAN BEHIND THE TERMINAL",scroll:"SCROLL TO EXPLORE",
  terminalTitle:"A little command line.",terminalNote:"Curious? Try a command.",terminalWelcome:'Welcome to Sylvestre\\'s portfolio shell. Type <b>help</b> to see available commands.',try:"TRY:",
  aboutTitle:"Beyond the screen.",aboutHeadline:'Learning by building.<br><span class="muted">Securing by understanding.</span>',
  aboutText:"I'm a second-year Cybersecurity student at Tamale Technical University. My interests sit at the intersection of defensive security, Linux systems, networking and web development. I enjoy taking ideas apart, understanding how they work, and turning that knowledge into practical projects.",
  aboutText2:"My approach is hands-on: build a lab, test a system, document what I learn, then improve it. I'm steadily working toward a career in security operations and cybersecurity analysis.",
  educationLabel:"EDUCATION",educationDetail:"BTech · Cybersecurity",focusLabel:"CURRENT FOCUS",focusValue:"Blue Team & Linux",focusDetail:"Networking · Monitoring · System security",mindsetLabel:"WORKING STYLE",mindsetValue:"Curious. Practical. Persistent.",mindsetDetail:"Learn through experiments and real projects.",
  stackTitle:"Tools of the trade.",stackNote:"Technologies I use, study or explore.",stackSecurity:"Cybersecurity",stackSystems:"Systems & Networking",stackDevelopment:"Development",stackLearning:"Learning platforms",stackDisclaimer:"Progress bars are visual categories, not skill ratings or certifications.",
  projectsTitle:"Things I've been building.",allRepos:"ALL REPOSITORIES",projectTypeBuild:"IN DEVELOPMENT",projectTypeLive:"DEPLOYED PROJECT",nexusDesc:"A school management platform designed around the needs of French-speaking schools, with multi-tenant architecture and modular academic workflows.",shopDesc:"An e-commerce application project exploring backend development, API design and database-driven features.",aganiwuDesc:"A business website developed with native PHP, MySQL and frontend technologies, including a custom content management area.",viewRepository:"View repository",visitWebsite:"Visit website",projectNote:"Project descriptions reflect current known scope. More case studies and screenshots will be added as projects are documented.",
  activityTitle:"Consistency over noise.",contributionTitle:"Contribution activity",contributionLoading:"Loading public contribution data…",contributionNote:"Contribution calendar loads from a public community endpoint. If unavailable, it will show a fallback message.",less:"Less",more:"More",
  learningTitle:"Always in progress.",certifications:"CERTIFICATIONS & COURSES",certTitle:"Building a foundation.",labTitle:"PRACTICAL LEARNING",labHeadline:"Learning in the lab.",
  contactTitle:'Have something<br><span>interesting in mind?</span>',contactText:"I'm always interested in thoughtful conversations, collaborative projects and opportunities to learn.",sendMessage:"Send me a message",footerText:"Designed & built with curiosity. © YEAR Sylvestre Zongo."
 },
 fr: {
  navAbout:"À propos",navStack:"Compétences",navProjects:"Projets",navActivity:"Activité",navContact:"Contact",
  heroEyebrow:"SYSTÈME EN LIGNE · APPRENTISSAGE CONTINU",heroHello:"Bonjour, je suis",heroRole:'Étudiant en cybersécurité <span class="role-divider">/</span> Développeur',
  heroDescription:"J'explore le fonctionnement des systèmes, je conçois des solutions numériques utiles et j'apprends à rendre la technologie plus sûre.",viewWork:"Découvrir mes projets",getInTouch:"Me contacter",metaFocus:"Sécurité · Développement · Linux",portraitCaption:"L'HUMAIN DERRIÈRE LE TERMINAL",scroll:"DÉFILER POUR EXPLORER",
  terminalTitle:"Un peu de ligne de commande.",terminalNote:"Curieux ? Essayez une commande.",terminalWelcome:'Bienvenue dans le terminal du portfolio de Sylvestre. Tapez <b>help</b> pour voir les commandes disponibles.',try:"ESSAYER :",
  aboutTitle:"Au-delà de l'écran.",aboutHeadline:'Apprendre en construisant.<br><span class="muted">Sécuriser en comprenant.</span>',
  aboutText:"Je suis étudiant en deuxième année de BTech en cybersécurité à la Tamale Technical University. Mes centres d'intérêt se situent à la croisée de la sécurité défensive, des systèmes Linux, des réseaux et du développement web. J'aime comprendre le fonctionnement des technologies et transformer ces connaissances en projets concrets.",
  aboutText2:"Mon approche est pratique : créer un laboratoire, tester un système, documenter mes apprentissages, puis améliorer. Je construis progressivement mon parcours vers les opérations de sécurité et l'analyse en cybersécurité.",
  educationLabel:"FORMATION",educationDetail:"BTech · Cybersécurité",focusLabel:"FOCUS ACTUEL",focusValue:"Blue Team & Linux",focusDetail:"Réseaux · Supervision · Sécurité des systèmes",mindsetLabel:"FAÇON DE TRAVAILLER",mindsetValue:"Curieux. Pratique. Persévérant.",mindsetDetail:"Apprendre par l'expérimentation et les projets réels.",
  stackTitle:"Ma boîte à outils.",stackNote:"Technologies utilisées, étudiées ou explorées.",stackSecurity:"Cybersécurité",stackSystems:"Systèmes & Réseaux",stackDevelopment:"Développement",stackLearning:"Plateformes d'apprentissage",stackDisclaimer:"Les barres sont des repères visuels, pas des notes de compétence ou des certifications.",
  projectsTitle:"Ce que je construis.",allRepos:"TOUS LES DÉPÔTS",projectTypeBuild:"EN DÉVELOPPEMENT",projectTypeLive:"PROJET EN LIGNE",nexusDesc:"Une plateforme de gestion scolaire pensée pour les établissements francophones, avec une architecture multi-tenant et des modules dédiés aux processus académiques.",shopDesc:"Un projet d'application e-commerce consacré au développement backend, à la conception d'API et aux fonctionnalités pilotées par une base de données.",aganiwuDesc:"Un site web professionnel développé avec PHP natif, MySQL et des technologies frontend, comprenant un espace de gestion de contenu personnalisé.",viewRepository:"Voir le dépôt",visitWebsite:"Visiter le site",projectNote:"Les descriptions reflètent le périmètre actuellement connu. D'autres études de cas et captures seront ajoutées au fil de la documentation des projets.",
  activityTitle:"La régularité plutôt que le bruit.",contributionTitle:"Activité de contribution",contributionLoading:"Chargement des contributions publiques…",contributionNote:"Le calendrier est chargé depuis un service communautaire public. Un message alternatif s'affichera en cas d'indisponibilité.",less:"Moins",more:"Plus",
  learningTitle:"Toujours en progression.",certifications:"CERTIFICATIONS & FORMATIONS",certTitle:"Construire des bases solides.",labTitle:"APPRENTISSAGE PRATIQUE",labHeadline:"Apprendre au laboratoire.",
  contactTitle:'Vous avez une idée<br><span>intéressante en tête ?</span>',contactText:"Je suis toujours intéressé par les échanges enrichissants, les projets collaboratifs et les occasions d'apprendre.",sendMessage:"M'envoyer un message",footerText:"Conçu et développé avec curiosité. © YEAR Sylvestre Zongo."
 }
};
let currentLang = "en";
const $ = (s,root=document)=>root.querySelector(s);
const $$ = (s,root=document)=>[...root.querySelectorAll(s)];
function setLanguage(lang){
 currentLang=lang;document.documentElement.lang=lang;
 $$("[data-i18n]").forEach(el=>{const key=el.dataset.i18n;if(translations[lang][key])el.innerHTML=translations[lang][key].replace("YEAR",new Date().getFullYear());});
 $("#langSwitch").innerHTML=lang==="en"?'FR <span>/</span> EN':'FR <span>/</span> EN';
 $("#terminalInput").placeholder=lang==="en"?"type help and press enter":"tapez help puis entrée";
 $("#contributionSummary").textContent=lang==="en"?"Loading public contribution data…":"Chargement des contributions publiques…";
}
$("#langSwitch").addEventListener("click",()=>setLanguage(currentLang==="en"?"fr":"en"));
$("#year").textContent=new Date().getFullYear();

const terminalCommands={
 help:{en:["Available commands:","about      — learn more about me","skills     — explore my technical toolkit","projects   — see what I'm building","contact    — find ways to reach me","clear      — clear this terminal"],fr:["Commandes disponibles :","about      — en savoir plus sur moi","skills     — découvrir mes outils techniques","projects   — voir mes projets","contact    — trouver comment me joindre","clear      — effacer le terminal"]},
 about:{en:["Sylvestre Zongo","Cybersecurity student at Tamale Technical University.","Interested in defensive security, Linux, networking and web development.","Current direction: Security Operations / Cybersecurity Analysis."],fr:["Sylvestre Zongo","Étudiant en cybersécurité à la Tamale Technical University.","Intéressé par la sécurité défensive, Linux, les réseaux et le développement web.","Objectif actuel : opérations de sécurité / analyse en cybersécurité."]},
 skills:{en:["SECURITY    Nmap · Wireshark · Burp Suite · Ghidra · Volatility · Snort","SYSTEMS     Linux · Ubuntu · Debian · Docker · VirtualBox","DEVELOPMENT PHP · Python · JavaScript · HTML · CSS · MySQL","LEARNING    TryHackMe · Hack The Box · CyberDefenders · SadServers"],fr:["SÉCURITÉ     Nmap · Wireshark · Burp Suite · Ghidra · Volatility · Snort","SYSTÈMES     Linux · Ubuntu · Debian · Docker · VirtualBox","DÉVELOPPEMENT PHP · Python · JavaScript · HTML · CSS · MySQL","APPRENTISSAGE TryHackMe · Hack The Box · CyberDefenders · SadServers"]},
 projects:{en:["FEATURED PROJECTS","NexusSchool — modular school management platform (in development)","ShopToo — e-commerce application project (in development)","Aganiwu Enterprise — deployed business website","Use the project cards below to open each project."],fr:["PROJETS À LA UNE","NexusSchool — plateforme modulaire de gestion scolaire (en développement)","ShopToo — projet d'application e-commerce (en développement)","Aganiwu Enterprise — site professionnel en ligne","Utilisez les cartes ci-dessous pour ouvrir chaque projet."]},
 contact:{en:["Let's connect.","Email: zkshine@proton.me","LinkedIn: linkedin.com/in/n-w-sylvestre-zongo-61579a20","GitHub: github.com/CyberSly0312"],fr:["Restons en contact.","E-mail : zkshine@proton.me","LinkedIn : linkedin.com/in/n-w-sylvestre-zongo-61579a20","GitHub : github.com/CyberSly0312"]}
};
function runCommand(raw){
 const command=raw.trim().toLowerCase();if(!command)return;
 const output=$("#terminalOutput");
 if(command==="clear"){output.innerHTML="";return;}
 const cmdLine=document.createElement("div");cmdLine.className="command-line";cmdLine.textContent=`visitor@portfolio:~$ ${raw}`;output.appendChild(cmdLine);
 const lines=terminalCommands[command]?.[currentLang];
 if(!lines){const error=document.createElement("div");error.className="output-line";error.textContent=currentLang==="en"?`command not found: ${command}. Type "help" to see available commands.`:`commande introuvable : ${command}. Tapez "help" pour voir les commandes.`;output.appendChild(error);}
 else lines.forEach((line,i)=>{const el=document.createElement("div");el.className="output-line";el.textContent=line;if(i===0)el.classList.add("output-highlight");output.appendChild(el);});
 $("#terminalBody").scrollTop=$("#terminalBody").scrollHeight;
}
$("#terminalForm").addEventListener("submit",e=>{e.preventDefault();const input=$("#terminalInput");runCommand(input.value);input.value="";});
$$("[data-command]").forEach(btn=>btn.addEventListener("click",()=>{runCommand(btn.dataset.command);}));

// Contribution graph: uses a public endpoint for the real public GitHub contribution calendar.
async function loadContributions(){
 const grid=$("#contributionGrid"),months=$("#calendarMonths");
 try{
  const response=await fetch(`https://github-contributions-api.jogruber.de/v4/${GITHUB_USERNAME}?y=last`);
  if(!response.ok)throw new Error("Contribution service unavailable");
  const data=await response.json();const days=data.contributions||[];
  if(!days.length)throw new Error("No contribution data");
  grid.innerHTML="";months.innerHTML="";
  const first=new Date(days[0].date+"T00:00:00");const pad=(first.getDay()+6)%7;
  for(let i=0;i<pad;i++){const empty=document.createElement("span");empty.className="contribution-cell";empty.style.visibility="hidden";grid.appendChild(empty);}
  days.forEach(day=>{
   const cell=document.createElement("span");cell.className=`contribution-cell level-${Math.min(4,day.level||0)}`;
   cell.title=`${day.date}: ${day.count} contribution(s)`;cell.setAttribute("aria-label",cell.title);grid.appendChild(cell);
  });
  const monthNames=currentLang==="fr"?["janv.","févr.","mars","avr.","mai","juin","juil.","août","sept.","oct.","nov.","déc."]:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  const seen=new Set();days.forEach((d,i)=>{const date=new Date(d.date+"T00:00:00");const key=`${date.getFullYear()}-${date.getMonth()}`;if(date.getDate()<=7&&!seen.has(key)){seen.add(key);const m=document.createElement("span");m.textContent=monthNames[date.getMonth()];m.style.position="absolute";m.style.left=`${Math.round(i/7*100)}%`;months.appendChild(m);}});
  months.style.position="relative";$("#activityYear").textContent=new Date(days[days.length-1].date+"T00:00:00").getFullYear();
  const total=days.reduce((sum,d)=>sum+(d.count||0),0);
  $("#contributionSummary").textContent=currentLang==="en"?`${total.toLocaleString()} public contributions in the displayed period`:`${total.toLocaleString()} contributions publiques sur la période affichée`;
 }catch(err){
  grid.innerHTML="";months.innerHTML="";
  $("#contributionSummary").textContent=currentLang==="en"?"Contribution data could not be loaded right now.":"Les données de contribution ne sont pas disponibles pour le moment.";
  const fallback=document.createElement("p");fallback.className="mono";fallback.style.cssText="color:#8195a8;font-size:10px;grid-column:1/-1";fallback.textContent=currentLang==="en"?"Visit the GitHub profile to view contribution activity.":"Consultez le profil GitHub pour voir l'activité de contribution.";
  grid.appendChild(fallback);$("#activityYear").textContent=new Date().getFullYear();
 }
}
loadContributions();

// Prefer a personal portrait at assets/profile.jpg. If absent, keep the included illustrated placeholder.
const portrait=$("#portrait");portrait.addEventListener("error",()=>{portrait.src="assets/profile-placeholder.svg";});
const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add("visible");observer.unobserve(entry.target);}}),{threshold:.12});
$$("section:not(.hero) .section-heading, .glass-card, .stack-card, .project-card, .contact-card").forEach(el=>{el.classList.add("reveal");observer.observe(el);});
$("#menuToggle").addEventListener("click",()=>$(".desktop-nav").classList.toggle("open"));
$$(".desktop-nav a").forEach(a=>a.addEventListener("click",()=>$(".desktop-nav").classList.remove("open")));
setLanguage("en");
