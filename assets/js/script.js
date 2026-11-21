let GITHUB_USERNAME = "CyberSly0312";
const TRYHACKME_BADGE_SCRIPT_URL="https://tryhackme.com/badge/t/19b0e139b6432e3dbd3f289a72d42fd09fb375d4f96341070ce61658f6acce18e273f03842267fc79381b5ee64ef003e?theme=dark";
const TRYHACKME_BADGE_MESSAGE="portfolio-tryhackme-badge";
let tryhackmeBadgeNode=null;
let tryhackmeBadgeState="idle";
let tryhackmeBadgeFrame=null;
let tryhackmeBadgeTimer=null;
const PLATFORM_ICONS={
 github:"github",linkedin:"linkedin",tryhackme:"tryhackme",hackthebox:"hackthebox",cyberdefenders:"cyberdefenders"
};
function platformIconClass(icon){
 return PLATFORM_ICONS[icon]?`footprint-icon footprint-icon--brand footprint-icon--${PLATFORM_ICONS[icon]}`:"footprint-icon footprint-icon--monogram mono";
}
const translations = {
 en: {
  navAbout:"About",navStack:"Stack",navProjects:"Projects",navActivity:"Activity",navCredentials:"Credentials",navExperience:"Experience",navFootprint:"Verified work",navContact:"Contact",
  heroEyebrow:"SYSTEM ONLINE · CONTINUOUSLY LEARNING",heroHello:"Hello, I'm",heroRole:'Cybersecurity Student <span class="role-divider">/</span> Developer',
  heroDescription:"I explore how systems work, build useful digital solutions and learn how to make technology more secure.",viewWork:"Explore my work",getInTouch:"Get in touch",metaFocus:"Security · Development · Linux",portraitCaption:"HUMAN BEHIND THE TERMINAL",scroll:"SCROLL TO EXPLORE",
  terminalTitle:"A little command line.",terminalNote:"Curious? Try a command.",terminalWelcome:"Welcome to Sylvestre's portfolio shell. Type <b>help</b> to see available commands.",try:"TRY:",
  aboutTitle:"Beyond the screen.",aboutHeadline:'Learning by building.<br><span class="muted">Securing by understanding.</span>',
  aboutText:"Third-year BTech student in Cybersecurity at Tamale Technical University. My interests sit at the intersection of defensive security, Linux systems, networking and web development. I enjoy taking ideas apart, understanding how they work, and turning that knowledge into practical projects.",
  aboutText2:"My approach is hands-on: build a lab, test a system, document what I learn, then improve it. I'm steadily working toward a career in security operations and cybersecurity analysis.",
  educationLabel:"EDUCATION",educationDetail:"Third-year BTech · Cybersecurity (in progress)",focusLabel:"CURRENT FOCUS",focusValue:"Blue Team & Linux",focusDetail:"Networking · Monitoring · System security",mindsetLabel:"WORKING STYLE",mindsetValue:"Curious. Practical. Persistent.",mindsetDetail:"Learn through experiments and real projects.",
  stackTitle:"Tools of the trade.",stackNote:"Technologies I use, study or explore.",stackSecurity:"Cybersecurity",stackSystems:"Systems & Networking",stackDevelopment:"Development",stackLearning:"Learning platforms",stackDisclaimer:"Progress bars are visual categories, not skill ratings or certifications.",
  projectsTitle:"Things I've been building.",allRepos:"ALL REPOSITORIES",projectTypeBuild:"IN DEVELOPMENT",projectTypeLive:"DEPLOYED PROJECT",nexusDesc:"A school management platform designed around the needs of French-speaking schools, with multi-tenant architecture and modular academic workflows.",shopDesc:"An e-commerce application project exploring backend development, API design and database-driven features.",aganiwuDesc:"A business website developed with native PHP, MySQL and frontend technologies, including a custom content management area.",viewRepository:"Browse repositories",visitWebsite:"Visit website",projectNote:"Project descriptions reflect current known scope. More case studies and screenshots will be added as projects are documented.",
  activityTitle:"Consistency over noise.",contributionTitle:"Contribution activity",contributionLoading:"Loading public contribution data…",contributionUnavailable:"Contribution data could not be loaded right now.",contributionFallback:"Visit the GitHub profile to view contribution activity.",contributionNote:"Contribution calendar loads from a public community endpoint. If unavailable, it will show a fallback message.",less:"Less",more:"More",
  credentialsTitle:"Credentials & education.",professionalCertifications:"Professional certifications",academicCredentials:"Academic credentials",certificatesPath:"assets/documents/certificates/",academicPath:"assets/documents/academic/",credentialDisclaimer:"Only listed items with supplied documents or public verification links can be opened. Pending details are not endorsements or verification claims.",
  credentialIssueDate:"Issue date",credentialIssuer:"Issuing organization",credentialType:"Credential type",credentialId:"Credential ID",credentialIdPending:"Not provided",credentialDatePending:"Not provided",credentialView:"View Certificate",credentialVerify:"Verify Credential",credentialDocumentPending:"Document pending",credentialDocumentChecking:"Checking document availability…",credentialDocumentUnavailable:"Document unavailable. Check the file path before publishing.",credentialVerificationUnavailable:"No public verification link provided.",credentialPending:"Details pending",credentialIssuerLogoAlt:"{name} logo",credentialBadgeAlt:"{name} badge",academicInstitutionLogoAlt:"{name} logo",
   filterAll:"All",filterLabel:"Filter certifications by category",certificationsEmpty:"No public certifications to display.",academicEmpty:"No public academic records to display.",academicKind:"Academic record",academicInstitution:"Institution",academicProgramme:"Programme",academicGraduationDate:"Graduation date",academicDocuments:"Documents",academicNoDocuments:"No public document or verification link provided.",documentView:"View PDF",projectUrlPending:"Link pending confirmation",projectsEmpty:"No public projects to display.",profilesEmpty:"No public profiles to display.",experienceEmpty:"No public experience to display.",dataLoading:"Loading portfolio data…",dataLoadTitle:"Portfolio data unavailable.",dataLoadHint:"Serve this folder over HTTP (for example python -m http.server) and check the JSON files in data/public.",
  experienceTitle:"Experience in practice.",experienceType:"Experience type",experienceStart:"From",experienceEnd:"To",experienceLocation:"Location",experienceResponsibilities:"Responsibilities",experienceAchievements:"Achievements",experienceTools:"Technologies & tools",experienceEvidence:"Supporting reference",experiencePositionPending:"Position details pending",experienceTypePending:"Type not specified",experienceDatePending:"Dates not provided",experienceLocationPending:"Location not provided",experienceNoDetails:"Not provided",experiencePresent:"Present",experienceTypeEmployment:"Employment",experienceTypeInternship:"Internship",experienceTypeFreelance:"Freelance",experienceTypePractical:"Practical experience",
  footprintTitle:"Verified work & profiles.",footprintIntro:"Public links and profiles. A link's presence does not imply third-party endorsement.",footprintCategoryProfile:"Professional profile",footprintCategoryWebsite:"Live website",footprintCategoryRepository:"GitHub repository",footprintCategoryLearningProfile:"Learning profile",footprintCategoryDemo:"Project demonstration",footprintCategoryDocumentation:"Public documentation",footprintCategoryVerification:"Credential verification",footprintCategoryReference:"Reference or work attestation",footprintOpen:"View profile",footprintViewRepository:"View repository",footprintVisitWebsite:"Visit website",footprintPending:"Link pending confirmation",
  learningTitle:"Always in progress.",labTitle:"PRACTICAL LEARNING",labHeadline:"Learning in the lab.",tryhackmeLearning:"TryHackMe — hands-on learning paths",htbLearning:"Hack The Box — security challenges",cyberdefendersLearning:"CyberDefenders — blue-team investigations",linuxLearning:"Linux troubleshooting and home labs",tryhackmeBadgeLoading:"Loading dynamic badge…",tryhackmeBadgeError:"Dynamic badge unavailable.",tryhackmeBadgeFallback:"Open TryHackMe profile",
   pdfViewerTitle:"Certificate viewer",pdfViewerDocumentLabel:"Document",pdfViewerLoading:"Loading PDF…",pdfViewerClose:"Close viewer",pdfViewerPrevious:"Previous page",pdfViewerNext:"Next page",pdfViewerPage:"Page",pdfViewerOf:"of",pdfViewerZoomIn:"Zoom in",pdfViewerZoomOut:"Zoom out",pdfViewerZoom:"Zoom",pdfViewerFitWidth:"Fit width",pdfViewerFitPage:"Fit page",pdfViewerError:"The PDF could not be loaded.",pdfViewerRetry:"Retry",pdfViewerEscape:"Esc to close",pdfViewerLocal:"Local PDF rendering · no download or print controls",
  languageSwitchLabel:"Switch to French",menuOpen:"Open menu",menuClose:"Close menu",navLandmark:"Primary navigation",
  contactTitle:'Have something<br><span>interesting in mind?</span>',contactText:"I'm always interested in thoughtful conversations, collaborative projects and opportunities to learn.",sendMessage:"Send me a message",footerText:"Designed & built with curiosity. © YEAR Sylvestre Zongo."
 },
 fr: {
  navAbout:"À propos",navStack:"Compétences",navProjects:"Projets",navActivity:"Activité",navCredentials:"Diplômes",navExperience:"Expérience",navFootprint:"Présence publique",navContact:"Contact",
  heroEyebrow:"SYSTÈME EN LIGNE · APPRENTISSAGE CONTINU",heroHello:"Bonjour, je suis",heroRole:'Étudiant en cybersécurité <span class="role-divider">/</span> Développeur',
  heroDescription:"J'explore le fonctionnement des systèmes, je conçois des solutions numériques utiles et j'apprends à rendre la technologie plus sûre.",viewWork:"Découvrir mes projets",getInTouch:"Me contacter",metaFocus:"Sécurité · Développement · Linux",portraitCaption:"L'HUMAIN DERRIÈRE LE TERMINAL",scroll:"DÉFILER POUR EXPLORER",
  terminalTitle:"Un peu de ligne de commande.",terminalNote:"Curieux ? Essayez une commande.",terminalWelcome:'Bienvenue dans le terminal du portfolio de Sylvestre. Tapez <b>help</b> pour voir les commandes disponibles.',try:"ESSAYER :",
  aboutTitle:"Au-delà de l'écran.",aboutHeadline:'Apprendre en construisant.<br><span class="muted">Sécuriser en comprenant.</span>',
  aboutText:"Étudiant en troisième année de BTech en cybersécurité à la Tamale Technical University. Mes centres d'intérêt se situent à la croisée de la sécurité défensive, des systèmes Linux, des réseaux et du développement web. J'aime comprendre le fonctionnement des technologies et transformer ces connaissances en projets concrets.",
  aboutText2:"Mon approche est pratique : créer un laboratoire, tester un système, documenter mes apprentissages, puis améliorer. Je construis progressivement mon parcours vers les opérations de sécurité et l'analyse en cybersécurité.",
  educationLabel:"FORMATION",educationDetail:"BTech de troisième année en cybersécurité (en cours)",focusLabel:"FOCUS ACTUEL",focusValue:"Blue Team & Linux",focusDetail:"Réseaux · Supervision · Sécurité des systèmes",mindsetLabel:"FAÇON DE TRAVAILLER",mindsetValue:"Curieux. Pratique. Persévérant.",mindsetDetail:"Apprendre par l'expérimentation et les projets réels.",
  stackTitle:"Ma boîte à outils.",stackNote:"Technologies utilisées, étudiées ou explorées.",stackSecurity:"Cybersécurité",stackSystems:"Systèmes & Réseaux",stackDevelopment:"Développement",stackLearning:"Plateformes d'apprentissage",stackDisclaimer:"Les barres sont des repères visuels, pas des notes de compétence ou des certifications.",
  projectsTitle:"Ce que je construis.",allRepos:"TOUS LES DÉPÔTS",projectTypeBuild:"EN DÉVELOPPEMENT",projectTypeLive:"PROJET EN LIGNE",nexusDesc:"Une plateforme de gestion scolaire pensée pour les établissements francophones, avec une architecture multi-tenant et des modules dédiés aux processus académiques.",shopDesc:"Un projet d'application e-commerce consacré au développement backend, à la conception d'API et aux fonctionnalités pilotées par une base de données.",aganiwuDesc:"Un site web professionnel développé avec PHP natif, MySQL et des technologies frontend, comprenant un espace de gestion de contenu personnalisé.",viewRepository:"Parcourir les dépôts",visitWebsite:"Visiter le site",projectNote:"Les descriptions reflètent le périmètre actuellement connu. D'autres études de cas et captures seront ajoutées au fil de la documentation des projets.",
  activityTitle:"La régularité plutôt que le bruit.",contributionTitle:"Activité de contribution",contributionLoading:"Chargement des contributions publiques…",contributionUnavailable:"Les données de contribution ne sont pas disponibles pour le moment.",contributionFallback:"Consultez le profil GitHub pour voir l'activité de contribution.",contributionNote:"Le calendrier est chargé depuis un service communautaire public. Un message alternatif s'affichera en cas d'indisponibilité.",less:"Moins",more:"Plus",
  credentialsTitle:"Diplômes et certifications.",professionalCertifications:"Certifications professionnelles",academicCredentials:"Diplômes et formation",certificatesPath:"assets/documents/certificates/",academicPath:"assets/documents/academic/",credentialDisclaimer:"Seuls les éléments disposant d'un document ou d'un lien public fourni peuvent être ouverts. Les informations en attente ne constituent ni une recommandation ni une vérification.",
  credentialIssueDate:"Date d'émission",credentialIssuer:"Organisme émetteur",credentialType:"Type de titre",credentialId:"Identifiant du titre",credentialIdPending:"Non fourni",credentialDatePending:"Non fournie",credentialView:"Voir le certificat",credentialVerify:"Vérifier le titre",credentialDocumentPending:"Document en attente",credentialDocumentChecking:"Vérification de la disponibilité du document…",credentialDocumentUnavailable:"Document indisponible. Vérifiez le chemin du fichier avant publication.",credentialVerificationUnavailable:"Aucun lien public de vérification fourni.",credentialPending:"Informations en attente",credentialIssuerLogoAlt:"Logo {name}",credentialBadgeAlt:"Badge {name}",academicInstitutionLogoAlt:"Logo {name}",
   filterAll:"Tous",filterLabel:"Filtrer les certifications par catégorie",certificationsEmpty:"Aucune certification publique à afficher.",academicEmpty:"Aucun diplôme public à afficher.",academicKind:"Titre académique",academicInstitution:"Établissement",academicProgramme:"Programme",academicGraduationDate:"Date de diplomation",academicDocuments:"Documents",academicNoDocuments:"Aucun document public ni lien de vérification fourni.",documentView:"Voir le PDF",projectUrlPending:"Lien à confirmer",projectsEmpty:"Aucun projet public à afficher.",profilesEmpty:"Aucun profil public à afficher.",experienceEmpty:"Aucune expérience publique à afficher.",dataLoading:"Chargement des données du portfolio…",dataLoadTitle:"Données du portfolio indisponibles.",dataLoadHint:"Servez ce dossier via HTTP (par exemple python -m http.server) et vérifiez les fichiers JSON dans data/public.",
  experienceTitle:"L'expérience sur le terrain.",experienceType:"Type d'expérience",experienceStart:"Depuis",experienceEnd:"Jusqu'à",experienceLocation:"Lieu",experienceResponsibilities:"Responsabilités",experienceAchievements:"Réalisations",experienceTools:"Technologies et outils",experienceEvidence:"Référence justificative",experiencePositionPending:"Intitulé du poste à confirmer",experienceTypePending:"Type non précisé",experienceDatePending:"Dates non fournies",experienceLocationPending:"Lieu non fourni",experienceNoDetails:"Non renseigné",experiencePresent:"À ce jour",experienceTypeEmployment:"Emploi",experienceTypeInternship:"Stage",experienceTypeFreelance:"Freelance",experienceTypePractical:"Expérience pratique",
  footprintTitle:"Travaux et profils publics.",footprintIntro:"Liens et profils publics. Leur présence ne signifie pas qu'un tiers approuve ou certifie le travail.",footprintCategoryProfile:"Profil professionnel",footprintCategoryWebsite:"Site en ligne",footprintCategoryRepository:"Dépôt GitHub",footprintCategoryLearningProfile:"Profil d'apprentissage",footprintCategoryDemo:"Démonstration de projet",footprintCategoryDocumentation:"Documentation publique",footprintCategoryVerification:"Vérification de titre",footprintCategoryReference:"Référence ou attestation",footprintOpen:"Voir le profil",footprintViewRepository:"Voir le dépôt",footprintVisitWebsite:"Visiter le site",footprintPending:"Lien à confirmer",
  learningTitle:"Toujours en progression.",labTitle:"APPRENTISSAGE PRATIQUE",labHeadline:"Apprendre au laboratoire.",tryhackmeLearning:"TryHackMe — parcours pratiques",htbLearning:"Hack The Box — défis de sécurité",cyberdefendersLearning:"CyberDefenders — investigations Blue Team",linuxLearning:"Dépannage Linux et laboratoires personnels",tryhackmeBadgeLoading:"Chargement du badge dynamique…",tryhackmeBadgeError:"Badge dynamique indisponible.",tryhackmeBadgeFallback:"Ouvrir le profil TryHackMe",
   pdfViewerTitle:"Visionneuse de certificat",pdfViewerDocumentLabel:"Document",pdfViewerLoading:"Chargement du PDF…",pdfViewerClose:"Fermer la visionneuse",pdfViewerPrevious:"Page précédente",pdfViewerNext:"Page suivante",pdfViewerPage:"Page",pdfViewerOf:"sur",pdfViewerZoomIn:"Zoom avant",pdfViewerZoomOut:"Zoom arrière",pdfViewerZoom:"Zoom",pdfViewerFitWidth:"Ajuster à la largeur",pdfViewerFitPage:"Ajuster à la page",pdfViewerError:"Le PDF n'a pas pu être chargé.",pdfViewerRetry:"Réessayer",pdfViewerEscape:"Échap pour fermer",pdfViewerLocal:"Rendu PDF local · aucun contrôle de téléchargement ni d'impression",
  languageSwitchLabel:"Passer en anglais",menuOpen:"Ouvrir le menu",menuClose:"Fermer le menu",navLandmark:"Navigation principale",
  contactTitle:'Vous avez une idée<br><span>intéressante en tête ?</span>',contactText:"Je suis toujours intéressé par les échanges enrichissants, les projets collaboratifs et les occasions d'apprendre.",sendMessage:"M'envoyer un message",footerText:"Conçu et développé avec curiosité. © YEAR Sylvestre Zongo."
 }
};
let currentLang = "en";
let contributionState = { status: "loading", total: 0 };
let portfolioData = null;
let dataStatus = "loading";
let dataLoadFailures = [];
let activeCertificationCategory = "all";
let contributionsStarted = false;
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
 element.textContent=text==null?"":String(text);
 return element;
}
function localizedValue(value,lang=currentLang){
 return value&&typeof value==="object"&&!Array.isArray(value)?value[lang]||value.en||value.fr:value;
}
function localizedList(value,lang=currentLang){
 if(Array.isArray(value))return value.filter(item=>item!=null&&String(item).trim()!=="");
 if(value&&typeof value==="object")return localizedList(value[lang]||value.en||value.fr,lang);
 return value?[value]:[];
}
// externalUrl() and safeDocumentPath() come from security-utils.js.
const documentAvailability=new Map();
let pdfViewerModulePromise=null;
let pdfViewerModule=null;
function checkDocument(path){
 if(!documentAvailability.has(path)){
  documentAvailability.set(path,fetch(path,{method:"HEAD",cache:"no-store"}).then(response=>response.ok).catch(()=>false));
 }
 return documentAvailability.get(path);
}
function viewerStrings(){
 const t=translations[currentLang];
 return {
  title:t.pdfViewerTitle,documentLabel:t.pdfViewerDocumentLabel,loading:t.pdfViewerLoading,
  close:t.pdfViewerClose,previous:t.pdfViewerPrevious,next:t.pdfViewerNext,page:t.pdfViewerPage,
  of:t.pdfViewerOf,zoomIn:t.pdfViewerZoomIn,zoomOut:t.pdfViewerZoomOut,zoom:t.pdfViewerZoom,
  fitWidth:t.pdfViewerFitWidth,fitPage:t.pdfViewerFitPage,error:t.pdfViewerError,retry:t.pdfViewerRetry,
  escape:t.pdfViewerEscape,local:t.pdfViewerLocal
 };
}
function loadPdfViewerModule(){
 if(!pdfViewerModulePromise){
  pdfViewerModulePromise=import(new URL("assets/js/pdf-viewer.js",document.baseURI).href)
   .then(module=>{pdfViewerModule=module;return module;})
   .catch(error=>{pdfViewerModulePromise=null;throw error;});
 }
 return pdfViewerModulePromise;
}
function showPdfViewerFallbackError(){
 let box=$("#pdfViewerFallbackError");
 if(box)return;
 box=textElement("div","pdf-viewer-fallback mono",translations[currentLang].pdfViewerError);
 box.id="pdfViewerFallbackError";box.setAttribute("role","alert");
 const dismiss=textElement("button","pdf-viewer-fallback__close",translations[currentLang].pdfViewerClose);
 dismiss.type="button";dismiss.addEventListener("click",()=>box.remove());
 box.appendChild(dismiss);document.body.appendChild(box);
}
async function openDocumentViewer(path,title){
 try{
  const viewer=await loadPdfViewerModule();
  await viewer.openPdfViewer({path:path,title:title,strings:viewerStrings()});
 }catch(error){
  console.error("PDF viewer failed to open",error);
  showPdfViewerFallbackError();
 }
}
function updateDocumentViewerLanguage(){
 if(pdfViewerModule&&pdfViewerModule.isOpen())pdfViewerModule.updateLanguage(viewerStrings());
}
function addCredentialAction(container,path,label,onUnavailable,extraClass,title){
 const button=textElement("button","credential-action"+(extraClass?" "+extraClass:""),label);
 button.type="button";button.disabled=true;
 const safePath=safeDocumentPath(path);
 if(!safePath){
  button.title=path?translations[currentLang].credentialDocumentUnavailable:translations[currentLang].credentialDocumentPending;
  container.appendChild(button);
  if(path&&onUnavailable)onUnavailable();
  return;
 }
 container.appendChild(button);
 checkDocument(safePath).then(available=>{
  if(!button.isConnected)return;
  if(!available){
   button.title=translations[currentLang].credentialDocumentUnavailable;
   if(onUnavailable)onUnavailable();
   return;
  }
  const viewerTitle=title||label;
  const view=textElement("button","credential-action"+(extraClass?" "+extraClass:""),label);
  view.type="button";
  view.setAttribute("aria-label",`${label}: ${viewerTitle}`);
  view.addEventListener("click",()=>openDocumentViewer(safePath,viewerTitle));
  button.replaceWith(view);
 });
}
function publicRecords(items){
 return (items||[]).filter(item=>item&&item.visibility==="public");
}
function detailRow(details,label,value){
 const group=document.createElement("div");
 group.append(textElement("dt","",label),textElement("dd","",value));
 details.appendChild(group);
}
function localizedAlt(template,name){
 return (template||"{name}").replace("{name}",name||"");
}
function credentialContent(){
 const content=document.createElement("div");
 content.className="credential-card__content";
 return content;
}
function addCredentialImage(card,path,className,altText,fallbackClasses,restoreClasses,variant){
 const safePath=typeof safeImagePath==="function"?safeImagePath(path):null;
 if(!safePath)return null;
 const image=document.createElement("img");
 image.className=className;
 // Variants are explicit allow-listed names, never raw data values.
 if(variant==="emblem")image.classList.add("credential-issuer-logo--emblem");
 else if(variant==="light-back")image.classList.add("credential-issuer-logo--light-back");
 image.src=safePath;
 image.alt=altText;
 image.decoding="async";
 image.addEventListener("error",()=>{
  image.remove();
  (fallbackClasses||[]).forEach(name=>card.classList.remove(name));
  (restoreClasses||[]).forEach(name=>card.classList.add(name));
 },{once:true});
 card.appendChild(image);
 return image;
}
function addVerification(container,item){
 const verification=externalUrl(item.verificationUrl);
 if(!verification)return null;
 const link=textElement("a","credential-action credential-verify",translations[currentLang].credentialVerify);
 link.href=verification;link.target="_blank";link.rel="noopener noreferrer";
 container.appendChild(link);
 return link;
}
function renderCertificationFilters(items){
 const container=$("#certificationFilters");container.replaceChildren();
 if(!items.length)return;
 container.setAttribute("aria-label",translations[currentLang].filterLabel);
 const categories=["all"];
 items.forEach(item=>{const key=item.category||"";if(key&&categories.indexOf(key)===-1)categories.push(key);});
 if(categories.indexOf(activeCertificationCategory)===-1)activeCertificationCategory="all";
 categories.forEach(category=>{
  const source=category==="all"?null:items.find(item=>item.category===category);
  const label=category==="all"?translations[currentLang].filterAll:localizedValue(source&&source.categoryLabel)||category;
  const button=textElement("button","filter-button mono",label);
  button.type="button";button.dataset.category=category;
  button.setAttribute("aria-pressed",String(category===activeCertificationCategory));
  button.addEventListener("click",()=>{activeCertificationCategory=category;renderCertifications();});
  container.appendChild(button);
 });
}
function renderCertifications(){
 const target=$("#professionalCredentials");target.replaceChildren();
 const all=publicRecords(portfolioData.certifications);
 renderCertificationFilters(all);
 const items=activeCertificationCategory==="all"?all:all.filter(item=>item.category===activeCertificationCategory);
 if(!items.length){target.appendChild(textElement("p","data-empty mono",translations[currentLang].certificationsEmpty));return;}
 const strings=translations[currentLang];
 items.forEach(item=>{
  const card=textElement("article","credential-card glass-card"+(item.badgeImage?" credential-card--badge":""),"");
  const content=credentialContent();
  const type=textElement("p","credential-kind mono",localizedValue(item.categoryLabel)||item.category||"");
  const title=textElement("h4","",localizedValue(item.title));
  const description=textElement("p","credential-description",localizedValue(item.description));
  const details=document.createElement("dl");details.className="credential-details";
  detailRow(details,strings.credentialIssuer,localizedValue(item.issuer)||strings.credentialPending);
  detailRow(details,strings.credentialIssueDate,localizedValue(item.issueDate)||strings.credentialDatePending);
  detailRow(details,strings.credentialType,localizedValue(item.categoryLabel)||item.category||strings.credentialPending);
  if(item.credentialId)detailRow(details,strings.credentialId,item.credentialId);
  const actions=document.createElement("div");actions.className="credential-actions";
  const documentStatus=item.pdfPath?textElement("p","credential-document-status mono",strings.credentialDocumentChecking):null;
  const documentUnavailable=()=>{if(documentStatus)documentStatus.textContent=strings.credentialDocumentUnavailable;};
  const viewerTitle=localizedValue(item.title)||strings.pdfViewerTitle;
  addCredentialAction(actions,item.pdfPath,strings.credentialView,documentUnavailable,"",viewerTitle);
  const verification=addVerification(actions,item);
  content.append(type,title,description,details,actions);
  if(documentStatus)content.appendChild(documentStatus);
  if(!item.pdfPath&&!verification)content.appendChild(textElement("p","credential-pending mono",strings.credentialPending));
  card.appendChild(content);
  const issuer=localizedValue(item.issuer)||"";
  const issuerLogo=addCredentialImage(card,item.issuerLogo,"credential-issuer-logo",localizedAlt(strings.credentialIssuerLogoAlt,issuer),["credential-card--logo-only"],null,item.issuerLogoVariant);
  if(issuerLogo&&!item.badgeImage)card.classList.add("credential-card--logo-only");
  const badge=addCredentialImage(card,item.badgeImage,"credential-badge__image",localizedAlt(strings.credentialBadgeAlt,localizedValue(item.title)||""),["credential-card--badge"],issuerLogo?["credential-card--logo-only"]:[]);
  if(!badge){
   card.classList.remove("credential-card--badge");
   if(issuerLogo)card.classList.add("credential-card--logo-only");
  }
  revealElement(card);
  target.appendChild(card);
 });
}
function renderAcademic(){
 const target=$("#academicCredentials");target.replaceChildren();
 const items=publicRecords(portfolioData.academic);
 if(!items.length){target.appendChild(textElement("p","data-empty mono",translations[currentLang].academicEmpty));return;}
 const strings=translations[currentLang];
 items.forEach(item=>{
  const card=textElement("article","credential-card glass-card","");
  const content=credentialContent();
  const kind=textElement("p","credential-kind mono",strings.academicKind);
  const title=textElement("h4","",localizedValue(item.programme)||localizedValue(item.title));
  const description=textElement("p","credential-description",localizedValue(item.description));
  const details=document.createElement("dl");details.className="credential-details";
  detailRow(details,strings.academicInstitution,localizedValue(item.institution)||strings.credentialPending);
  detailRow(details,strings.academicGraduationDate,localizedValue(item.graduationDate)||strings.credentialDatePending);
  detailRow(details,strings.academicProgramme,localizedValue(item.programme)||strings.credentialPending);
  content.append(kind,title,description,details);
  const documents=Array.isArray(item.documents)?item.documents:[];
  if(documents.length){
   content.appendChild(textElement("h5","academic-documents-label mono",strings.academicDocuments));
   documents.forEach(documentItem=>{
    const row=textElement("div","academic-document","");
    row.appendChild(textElement("span","academic-document-label mono",localizedValue(documentItem.label)||documentItem.kind||""));
    const actions=document.createElement("div");actions.className="credential-actions";
    const documentStatus=documentItem.pdfPath?textElement("p","credential-document-status mono",strings.credentialDocumentChecking):null;
    const documentUnavailable=()=>{if(documentStatus)documentStatus.textContent=strings.credentialDocumentUnavailable;};
    const docLabel=localizedValue(documentItem.label)||documentItem.kind||strings.documentView;
    const documentTitle=`${localizedValue(item.programme)||localizedValue(item.title)||strings.academicKind} — ${docLabel}`;
    addCredentialAction(actions,documentItem.pdfPath,strings.documentView,documentUnavailable,"",documentTitle);
    row.appendChild(actions);if(documentStatus)row.appendChild(documentStatus);
    content.appendChild(row);
   });
  }
  const verificationActions=document.createElement("div");verificationActions.className="credential-actions academic-verification";
  const verification=addVerification(verificationActions,item);
  if(verification)content.appendChild(verificationActions);
  if(!documents.length&&!verification)content.appendChild(textElement("p","credential-pending mono",strings.academicNoDocuments));
  card.appendChild(content);
  const institution=localizedValue(item.institution)||"";
  const logo=addCredentialImage(card,item.institutionLogo,"credential-issuer-logo",localizedAlt(strings.academicInstitutionLogoAlt,institution),["credential-card--logo-only"],null,item.institutionLogoVariant);
  if(logo)card.classList.add("credential-card--logo-only");
  revealElement(card);
  target.appendChild(card);
 });
}
function renderExperience(){
 const target=$("#experienceTimeline");target.replaceChildren();
 const items=portfolioData.experience||[];
 if(!items.length){target.appendChild(textElement("p","data-empty mono",translations[currentLang].experienceEmpty));return;}
 items.forEach(item=>{
  const card=textElement("article","experience-item glass-card","");
  const header=document.createElement("div");header.className="experience-header";
  const heading=document.createElement("div");
  heading.append(textElement("p","experience-org mono",localizedValue(item.organization)),
   textElement("h3","",localizedValue(item.position)||translations[currentLang].experiencePositionPending));
  const start=item.startDate?localizedValue(item.startDate):translations[currentLang].experienceDatePending;
  let dateText=start;
  if(item.endDate)dateText=`${start} — ${localizedValue(item.endDate)}`;
  else if(item.current)dateText=`${start} — ${translations[currentLang].experiencePresent}`;
  const date=textElement("p","experience-dates mono",dateText);
  header.append(heading,date);
  const meta=document.createElement("div");meta.className="experience-meta mono";
  const typeKey=item.employmentType?`experienceType${item.employmentType[0].toUpperCase()}${item.employmentType.slice(1)}`:null;
  meta.append(
   textElement("span","",`${translations[currentLang].experienceType}: ${typeKey&&translations[currentLang][typeKey]||translations[currentLang].experienceTypePending}`),
   textElement("span","",`${translations[currentLang].experienceLocation}: ${localizedValue(item.location)||translations[currentLang].experienceLocationPending}`)
  );
  card.append(header,meta);
  card.appendChild(textElement("h4","experience-subheading",translations[currentLang].experienceResponsibilities));
  const list=document.createElement("ul");list.className="experience-list";
  localizedList(item.responsibilities).forEach(value=>list.appendChild(textElement("li","",value)));
  card.appendChild(list);
  [
   [translations[currentLang].experienceAchievements,item.achievements],
   [translations[currentLang].experienceTools,item.technologies]
  ].forEach(([label,values])=>{
   const row=document.createElement("p");row.className="experience-extra";
   const formatted=localizedList(values);
   row.append(textElement("strong","",`${label}: `),document.createTextNode(formatted.length?formatted.join(" · "):translations[currentLang].experienceNoDetails));
   card.appendChild(row);
  });
  const evidence=externalUrl(item.evidenceUrl);
  if(evidence){
   const link=textElement("a","experience-evidence",translations[currentLang].experienceEvidence);
   link.href=evidence;link.target="_blank";link.rel="noopener noreferrer";card.appendChild(link);
  }
  revealElement(card);target.appendChild(card);
 });
}
function createProfileIcon(item){
 const icon=textElement("span",platformIconClass(item.icon),"");
 icon.setAttribute("aria-hidden","true");
 if(!PLATFORM_ICONS[item.icon])icon.textContent=item.icon||"•";
 return icon;
}
function profileLinkLabel(item){
 const t=translations[currentLang];
 if(item.category==="repository")return t.footprintViewRepository;
 if(item.category==="website")return t.footprintVisitWebsite;
 return t.footprintOpen;
}
function createProfileMain(item){
 const url=externalUrl(item.url);
 const main=textElement(url?"a":"div",url?"footprint-link footprint-item__main":"footprint-pending footprint-item__main","");
 const title=localizedValue(item.title);
 if(url){
  main.href=url;main.target="_blank";main.rel="noopener noreferrer";
  main.setAttribute("aria-label",`${profileLinkLabel(item)} — ${title}`);
 }else main.setAttribute("aria-label",`${title} — ${translations[currentLang].footprintPending}`);
 main.appendChild(createProfileIcon(item));
 const copy=textElement("span","footprint-item__copy","");
 copy.appendChild(textElement("h3","footprint-name",title));
 const categoryKey=`footprintCategory${(item.category||"").split("-").map(part=>part[0].toUpperCase()+part.slice(1)).join("")}`;
 copy.appendChild(textElement("p","footprint-category mono",translations[currentLang][categoryKey]||item.category));
 copy.appendChild(textElement("p","footprint-description",localizedValue(item.description)));
 main.appendChild(copy);
 if(url){
  const arrow=textElement("span","footprint-arrow","↗");
  arrow.setAttribute("aria-hidden","true");
  main.appendChild(arrow);
 }
 return main;
}
function createProfileCard(item){
 const itemElement=textElement("article","footprint-item footprint-card"+(item.id==="tryhackme"?" footprint-card--tryhackme":""),"");
 appendProfileLink(itemElement,item);
 if(item.id==="tryhackme")itemElement.appendChild(createTryHackMeBadge());
 revealElement(itemElement);
 return itemElement;
}
function appendProfileLink(card,item){
 const previous=$(".footprint-item__main",card);
 if(previous)previous.remove();
 card.prepend(createProfileMain(item));
}
function updateProfileCard(card,item){
 appendProfileLink(card,item);
}
function renderProfiles(){
 const target=$("#footprintGrid");
 const items=portfolioData.profiles||[];
 const thmIndex=items.findIndex(item=>item.id==="tryhackme");
 if(!items.length){target.replaceChildren(textElement("p","data-empty mono",translations[currentLang].profilesEmpty));return;}
 const existingCard=target.querySelector(".footprint-card--tryhackme");
 let thmCard=thmIndex>=0?existingCard:null;
 // Keep the existing card in place: moving its iframe would reload the badge script.
 [...target.children].forEach(child=>{if(child!==thmCard)child.remove();});
 if(thmIndex>=0&&!thmCard)thmCard=createProfileCard(items[thmIndex]);
 const before=document.createDocumentFragment();
 const after=document.createDocumentFragment();
 items.forEach((item,index)=>{
  if(index===thmIndex)return;
  const card=createProfileCard(item);
  if(thmCard&&index<thmIndex)before.appendChild(card);else after.appendChild(card);
 });
 if(thmCard){
  updateProfileCard(thmCard,items[thmIndex]);
  if(thmCard.parentNode===target){target.insertBefore(before,thmCard);thmCard.after(after);}
  else target.replaceChildren(before,thmCard,after);
 }else target.replaceChildren(before,after);
}
function tryhackmeBadgeSrcdoc(src){
 return '<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">'+
  '<style>html,body{margin:0;padding:0;width:100%;height:100%;background:transparent;overflow:hidden}'+
  '#thmBadgeStage{width:400px;height:172px;transform-origin:top left;transform:scale(var(--thm-badge-scale,1))}'+
  '#thmBadgeStage iframe{display:block;width:400px!important;height:172px!important;max-width:none!important;border:0!important;overflow:hidden}</style></head><body>'+
  '<div id="thmBadgeStage">'+
  '<script>(function(){var message="'+TRYHACKME_BADGE_MESSAGE+'";function fit(){document.documentElement.style.setProperty("--thm-badge-scale",String(Math.min(1,window.innerWidth/400)));}fit();window.addEventListener("resize",fit);window.addEventListener("error",function(event){if(event.target&&event.target.tagName==="SCRIPT")parent.postMessage({source:message,ok:false},"*");},true);window.addEventListener("load",function(){var badge=document.querySelector("#thmBadgeStage iframe");parent.postMessage({source:message,ok:!!badge},"*");});})();<\/script>'+
  '<script src="'+src+'"><\/script></div></body></html>';
}
function showTryHackMeBadgeFallback(){
 if(!tryhackmeBadgeNode)return;
 clearTimeout(tryhackmeBadgeTimer);
 tryhackmeBadgeFrame=null;tryhackmeBadgeState="error";
 tryhackmeBadgeNode.replaceChildren();
 tryhackmeBadgeNode.appendChild(textElement("p","tryhackme-badge__error mono",translations[currentLang].tryhackmeBadgeError));
 const url=profileUrl("tryhackme");
 let link;
 if(url){
  link=textElement("a","tryhackme-badge__link mono",translations[currentLang].tryhackmeBadgeFallback+" ↗");
  link.href=url;link.target="_blank";link.rel="noopener noreferrer";
 }else link=textElement("span","tryhackme-badge__link mono",translations[currentLang].footprintPending);
 tryhackmeBadgeNode.appendChild(link);
}
function createTryHackMeBadge(){
 if(tryhackmeBadgeNode)return tryhackmeBadgeNode;
 tryhackmeBadgeNode=textElement("div","tryhackme-badge");
 tryhackmeBadgeNode.id="tryhackmeBadge";
 tryhackmeBadgeNode.setAttribute("aria-live","polite");
 tryhackmeBadgeNode.appendChild(textElement("p","tryhackme-badge__status mono",translations[currentLang].tryhackmeBadgeLoading));
 const src=externalUrl(TRYHACKME_BADGE_SCRIPT_URL);
 if(!src){showTryHackMeBadgeFallback();return tryhackmeBadgeNode;}
 const frameWrap=textElement("div","tryhackme-badge__frame");
 const frame=document.createElement("iframe");
 frame.title=currentLang==="fr"?"Badge TryHackMe":"TryHackMe badge";
 frame.setAttribute("sandbox","allow-scripts allow-same-origin");
 frame.setAttribute("scrolling","no");
 frame.srcdoc=tryhackmeBadgeSrcdoc(src);
 frameWrap.appendChild(frame);
 tryhackmeBadgeNode.appendChild(frameWrap);
 tryhackmeBadgeFrame=frame;tryhackmeBadgeState="loading";
 tryhackmeBadgeTimer=setTimeout(()=>{if(tryhackmeBadgeState==="loading")showTryHackMeBadgeFallback();},10000);
 return tryhackmeBadgeNode;
}
function updateTryHackMeBadgeLanguage(){
 if(!tryhackmeBadgeNode)return;
 if(tryhackmeBadgeState==="error"){showTryHackMeBadgeFallback();return;}
 const status=$(".tryhackme-badge__status",tryhackmeBadgeNode);
 if(status){
  status.textContent=translations[currentLang].tryhackmeBadgeLoading;
  status.hidden=tryhackmeBadgeState==="ready";
 }
 if(tryhackmeBadgeFrame)tryhackmeBadgeFrame.title=currentLang==="fr"?"Badge TryHackMe":"TryHackMe badge";
}
window.addEventListener("message",event=>{
 if(!tryhackmeBadgeFrame||event.source!==tryhackmeBadgeFrame.contentWindow)return;
 const data=event.data;
 if(!data||data.source!==TRYHACKME_BADGE_MESSAGE)return;
 clearTimeout(tryhackmeBadgeTimer);
 if(data.ok){tryhackmeBadgeState="ready";updateTryHackMeBadgeLanguage();}
 else showTryHackMeBadgeFallback();
});
const projectVisuals={
 school:'<div class="visual-grid"></div><div class="project-window"><div class="mini-window-bar"><i></i><i></i><i></i><span>nexus_school</span></div><div class="mini-sidebar"></div><div class="mini-content"><b></b><b></b><b></b><div class="mini-table"></div></div></div>',
 shop:'<div class="shop-bag">S<span>H</span></div><div class="shop-lines"><i></i><i></i><i></i></div>',
 web:'<div class="code-lines mono"><span>&lt;section&gt;</span><span class="indent">&lt;h1&gt;Build with purpose&lt;/h1&gt;</span><span class="indent">&lt;p&gt;Digital solutions&lt;/p&gt;</span><span>&lt;/section&gt;</span></div>'
};
function renderProjects(){
 const target=$("#projectsGrid");target.replaceChildren();
 const items=portfolioData.projects||[];
 if(!items.length){target.appendChild(textElement("p","data-empty mono",translations[currentLang].projectsEmpty));return;}
 items.forEach((item,index)=>{
  const visualKey=projectVisuals[item.visual]?item.visual:"web";
  const card=textElement("article","project-card"+(item.featured?" project-featured":""),"");
  const visual=textElement("div","project-visual project-"+visualKey,"");
  visual.innerHTML=projectVisuals[visualKey];
  visual.appendChild(textElement("span","visual-label mono",localizedValue(item.visualLabel)));
  const info=textElement("div","project-info","");
  const type=textElement("div","project-type mono");
  const typeLabel=item.status==="live"?translations[currentLang].projectTypeLive:translations[currentLang].projectTypeBuild;
  type.append(textElement("span","",typeLabel),textElement("span","",`${String(index+1).padStart(2,"0")} / ${String(items.length).padStart(2,"0")}`));
  info.append(type,textElement("h3","",localizedValue(item.title)),textElement("p","",localizedValue(item.description)));
  const tags=textElement("div","tag-list mono","");
  localizedList(item.technologies).forEach(tech=>tags.appendChild(textElement("span","",tech)));
  info.appendChild(tags);
  const url=externalUrl(item.url);
  if(url){
   const link=textElement("a","project-link",`${item.status==="live"?translations[currentLang].visitWebsite:translations[currentLang].viewRepository} ↗`);
   link.href=url;link.target="_blank";link.rel="noopener noreferrer";info.appendChild(link);
  }else info.appendChild(textElement("span","project-link project-link-pending",translations[currentLang].projectUrlPending));
  card.append(visual,info);revealElement(card);target.appendChild(card);
 });
}
function profileUrl(id){
 const item=(portfolioData.profiles||[]).find(profile=>profile.id===id);
 return item?externalUrl(item.url):null;
}
function displayProfileUrl(id,host){
 const url=profileUrl(id);
 if(!url)return null;
 try{
  const parsed=new URL(url);
  const hostname=parsed.hostname.toLowerCase().replace(/^www\./,"");
  if(hostname!==host&&!hostname.endsWith("."+host))return url;
  return hostname+parsed.pathname.replace(/\/$/,"");
 }catch(error){return url;}
}
function contactOutput(lang){
 const colon=lang==="fr"?" : ":": ";
 const lines=[lang==="en"?"Let's connect.":"Restons en contact.",(lang==="en"?"Email":"E-mail")+colon+"zkshine@proton.me"];
 const linkedIn=displayProfileUrl("linkedin","linkedin.com");
 const github=displayProfileUrl("github","github.com");
 if(linkedIn)lines.push("LinkedIn"+colon+linkedIn);
 if(github)lines.push("GitHub"+colon+github);
 return lines;
}
function setExternalLink(selector,url){
 const element=$(selector);
 if(!element||!url)return;
 element.href=url;element.target="_blank";element.rel="noopener noreferrer";
}
function applyProfileLinks(){
 const github=profileUrl("github");
 setExternalLink("#githubTopLink",github);
 setExternalLink("#activityGithubLink",github);
 setExternalLink("#contactGithub",github);
 setExternalLink("#contactLinkedIn",profileUrl("linkedin"));
 let repositories=github;
 if(github){
  try{
   const parsed=new URL(github);
   if(parsed.hostname.toLowerCase()==="github.com"&&parsed.pathname.split("/").filter(Boolean).length===1){
    parsed.search="?tab=repositories";repositories=parsed.href;
   }
  }catch(error){repositories=github;}
 }
 setExternalLink("#allReposLink",repositories);
 if(github){
  try{
   const parts=new URL(github).pathname.split("/").filter(Boolean);
   if(parts.length)GITHUB_USERNAME=decodeURIComponent(parts[0]);
  }catch(error){}
 }
}
const dataTargets=["#professionalCredentials","#academicCredentials","#projectsGrid","#experienceTimeline","#footprintGrid"];
function renderStatusInTargets(message){
 dataTargets.forEach(selector=>{const target=$(selector);if(target)target.replaceChildren(textElement("p","data-empty mono",message));});
 const filters=$("#certificationFilters");if(filters)filters.replaceChildren();
}
function renderPortfolioSections(){
 if(dataStatus==="loading"){renderStatusInTargets(translations[currentLang].dataLoading);return;}
 if(dataStatus==="error"){
  renderStatusInTargets(translations[currentLang].dataLoadTitle+" "+translations[currentLang].dataLoadHint);
  return;
 }
 applyProfileLinks();
 renderCertifications();
 renderAcademic();
 renderProjects();
 renderExperience();
 renderProfiles();
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
 updateDocumentViewerLanguage();
 updateTryHackMeBadgeLanguage();
 renderTerminalHistory();
 renderPortfolioSections();
}
$("#langSwitch").addEventListener("click",()=>setLanguage(currentLang==="en"?"fr":"en"));
$("#year").textContent=new Date().getFullYear();

const terminalCommands={
 help:{en:["Available commands:","about      — learn more about me","skills     — explore my technical toolkit","projects   — see what I'm building","contact    — find ways to reach me","clear      — clear this terminal"],fr:["Commandes disponibles :","about      — en savoir plus sur moi","skills     — découvrir mes outils techniques","projects   — voir mes projets","contact    — trouver comment me joindre","clear      — effacer le terminal"]},
 about:{en:["Sylvestre Zongo","Third-year BTech student in Cybersecurity at Tamale Technical University.","Interested in defensive security, Linux, networking and web development.","Current direction: Security Operations / Cybersecurity Analysis."],fr:["Sylvestre Zongo","Étudiant en troisième année de BTech en cybersécurité à la Tamale Technical University.","Intéressé par la sécurité défensive, Linux, les réseaux et le développement web.","Objectif actuel : opérations de sécurité / analyse en cybersécurité."]},
 skills:{en:["SECURITY    Nmap · Wireshark · Burp Suite · Ghidra · Volatility · Snort","SYSTEMS     Linux · Ubuntu · Debian · Docker · VirtualBox","DEVELOPMENT PHP · Python · JavaScript · HTML · CSS · MySQL","LEARNING    TryHackMe · Hack The Box · CyberDefenders · SadServers"],fr:["SÉCURITÉ     Nmap · Wireshark · Burp Suite · Ghidra · Volatility · Snort","SYSTÈMES     Linux · Ubuntu · Debian · Docker · VirtualBox","DÉVELOPPEMENT PHP · Python · JavaScript · HTML · CSS · MySQL","APPRENTISSAGE TryHackMe · Hack The Box · CyberDefenders · SadServers"]},
 projects:{en:["FEATURED PROJECTS","NexusSchool — modular school management platform (in development)","ShopToo — e-commerce application project (in development)","Aganiwu Enterprise — deployed business website","Use the project cards below to open each project."],fr:["PROJETS À LA UNE","NexusSchool — plateforme modulaire de gestion scolaire (en développement)","ShopToo — projet d'application e-commerce (en développement)","Aganiwu Enterprise — site professionnel en ligne","Utilisez les cartes ci-dessous pour ouvrir chaque projet."]},
 contact:{en:()=>contactOutput("en"),fr:()=>contactOutput("fr")}
};
const terminalHistory=[];
function appendTerminalCommand(raw){
 const command=raw.trim().toLowerCase();
 const output=$("#terminalOutput");
 const cmdLine=document.createElement("div");cmdLine.className="command-line";cmdLine.textContent=`visitor@portfolio:~$ ${raw}`;output.appendChild(cmdLine);
 const entry=terminalCommands[command]?.[currentLang];
 const lines=typeof entry==="function"?entry():entry;
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
function startContributions(){
 if(contributionsStarted)return;
 contributionsStarted=true;
 loadContributions();
}

// Prefer a personal portrait at assets/images/profile.jpg. If absent, keep the included illustrated placeholder.
const portrait=$("#portrait");portrait.addEventListener("error",()=>{portrait.src="assets/images/profile-placeholder.svg";});
const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add("visible");observer.unobserve(entry.target);}}),{threshold:.12});
$$("section:not(.hero) .section-heading, .glass-card, .stack-card, .project-card, .contact-card").forEach(el=>{el.classList.add("reveal");observer.observe(el);});
function revealElement(element){
 if(!element||element.classList.contains("reveal"))return;
 element.classList.add("reveal");observer.observe(element);
}
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
function handleDataReady(event){
 portfolioData=event.detail||window.portfolioData;
 dataStatus="ready";
 dataLoadFailures=[];
 activeCertificationCategory="all";
 setLanguage(currentLang);
 startContributions();
}
function handleDataError(event){
 portfolioData=null;
 dataStatus="error";
 dataLoadFailures=(event&&event.detail)||[];
 setLanguage(currentLang);
 startContributions();
}
document.addEventListener("portfolio:ready",handleDataReady);
document.addEventListener("portfolio:error",handleDataError);
if(window.portfolioData)handleDataReady({detail:window.portfolioData});
else setLanguage("en");
