"use client";

import { useEffect, useMemo, useState } from "react";

type AppId = "about" | "work" | "projects" | "skills" | "contact";

const projects = [
  { name: "A.I.R.I", tag: "On-device AI", tint: "#669BBC", icon: "AI", copy: "A privacy-first Flutter app that runs LLMs locally with RAG, multimodal chat, voice, and an OpenAI-compatible LAN server.", stack: ["Flutter", "llama.cpp", "RAG", "TTS / STT"], href: "https://github.com/agamairi/A.I.R.I" },
  { name: "DreamAiri", tag: "Agentic game dev", tint: "#E4572E", icon: "DA", copy: "A full-stack AI coding assistant that executes multi-turn tool workflows directly inside the Godot editor.", stack: ["Go", "Godot", "PostgreSQL", "Next.js"], href: "https://agamairi.github.io/portfolio/" },
  { name: "forge_mvvm", tag: "Published package", tint: "#F3A712", icon: "FM", copy: "An opinionated Flutter MVVM and Clean Architecture framework with typed async primitives, validation, and one-command scaffolding.", stack: ["Dart", "Flutter", "MVVM", "CLI"], href: "https://github.com/agamairi/forge_mvvm" },
  { name: "PrepStation", tag: "Desktop video editor", tint: "#A8C686", icon: "PS", copy: "A non-linear iOS and macOS editor with a multi-track timeline, 30+ transitions, keyframes, FFmpeg export, and Vision-powered background removal.", stack: ["Flutter", "FFmpeg", "Apple Vision", "macOS"], href: "https://github.com/agamairi" },
  { name: "MovieBrowser", tag: "Native iOS", tint: "#29335C", icon: "MB", copy: "A SwiftUI app with protocol-first services, layered caching, dependency injection, adaptive Core Image gradients, and XCTest coverage.", stack: ["SwiftUI", "async/await", "Core Image", "XCTest"], href: "https://github.com/agamairi" },
  { name: "AI Council", tag: "Multi-LLM research", tint: "#669BBC", icon: "AC", copy: "A fully local multi-model platform for sequential debate, web research, document analysis, and collaborative tool use.", stack: ["Python", "Flask", "Socket.IO", "Local LLMs"], href: "https://github.com/agamairi/ai-council" },
];

const apps: { id: AppId; label: string; color: string; glyph: string }[] = [
  { id: "about", label: "About", color: "#669BBC", glyph: "AA" },
  { id: "work", label: "Experience", color: "#F3A712", glyph: "EX" },
  { id: "projects", label: "Projects", color: "#E4572E", glyph: "PR" },
  { id: "skills", label: "Skills", color: "#A8C686", glyph: "SK" },
  { id: "contact", label: "Contact", color: "#29335C", glyph: "CO" },
];

function AppIcon({ app, small = false }: { app: (typeof apps)[number]; small?: boolean }) {
  return <button className={`app-button ${small ? "small" : ""}`} onClick={() => window.dispatchEvent(new CustomEvent("open-app", { detail: app.id }))} aria-label={`Open ${app.label}`}><span className="app-icon" style={{ "--icon-color": app.color } as React.CSSProperties}><span>{app.glyph}</span></span>{!small && <span className="app-label">{app.label}</span>}</button>;
}

function Chrome({ title, onClose, children }: { title: string; onClose: () => void; children: React.ReactNode }) {
  return <section className="app-window" aria-label={`${title} app`}><header className="window-bar"><button onClick={onClose} className="close-button" aria-label="Close app"><span>‹</span> Home</button><strong>{title}</strong><span className="window-spacer" /></header><div className="window-scroll">{children}</div></section>;
}

function About({ close }: { close: () => void }) {
  return <Chrome title="About" onClose={close}>
    <div className="profile-hero"><div className="monogram">AA</div><div><p className="eyebrow">Mobile application developer</p><h2>Agam Airi</h2><p>Toronto, Canada</p></div></div>
    <div className="intro-card"><p>I build mobile software where polished interfaces meet difficult systems—native bridges, custom hardware, on-device AI, and production releases.</p></div>
    <div className="stats-grid"><div><strong>3+</strong><span>years building</span></div><div><strong>10+</strong><span>apps shipped</span></div><div><strong>30%</strong><span>faster load times</span></div><div><strong>1K+</strong><span>daily events</span></div></div>
    <section className="content-section"><p className="section-label">HOW I WORK</p><h3>Native depth. Cross-platform speed.</h3><p>My core stack is Flutter, Swift, and Kotlin. I care about clean architecture, thoughtful interaction design, measurable performance, and owning the whole release path from an idea to the App Store, Google Play, or enterprise MDM.</p></section>
    <section className="content-section education-card"><p className="section-label">EDUCATION</p><div className="education-row"><span>2022—2023</span><div><b>Computer Programming</b><p>Seneca College · Toronto</p></div></div><div className="education-row"><span>2018—2021</span><div><b>BBA, IT Specialization</b><p>Sardar Patel University</p></div></div></section>
  </Chrome>;
}

function Work({ close }: { close: () => void }) {
  return <Chrome title="Experience" onClose={close}>
    <div className="screen-heading"><p className="eyebrow">Selected work</p><h2>Shipping software that talks to the real world.</h2></div>
    <article className="timeline-card current"><div className="timeline-top"><span className="company-mark solaris">S</span><div><h3>Solaris Robots</h3><p>Mobile Application Developer</p></div><span className="date">2024—NOW</span></div><p className="role-summary">Owning iOS and Android products for robotics, IoT, and airport operations—from native integration to production release.</p><ul><li>Led the PRMGO migration to Flutter and Node.js, supporting 300+ concurrent Toronto Pearson staff and 1,000+ daily passenger-tracking events.</li><li>Engineered Swift and Kotlin bridges for OTA updates, telemetry, UART communication, battery modules, and ToF sensors.</li><li>Reduced SolarX application and data load times by 30% through profiling and production debugging.</li><li>Owned releases across TestFlight, App Store, Google Play, and enterprise MDM.</li></ul></article>
    <article className="timeline-card"><div className="timeline-top"><span className="company-mark independent">A</span><div><h3>Independent</h3><p>Mobile Developer & Mentor</p></div><span className="date">2023—2024</span></div><p className="role-summary">Built production-grade mobile and web applications while mentoring developers in architecture, OOP, and data structures.</p><ul><li>Shipped 10+ projects across Flutter, Swift, SwiftUI, Objective-C, and React.</li><li>Mentored 5+ junior developers, improving problem-solving and code quality.</li></ul></article>
  </Chrome>;
}

function Projects({ close }: { close: () => void }) {
  return <Chrome title="Projects" onClose={close}><div className="screen-heading project-heading"><p className="eyebrow">Open-source lab</p><h2>Things I’ve made.</h2><p>AI on the edge, creative tools, and developer infrastructure.</p></div><div className="project-list">{projects.map((project) => <a key={project.name} className="project-card" href={project.href} target="_blank" rel="noreferrer"><span className="project-icon" style={{ "--project-color": project.tint } as React.CSSProperties}>{project.icon}</span><div className="project-copy"><div className="project-title"><div><h3>{project.name}</h3><p>{project.tag}</p></div><span>↗</span></div><p>{project.copy}</p><div className="tag-row">{project.stack.map((item) => <span key={item}>{item}</span>)}</div></div></a>)}</div></Chrome>;
}

const skillGroups = [["Mobile", ["Flutter", "SwiftUI", "UIKit", "Kotlin", "Jetpack Compose", "React Native"]], ["Apple", ["Swift Concurrency", "Combine", "Core Image", "Core Audio", "AppKit", "XCTest"]], ["Systems", ["Native bridges", "UART", "IoT telemetry", "OTA firmware", "APNs", "Amazon SNS"]], ["Backend & AI", ["Node.js", "Go", "REST APIs", "PostgreSQL", "Firebase", "RAG pipelines"]]] as const;

function Skills({ close }: { close: () => void }) {
  return <Chrome title="Skills" onClose={close}><div className="screen-heading"><p className="eyebrow">Toolbox</p><h2>Built for the full lifecycle.</h2></div><div className="skill-stack">{skillGroups.map(([title, items], index) => <section className="skill-group" key={title}><div className={`skill-symbol s${index + 1}`}>{["⌁", "⌘", "⇄", "✦"][index]}</div><div><h3>{title}</h3><div className="skill-pills">{items.map((item) => <span key={item}>{item}</span>)}</div></div></section>)}</div><section className="principles"><p className="section-label">ENGINEERING PRINCIPLES</p><div><b>MVVM & Clean Architecture</b><span>Systems that stay understandable as they grow.</span></div><div><b>Testing by default</b><span>Unit and integration coverage for reliable releases.</span></div><div><b>Measure, then optimize</b><span>Profiling and observability over guesswork.</span></div></section></Chrome>;
}

function Contact({ close }: { close: () => void }) {
  const [copied, setCopied] = useState(false);
  const copyEmail = async () => { await navigator.clipboard?.writeText("agam.airi@outlook.com"); setCopied(true); window.setTimeout(() => setCopied(false), 1800); };
  return <Chrome title="Contact" onClose={close}><div className="contact-hero"><span className="availability-dot" /><p>OPEN TO MOBILE & iOS ROLES</p><h2>Let’s build something useful.</h2><span>Based in Toronto · Open to on-site, hybrid, or remote roles across Canada.</span></div><div className="contact-actions"><a href="mailto:agam.airi@outlook.com" className="primary-action">Write an email <span>↗</span></a><button onClick={copyEmail} className="secondary-action">{copied ? "Email copied" : "Copy email"}<span>{copied ? "✓" : "⌘"}</span></button></div><div className="contact-list"><a href="https://www.linkedin.com/in/agam-airi" target="_blank" rel="noreferrer"><span className="social-icon linkedin">in</span><div><b>LinkedIn</b><small>linkedin.com/in/agam-airi</small></div><i>↗</i></a><a href="https://github.com/agamairi" target="_blank" rel="noreferrer"><span className="social-icon github">GH</span><div><b>GitHub</b><small>github.com/agamairi</small></div><i>↗</i></a><a href="tel:+16475632245"><span className="social-icon phone">⌕</span><div><b>Phone</b><small>+1 647 563 2245</small></div><i>›</i></a></div><p className="contact-note">I usually reply within one business day.</p></Chrome>;
}

export default function Home() {
  const [active, setActive] = useState<AppId | null>(null);
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");
  const [page, setPage] = useState(0);
  useEffect(() => { const tick = () => { const now = new Date(); setTime(new Intl.DateTimeFormat("en-CA", { hour: "numeric", minute: "2-digit" }).format(now)); setDate(new Intl.DateTimeFormat("en-CA", { weekday: "long", month: "long", day: "numeric" }).format(now)); }; tick(); const timer = window.setInterval(tick, 30000); const openApp = (event: Event) => setActive((event as CustomEvent<AppId>).detail); window.addEventListener("open-app", openApp); return () => { window.clearInterval(timer); window.removeEventListener("open-app", openApp); }; }, []);
  useEffect(() => { const keydown = (event: KeyboardEvent) => { if (event.key === "Escape") setActive(null); if (!active && event.key === "ArrowRight") setPage(1); if (!active && event.key === "ArrowLeft") setPage(0); }; window.addEventListener("keydown", keydown); return () => window.removeEventListener("keydown", keydown); }, [active]);
  const ActiveApp = useMemo(() => { if (active === "about") return <About close={() => setActive(null)} />; if (active === "work") return <Work close={() => setActive(null)} />; if (active === "projects") return <Projects close={() => setActive(null)} />; if (active === "skills") return <Skills close={() => setActive(null)} />; if (active === "contact") return <Contact close={() => setActive(null)} />; return null; }, [active]);
  return (
    <main className="portfolio-shell">
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />
      <div className="phone-wrap">
        <div className="phone-frame">
          <div className="phone-screen">
            <div className="wallpaper-orb orb-a" />
            <div className="wallpaper-orb orb-b" />
            <header className="status-bar">
              <span>{time || "9:41 PM"}</span>
              <div className="dynamic-island" />
              <span className="ipad-status-date">{date || "Monday, August 24"}</span>
              <div className="status-icons"><span className="signal">▰</span><span>⌁</span><span className="battery"><i /></span></div>
            </header>

            <section className="ipad-home" aria-hidden={active !== null}>
              <header className="ipad-greeting">
                <div><p>{date || "Monday, August 24"}</p><h1>Good evening, <span>Agam.</span></h1></div>
                <button onClick={() => setActive("contact")}><i /> Available for opportunities</button>
              </header>
              <div className="ipad-grid">
                <button className="ipad-widget ipad-profile" onClick={() => setActive("about")}>
                  <div className="widget-top"><span className="mini-avatar">AA</span><span className="widget-chip">PROFILE</span></div>
                  <div><p>Mobile engineer</p><h2>Apps that connect<br />software to <em>the real world.</em></h2></div>
                  <span className="widget-link">Open About <b>↗</b></span>
                </button>
                <button className="ipad-widget ipad-current" onClick={() => setActive("work")}>
                  <div className="widget-top"><span className="widget-chip light">NOW</span><span>↗</span></div>
                  <div><p>Solaris Robots</p><h3>Mobile systems for robotics, IoT, and airport operations.</h3></div>
                  <div className="current-tags"><span>300+ staff</span><span>1K+ events/day</span></div>
                </button>
                <button className="ipad-widget ipad-stats" onClick={() => setActive("about")}>
                  <span className="widget-chip">AT A GLANCE</span>
                  <div className="stat-ring"><strong>30%</strong><span>faster</span></div>
                  <p>Load-time reduction across robotics apps</p>
                </button>
                <button className="ipad-widget ipad-project" onClick={() => setActive("projects")}>
                  <div className="project-orbit"><span>AI</span><i /><i /><i /></div>
                  <div><span className="widget-chip light">FEATURED BUILD</span><h3>A.I.R.I</h3><p>Your private AI, running fully on-device.</p></div>
                  <b>Explore project →</b>
                </button>
                <button className="ipad-widget ipad-stack" onClick={() => setActive("skills")}>
                  <div className="widget-top"><span className="widget-chip">CORE STACK</span><span>↗</span></div>
                  <div className="stack-cloud"><span>Flutter</span><span>Swift</span><span>Kotlin</span><span>RAG</span><span>Go</span><span>IoT</span></div>
                </button>
                <div className="ipad-widget ipad-apps">
                  <div className="widget-top"><span className="widget-chip">APPS</span><span className="apps-hint">Click to explore</span></div>
                  <div className="ipad-app-grid">{apps.map((app) => <AppIcon app={app} key={app.id} />)}</div>
                </div>
                <button className="ipad-widget ipad-contact" onClick={() => setActive("contact")}>
                  <div><span className="widget-chip light">LET&apos;S TALK</span><h3>Have a role or an ambitious mobile idea?</h3></div><span className="contact-bubble">↗</span>
                </button>
              </div>
            </section>

            <div className={`home-pages page-${page}`} aria-hidden={active !== null}>
              <section className="home-page main-page">
                <div className="identity-widget"><div className="widget-top"><span className="mini-avatar">AA</span><span className="available"><i /> AVAILABLE</span></div><h2>Agam Airi</h2><p>Mobile engineer building at the edge of apps, hardware, and AI.</p><button onClick={() => setActive("about")}>View profile <span>→</span></button></div>
                <div className="app-grid">{apps.slice(0, 4).map((app) => <AppIcon app={app} key={app.id} />)}</div>
                <button className="featured-widget" onClick={() => setActive("work")}><div><span className="widget-label">CURRENTLY</span><h3>Building mobile systems at Solaris Robots</h3><p>Robotics · IoT · Airport operations</p></div><span className="widget-arrow">↗</span></button>
              </section>
              <section className="home-page second-page"><div className="second-title"><span>SELECTED</span><h2>Project shelf</h2></div><div className="mini-project-grid">{projects.slice(0, 4).map((project) => <a href={project.href} target="_blank" rel="noreferrer" key={project.name}><span className="project-icon" style={{ "--project-color": project.tint } as React.CSSProperties}>{project.icon}</span><b>{project.name}</b><small>{project.tag}</small></a>)}</div><button className="all-projects" onClick={() => setActive("projects")}>Browse all projects <span>→</span></button><div className="app-grid single"><AppIcon app={apps[4]} /></div></section>
            </div>

            {!active && <>
              <div className="page-dots"><button className={page === 0 ? "active" : ""} onClick={() => setPage(0)} aria-label="Go to first home screen" /><button className={page === 1 ? "active" : ""} onClick={() => setPage(1)} aria-label="Go to second home screen" /></div>
              <nav className="dock" aria-label="Quick launch">{apps.filter((app) => ["projects", "skills", "contact"].includes(app.id)).map((app) => <AppIcon app={app} small key={app.id} />)}<a className="app-button small" href="mailto:agam.airi@outlook.com" aria-label="Email Agam"><span className="app-icon mail-icon"><span>↗</span></span></a></nav>
            </>}
            {ActiveApp}
            <button className="home-indicator" onClick={() => setActive(null)} aria-label="Return home" />
          </div>
        </div>
      </div>
    </main>
  );
}
