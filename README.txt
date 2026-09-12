LEARNOVA FRONT-END v2
Learn. Grow. Succeed.

FILE STRUCTURE
index.html            all screens (single page app, sections toggled by JS) + desktop sidebar rail + mobile bottom tab bar + hamburger drawer
css/style.css          layout, components, light/dark liquid-glass theme tokens, responsive breakpoints (mobile / tablet / desktop)
css/animations.css     background motion, directional reveal animations, rank glow, owl blink/typing
js/data.js             all static/demo data: subjects, A-Level series & careers, leaderboard (with premium flags), teachers, founders, notices, credit packs, premium & certification plans
js/owl.js               the owl guide "Nova": SVG markup, blink groups, contextual tips, tour order, celebration messages
js/app.js               app logic: theme, routing, rendering, modals, toasts, quiz engine, chat, payment simulation engine, receipt PDF generator
assets/brand/           logo-icon.png (transparent, used everywhere) and logo-transparent.png (full lockup with wordmark)
assets/founders/        drop ceo.jpg, cofounder-2.jpg, cofounder-3.jpg, cofounder-4.jpg here to replace the initials placeholders on the About page (see founders array in js/data.js for exact filenames)

HOW TO RUN
Open index.html directly in a browser, or serve the folder with any static file server, e.g.:
  python3 -m http.server 8000
then visit http://localhost:8000

NEW IN THIS UPDATE
- Mobile bottom navigation is now a floating rounded glass dock (desktop sidebar untouched). The active tab shows as a gold circular indicator that glides smoothly between tabs, rises above the dock for 3 seconds, then settles back flush into the bar until the next tab change.
- About Us: the first founder now reads "Founder & CEO"; the third and fourth read "Partner & ..." instead of "Co-Founder & ...".
- Profile, side-menu and desktop-rail avatars now carry a small level shield (bottom-right of the circle). Levels 0\u201310 are driven by cumulative spend (js/data.js: levelThresholds), with tier colors: grey (0\u20132), bronze (3\u20135), silver (6\u20138), glowing gold (9), glowing neon diamond (10). The Profile page's "Level & Referral" card shows the shield, a progress bar to the next level, and the referral bonus (for you and for the friend you invite), which both scale with your level.

RESPONSIVE BEHAVIOUR
- Below 1024px: mobile/tablet app shell \u2014 bottom tab bar, hamburger drawer, bottom-sheet modals.
- From 1024px: persistent left navigation rail replaces the bottom tab bar and hamburger, modals become centred dialogs, grids expand to 2\u20134 columns.
- Tested at 375\u2013430px (phone), 768\u2013834px (tablet) and 1280\u20131440px (desktop).

PAYMENT SIMULATION
js/app.js exposes startPayment(label, amount, onSuccess) used by: L-Credits top-up, Premium plan purchase, Teacher certification, monthly competition registration, National Hackathon registration and joining a paid class. Each flow: choose MTN Mobile Money or Orange Money, enter a phone number, a simulated processing screen, then a receipt with transaction reference, printable via window.print() and downloadable as a real PDF (generated in pure JavaScript, no external library). Payment history is kept in localStorage and listed on the Profile page.

WHERE THE APP IS A FRONT-END SHELL ONLY (no backend yet)
- Login/registration screens are intentionally not built yet: state.role in js/app.js simulates Student vs Teacher via the Preview toggle on the Profile page, standing in for real auth.
- All payments are simulated client-side; wire your backend by replacing startPayment's internals with real MTN/Orange Money API calls and replacing js/data.js with API responses.

DESIGN NOTES
- Liquid-glass surfaces: layered translucent gradients, top specular highlight, heavier blur+saturation, soft ambient gold/blue light orbs drifting behind the content so the glass genuinely looks like it has light passing through it.
- Bottom tab bar / left rail (Home, Library, Quizzes, Compete, Classes) is the primary navigation; hamburger/rail also holds Profile & Wallet, Official Notices, About Us, Terms, Privacy, Settings \u2014 the "footer" content of a website, relocated the way a native app organises it.
- Theme defaults to the device's system preference and can be overridden in Settings; the choice is remembered.
- Nova, the owl guide, gives a contextual tip on every screen, shows a short typing animation before celebration messages (first save, premium purchase, high quiz rank, hackathon registration, etc.), and blinks periodically. Tap it to jump through unexplored sections.
- Rank badge colors follow the exact spec: D white, C yellow, B neon blue, A neon green, S neon gold, SS glowing gold, SSS glowing gold with a shimmer animation. Premium students carry a gold crown chip; certified teachers carry a "Certified" chip next to standard "Verified profile" teachers.
