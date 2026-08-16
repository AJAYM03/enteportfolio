const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const finePointer = window.matchMedia('(pointer:fine)').matches;
const root = document.documentElement;
root.classList.add('js');
if (finePointer) root.classList.add('has-fine-pointer');

const bootScreen = document.querySelector('.boot-screen');
if (bootScreen) {
  const finishBoot = () => {
    root.classList.add('is-ready');
    bootScreen.addEventListener('transitionend', () => bootScreen.remove(), { once: true });
  };
  if (reduceMotion) finishBoot();
  else window.setTimeout(finishBoot, 2850);
}

const clamp = (value, min = 0, max = 1) => Math.min(max, Math.max(min, value));
const reveals = [...document.querySelectorAll('.reveal')];
const sections = [...document.querySelectorAll('main section[id]')];
const navLinks = [...document.querySelectorAll('.brand nav a[href^="#"]')];
const pageLinks = [...document.querySelectorAll('.page-index a[href^="#"]')];
const progress = document.querySelector('.scroll-progress');
const backToTop = document.querySelector('.back-to-top');
let scrollFrame = 0;

const updateScrollState = () => {
  scrollFrame = 0;
  const viewport = window.innerHeight || document.documentElement.clientHeight;
  const readingLine = window.innerWidth <= 760 ? 116 : 92;
  reveals.forEach((element) => {
    if (reduceMotion) {
      element.style.setProperty('--p', '1');
      return;
    }
    const rect = element.getBoundingClientRect();
    const p = clamp((viewport * .9 - rect.top) / (viewport * .35));
    element.style.setProperty('--p', p.toFixed(3));
  });

  document.querySelectorAll('.experience-timeline').forEach((timeline) => {
    if (reduceMotion) {
      timeline.style.setProperty('--timeline-progress', '1');
      return;
    }
    const rect = timeline.getBoundingClientRect();
    const progress = clamp((viewport * .78 - rect.top) / (rect.height + viewport * .28));
    timeline.style.setProperty('--timeline-progress', progress.toFixed(3));
  });

  let current = sections[0];
  sections.forEach((section) => {
    if (section.getBoundingClientRect().top - readingLine <= 0) current = section;
  });
  const currentId = current?.id;
  [...navLinks, ...pageLinks].forEach((link) => {
    const active = link.getAttribute('href') === `#${currentId}`;
    link.classList.toggle('is-active', active);
    link.classList.toggle('is-current', active);
    if (active) link.setAttribute('aria-current', 'true');
    else link.removeAttribute('aria-current');
  });
  const currentIndex = sections.findIndex((section) => section.id === currentId);
  pageLinks.forEach((link, index) => link.classList.toggle('is-read', index < currentIndex));
  if (progress) {
    const documentHeight = Math.max(document.documentElement.scrollHeight - viewport, 1);
    progress.style.height = `${clamp(window.scrollY / documentHeight) * 100}%`;
  }
  if (backToTop) backToTop.classList.toggle('is-visible', window.scrollY > viewport * .7);

  document.querySelectorAll('.artifact-architecture').forEach((artifact) => {
    if (reduceMotion) return;
    const rect = artifact.getBoundingClientRect();
    const p = clamp((viewport - rect.top) / (viewport + rect.height));
    const nodes = [...artifact.querySelectorAll('.artifact-node')];
    nodes.forEach((node, index) => {
      const stage = clamp((p * (nodes.length + 2) - index) * 1.8, .2, 1);
      node.style.opacity = stage.toFixed(2);
    });
  });
};

const drawTimelineCurve = () => {
  const timeline = document.querySelector('.experience-timeline');
  const curveSvg = timeline?.querySelector('.timeline-curve');
  if (!timeline || !curveSvg) return;

  const markers = [...timeline.querySelectorAll('.event-logo')];
  if (markers.length === 0) return;

  const timelineRect = timeline.getBoundingClientRect();
  
  const points = markers.map(marker => {
    const rect = marker.getBoundingClientRect();
    return {
      x: rect.left - timelineRect.left + rect.width / 2,
      y: rect.top - timelineRect.top + rect.height / 2
    };
  });

  const allPoints = [
    { x: points[0].x, y: 0 },
    ...points,
    { x: points[points.length - 1].x, y: timelineRect.height }
  ];

  const A = 35;
  let d = `M ${allPoints[0].x} ${allPoints[0].y}`;

  for (let i = 1; i < allPoints.length; i++) {
    const prev = allPoints[i - 1];
    const curr = allPoints[i];
    const H = curr.y - prev.y;
    const waveOffset = (i % 2 === 1) ? A : -A;
    
    const cp1x = prev.x + waveOffset;
    const cp1y = prev.y + H / 3;
    
    const cp2x = curr.x + waveOffset;
    const cp2y = curr.y - H / 3;
    
    d += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${curr.x} ${curr.y}`;
  }

  const pathBg = curveSvg.querySelector('.timeline-path-bg');
  const pathFg = curveSvg.querySelector('.timeline-path');
  
  if (pathBg) pathBg.setAttribute('d', d);
  if (pathFg) {
    pathFg.setAttribute('d', d);
    const length = pathFg.getTotalLength();
    timeline.style.setProperty('--path-length', length);
  }
};

const requestScrollUpdate = () => {
  if (!scrollFrame) scrollFrame = window.requestAnimationFrame(updateScrollState);
};
window.addEventListener('scroll', requestScrollUpdate, { passive: true });
window.addEventListener('resize', () => {
  drawTimelineCurve();
  requestScrollUpdate();
}, { passive: true });
drawTimelineCurve();
updateScrollState();

const cursorLabel = document.querySelector('.cursor-label');
const moveCursorLabel = (event) => {
  if (!cursorLabel) return;
  cursorLabel.style.left = `${event.clientX}px`;
  cursorLabel.style.top = `${event.clientY}px`;
};
document.querySelectorAll('[data-cursor]').forEach((element) => {
  element.addEventListener('pointerenter', (event) => {
    if (!finePointer || !cursorLabel) return;
    cursorLabel.textContent = element.dataset.cursor;
    cursorLabel.classList.add('is-visible');
    moveCursorLabel(event);
  });
  element.addEventListener('pointermove', moveCursorLabel, { passive: true });
  element.addEventListener('pointerleave', () => cursorLabel?.classList.remove('is-visible'));
});

const explainArtifact = (node) => {
  const artifact = node.closest('.artifact');
  if (!artifact) return;
  artifact.dataset.defaultDetail ||= artifact.querySelector('.artifact-explain')?.textContent || '';
  artifact.classList.add('has-active');
  if (artifact.classList.contains('artifact-dns')) artifact.classList.add('is-inspected');
  artifact.querySelectorAll('.artifact-interactive').forEach((candidate) => {
    candidate.classList.toggle('is-active', candidate === node);
    candidate.classList.toggle('is-muted', candidate !== node);
  });
  const explanation = artifact.querySelector('.artifact-explain');
  if (explanation && node.dataset.detail) explanation.textContent = node.dataset.detail;
};
const resetArtifact = (artifact) => {
  if (!artifact || artifact.contains(document.activeElement)) return;
  artifact.classList.remove('has-active', 'is-inspected');
  artifact.querySelectorAll('.artifact-interactive').forEach((node) => node.classList.remove('is-active', 'is-muted'));
  const explanation = artifact.querySelector('.artifact-explain');
  if (explanation && artifact.dataset.defaultDetail) explanation.textContent = artifact.dataset.defaultDetail;
};
document.querySelectorAll('.artifact-interactive').forEach((node) => {
  node.addEventListener('pointerenter', () => explainArtifact(node));
  node.addEventListener('focus', () => explainArtifact(node));
  node.addEventListener('click', () => explainArtifact(node));
  node.addEventListener('pointerleave', () => resetArtifact(node.closest('.artifact')));
  node.addEventListener('focusout', () => window.setTimeout(() => resetArtifact(node.closest('.artifact')), 0));
  if (node.getAttribute('role') === 'button' && node.tagName.toLowerCase() !== 'button') {
    node.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        explainArtifact(node);
      }
    });
  }
});

const hero = document.querySelector('.hero');
if (hero && finePointer && !reduceMotion) {
  hero.addEventListener('pointermove', (event) => {
    const rect = hero.getBoundingClientRect();
    hero.style.setProperty('--mx', `${((event.clientX - rect.left) / rect.width) * 100}%`);
    hero.style.setProperty('--my', `${((event.clientY - rect.top) / rect.height) * 100}%`);
  }, { passive: true });
}

const photo = document.querySelector('.photo-frame');
if (photo && finePointer && !reduceMotion) {
  photo.addEventListener('pointermove', (event) => {
    const rect = photo.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - .5;
    const y = (event.clientY - rect.top) / rect.height - .5;
    photo.style.transform = `rotate(1deg) perspective(500px) rotateX(${y * -3}deg) rotateY(${x * 4}deg)`;
  }, { passive: true });
  photo.addEventListener('pointerleave', () => { photo.style.transform = ''; });
}

const currentRole = document.querySelector('.experience-event.is-current .event-card');
if (currentRole && finePointer && !reduceMotion) {
  currentRole.addEventListener('pointermove', (event) => {
    const rect = currentRole.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - .5;
    const y = (event.clientY - rect.top) / rect.height - .5;
    currentRole.style.transform = `translate(${x * 2}px, ${y * 2}px) rotate(${x * .35}deg)`;
  }, { passive: true });
  currentRole.addEventListener('pointerleave', () => { currentRole.style.transform = ''; });
}

const canvas = document.querySelector('.scribble-canvas');
if (canvas && finePointer && !reduceMotion && canvas.getContext) {
  const context = canvas.getContext('2d');
  const segments = [];
  let drawing = false;
  let last = null;
  let frame = 0;
  const resizeCanvas = () => {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(window.innerWidth * dpr);
    canvas.height = Math.round(window.innerHeight * dpr);
    context.setTransform(dpr, 0, 0, dpr, 0, 0);
  };
  const draw = () => {
    frame = 0;
    const now = performance.now();
    while (segments.length && now - segments[0].time > 1500) segments.shift();
    context.clearRect(0, 0, window.innerWidth, window.innerHeight);
    context.lineWidth = 1.8;
    context.lineCap = 'round';
    segments.forEach((segment) => {
      context.globalAlpha = Math.max(0, 1 - (now - segment.time) / 1500) * .68;
      context.strokeStyle = '#246A66';
      context.beginPath(); context.moveTo(segment.x1, segment.y1); context.lineTo(segment.x2, segment.y2); context.stroke();
    });
    context.globalAlpha = 1;
    if (segments.length) frame = requestAnimationFrame(draw);
  };
  const wake = () => { if (!frame) frame = requestAnimationFrame(draw); };
  const ignored = (target) => target instanceof Element && target.closest('a, button, input, textarea, select, [contenteditable="true"]');
  document.addEventListener('pointerdown', (event) => {
    if (event.button !== 0 || ignored(event.target)) return;
    drawing = true; last = { x: event.clientX, y: event.clientY }; document.body.classList.add('is-scribbling'); event.preventDefault();
  }, { passive: false });
  document.addEventListener('pointermove', (event) => {
    if (!drawing) return;
    const point = { x: event.clientX, y: event.clientY };
    if (last) segments.push({ x1: last.x, y1: last.y, x2: point.x, y2: point.y, time: performance.now() });
    if (segments.length > 280) segments.splice(0, segments.length - 280);
    last = point; wake();
  }, { passive: true });
  const stop = () => { drawing = false; last = null; document.body.classList.remove('is-scribbling'); };
  document.addEventListener('pointerup', stop, { passive: true });
  document.addEventListener('pointercancel', stop, { passive: true });
  window.addEventListener('blur', stop, { passive: true });
  window.addEventListener('resize', resizeCanvas, { passive: true });
  resizeCanvas();
}

const initNowClock = () => {
  const timeEl = document.getElementById('now-time');
  const dayEl = document.getElementById('now-day');
  if (!timeEl && !dayEl) return;

  const tick = () => {
    const now = new Date();
    if (timeEl) {
      const hh = String(now.getHours()).padStart(2, '0');
      const mm = String(now.getMinutes()).padStart(2, '0');
      const ss = String(now.getSeconds()).padStart(2, '0');
      timeEl.textContent = `${hh}:${mm}:${ss}`;
    }
  };

  tick();
  // Only animate if motion is allowed; otherwise show static time
  if (!reduceMotion) setInterval(tick, 1000);
};

initNowClock();

