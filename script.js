// 1. Theme Switcher (Persistent LocalStorage)
const themeToggle = document.getElementById('theme-toggle');
const savedTheme = localStorage.getItem('avr_theme') || 'dark';

if (savedTheme === 'light') {
  document.body.classList.replace('dark-theme', 'light-theme');
}

themeToggle.addEventListener('click', () => {
  const isLight = document.body.classList.contains('light-theme');
  if (isLight) {
    document.body.classList.replace('light-theme', 'dark-theme');
    localStorage.setItem('avr_theme', 'dark');
  } else {
    document.body.classList.replace('dark-theme', 'light-theme');
    localStorage.setItem('avr_theme', 'light');
  }
});

// 2. Navbar Scroll and Scrollspy
const navbar = document.getElementById('navbar');
const scrollTopBtn = document.getElementById('scrollTopBtn');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
  const scrollPos = window.scrollY;
  if (scrollPos > 50) {
    navbar.classList.add('scrolled');
    scrollTopBtn.classList.add('visible');
  } else {
    navbar.classList.remove('scrolled');
    scrollTopBtn.classList.remove('visible');
  }

  let currentSection = '';
  document.querySelectorAll('section').forEach(sec => {
    if (scrollPos >= sec.offsetTop - 160) {
      currentSection = sec.getAttribute('id');
    }
  });
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${currentSection}`) {
      link.classList.add('active');
    }
  });
});

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// 3. Mobile Navigation Drawer
const mobileToggle = document.getElementById('mobile-toggle');
const navMenu = document.getElementById('nav-menu');

mobileToggle.addEventListener('click', () => {
  navMenu.classList.toggle('open');
  const icon = mobileToggle.querySelector('i');
  icon.className = navMenu.classList.contains('open') ? 'fa-solid fa-xmark' : 'fa-solid fa-bars';
});

navLinks.forEach(link => {
  link.addEventListener('click', () => {
    if (navMenu.classList.contains('open')) {
      navMenu.classList.remove('open');
      mobileToggle.querySelector('i').className = 'fa-solid fa-bars';
    }
  });
});

// 4. ARCHITECTURE TERMINAL ADVISOR
const advisorSpecs = {
  school: {
    name: "INSTITUTIONAL ERP ARCHITECTURE",
    frontend: "React.js + Tailwind CSS (Responsive Admin + Staff Dashboards)",
    backend: "Node.js + Express REST Microservices (RBAC Authorization)",
    database: "MongoDB Atlas (Document Collections for Students, Attendance, Fee Ledgers)",
    pdfEngine: "Client & Server-Side Dynamic PDF Generator (Report Cards & Fee Receipts)",
    deployment: "Vercel / AWS EC2 with Automated Nightly Database Dumps"
  },
  fintech: {
    name: "FINTECH ANALYTICS & UTILITIES PLATFORM",
    frontend: "Vanilla ES6+ Reactive DOM / Lightweight React (Micro-Latency Calculators)",
    backend: "Node.js / Python Algorithmic Endpoints (Fast Numerical Computations)",
    database: "Redis Cache + Cloud Storage (Sub-10ms Lookup Times)",
    pdfEngine: "Instant Client-Side SVG & Financial Chart Visualization",
    deployment: "Netlify Edge CDN with Cloudflare DDoS & SSL Shielding"
  },
  mobileapp: {
    name: "CROSS-PLATFORM MOBILE APPLICATION",
    frontend: "React Native + Expo CLI (Single Codebase for Android & iOS)",
    backend: "Node.js REST Services with Webhook Push Pipelines",
    database: "MongoDB Atlas with Offline SQLite Local Sync",
    pdfEngine: "Native Device Share & Document Exporter",
    deployment: "Google Play Store + Apple App Store (OTA Updates via EAS)"
  },
  saas: {
    name: "B2B MULTI-TENANT SAAS PLATFORM",
    frontend: "React.js + Clean Design Tokens (Dark / Light Dynamic Theme)",
    backend: "Node.js Express API Gateway + JWT Stateless Tokens",
    database: "MongoDB Multi-Tenant Partitioning with Indexes",
    pdfEngine: "Automated Monthly Invoice & Audit Exporter",
    deployment: "Docker Containerized on AWS / Render with CI/CD Pipelines"
  }
};

function loadAdvisorSpec(key) {
  const spec = advisorSpecs[key] || advisorSpecs.school;
  const output = document.getElementById('terminalOutput');

  document.querySelectorAll('.terminal-btn').forEach(btn => {
    btn.classList.remove('active');
    if (btn.getAttribute('onclick').includes(`'${key}'`)) {
      btn.classList.add('active');
    }
  });

  output.innerHTML = `
    <div class="spec-line"><span class="spec-key">System Domain:</span> <span class="spec-val">${spec.name}</span></div>
    <div class="spec-line"><span class="spec-key">Frontend Topology:</span> <span class="spec-val">${spec.frontend}</span></div>
    <div class="spec-line"><span class="spec-key">Backend Services:</span> <span class="spec-val">${spec.backend}</span></div>
    <div class="spec-line"><span class="spec-key">Database Schema:</span> <span class="spec-val">${spec.database}</span></div>
    <div class="spec-line"><span class="spec-key">Document / Reports:</span> <span class="spec-val">${spec.pdfEngine}</span></div>
    <div class="spec-line" style="border: none;"><span class="spec-key">Cloud Target:</span> <span class="spec-val">${spec.deployment}</span></div>
  `;
}
loadAdvisorSpec('school');

// 5. DIGITIZATION ROI CALCULATOR LOGIC
const staffRange = document.getElementById('staffRange');
const hoursRange = document.getElementById('hoursRange');
const staffVal = document.getElementById('staffVal');
const hoursVal = document.getElementById('hoursVal');
const hoursSavedMonthly = document.getElementById('hoursSavedMonthly');
const costSavedMonthly = document.getElementById('costSavedMonthly');

function updateROI() {
  const staff = parseInt(staffRange.value);
  const hours = parseInt(hoursRange.value);

  staffVal.textContent = `${staff} Members`;
  hoursVal.textContent = `${hours} Hours/wk`;

  // Saving calculations: 60% of paperwork time is saved via software
  const savedHours = Math.round(staff * hours * 4 * 0.6);
  // Reclaimed cost assuming avg hourly rate of ₹150/hr
  const savedCost = savedHours * 150;

  hoursSavedMonthly.textContent = `${savedHours}+ Hrs`;
  costSavedMonthly.textContent = `₹${savedCost.toLocaleString('en-IN')}*`;
}

if (staffRange && hoursRange) {
  staffRange.addEventListener('input', updateROI);
  hoursRange.addEventListener('input', updateROI);
  updateROI();
}

// 6. Interactive Cost Estimator Calculation
let baseCost = 20000;
let complexityMult = 1.0;
let speedMult = 1.0;
let timelineText = '2-3 Weeks';
let selectedCategory = 'Web App';
let selectedComplexity = 'Standard / MVP';

function setupSelector(groupId, callback) {
  const items = document.querySelectorAll(`#${groupId} .calc-choice`);
  items.forEach(el => {
    el.addEventListener('click', () => {
      items.forEach(btn => btn.classList.remove('active'));
      el.classList.add('active');
      callback(el);
      updateEstimate();
    });
  });
}

setupSelector('platform-group', (el) => {
  baseCost = parseInt(el.getAttribute('data-cost'));
  timelineText = el.getAttribute('data-time');
  selectedCategory = el.textContent.trim();
});

setupSelector('complexity-group', (el) => {
  complexityMult = parseFloat(el.getAttribute('data-mult'));
  selectedComplexity = el.textContent.trim();
});

setupSelector('speed-group', (el) => {
  speedMult = parseFloat(el.getAttribute('data-speed'));
});

function updateEstimate() {
  const total = Math.round(baseCost * complexityMult * speedMult);
  document.getElementById('estimated-cost').textContent = `₹${total.toLocaleString('en-IN')}*`;
  document.getElementById('estimated-timeline').textContent = `Estimated Timeline: ${timelineText}`;
}

function injectEstimateToContact() {
  const total = document.getElementById('estimated-cost').textContent;
  const msgBox = document.getElementById('message');
  msgBox.value = `Hello AVR Tech Labs, I calculated a project estimate of ${total} for a ${selectedCategory} (${selectedComplexity}, ${timelineText}) on your website. I would like to discuss this further.`;
}

function exportEstimateSummary() {
  const total = document.getElementById('estimated-cost').textContent;
  const summary = `AVR Tech Labs Project Estimate:\n- Category: ${selectedCategory}\n- Scope: ${selectedComplexity}\n- Delivery: ${timelineText}\n- Ballpark Investment: ${total}\nOfficial Consultation: contact@avrtechlabs.com`;

  navigator.clipboard.writeText(summary).then(() => {
    const btnText = document.getElementById('copyEstimateBtnText');
    btnText.textContent = 'Copied to Clipboard!';
    setTimeout(() => {
      btnText.textContent = 'Copy Estimate';
    }, 2500);
  });
}

// 7. Interactive Tech Matrix Filter
const filterBtns = document.querySelectorAll('.matrix-filter-btn');
const matrixItems = document.querySelectorAll('.matrix-item');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.getAttribute('data-filter');

    matrixItems.forEach(item => {
      if (filter === 'all' || item.getAttribute('data-category') === filter) {
        item.style.display = 'flex';
        item.style.opacity = '1';
      } else {
        item.style.display = 'none';
        item.style.opacity = '0';
      }
    });
  });
});

// 8. FAQ Accordion Logic
document.querySelectorAll('.faq-item').forEach(item => {
  item.querySelector('.faq-question').addEventListener('click', () => {
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
    if (!isOpen) item.classList.add('open');
  });
});

// 9. Architecture Modal Data
const projectDetails = {
  fincalc: {
    category: "FINTECH & CALCULATOR UTILITIES",
    title: "FinCalc Hub Architecture",
    desc: "A client-side reactive computation suite engineered for rapid financial forecasting and investment comparisons.",
    specs: [
      { key: "Frontend Engine", val: "Vanilla ES6+ JavaScript" },
      { key: "Design System", val: "CSS3 Modular Variables + Flex/Grid" },
      { key: "Deployment", val: "Netlify Continuous Integration" },
      { key: "Latency", val: "< 50ms Real-Time Algorithmic Execution" }
    ]
  },
  erp: {
    category: "INSTITUTIONAL MANAGEMENT PORTAL",
    title: "School & Institute Management Portal",
    desc: "Comprehensive operational system handling student lifecycles, attendance ledgers, and dynamic billing.",
    specs: [
      { key: "Frontend UI", val: "React.js + Tailwind CSS" },
      { key: "Backend Services", val: "Node.js + Express REST Microservices" },
      { key: "Database", val: "MongoDB Atlas Document Store" },
      { key: "Security", val: "JWT Authentication + RBAC Permissions" }
    ]
  },
  studentdb: {
    category: "DATA ENGINES",
    title: "Student Data Engine",
    desc: "High-performance reactive student registry dashboard with instant state filtering and zero-latency search.",
    specs: [
      { key: "UI Framework", val: "React Component Hierarchy" },
      { key: "State Persistence", val: "LocalStorage Local Hydration" },
      { key: "Hosting", val: "GitHub Pages Custom CDN" },
      { key: "Features", val: "Instant Filtering, Status Counters, CSV Ready" }
    ]
  }
};

function openProjectModal(key) {
  const data = projectDetails[key];
  if (!data) return;
  document.getElementById('modal-category').textContent = data.category;
  document.getElementById('modal-title').textContent = data.title;
  document.getElementById('modal-desc').textContent = data.desc;

  const specsList = document.getElementById('modal-specs');
  specsList.innerHTML = data.specs.map(s => `<li><strong>${s.key}</strong> <span>${s.val}</span></li>`).join('');

  document.getElementById('projectModal').classList.add('active');
}

function closeProjectModal() {
  document.getElementById('projectModal').classList.remove('active');
}

function openScheduleModal() {
  document.getElementById('scheduleModal').classList.add('active');
}

function closeScheduleModal() {
  document.getElementById('scheduleModal').classList.remove('active');
}

// 10. Legal & Compliance Modal Data
const legalTexts = {
  privacy: {
    badge: "DATA PROTECTION POLICY",
    title: "Privacy & Data Confidentiality",
    content: "<p>At AVR Tech Labs, client confidentiality and data security are fundamental tenets of our engineering practices. We guarantee:</p><ul style='margin-left: 20px; margin-top: 10px;'><li><strong>Zero Data Selling:</strong> We never harvest, distribute, or monetize client data or end-user information.</li><li><strong>Encrypted Transport:</strong> All data transmitted through applications engineered by AVR Tech Labs operates over TLS 1.3 encryption.</li><li><strong>Sanitized Storage:</strong> Database credentials and environmental variables are securely isolated with strict access controls.</li></ul>"
  },
  terms: {
    badge: "COMMERCIAL AGREEMENT",
    title: "Terms of Engineering Engagement",
    content: "<p>Our project workflows follow disciplined milestone-driven delivery schedules:</p><ul style='margin-left: 20px; margin-top: 10px;'><li><strong>Code Ownership:</strong> All custom code, design tokens, and database schemas become 100% client property upon project completion.</li><li><strong>Milestone Payments:</strong> Transparent staged deliverables (Sprint 1 Prototype, Sprint 2 Core Logic, Sprint 3 Deployment).</li><li><strong>Free Post-Launch Warranty:</strong> 30-day bug resolution and deployment support included with all deliverables.</li></ul>"
  },
  sla: {
    badge: "OPERATIONAL RELIABILITY",
    title: "SLA & 99.9% Uptime Commitment",
    content: "<p>We design software platforms to ensure maximum availability and fault resilience:</p><ul style='margin-left: 20px; margin-top: 10px;'><li><strong>Automated Backups:</strong> Nightly cloud database snapshots and redundancy fallbacks.</li><li><strong>Sub-Second CDN:</strong> Static assets cached globally to maintain low response times across all devices.</li><li><strong>Rapid Incident Response:</strong> Production incidents are acknowledged within 4 hours during active SLA coverage.</li></ul>"
  }
};

function openLegalModal(key) {
  const doc = legalTexts[key] || legalTexts.privacy;
  document.getElementById('legalModalBadge').textContent = doc.badge;
  document.getElementById('legalModalTitle').textContent = doc.title;
  document.getElementById('legalModalContent').innerHTML = doc.content;
  document.getElementById('legalModal').classList.add('active');
}

function closeLegalModal() {
  document.getElementById('legalModal').classList.remove('active');
}

function closeModalOnOverlay(e, modalId) {
  if (e.target.id === modalId) {
    document.getElementById(modalId).classList.remove('active');
  }
}

// 11. Contact Form Simulation
const contactForm = document.getElementById('contact-form');
const formFeedback = document.getElementById('form-feedback');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const submitBtn = contactForm.querySelector('button[type="submit"]');
  submitBtn.disabled = true;
  submitBtn.innerHTML = '<span>Sending...</span> <i class="fa-solid fa-spinner fa-spin"></i>';

  setTimeout(() => {
    submitBtn.disabled = false;
    submitBtn.innerHTML = '<span>Send Inquiry</span> <i class="fa-solid fa-paper-plane"></i>';
    formFeedback.textContent = 'Thank you! Your inquiry has been sent to AVR Tech Labs.';
    formFeedback.className = 'feedback-msg success';
    contactForm.reset();
    setTimeout(() => { formFeedback.textContent = ''; }, 6000);
  }, 1200);
});

// 12. Direct WhatsApp Dispatch Function
function sendViaWhatsApp() {
  const name = document.getElementById('name').value.trim();
  const service = document.getElementById('service').value;
  const message = document.getElementById('message').value.trim();

  if (!name || !message) {
    alert('Please fill in your Name and Project Scope before sending via WhatsApp.');
    return;
  }

  const text = `*New Inquiry for AVR Tech Labs*%0A%0A*Name:* ${encodeURIComponent(name)}%0A*Service:* ${encodeURIComponent(service || 'General Inquiries')}%0A*Message:* ${encodeURIComponent(message)}`;
  const phone = "9030025364";
  window.open(`https://wa.me/${phone}?text=${text}`, '_blank');
}