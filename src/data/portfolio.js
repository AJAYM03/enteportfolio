export const projects = [
  {
    number: '01',
    title: 'AnweshanaSahayi',
    tag: 'AI-assisted investigation operating system',
    period: 'Architecture V1 · feature-frozen',
    type: 'architecture',
    observation: '"Investigators need shared, traceable state — not another chat window."',
    description: 'An investigation operating system for synthesizing fragmented digital evidence into a shared investigation state. I designed and implemented the architecture and prototype end-to-end, including the deterministic investigation backbone, reasoning/orchestration layer, data model, provenance, coverage, contextual graph projection, and investigator-facing workflow.',
    detail: 'The backbone constructs factual investigation state with zero LLM calls. The reasoning agent reads structured state — not raw evidence — to identify the greatest remaining uncertainty and recommend the next inquiry. The investigator remains the final decision-maker.',
    chips: ['FastAPI', 'React + TypeScript', 'PostgreSQL + pgvector', 'React Flow', 'provenance', 'human-in-the-loop'],
    decision: 'The graph is a deterministic projection of investigation state, not the source of truth.',
    guardrail: 'AI-derived relationships retain separate reliability and verification status; they do not become confirmed facts automatically.',
    status: 'Architecture V1 frozen. Current focus: documentation, reproducibility, testing, and demo reliability.',
    projectStatus: 'Architecture V1 / testing, reproducibility, and demo readiness',
    repo: 'https://github.com/AJAYM03/AnweshanaSahayi',
    repoLabel: 'view repository — AnweshanaSahayi ↗'
  },
  {
    number: '02',
    title: 'MediQ',
    tag: 'real-time OP queue prototype',
    period: 'May 2026 — present',
    type: 'queue',
    observation: '"Hospital waiting shouldn’t feel confusing and uncertain."',
    description: 'A React/Vite and Firebase prototype for a real-time OP queue covering secure patient onboarding, appointments, walk-ins, live queue movement, tracker links, and ETA logic. Its interesting problem is state: holding pool versus active pool, physical presence, and doctor/reception/nurse workflows all affect what the queue means.',
    decision: 'Queue state follows real clinic workflows and physical presence rather than treating every appointment as an identical list item.',
    chips: ['React + Vite', 'Firebase Auth', 'Firestore', 'RBAC', 'live ETA'],
    projectStatus: 'prototype / system project',
    repo: 'https://github.com/AJAYM03/MediQ',
    repoLabel: 'view repo — MediQ ↗'
  },
  {
    number: '03',
    title: 'SHybridQIGA — Vehicular Fog Scheduler',
    tag: 'vehicular fog computing research',
    period: 'Sep 2025 — Apr 2026',
    type: 'optimization',
    observation: '"How should scheduling behave when the workload keeps moving?"',
    description: 'A hybrid quantum-inspired genetic algorithm with heuristic seeding and deterministic, load-aware repair for multi-objective task scheduling in vehicular fog computing. The research evaluates static workloads and continuous SUMO-driven mobility through EdgeSimPy, including SLA, energy, cost, and latency trade-offs.',
    decision: 'Under continuous mobility, the paper reports 38–58% fewer missed deadlines than GA across four topologies, while documenting an energy and cost premium against lightweight heuristics. It does not win every metric.',
    chips: ['Python', 'EdgeSimPy', 'SUMO', 'multi-objective optimization'],
    projectStatus: 'research paper / static workloads + continuous mobility evaluation',
    repo: 'https://github.com/AJAYM03/Fog-Orchestrator',
    repoLabel: 'view repo — Fog-Orchestrator ↗'
  },
  {
    number: '04',
    title: 'DNS Spoofing Detection & Alert System',
    tag: 'security and networking',
    period: 'CIAL internship · June 2025',
    type: 'dns',
    observation: '"Public Wi-Fi trusts a lot more than it should."',
    description: 'Built during my internship at Cochin International Airport. The Python/Scapy tool performs stateful DNS inspection, trusted-record and IP checks, TTL/metadata analysis, and transaction-mismatch detection, then surfaces events through a Flask-SocketIO dashboard and Telegram alerts with SQLite history.',
    decision: 'A controlled detection project focused on making quiet network trust visible and inspectable; the repository explicitly positions it for learning, experimentation, and authorized testing.',
    chips: ['Python', 'Scapy', 'Flask + Socket.IO', 'SQLite + SQLAlchemy', 'Telegram alerts'],
    projectStatus: 'simulated detection project / internship work',
    repo: 'https://github.com/AJAYM03/DnsCheck',
    repoLabel: 'view repo — DnsCheck ↗'
  },
  {
    number: '05',
    title: 'Haajar (ഹാജർ)',
    tag: 'browser extension',
    period: 'personal project',
    type: 'plain',
    observation: '"Students shouldn’t have to make attendance decisions blindly."',
    description: 'A privacy-first Chrome extension for the RSET student portal that reads raw absence data, maps it against a batch timetable, and turns attendance into a decision. It uses no backend or external API calls; calculations and settings stay in chrome.storage.local.',
    chips: ['Chrome Extension', 'RSMS scraping', 'CSV timetable mapping', 'local-only storage'],
    projectStatus: 'supporting project',
    repo: 'https://github.com/AJAYM03/Haajar',
    repoLabel: 'view repo — Haajar ↗'
  }
];

export const supportingProjects = [
  ['PlacementGuardian', 'Chrome extension + FastAPI backend automating university placement drives'],
  ['VoterFind', "Decodes legacy ISM fonts to make Kerala’s 2002 electoral rolls searchable"],
  ['TableDine', 'QR-menu ordering system for a local biriyani shop']
];

export const skillGroups = [
  ['Software development', ['Python', 'JavaScript', 'C', 'Flask', 'FastAPI', 'Streamlit'], 'languages and frameworks I keep building with'],
  ['Data & state modelling', ['Firestore', 'MySQL', 'SQLite', 'Git', 'GitHub'], 'where state, relationships, and transitions become the design'],
  ['Cybersecurity & networking', ['Scapy', 'Chrome Extensions API', 'DNS analysis', 'packet-level inspection'], 'a foundation, not a box I need to stay inside'],
  ['Architecture & iteration', ['system architecture', 'research / optimization', 'AI-assisted development', 'debugging', 'prototyping'], 'the part that keeps changing as the project teaches me more']
];
