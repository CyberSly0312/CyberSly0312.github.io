const GITHUB_USERNAME = "CyberSly0312";
const translations = {
 en: {
  navAbout:"About",navStack:"Stack",navProjects:"Projects",navActivity:"Activity",navCredentials:"Credentials",navExperience:"Experience",navFootprint:"Verified work",navContact:"Contact",
  heroEyebrow:"SYSTEM ONLINE · CONTINUOUSLY LEARNING",heroHello:"Hello, I'm",heroRole:'Cybersecurity Student <span class="role-divider">/</span> Developer',
  heroDescription:"I explore how systems work, build useful digital solutions and learn how to make technology more secure.",viewWork:"Explore my work",getInTouch:"Get in touch",metaFocus:"Security · Development · Linux",portraitCaption:"HUMAN BEHIND THE TERMINAL",scroll:"SCROLL TO EXPLORE",
  terminalTitle:"A little command line.",terminalNote:"Curious? Try a command.",terminalWelcome:"Welcome to Sylvestre's portfolio shell. Type <b>help</b> to see available commands.",try:"TRY:",
  aboutTitle:"Beyond the screen.",aboutHeadline:'Learning by building.<br><span class="muted">Securing by understanding.</span>',
  aboutText:"I'm a second-year Cybersecurity student at Tamale Technical University. My interests sit at the intersection of defensive security, Linux systems, networking and web development. I enjoy taking ideas apart, understanding how they work, and turning that knowledge into practical projects.",
  aboutText2:"My approach is hands-on: build a lab, test a system, document what I learn, then improve it. I'm steadily working toward a career in security operations and cybersecurity analysis.",
  educationLabel:"EDUCATION",educationDetail:"BTech · Cybersecurity",focusLabel:"CURRENT FOCUS",focusValue:"Blue Team & Linux",focusDetail:"Networking · Monitoring · System security",mindsetLabel:"WORKING STYLE",mindsetValue:"Curious. Practical. Persistent.",mindsetDetail:"Learn through experiments and real projects.",
  stackTitle:"Tools of the trade.",stackNote:"Technologies I use, study or explore.",stackSecurity:"Cybersecurity",stackSystems:"Systems & Networking",stackDevelopment:"Development",stackLearning:"Learning platforms",stackDisclaimer:"Progress bars are visual categories, not skill ratings or certifications.",
  projectsTitle:"Things I've been building.",allRepos:"ALL REPOSITORIES",projectTypeBuild:"IN DEVELOPMENT",projectTypeLive:"DEPLOYED PROJECT",nexusDesc:"A school management platform designed around the needs of French-speaking schools, with multi-tenant architecture and modular academic workflows.",shopDesc:"An e-commerce application project exploring backend development, API design and database-driven features.",aganiwuDesc:"A business website developed with native PHP, MySQL and frontend technologies, including a custom content management area.",viewRepository:"Browse repositories",visitWebsite:"Visit website",projectNote:"Project descriptions reflect current known scope. More case studies and screenshots will be added as projects are documented.",
  activityTitle:"Consistency over noise.",contributionTitle:"Contribution activity",contributionLoading:"Loading public contribution data…",contributionUnavailable:"Contribution data could not be loaded right now.",contributionFallback:"Visit the GitHub profile to view contribution activity.",contributionNote:"Contribution calendar loads from a public community endpoint. If unavailable, it will show a fallback message.",less:"Less",more:"More",
  credentialsTitle:"Credentials & education.",professionalCertifications:"Professional certifications",academicCredentials:"Academic credentials",certificatesPath:"assets/documents/certificates/",academicPath:"assets/documents/academic/",credentialDisclaimer:"Only listed items with supplied documents or public verification links can be opened. Pending details are not endorsements or verification claims.",
  credentialIssueDate:"Issue date",credentialIssuer:"Issuing organization",credentialType:"Credential type",credentialId:"Credential ID",credentialIdPending:"Not provided",credentialDatePending:"Not provided",credentialView:"View Certificate",credentialDownload:"Download PDF",credentialVerify:"Verify Credential",credentialDocumentPending:"Document pending",credentialDocumentChecking:"Checking document availability…",credentialDocumentUnavailable:"Document unavailable. Check the file path before publishing.",credentialVerificationUnavailable:"No public verification link provided.",credentialPending:"Details pending",
  experienceTitle:"Experience in practice.",experienceType:"Experience type",experienceStart:"From",experienceEnd:"To",experienceLocation:"Location",experienceResponsibilities:"Responsibilities",experienceAchievements:"Achievements",experienceTools:"Technologies & tools",experienceEvidence:"Supporting reference",experiencePositionPending:"Position details pending",experienceTypePending:"Type not specified",experienceDatePending:"Dates not provided",experienceLocationPending:"Location not provided",experienceNoDetails:"Not provided",experiencePresent:"Present",experienceTypeEmployment:"Employment",experienceTypeInternship:"Internship",experienceTypeFreelance:"Freelance",experienceTypePractical:"Practical experience",
  footprintTitle:"Verified work & profiles.",footprintIntro:"Public links and profiles. A link's presence does not imply third-party endorsement.",footprintCategoryProfile:"Professional profile",footprintCategoryWebsite:"Live website",footprintCategoryRepository:"GitHub repository",footprintCategoryLearningProfile:"Learning profile",footprintCategoryDemo:"Project demonstration",footprintCategoryDocumentation:"Public documentation",footprintCategoryVerification:"Credential verification",footprintCategoryReference:"Reference or work attestation",footprintOpen:"Open external link",footprintPending:"Link pending confirmation",
  learningTitle:"Always in progress.",labTitle:"PRACTICAL LEARNING",labHeadline:"Learning in the lab.",tryhackmeLearning:"TryHackMe — hands-on learning paths",htbLearning:"Hack The Box — security challenges",cyberdefendersLearning:"CyberDefenders — blue-team investigations",linuxLearning:"Linux troubleshooting and home labs",
  languageSwitchLabel:"Switch to French",menuOpen:"Open menu",menuClose:"Close menu",navLandmark:"Primary navigation",
  contactTitle:'Have something<br><span>interesting in mind?</span>',contactText:"I'm always interested in thoughtful conversations, collaborative projects and opportunities to learn.",sendMessage:"Send me a message",footerText:"Designed & built with curiosity. © YEAR Sylvestre Zongo."
 },
 fr: {
  navAbout:"À propos",navStack:"Compétences",navProjects:"Projets",navActivity:"Activité",navCredentials:"Diplômes",navExperience:"Expérience",navFootprint:"Présence publique",navContact:"Contact",
  heroEyebrow:"SYSTÈME EN LIGNE · APPRENTISSAGE CONTINU",heroHello:"Bonjour, je suis",heroRole:'Étudiant en cybersécurité <span class="role-divider">/</span> Développeur',
  heroDescription:"J'explore le fonctionnement des systèmes, je conçois des solutions numériques utiles et j'apprends à rendre la technologie plus sûre.",viewWork:"Découvrir mes projets",getInTouch:"Me contacter",metaFocus:"Sécurité · Développement · Linux",portraitCaption:"L'HUMAIN DERRIÈRE LE TERMINAL",scroll:"DÉFILER POUR EXPLORER",
  terminalTitle:"Un peu de ligne de commande.",terminalNote:"Curieux ? Essayez une commande.",terminalWelcome:'Bienvenue dans le terminal du portfolio de Sylvestre. Tapez <b>help</b> pour voir les commandes disponibles.',try:"ESSAYER :",
  aboutTitle:"Au-delà de l'écran.",aboutHeadline:'Apprendre en construisant.<br><span class="muted">Sécuriser en comprenant.</span>',
  aboutText:"Je suis étudiant en deuxième année de BTech en cybersécurité à la Tamale Technical University. Mes centres d'intérêt se situent à la croisée de la sécurité défensive, des systèmes Linux, des réseaux et du développement web. J'aime comprendre le fonctionnement des technologies et transformer ces connaissances en projets concrets.",
  aboutText2:"Mon approche est pratique : créer un laboratoire, tester un système, documenter mes apprentissages, puis améliorer. Je construis progressivement mon parcours vers les opérations de sécurité et l'analyse en cybersécurité.",
  educationLabel:"FORMATION",educationDetail:"BTech · Cybersécurité",focusLabel:"FOCUS ACTUEL",focusValue:"Blue Team & Linux",focusDetail:"Réseaux · Supervision · Sécurité des systèmes",mindsetLabel:"FAÇON DE TRAVAILLER",mindsetValue:"Curieux. Pratique. Persévérant.",mindsetDetail:"Apprendre par l'expérimentation et les projets réels.",
  stackTitle:"Ma boîte à outils.",stackNote:"Technologies utilisées, étudiées ou explorées.",stackSecurity:"Cybersécurité",stackSystems:"Systèmes & Réseaux",stackDevelopment:"Développement",stackLearning:"Plateformes d'apprentissage",stackDisclaimer:"Les barres sont des repères visuels, pas des notes de compétence ou des certifications.",
  projectsTitle:"Ce que je construis.",allRepos:"TOUS LES DÉPÔTS",projectTypeBuild:"EN DÉVELOPPEMENT",projectTypeLive:"PROJET EN LIGNE",nexusDesc:"Une plateforme de gestion scolaire pensée pour les établissements francophones, avec une architecture multi-tenant et des modules dédiés aux processus académiques.",shopDesc:"Un projet d'application e-commerce consacré au développement backend, à la conception d'API et aux fonctionnalités pilotées par une base de données.",aganiwuDesc:"Un site web professionnel développé avec PHP natif, MySQL et des technologies frontend, comprenant un espace de gestion de contenu personnalisé.",viewRepository:"Parcourir les dépôts",visitWebsite:"Visiter le site",projectNote:"Les descriptions reflètent le périmètre actuellement connu. D'autres études de cas et captures seront ajoutées au fil de la documentation des projets.",
  activityTitle:"La régularité plutôt que le bruit.",contributionTitle:"Activité de contribution",contributionLoading:"Chargement des contributions publiques…",contributionUnavailable:"Les données de contribution ne sont pas disponibles pour le moment.",contributionFallback:"Consultez le profil GitHub pour voir l'activité de contribution.",contributionNote:"Le calendrier est chargé depuis un service communautaire public. Un message alternatif s'affichera en cas d'indisponibilité.",less:"Moins",more:"Plus",
  credentialsTitle:"Diplômes et certifications.",professionalCertifications:"Certifications professionnelles",academicCredentials:"Diplômes et formation",certificatesPath:"assets/documents/certificates/",academicPath:"assets/documents/academic/",credentialDisclaimer:"Seuls les éléments disposant d'un document ou d'un lien public fourni peuvent être ouverts. Les informations en attente ne constituent ni une recommandation ni une vérification.",
  credentialIssueDate:"Date d'émission",credentialIssuer:"Organisme émetteur",credentialType:"Type de titre",credentialId:"Identifiant du titre",credentialIdPending:"Non fourni",credentialDatePending:"Non fournie",credentialView:"Voir le certificat",credentialDownload:"Télécharger le PDF",credentialVerify:"Vérifier le titre",credentialDocumentPending:"Document en attente",credentialDocumentChecking:"Vérification de la disponibilité du document…",credentialDocumentUnavailable:"Document indisponible. Vérifiez le chemin du fichier avant publication.",credentialVerificationUnavailable:"Aucun lien public de vérification fourni.",credentialPending:"Informations en attente",
  experienceTitle:"L'expérience sur le terrain.",experienceType:"Type d'expérience",experienceStart:"Depuis",experienceEnd:"Jusqu'à",experienceLocation:"Lieu",experienceResponsibilities:"Responsabilités",experienceAchievements:"Réalisations",experienceTools:"Technologies et outils",experienceEvidence:"Référence justificative",experiencePositionPending:"Intitulé du poste à confirmer",experienceTypePending:"Type non précisé",experienceDatePending:"Dates non fournies",experienceLocationPending:"Lieu non fourni",experienceNoDetails:"Non renseigné",experiencePresent:"À ce jour",experienceTypeEmployment:"Emploi",experienceTypeInternship:"Stage",experienceTypeFreelance:"Freelance",experienceTypePractical:"Expérience pratique",
  footprintTitle:"Travaux et profils publics.",footprintIntro:"Liens et profils publics. Leur présence ne signifie pas qu'un tiers approuve ou certifie le travail.",footprintCategoryProfile:"Profil professionnel",footprintCategoryWebsite:"Site en ligne",footprintCategoryRepository:"Dépôt GitHub",footprintCategoryLearningProfile:"Profil d'apprentissage",footprintCategoryDemo:"Démonstration de projet",footprintCategoryDocumentation:"Documentation publique",footprintCategoryVerification:"Vérification de titre",footprintCategoryReference:"Référence ou attestation",footprintOpen:"Ouvrir le lien externe",footprintPending:"Lien à confirmer",
  learningTitle:"Toujours en progression.",labTitle:"APPRENTISSAGE PRATIQUE",labHeadline:"Apprendre au laboratoire.",tryhackmeLearning:"TryHackMe — parcours pratiques",htbLearning:"Hack The Box — défis de sécurité",cyberdefendersLearning:"CyberDefenders — investigations Blue Team",linuxLearning:"Dépannage Linux et laboratoires personnels",
  languageSwitchLabel:"Passer en anglais",menuOpen:"Ouvrir le menu",menuClose:"Fermer le menu",navLandmark:"Navigation principale",
  contactTitle:'Vous avez une idée<br><span>intéressante en tête ?</span>',contactText:"Je suis toujours intéressé par les échanges enrichissants, les projets collaboratifs et les occasions d'apprendre.",sendMessage:"M'envoyer un message",footerText:"Conçu et développé avec curiosité. © YEAR Sylvestre Zongo."
 }
};
let currentLang = "en";
let contributionState = { status: "loading", total: 0 };
const $ = (s,root=document)=>root.querySelector(s);
const $$ = (s,root=document)=>[...root.querySelectorAll(s)];
function monthNames(){
 return currentLang==="fr"?["janv.","févr.","mars","avr.","mai","juin","juil.","août","sept.","oct.","nov.","déc."]:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
}
function updateContributionSummary(){
 const summary=$("#contributionSummary");
 if(contributionState.status==="loaded"){
  summary.textContent=currentLang==="en"?`${contributionState.total.toLocaleString()} public contributions in the displayed period`:`${contributionState.total.toLocaleString()} contributions publiques sur la période affichée`;
 }else summary.textContent=contributionState.status==="error"?translations[currentLang].contributionUnavailable:translations[currentLang].contributionLoading;
 const fallback=$("#contributionFallback");
 if(fallback)fallback.textContent=translations[currentLang].contributionFallback;
 $$("#calendarMonths [data-month]").forEach(month=>{month.textContent=monthNames()[Number(month.dataset.month)];});
}
function textElement(tag,className,text){
 const element=document.createElement(tag);
 if(className)element.className=className;
 element.textContent=text;
 return element;
}
function localizedValue(value){
 return value&&typeof value==="object"?value[currentLang]||value.en:value;
}
function externalUrl(value){
 try{
  const url=new URL(value);
  return url.protocol==="https:"||url.protocol==="http:"?url.href:null;
 }catch(error){return null;}
}
const documentAvailability=new Map();
function checkDocument(path){
 if(!documentAvailability.has(path)){
  documentAvailability.set(path,fetch(path,{method:"HEAD",cache:"no-store"}).then(response=>response.ok).catch(()=>false));
 }
 return documentAvailability.get(path);
}
function addCredentialAction(container,path,label,download,onUnavailable){
 const button=textElement("button","credential-action",label);
 button.type="button";button.disabled=true;
 if(!path){
  button.title=translations[currentLang].credentialDocumentPending;
  container.appendChild(button);
  return;
 }
 const allowedRoot=path.startsWith("assets/documents/certificates/")||path.startsWith("assets/documents/academic/");
 if(!allowedRoot||path.split("/").includes("..")){
  button.title=translations[currentLang].credentialDocumentUnavailable;
  container.appendChild(button);
  return;
 }
 container.appendChild(button);
 checkDocument(path).then(available=>{
  if(!button.isConnected)return;
  if(!available){
   button.title=translations[currentLang].credentialDocumentUnavailable;
   if(onUnavailable)onUnavailable();
   return;
  }
  const link=textElement("a","credential-action",label);
  link.href=path;
  if(download)link.download="";
  else{link.target="_blank";link.rel="noopener noreferrer";}
  button.replaceWith(link);
 });
}
function renderCredentials(category,targetId){
 const target=document.getElementById(targetId);
 target.replaceChildren();
 (window.portfolioData.credentials||[]).filter(item=>item.category===category).forEach(item=>{
  const card=textElement("article","credential-card glass-card","");
  const type=textElement("p","credential-kind mono",item.credentialType[currentLang]);
  const title=textElement("h4","",localizedValue(item.title));
  const description=textElement("p","credential-description",item.description[currentLang]);
  const details=document.createElement("dl");details.className="credential-details";
  [
   [translations[currentLang].credentialIssuer,item.issuer],
   [translations[currentLang].credentialIssueDate,localizedValue(item.issueDate)||translations[currentLang].credentialDatePending],
   [translations[currentLang].credentialType,item.credentialType[currentLang]]
  ].forEach(([label,value])=>{
   const group=document.createElement("div");
   group.append(textElement("dt","",label),textElement("dd","",value));
   details.appendChild(group);
  });
  if(item.credentialId){
   const group=document.createElement("div");
   group.append(textElement("dt","",translations[currentLang].credentialId),textElement("dd","",item.credentialId));
   details.appendChild(group);
  }
  const actions=document.createElement("div");actions.className="credential-actions";
  const documentStatus=item.pdfPath?textElement("p","credential-document-status mono",translations[currentLang].credentialDocumentChecking):null;
  const documentUnavailable=()=>{if(documentStatus)documentStatus.textContent=translations[currentLang].credentialDocumentUnavailable;};
  addCredentialAction(actions,item.pdfPath,translations[currentLang].credentialView,false,documentUnavailable);
  addCredentialAction(actions,item.pdfPath,translations[currentLang].credentialDownload,true,documentUnavailable);
  const verification=externalUrl(item.verificationUrl);
  if(verification){
   const link=textElement("a","credential-action credential-verify",translations[currentLang].credentialVerify);
   link.href=verification;link.target="_blank";link.rel="noopener noreferrer";
   actions.appendChild(link);
  }
  card.append(type,title,description,details,actions);
  if(documentStatus)card.appendChild(documentStatus);
  if(!item.pdfPath&&!verification)card.appendChild(textElement("p","credential-pending mono",translations[currentLang].credentialPending));
  target.appendChild(card);
 });
}
function renderExperience(){
 const target=$("#experienceTimeline");target.replaceChildren();
 (window.portfolioData.experience||[]).forEach(item=>{
  const card=textElement("article","experience-item glass-card","");
  const header=document.createElement("div");header.className="experience-header";
  const heading=document.createElement("div");
  heading.append(textElement("p","experience-org mono",localizedValue(item.organization)),
   textElement("h3","",item.position||translations[currentLang].experiencePositionPending));
  const start=item.startDate?localizedValue(item.startDate):translations[currentLang].experienceDatePending;
  const end=item.endDate?localizedValue(item.endDate):(item.startDate?translations[currentLang].experienceDatePending:"");
  const date=textElement("p","experience-dates mono",end?`${start} — ${end}`:start);
  header.append(heading,date);
  const meta=document.createElement("div");meta.className="experience-meta mono";
  const typeKey=item.employmentType?`experienceType${item.employmentType[0].toUpperCase()}${item.employmentType.slice(1)}`:null;
  meta.append(
   textElement("span","",`${translations[currentLang].experienceType}: ${typeKey&&translations[currentLang][typeKey]||translations[currentLang].experienceTypePending}`),
   textElement("span","",`${translations[currentLang].experienceLocation}: ${item.location||translations[currentLang].experienceLocationPending}`)
  );
  card.append(header,meta);
  const responsibilities=item.responsibilities&&item.responsibilities[currentLang]||[];
  card.appendChild(textElement("h4","experience-subheading",translations[currentLang].experienceResponsibilities));
  const list=document.createElement("ul");list.className="experience-list";
  responsibilities.forEach(value=>list.appendChild(textElement("li","",value)));
  card.appendChild(list);
  [
   [translations[currentLang].experienceAchievements,item.achievements],
   [translations[currentLang].experienceTools,item.technologies]
  ].forEach(([label,values])=>{
   const row=document.createElement("p");row.className="experience-extra";
   row.append(textElement("strong","",`${label}: `),document.createTextNode(values.length?values.join(" · "):translations[currentLang].experienceNoDetails));
   card.appendChild(row);
  });
  const evidence=externalUrl(item.evidenceUrl);
  if(evidence){
   const link=textElement("a","experience-evidence",translations[currentLang].experienceEvidence);
   link.href=evidence;link.target="_blank";link.rel="noopener noreferrer";card.appendChild(link);
  }
  target.appendChild(card);
 });
}
function renderFootprint(){
 const target=$("#footprintGrid");target.replaceChildren();
 (window.portfolioData.footprint||[]).forEach(item=>{
  const card=textElement("article","footprint-card glass-card","");
  const icon=textElement("span","footprint-icon mono",item.icon);icon.setAttribute("aria-hidden","true");
  const categoryKey=`footprintCategory${item.category.split("-").map(part=>part[0].toUpperCase()+part.slice(1)).join("")}`;
  const category=textElement("p","footprint-category mono",translations[currentLang][categoryKey]||item.category);
  const title=textElement("h3","",item.title);
  const description=textElement("p","footprint-description",item.description[currentLang]);
  card.append(icon,category,title,description);
  const url=externalUrl(item.url);
  if(url){
   const link=textElement("a","footprint-link mono",translations[currentLang].footprintOpen+" ↗");
   link.href=url;link.target="_blank";link.rel="noopener noreferrer";card.appendChild(link);
  }else card.appendChild(textElement("span","footprint-pending mono",translations[currentLang].footprintPending));
  target.appendChild(card);
 });
}
function renderPortfolioSections(){
 renderCredentials("professional","professionalCredentials");
 renderCredentials("academic","academicCredentials");
 renderExperience();
 renderFootprint();
}
function setLanguage(lang){
 currentLang=lang;document.documentElement.lang=lang;
 $$("[data-i18n]").forEach(el=>{const key=el.dataset.i18n;if(translations[lang][key])el.innerHTML=translations[lang][key].replace("YEAR",new Date().getFullYear());});
 $("#langSwitch").innerHTML=lang==="en"?'FR <span>/</span> EN':'FR <span>/</span> EN';
 $("#langSwitch").setAttribute("aria-label",translations[lang].languageSwitchLabel);
 $("#primaryNav").setAttribute("aria-label",translations[lang].navLandmark);
 $("#menuToggle").setAttribute("aria-label",translations[lang][$(".desktop-nav").classList.contains("open")?"menuClose":"menuOpen"]);
 $("#terminalInput").placeholder=lang==="en"?"type help and press enter":"tapez help puis entrée";
 updateContributionSummary();
 renderTerminalHistory();
 renderPortfolioSections();
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
const terminalHistory=[];
function appendTerminalCommand(raw){
 const command=raw.trim().toLowerCase();
 const output=$("#terminalOutput");
 const cmdLine=document.createElement("div");cmdLine.className="command-line";cmdLine.textContent=`visitor@portfolio:~$ ${raw}`;output.appendChild(cmdLine);
 const lines=terminalCommands[command]?.[currentLang];
 if(!lines){const error=document.createElement("div");error.className="output-line";error.textContent=currentLang==="en"?`command not found: ${command}. Type "help" to see available commands.`:`commande introuvable : ${command}. Tapez "help" pour voir les commandes.`;output.appendChild(error);}
 else lines.forEach((line,i)=>{const el=document.createElement("div");el.className="output-line";el.textContent=line;if(i===0)el.classList.add("output-highlight");output.appendChild(el);});
 $("#terminalBody").scrollTop=$("#terminalBody").scrollHeight;
}
function renderTerminalHistory(){
 const output=$("#terminalOutput");output.replaceChildren();
 terminalHistory.forEach(appendTerminalCommand);
}
function runCommand(raw){
 const command=raw.trim().toLowerCase();if(!command)return;
 if(command==="clear"){terminalHistory.length=0;$("#terminalOutput").replaceChildren();return;}
 terminalHistory.push(raw);
 appendTerminalCommand(raw);
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
  const seen=new Set();days.forEach((d,i)=>{const date=new Date(d.date+"T00:00:00");const key=`${date.getFullYear()}-${date.getMonth()}`;if(date.getDate()<=7&&!seen.has(key)){seen.add(key);const m=document.createElement("span");m.dataset.month=date.getMonth();m.textContent=monthNames()[date.getMonth()];m.style.position="absolute";m.style.left=`${Math.round(i/7*100)}%`;months.appendChild(m);}});
  months.style.position="relative";$("#activityYear").textContent=new Date(days[days.length-1].date+"T00:00:00").getFullYear();
  contributionState={status:"loaded",total:days.reduce((sum,d)=>sum+(d.count||0),0)};
  updateContributionSummary();
 }catch(err){
  grid.innerHTML="";months.innerHTML="";
  contributionState={status:"error",total:0};
  const fallback=document.createElement("p");fallback.id="contributionFallback";fallback.className="mono";fallback.style.cssText="color:#8195a8;font-size:10px;grid-column:1/-1";fallback.textContent=translations[currentLang].contributionFallback;
  grid.appendChild(fallback);$("#activityYear").textContent=new Date().getFullYear();
  updateContributionSummary();
 }
}
loadContributions();

// Prefer a personal portrait at assets/profile.jpg. If absent, keep the included illustrated placeholder.
const portrait=$("#portrait");portrait.addEventListener("error",()=>{portrait.src="assets/profile-placeholder.svg";});
const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add("visible");observer.unobserve(entry.target);}}),{threshold:.12});
$$("section:not(.hero) .section-heading, .glass-card, .stack-card, .project-card, .contact-card").forEach(el=>{el.classList.add("reveal");observer.observe(el);});
function setMenuOpen(open){
 $(".desktop-nav").classList.toggle("open",open);
 $("#menuToggle").setAttribute("aria-expanded",String(open));
 $("#menuToggle").setAttribute("aria-label",translations[currentLang][open?"menuClose":"menuOpen"]);
}
$("#menuToggle").addEventListener("click",()=>setMenuOpen(!$(".desktop-nav").classList.contains("open")));
$$(".desktop-nav a").forEach(a=>a.addEventListener("click",()=>setMenuOpen(false)));
document.addEventListener("keydown",event=>{
 if(event.key==="Escape"&&$(".desktop-nav").classList.contains("open")){
  setMenuOpen(false);$("#menuToggle").focus();
 }
});
setLanguage("en");
