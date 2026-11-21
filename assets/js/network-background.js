(() => {
  'use strict';

  const canvas = document.getElementById('networkBackground');
  if (!canvas || window.__cyberNetworkBackgroundInitialized) return;
  window.__cyberNetworkBackgroundInitialized = true;

  const ctx = canvas.getContext('2d', { alpha: true });
  if (!ctx) return;

  const TAU = Math.PI * 2;
  const MAX_DPR = 1.5;
  const LINK_DISTANCE = 118;
  const MOUSE_RADIUS = 140;
  const MOUSE_RADIUS_SQ = MOUSE_RADIUS * MOUSE_RADIUS;
  const coarsePointer = window.matchMedia('(pointer: coarse)').matches;
  const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

  const state = window.__cyberNetworkState = {
    width: 0,
    height: 0,
    dpr: 1,
    particleCount: 0,
    lineCount: 0,
    frameCount: 0,
    running: false,
    reducedMotion: reducedMotionQuery.matches,
    mouseStrength: 0,
    boostedParticles: 0,
    highlightedLines: 0,
    maxGlow: 0
  };

  const LINE_COLOR_STEP = 0.011;
  const LINE_COLORS = [];
  for (let i = 0; i < 16; i += 1) {
    LINE_COLORS.push(`rgba(82,217,245,${(0.012 + i * LINE_COLOR_STEP).toFixed(3)})`);
  }

  const RIPPLE_COLORS = [];
  for (let i = 0; i < 8; i += 1) {
    RIPPLE_COLORS.push(`rgba(82,217,245,${(0.006 + i * 0.006).toFixed(3)})`);
  }

  const CORE_COLORS = { cyan: [], blue: [] };
  const HALO_COLORS = { cyan: [], blue: [] };
  for (let i = 0; i < 10; i += 1) {
    const coreAlpha = (0.18 + i * 0.045).toFixed(3);
    const haloAlpha = (0.012 + i * 0.008).toFixed(3);
    CORE_COLORS.cyan.push(`rgba(110,232,250,${coreAlpha})`);
    CORE_COLORS.blue.push(`rgba(74,148,220,${coreAlpha})`);
    HALO_COLORS.cyan.push(`rgba(82,217,245,${haloAlpha})`);
    HALO_COLORS.blue.push(`rgba(52,120,210,${haloAlpha})`);
  }

  const lineBuckets = [];
  for (let i = 0; i < LINE_COLORS.length; i += 1) lineBuckets.push([]);

  let width = 0;
  let height = 0;
  let dpr = 1;
  let particles = [];
  let rafId = 0;
  let lastTime = 0;
  let running = false;
  let resizeQueued = false;
  let pointerListenersActive = false;

  const mouse = {
    x: -9999,
    y: -9999,
    targetX: -9999,
    targetY: -9999,
    strength: 0,
    targetStrength: 0
  };

  function targetParticleCount() {
    const divisor = coarsePointer ? 26000 : 21000;
    return Math.max(14, Math.min(72, Math.round((width * height) / divisor)));
  }

  function createParticle() {
    return {
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.34,
      vy: (Math.random() - 0.5) * 0.34,
      radius: 0.7 + Math.random() * 1.1,
      tint: Math.random() < 0.65 ? 'cyan' : 'blue',
      phase: Math.random() * TAU,
      glow: 0
    };
  }

  function syncState() {
    state.width = width;
    state.height = height;
    state.dpr = dpr;
    state.particleCount = particles.length;
    state.running = running;
    state.reducedMotion = reducedMotionQuery.matches;
    state.mouseStrength = mouse.strength;
    canvas.dataset.particles = String(particles.length);
    canvas.dataset.motion = reducedMotionQuery.matches ? 'static' : 'animated';
    canvas.dataset.running = running ? 'true' : 'false';
  }

  function resize() {
    const nextWidth = window.innerWidth;
    const nextHeight = window.innerHeight;
    const nextDpr = Math.min(window.devicePixelRatio || 1, MAX_DPR);
    if (nextWidth === width && nextHeight === height && nextDpr === dpr) return;

    const oldWidth = width || nextWidth;
    const oldHeight = height || nextHeight;
    width = nextWidth;
    height = nextHeight;
    dpr = nextDpr;

    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const count = targetParticleCount();
    if (particles.length !== count) {
      particles = [];
      for (let i = 0; i < count; i += 1) particles.push(createParticle());
    } else {
      const scaleX = width / oldWidth;
      const scaleY = height / oldHeight;
      for (let i = 0; i < particles.length; i += 1) {
        particles[i].x *= scaleX;
        particles[i].y *= scaleY;
      }
    }

    syncState();
    if (!running) draw();
  }

  function queueResize() {
    if (resizeQueued) return;
    resizeQueued = true;
    requestAnimationFrame(() => {
      resizeQueued = false;
      resize();
    });
  }

  function update(now, step) {
    mouse.x += (mouse.targetX - mouse.x) * 0.14;
    mouse.y += (mouse.targetY - mouse.y) * 0.14;
    mouse.strength += (mouse.targetStrength - mouse.strength) * 0.06;

    const hasMouse = mouse.strength > 0.001 && mouse.x > -1000;
    const mx = mouse.x;
    const my = mouse.y;
    const strength = mouse.strength;
    let boostedParticles = 0;
    let maxGlow = 0;

    for (let i = 0; i < particles.length; i += 1) {
      const p = particles[i];
      const wobbleX = Math.sin(now * 0.00032 + p.phase) * 0.012;
      const wobbleY = Math.cos(now * 0.00028 + p.phase) * 0.012;
      p.x += (p.vx + wobbleX) * step;
      p.y += (p.vy + wobbleY) * step;

      let glowTarget = 0;
      if (hasMouse) {
        const dx = p.x - mx;
        const dy = p.y - my;
        const distSq = dx * dx + dy * dy;
        if (distSq < MOUSE_RADIUS_SQ && distSq > 0.01) {
          const dist = Math.sqrt(distSq);
          const falloff = 1 - dist / MOUSE_RADIUS;
          const force = falloff * falloff * 0.16 * strength * step;
          p.x += (dx / dist) * force;
          p.y += (dy / dist) * force;
          glowTarget = falloff * strength;
        }
      }
      p.glow += (glowTarget - p.glow) * 0.08;
      if (glowTarget > 0.01) boostedParticles += 1;
      if (p.glow > maxGlow) maxGlow = p.glow;

      if (p.x < -8) p.x = width + 8;
      else if (p.x > width + 8) p.x = -8;
      if (p.y < -8) p.y = height + 8;
      else if (p.y > height + 8) p.y = -8;
    }

    state.boostedParticles = boostedParticles;
    state.maxGlow = maxGlow;
  }

  function draw() {
    ctx.clearRect(0, 0, width, height);

    const linkDistance = width < 600 ? 96 : LINK_DISTANCE;
    const linkDistanceSq = linkDistance * linkDistance;
    let lineCount = 0;
    let highlightedLines = 0;

    for (let b = 0; b < lineBuckets.length; b += 1) lineBuckets[b].length = 0;

    for (let i = 0; i < particles.length; i += 1) {
      const p = particles[i];
      for (let j = i + 1; j < particles.length; j += 1) {
        const q = particles[j];
        const dx = p.x - q.x;
        const dy = p.y - q.y;
        const distSq = dx * dx + dy * dy;
        if (distSq >= linkDistanceSq) continue;

        const dist = Math.sqrt(distSq);
        let alpha = (1 - dist / linkDistance) * 0.16;

        if (mouse.strength > 0.01) {
          const mdx = (p.x + q.x) * 0.5 - mouse.x;
          const mdy = (p.y + q.y) * 0.5 - mouse.y;
          const mouseDistSq = mdx * mdx + mdy * mdy;
          if (mouseDistSq < MOUSE_RADIUS_SQ) {
            alpha += (1 - Math.sqrt(mouseDistSq) / MOUSE_RADIUS) * 0.12 * mouse.strength;
            highlightedLines += 1;
          }
        }

        let bucketIndex = Math.round((alpha - 0.012) / LINE_COLOR_STEP);
        if (bucketIndex < 0) bucketIndex = 0;
        else if (bucketIndex >= lineBuckets.length) bucketIndex = lineBuckets.length - 1;
        const bucket = lineBuckets[bucketIndex];
        bucket.push(p, q);
        lineCount += 1;
      }
    }

    ctx.lineWidth = 1;
    for (let b = 0; b < lineBuckets.length; b += 1) {
      const bucket = lineBuckets[b];
      if (!bucket.length) continue;
      ctx.strokeStyle = LINE_COLORS[b];
      ctx.beginPath();
      for (let k = 0; k < bucket.length; k += 2) {
        ctx.moveTo(bucket[k].x, bucket[k].y);
        ctx.lineTo(bucket[k + 1].x, bucket[k + 1].y);
      }
      ctx.stroke();
      bucket.length = 0;
    }

    for (let i = 0; i < particles.length; i += 1) {
      const p = particles[i];
      let level = 2 + Math.round(p.glow * 7);
      if (level < 0) level = 0;
      else if (level > 9) level = 9;

      const haloRadius = p.radius * 2.6;
      ctx.fillStyle = HALO_COLORS[p.tint][level];
      ctx.beginPath();
      ctx.moveTo(p.x + haloRadius, p.y);
      ctx.arc(p.x, p.y, haloRadius, 0, TAU);
      ctx.fill();

      ctx.fillStyle = CORE_COLORS[p.tint][level];
      ctx.beginPath();
      ctx.moveTo(p.x + p.radius, p.y);
      ctx.arc(p.x, p.y, p.radius, 0, TAU);
      ctx.fill();
    }

    if (mouse.strength > 0.02) {
      const rippleRadius = 22 + Math.sin(performance.now() * 0.0018) * 4;
      let rippleIndex = Math.round(mouse.strength * 7);
      if (rippleIndex < 0) rippleIndex = 0;
      else if (rippleIndex > 7) rippleIndex = 7;
      ctx.strokeStyle = RIPPLE_COLORS[rippleIndex];
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(mouse.x, mouse.y, rippleRadius, 0, TAU);
      ctx.stroke();
    }

    state.lineCount = lineCount;
    state.highlightedLines = highlightedLines;
  }

  function frame(now) {
    if (!running) return;
    const delta = lastTime ? Math.min(now - lastTime, 50) : 16.67;
    lastTime = now;
    const step = Math.max(0.25, Math.min(delta / 16.67, 2.5));
    update(now, step);
    draw();
    state.frameCount += 1;
    state.mouseStrength = mouse.strength;
    rafId = requestAnimationFrame(frame);
  }

  function onPointerMove(event) {
    if (event.pointerType && event.pointerType !== 'mouse') return;
    const x = event.clientX;
    const y = event.clientY;
    if (mouse.targetStrength === 0) {
      mouse.x = x;
      mouse.y = y;
    }
    mouse.targetX = x;
    mouse.targetY = y;
    mouse.targetStrength = 1;
  }

  function onPointerOut(event) {
    if (!event.relatedTarget) mouse.targetStrength = 0;
  }

  function onBlur() {
    mouse.targetStrength = 0;
  }

  function addPointerListeners() {
    if (pointerListenersActive) return;
    if ('PointerEvent' in window) {
      window.addEventListener('pointermove', onPointerMove, { passive: true });
      document.addEventListener('pointerout', onPointerOut, { passive: true });
    } else {
      window.addEventListener('mousemove', onPointerMove, { passive: true });
      document.addEventListener('mouseout', onPointerOut, { passive: true });
    }
    window.addEventListener('blur', onBlur);
    pointerListenersActive = true;
  }

  function removePointerListeners() {
    if (!pointerListenersActive) return;
    if ('PointerEvent' in window) {
      window.removeEventListener('pointermove', onPointerMove);
      document.removeEventListener('pointerout', onPointerOut);
    } else {
      window.removeEventListener('mousemove', onPointerMove);
      document.removeEventListener('mouseout', onPointerOut);
    }
    window.removeEventListener('blur', onBlur);
    pointerListenersActive = false;
  }

  function start() {
    if (running || reducedMotionQuery.matches || document.hidden) return;
    running = true;
    lastTime = 0;
    addPointerListeners();
    syncState();
    rafId = requestAnimationFrame(frame);
  }

  function stop() {
    if (rafId) cancelAnimationFrame(rafId);
    rafId = 0;
    running = false;
    mouse.targetStrength = 0;
    removePointerListeners();
    syncState();
  }

  function applyMotionPreference() {
    if (reducedMotionQuery.matches) {
      stop();
      mouse.strength = 0;
      for (let i = 0; i < particles.length; i += 1) particles[i].glow = 0;
      state.boostedParticles = 0;
      state.highlightedLines = 0;
      state.maxGlow = 0;
      draw();
      syncState();
    } else {
      start();
    }
  }

  function onVisibilityChange() {
    if (document.hidden) {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = 0;
      running = false;
      syncState();
    } else {
      start();
    }
  }

  resize();
  window.addEventListener('resize', queueResize, { passive: true });
  window.addEventListener('orientationchange', queueResize, { passive: true });
  document.addEventListener('visibilitychange', onVisibilityChange);
  if (reducedMotionQuery.addEventListener) {
    reducedMotionQuery.addEventListener('change', applyMotionPreference);
  } else if (reducedMotionQuery.addListener) {
    reducedMotionQuery.addListener(applyMotionPreference);
  }
  applyMotionPreference();
})();
