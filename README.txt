LEARNOVA – PWA ROOT
Learn. Grow. Succeed.

Tous les fichiers sont à la racine du projet (structure GitHub Pages / PWA), sans sous-dossiers.

FICHIERS
index.html          l'application complète (toutes les vues)
style.css           mise en page, composants, thèmes clair/sombre, responsive
animations.css      animations (fond, révélations de cartes, dock, niveaux)
data.js             données (matières, séries A'Level, classement, enseignants, fondateurs, niveaux)
owl.js              la mascotte Nova (SVG, clins d'œil, messages contextuels)
app.js              toute la logique de l'application + PWA (installation, icône saisonnière, service worker)
manifest.json        manifeste PWA (nom, couleurs, icônes)
sw.js                service worker (mise en cache hors-ligne)
logo-icon.png / logo-transparent.png   logo Learnova (utilisé dans l'app + aperçu de lien / og:image)
icon-32.png, icon-180.png, icon-192.png, icon-512.png   icône de l'application ET favicon, basés sur l'image du hibou que tu as fournie (PAS le logo)

ICÔNES SAISONNIÈRES
Le favicon et l'icône de l'app peuvent changer automatiquement selon la période de l'année. Pour activer une icône saisonnière, il suffit de déposer un fichier PNG à la racine avec EXACTEMENT le nom attendu ci-dessous. Si le fichier n'existe pas encore, l'app utilise automatiquement l'icône du hibou par défaut — rien ne casse.

Nom de fichier attendu      Période active
icon-christmas.png          15 – 26 décembre
icon-newyear.png            27 décembre – 2 janvier
icon-youthday.png           8 – 12 février (Fête de la Jeunesse)
icon-independence.png       18 – 21 mai (Fête de l'Indépendance / Unité)

Pour ajouter, modifier ou retirer une période, ouvre app.js et cherche le tableau SEASONAL_ICONS tout en bas du fichier : chaque entrée a un nom de fichier et une date de début/fin (mois, jour). Tu peux en ajouter autant que tu veux.

Important : ceci ne change que le favicon (onglet du navigateur) et l'icône affichée pendant l'utilisation. L'icône d'icône d'accueil d'un téléphone qui a déjà installé l'app (PWA) reste celle définie dans manifest.json au moment de l'installation — un vrai changement d'icône installée nécessitera un back-end qui régénère le manifest, comme tu l'as toi-même anticipé.

FONDATEURS
Les photos des fondateurs ne sont pas encore fournies. Dès que tu déposes ces 4 fichiers à la racine, ils remplacent automatiquement les initiales :
ceo.jpg, cofounder-2.jpg, cofounder-3.jpg, cofounder-4.jpg

DÉPLOIEMENT GITHUB PAGES
1. Mets tous ces fichiers à la racine de ton repo (ou dans /docs si tu utilises ce dossier comme source).
2. Active GitHub Pages sur la branche/dossier concerné.
3. Pour ajouter une icône saisonnière plus tard : dépose juste le PNG au bon nom à la racine et pousse le commit — aucune autre modification nécessaire.

CE QUI A CHANGÉ DANS CETTE LIVRAISON
- Corrigé : le cercle doré actif de la barre de navigation n'était pas centré sur l'icône. Le calcul utilise maintenant la position réelle mesurée de l'icône (et non plus une estimation), donc le cercle encadre parfaitement chaque icône, dans l'état élevé comme dans l'état posé.
- Restructuré : tous les fichiers sont désormais à la racine (plus de dossiers css/js/assets), prêt pour GitHub Pages tel quel.
- Ajouté : manifest.json et sw.js repris de ton fichier, service worker rendu plus robuste (le cache ne casse plus entièrement si un fichier, comme une photo de fondateur, est absent).
- Corrigé : le favicon/icône par défaut utilise maintenant l'image du hibou que tu as fournie, et non plus le logo Learnova (le logo reste utilisé dans l'interface et pour l'aperçu de lien / og:image, comme demandé).
- Ajouté : le système d'icône saisonnière décrit ci-dessus.

CE QUI RESTE EN ATTENTE (non traité dans cette livraison)
Le message précédent mentionnait aussi : une visite guidée animée au tout premier lancement, une page de connexion/création de compte, et les trois sessions étudiant/enseignant/parent avec visibilité filtrée. Ces points n'ont pas été traités ici. Dis-moi si tu veux que je reprenne ces points ensuite.

NOUVEAU DANS CETTE LIVRAISON (2e partie)
- Minuteur circulaire "en direct" : chaque question de quiz a maintenant 20 secondes avec un anneau qui se vide en temps réel (passe au rouge dans les 30% derniers, avance automatiquement si le temps est écoulé). La compétition mensuelle (page Compete + bannière Home) et le Hackathon (dans chaque fiche de série) affichent désormais un anneau de compte à rebours en direct jusqu'à la date limite.
- Thème saisonnier Noël / Nouvel An, entièrement automatique via la date système (aucune mise à jour de l'app nécessaire) :
  * Du 15 au 26 décembre : flocons de neige animés sur tout l'écran, houx (feuille + 3 baies rouges) sur le bouton hamburger, un bonhomme de neige au coin de la barre de navigation, des glaçons qui se forment sur son bord, et Nova le hibou porte un bonnet de père Noël — présents sur toutes les pages puisqu'ils font partie de la structure globale de l'app.
  * Du 27 décembre au 31 janvier : tout ce qui précède reste, plus un ruban "Happy New Year {année}" sous la barre du haut avec 3 pompons colorés, et l'année en cours affichée en badge doré sur le coin de la barre de navigation. L'année est calculée en temps réel par JavaScript (new Date().getFullYear()), jamais écrite en dur.
  * À partir du 1er février : tout redevient normal automatiquement.
  * Testé en simulant les dates du 20 décembre et du 15 janvier : fonctionne comme prévu dans les deux cas.
- Correctif important : plusieurs textes utilisaient par erreur une séquence d'échappement brute au lieu du vrai tiret — corrigé partout (titre de page, bouton d'inscription, texte de la carte Niveau, README).

AMÉLIORATIONS AJOUTÉES (3e partie)
- Aperçu instantané des thèmes saisonniers : dans Réglages → "Seasonal theme preview", trois boutons (Auto / Christmas / New Year) permettent de voir le thème immédiatement sur ton appareil, sans changer la date du système ni attendre le calendrier. C'est un réglage local uniquement (localStorage) qui ne modifie rien pour les autres visiteurs.
- Respect de "réduire les animations" (accessibilité) : si l'utilisateur a activé cette préférence sur son appareil, les flocons de neige et pompons ne s'affichent pas.
- Économie de batterie : les animations saisonnières (et le fond animé) se mettent en pause automatiquement quand l'onglet n'est pas visible (changement d'app, écran verrouillé, etc.).
