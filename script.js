/* ============ HELPERS ============ */
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

/* ============ THEME (light / dark) ============ */
const root = document.documentElement;
const themeBtn = $("#themeToggle");

function applyTheme(theme) {
  root.setAttribute("data-theme", theme);
  themeBtn.textContent = theme === "dark" ? "☀️" : "🌙";
}

let savedTheme = null;
try { savedTheme = localStorage.getItem("theme"); } catch (e) {}
applyTheme(savedTheme || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"));

themeBtn.addEventListener("click", () => {
  const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
  applyTheme(next);
  try { localStorage.setItem("theme", next); } catch (e) {}
});

/* ============ MOBILE MENU ============ */
const menuBtn = $("#menuToggle");
const navLinks = $("#navLinks");

function setMenu(open) {
  navLinks.classList.toggle("open", open);
  menuBtn.setAttribute("aria-expanded", String(open));
  menuBtn.textContent = open ? "✕" : "☰";
}
menuBtn.addEventListener("click", () => setMenu(!navLinks.classList.contains("open")));
$$("a", navLinks).forEach(a => a.addEventListener("click", () => setMenu(false)));
document.addEventListener("keydown", e => { if (e.key === "Escape") setMenu(false); });

/* ============ NAVBAR SHADOW, ACTIVE LINK, BACK TO TOP ============ */
const navbar = $("#navbar");
const toTop = $("#toTop");
const sections = $$("main section[id]");

function onScroll() {
  navbar.classList.toggle("scrolled", window.scrollY > 10);
  toTop.classList.toggle("show", window.scrollY > 500);

  let current = "";
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 120) current = sec.id;
  });
  $$(".nav-links a").forEach(a => {
    a.classList.toggle("active", a.getAttribute("href") === "#" + current);
  });
}
window.addEventListener("scroll", onScroll, { passive: true });
onScroll();
toTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

/* ============ TYPING EFFECT ============ */
const phrases = [
  "Aspiring Researcher",
  "Machine Learning Enthusiast",
  "Software Engineer",
  "Lifelong Learner"
];
const typedEl = $("#typed");
let pIndex = 0, cIndex = 0, deleting = false;

function type() {
  const word = phrases[pIndex];
  typedEl.textContent = word.slice(0, cIndex);
  if (!deleting && cIndex < word.length) {
    cIndex++;
    setTimeout(type, 90);
  } else if (!deleting) {
    deleting = true;
    setTimeout(type, 1400);
  } else if (cIndex > 0) {
    cIndex--;
    setTimeout(type, 45);
  } else {
    deleting = false;
    pIndex = (pIndex + 1) % phrases.length;
    setTimeout(type, 300);
  }
}
if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  typedEl.textContent = phrases[0];
} else {
  type();
}

/* ============ REVEAL ON SCROLL + COUNTERS + SKILL BARS ============ */
function animateCount(el) {
  const target = parseFloat(el.dataset.count);
  const decimals = parseInt(el.dataset.decimals || "0", 10);
  const duration = 1200;
  const start = performance.now();
  function frame(now) {
    const p = Math.min((now - start) / duration, 1);
    el.textContent = (target * p).toFixed(decimals);
    if (p < 1) requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const el = entry.target;
    el.classList.add("visible");
    $$("[data-count]", el).forEach(animateCount);
    $$(".bar i", el).forEach(bar => { bar.style.width = bar.dataset.level + "%"; });
    observer.unobserve(el);
  });
}, { threshold: 0.15 });

$$(".reveal").forEach(el => observer.observe(el));

/* ============ PROJECT FILTER ============ */
const filterBtns = $$(".filter");
const projects = $$(".project");

filterBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    filterBtns.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    const f = btn.dataset.filter;
    projects.forEach(p => {
      p.classList.toggle("hide", f !== "all" && p.dataset.category !== f);
    });
  });
});

/* ============ CONTACT FORM (opens the visitor's email app) ============ */
const YOUR_EMAIL = "you@email.com"; // <-- change this to your real email
const form = $("#contactForm");
const note = $("#formNote");

form.addEventListener("submit", e => {
  e.preventDefault();
  const name = $("#cName").value.trim();
  const email = $("#cEmail").value.trim();
  const message = $("#cMessage").value.trim();
  const subject = encodeURIComponent("Portfolio message from " + name);
  const body = encodeURIComponent(message + "\n\n— " + name + " (" + email + ")");
  window.location.href = "mailto:" + YOUR_EMAIL + "?subject=" + subject + "&body=" + body;
  note.textContent = "Opening your email app…";
  form.reset();
});

/* ============ FOOTER YEAR ============ */
$("#year").textContent = new Date().getFullYear();
