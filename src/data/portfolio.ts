export const profile = {
  name: "Thisuka Warsavithana",
  firstName: "Thisuka",
  lastName: "Warsavithana",
  role: "Full-Stack Developer",
  focus: "Backend & Systems",
  location: "Moratuwa, Sri Lanka",
  email: "thisuka112@gmail.com",
  github: "https://github.com/ThisukaMW",
  linkedin: "https://www.linkedin.com/in/thisuka-warsavithana",
  cv: "/Thisuka_Warsavithana_CV.pdf",
  photo: "/profile.jpg",
  status: "Open to full-stack SE internships",
  tagline:
    "I build full-stack products that keep working when things go wrong: route optimizers, ML-driven platforms, RAG systems and offline-first apps.",
  summary:
    "IT undergraduate at the University of Moratuwa, focused on full-stack web development and backend systems. I ship end-to-end products with React, Next.js, Node.js and Python, and I've been adding Gen AI work like RAG pipelines and LLM integrations.",
};

export const rotatingWords = [
  "route optimizers",
  "ML-powered platforms",
  "RAG pipelines",
  "offline-first apps",
  "secure systems",
];

export const stats = [
  { value: 1, suffix: "×", label: "Hackathon champion", sub: "CodeArena'26" },
  { value: 5, suffix: "", label: "Hackathon finals", sub: "KDU · UCSC · APIIT · UoM" },
  { value: 5, suffix: "+", label: "Live deployed products", sub: "Vercel · Render · Firebase" },
  { value: 3.4, suffix: "", decimals: 2, label: "CGPA", sub: "B.Sc (Hons) IT, UoM" },
];

export type Project = {
  slug: string;
  name: string;
  title: string;
  badge?: string;
  color: string;
  metric: { value: string; label: string };
  stack: string[];
  points: string[];
  github: string;
  live?: string;
};

export const projects: Project[] = [
  {
    slug: "resolvex",
    name: "ResolveX",
    title: "Real-time delivery fault detection & resolution",
    badge: "🏆 Champions · CodeArena'26",
    color: "#f5b942",
    metric: { value: "4", label: "ML models in production" },
    stack: ["FastAPI", "React", "Supabase", "scikit-learn", "XGBoost", "Gemini Vision"],
    points: [
      "Trained and deployed four ML models (Random Forest classifier/regressor, Isolation Forest, calibrated XGBoost) to attribute delivery faults, predict ETA and score refund-claim risk.",
      "Rule-governed Fairness Aggregator combines five evidence checks (timing, GPS route, zone, photo, claim history) into one of four explainable outcomes, escalating to a human when confidence is low.",
      "Gemini Vision compares photo evidence, with a deterministic rule-based fallback when the API fails.",
      "Real-time rider GPS and automatic nearest-rider assignment across 6 role-based dashboards.",
    ],
    github: "https://github.com/ThisukaMW/ResolveX",
    live: "https://resolvex-app.vercel.app/",
  },
  {
    slug: "freshroute",
    name: "FreshRoute",
    title: "Delivery route optimization platform",
    badge: "Built with Creative Software · Team of 5",
    color: "#34d399",
    metric: { value: "VRPPD", label: "solver on Google OR-Tools" },
    stack: ["React Native", "Node.js", "TypeScript", "FastAPI", "OR-Tools", "PostgreSQL", "Prisma", "Socket.IO", "Stripe"],
    points: [
      "VRPPD solver with Google OR-Tools that enforces pickup-before-delivery and vehicle capacity, plus a fallback heuristic for when the optimizer is down.",
      "Driver app (React Native/Expo) with live GPS tracking over JWT-authenticated Socket.IO and role-gated dispatch visibility.",
      "Python microservice deployed next to the Node.js backend on Render. Found and fixed a Prisma relation-mapping bug that was silently losing data.",
      "Led GitHub and hosting for a 5-person team: branch strategy, access control and deployment.",
    ],
    github: "https://github.com/ThisukaMW/freshroute-backend",
    live: "https://freshroute-frontend.vercel.app",
  },
  {
    slug: "rakshaka",
    name: "Rakshaka AI",
    title: "Multilingual scam message detector with drift monitoring",
    badge: "Finalist · TensorForge 2.0 · Built in 6 hours",
    color: "#ff8a3d",
    metric: { value: "190/190", label: "scams caught on unseen wording (synthetic test set)" },
    stack: ["Python", "scikit-learn", "FastAPI", "Streamlit", "SQLite", "Docker", "GitHub Actions"],
    points: [
      "Classifies SMS and WhatsApp messages in Sinhala, Tamil, Singlish, Tanglish and English as SCAM, LIKELY SAFE or UNCERTAIN, using character and word n-gram TF-IDF to handle native scripts and romanised, code-mixed text.",
      "Drift monitor compares live confidence and unknown-token rates against validation baselines. When scammers switch tactics it alerts within one 50-message window and sends messages to human review instead of clearing them.",
      "Human-in-the-loop retraining: reviewers label flagged messages and retrain in one click. A new model goes live only if it passes a regression gate on balanced accuracy and per-class recall, and can be rolled back instantly.",
      "Privacy by design under Sri Lanka's PDPA: normal messages are stored only as a hash. I built the data generator, training pipeline, FastAPI service, Streamlit dashboard, and Docker and CI setup.",
    ],
    github: "https://github.com/geemalfernando/Rakshaka_AI",
  },
  {
    slug: "rag",
    name: "RAG Document Q&A",
    title: "Retrieval-augmented document assistant",
    color: "#38bdf8",
    metric: { value: "20/20", label: "faithfulness in LLM-judged eval" },
    stack: ["Python", "LangChain", "FAISS", "BM25", "Sentence-Transformers", "Groq", "MCP", "Streamlit"],
    points: [
      "Full RAG pipeline: page-aware PDF/TXT ingestion, chunking, local embeddings and a persistent FAISS index, with page-level citations in the chat UI.",
      "Hybrid dense (FAISS) + sparse (BM25) retrieval merged with Reciprocal Rank Fusion, and a UI toggle to compare the modes.",
      "Grounding-first system prompt checked against adversarial tests. The LLM-judged eval scored 18/20 on correctness and 20/20 on faithfulness.",
      "Exposes the knowledge base to external AI clients through an MCP server. Groq integration has rate-limit handling and token/cost tracking.",
    ],
    github: "https://github.com/ThisukaMW/rag-document-qa",
    live: "https://rag-document-app-l7zopx4ybrnzwo2nyybybp.streamlit.app/",
  },
  {
    slug: "genzipher",
    name: "GenZipher",
    title: "Healthcare security & trust platform",
    badge: "Finalist · GenZipher 1.0",
    color: "#fb7185",
    metric: { value: "Ed25519", label: "signed prescriptions" },
    stack: ["Node.js", "Express", "MongoDB", "React", "Python", "WebAuthn"],
    points: [
      "Stops identity fraud and prescription tampering with Ed25519-signed prescriptions behind a dual-signature dispense gate.",
      "WebCrypto (ES256) device-binding auth, AES-256-GCM encrypted patient vitals and break-glass access logging.",
      "Tamper-evident hash-chained audit log, plus a Python anomaly-detection engine that scores risky users.",
      "5 role-based dashboards with TOTP MFA and WebAuthn biometrics.",
    ],
    github: "https://github.com/ThisukaMW/Genzipher",
    live: "https://genzipher.vercel.app",
  },
  {
    slug: "resq",
    name: "ResQ",
    title: "Offline-first disaster response platform",
    color: "#a78bfa",
    metric: { value: "0", label: "reports lost offline" },
    stack: ["React", "Vite", "Firebase", "Dexie.js", "IndexedDB", "Leaflet"],
    points: [
      "Two apps, deployed separately: an offline-first field responder PWA and a real-time HQ dashboard.",
      "Incident reports (GPS, photos, severity) queue to IndexedDB and survive airplane mode and restarts with zero data loss.",
      "Foreground sync with multiple triggers to work around unreliable background sync on iOS/Safari, with duplicate-upload prevention.",
      "Live Leaflet/OpenStreetMap incident map fed by Firestore listeners, with duplicate-coordinate detection.",
    ],
    github: "https://github.com/ThisukaMW/Disaster_Management",
    live: "https://disaster-management-app-host.web.app/",
  },
];

export const experience = [
  {
    role: "Freelance Web Developer",
    org: "Self-employed",
    period: "2025 — Present",
    points: [
      "Build hotel web profiles with Next.js that show rooms, facilities, photos and location details to attract guests.",
    ],
    tags: ["Next.js", "Client work"],
  },
  {
    role: "Web & Technology Pillar Member",
    org: "MoraSpirit",
    period: "Apr 2024 — Apr 2025",
    points: [
      "Built responsive React UI components for sports.moraspirit.com and maintained the organisation's website and mobile app, including REST API integration.",
      "Worked with the frontend and backend teams to keep the React interfaces consistent with MoraSpirit's branding.",
      "Named Best Pillar Member of the Month.",
    ],
    tags: ["React", "REST APIs", "Mobile"],
  },
  {
    role: "Trainee Software Engineer",
    org: "Institute of Computer Engineering Technology",
    period: "Sep 2023 — Feb 2024",
    points: [
      "Built the shopping cart module for a full-stack e-commerce app: add/update/remove operations and order totals.",
      "Built the inventory management backend, keeping stock levels in sync with cart and order activity.",
      "Agile team work: sprint planning, code reviews and daily stand-ups.",
    ],
    tags: ["Spring Boot", "Node.js", "Agile"],
  },
];

export const skills = [
  {
    group: "Languages",
    items: ["TypeScript", "JavaScript", "Java", "Python"],
  },
  {
    group: "Frontend",
    items: ["React", "Next.js", "React Native (Expo)", "PWAs", "Angular", "Tailwind CSS", "HTML5", "CSS3", "Bootstrap"],
  },
  {
    group: "Backend",
    items: ["Node.js", "Express", "RESTful APIs", "Spring Boot", "FastAPI", "Socket.IO"],
  },
  {
    group: "AI / ML",
    items: ["Gemini & Groq APIs", "LangChain", "RAG", "FAISS", "Sentence-Transformers", "scikit-learn", "XGBoost"],
  },
  {
    group: "Data",
    items: ["PostgreSQL", "MongoDB", "Supabase", "Firestore", "IndexedDB (Dexie.js)", "Prisma"],
  },
  {
    group: "Security",
    items: ["Ed25519 signing", "AES-256-GCM", "WebAuthn", "TOTP MFA", "JWT auth", "Hash-chained audit logs"],
  },
  {
    group: "Tools & Platforms",
    items: ["Docker", "Git / GitHub", "Google OR-Tools", "Stripe", "Firebase", "Cloudinary", "Leaflet.js", "Postman", "Jira"],
  },
  {
    group: "Testing",
    items: ["node:test", "JUnit", "LLM-judged evals"],
  },
];

export const marquee = [
  "TypeScript", "React", "Next.js", "Node.js", "Python", "FastAPI", "PostgreSQL", "MongoDB",
  "Socket.IO", "LangChain", "FAISS", "XGBoost", "OR-Tools", "Docker", "Supabase", "Firebase",
  "React Native", "Spring Boot", "Prisma", "Stripe",
];

export type Achievement = {
  title: string;
  org: string;
  kind: "win" | "final" | "award";
  // slug of the project built for it, linked from the Wins section
  project?: string;
};

export const achievements: Achievement[] = [
  { title: "CodeArena'26 Champions", org: "KDU × Dialog Axiata PLC", kind: "win", project: "resolvex" },
  { title: "TensorForge 2.0 Finalist", org: "AI Engineering & MLOps Buildathon · KDU × Ascentic", kind: "final", project: "rakshaka" },
  { title: "GenZipher 1.0 Finalist", org: "UCSC × CSSL", kind: "final", project: "genzipher" },
  { title: "DEV{thon} 3.0 Finalist", org: "Leo Club, University of Moratuwa", kind: "final" },
  { title: "Hackathon Finalist", org: "APIIT", kind: "final" },
  { title: "Best Pillar Member of the Month", org: "MoraSpirit", kind: "award" },
];

export const beyond = {
  titles: [
    { title: "Sri Lanka University Games Champions", sub: "Basketball · 2025" },
    { title: "Freshers' Meet Champions", sub: "Basketball · University of Moratuwa" },
    { title: "Best Defensive Player", sub: "Freshers' Meet · University of Moratuwa" },
  ],
  roles: [
    { title: "Secretary", sub: "Mora Basketball, University of Moratuwa" },
    { title: "Team Member", sub: "Mora Basketball Team, University of Moratuwa" },
    { title: "Junior Prefect", sub: "St. Sebastian's College, Moratuwa" },
  ],
};

export const education = [
  {
    title: "B.Sc (Hons) in Information Technology",
    org: "University of Moratuwa",
    period: "2024 — 2028 (expected)",
    detail: "CGPA 3.40 / 4.00",
  },
  {
    title: "Diploma in Software Engineering",
    org: "Institute of Computer Engineering Technology",
    period: "2023",
  },
  {
    title: "G.C.E. Advanced Level · Physical Science",
    org: "Ananda College, Colombo 10",
    period: "2022 (sat 2023)",
    detail: "Z-score 1.89 · Combined Maths A · Chemistry A · Physics B",
  },
];

export const certifications = [
  {
    title: "Claude Academy: Claude Code 101",
    issuer: "Anthropic",
    issued: "Oct 2026",
    credentialId: "a3855c6d274bf76209786c252f7a6f14",
    url: "https://academy.claude.com/verify/a3855c6d274bf76209786c252f7a6f14",
  },
  {
    title: "Claude Academy: Claude 101",
    issuer: "Anthropic",
    issued: "Oct 2026",
    credentialId: "a4f05a12e17b879aa0f820465af4605d",
    url: "https://academy.claude.com/verify/a4f05a12e17b879aa0f820465af4605d",
  },
];
