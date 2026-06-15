import * as THREE from "three";

const gsap = window.gsap;
const ScrollTrigger = window.ScrollTrigger;
gsap.registerPlugin(ScrollTrigger);

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const isTouch = window.matchMedia("(hover: none)").matches;

/* =========================================================
   1. THREE.JS HERO — distorted, fresnel-lit object
   ========================================================= */
function initThree() {
  const canvas = document.getElementById("gl");
  if (!canvas) return;

  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  } catch (e) {
    canvas.style.display = "none";
    return;
  }
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
  camera.position.z = 4.2;

  const geo = new THREE.IcosahedronGeometry(1.35, 64);

  const uniforms = {
    uTime: { value: 0 },
    uAmp: { value: 0.42 },
    uScroll: { value: 0 },
    uMouse: { value: new THREE.Vector2(0, 0) },
    uColorA: { value: new THREE.Color("#ff5436") },
    uColorB: { value: new THREE.Color("#6b5cff") },
    uColorC: { value: new THREE.Color("#efe9df") },
  };

  const noiseGLSL = `
    vec3 mod289(vec3 x){return x-floor(x*(1.0/289.0))*289.0;}
    vec4 mod289(vec4 x){return x-floor(x*(1.0/289.0))*289.0;}
    vec4 permute(vec4 x){return mod289(((x*34.0)+1.0)*x);}
    vec4 taylorInvSqrt(vec4 r){return 1.79284291400159-0.85373472095314*r;}
    float snoise(vec3 v){
      const vec2 C=vec2(1.0/6.0,1.0/3.0);const vec4 D=vec4(0.0,0.5,1.0,2.0);
      vec3 i=floor(v+dot(v,C.yyy));vec3 x0=v-i+dot(i,C.xxx);
      vec3 g=step(x0.yzx,x0.xyz);vec3 l=1.0-g;vec3 i1=min(g.xyz,l.zxy);vec3 i2=max(g.xyz,l.zxy);
      vec3 x1=x0-i1+C.xxx;vec3 x2=x0-i2+C.yyy;vec3 x3=x0-D.yyy;
      i=mod289(i);
      vec4 p=permute(permute(permute(i.z+vec4(0.0,i1.z,i2.z,1.0))+i.y+vec4(0.0,i1.y,i2.y,1.0))+i.x+vec4(0.0,i1.x,i2.x,1.0));
      float n_=0.142857142857;vec3 ns=n_*D.wyz-D.xzx;
      vec4 j=p-49.0*floor(p*ns.z*ns.z);
      vec4 x_=floor(j*ns.z);vec4 y_=floor(j-7.0*x_);
      vec4 x=x_*ns.x+ns.yyyy;vec4 y=y_*ns.x+ns.yyyy;vec4 h=1.0-abs(x)-abs(y);
      vec4 b0=vec4(x.xy,y.xy);vec4 b1=vec4(x.zw,y.zw);
      vec4 s0=floor(b0)*2.0+1.0;vec4 s1=floor(b1)*2.0+1.0;vec4 sh=-step(h,vec4(0.0));
      vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy;vec4 a1=b1.xzyw+s1.xzyw*sh.zzww;
      vec3 p0=vec3(a0.xy,h.x);vec3 p1=vec3(a0.zw,h.y);vec3 p2=vec3(a1.xy,h.z);vec3 p3=vec3(a1.zw,h.w);
      vec4 norm=taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));
      p0*=norm.x;p1*=norm.y;p2*=norm.z;p3*=norm.w;
      vec4 m=max(0.6-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.0);m=m*m;
      return 42.0*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));
    }`;

  const mat = new THREE.ShaderMaterial({
    uniforms,
    transparent: true,
    vertexShader: `
      uniform float uTime;uniform float uAmp;uniform float uScroll;uniform vec2 uMouse;
      varying float vDisp;varying vec3 vNormal;varying vec3 vView;
      ${noiseGLSL}
      void main(){
        vec3 pos=position;
        float t=uTime*0.32;
        float n=snoise(pos*1.1+vec3(t,t*0.7,-t*0.5));
        float n2=snoise(pos*2.4+vec3(-t*0.6,t,t*0.4))*0.5;
        float disp=(n+n2)*uAmp*(1.0+uScroll*0.8);
        float mouseField=(uMouse.x*normal.x+uMouse.y*normal.y)*0.25;
        pos+=normal*(disp+mouseField);
        vDisp=disp;vNormal=normalize(normalMatrix*normal);
        vec4 mv=modelViewMatrix*vec4(pos,1.0);
        vView=normalize(-mv.xyz);
        gl_Position=projectionMatrix*mv;
      }`,
    fragmentShader: `
      uniform vec3 uColorA;uniform vec3 uColorB;uniform vec3 uColorC;
      varying float vDisp;varying vec3 vNormal;varying vec3 vView;
      void main(){
        float fres=pow(1.0-max(dot(vNormal,vView),0.0),2.4);
        vec3 base=mix(uColorB,uColorA,smoothstep(-0.3,0.5,vDisp));
        vec3 col=mix(base,uColorC,fres*0.9);
        col+=fres*0.25;
        float alpha=0.30+fres*0.85;
        gl_FragColor=vec4(col,alpha);
      }`,
  });

  const mesh = new THREE.Mesh(geo, mat);
  scene.add(mesh);

  // faint wireframe shell
  const wireMat = new THREE.MeshBasicMaterial({ color: 0xefe9df, wireframe: true, transparent: true, opacity: 0.05 });
  const wire = new THREE.Mesh(geo, wireMat);
  wire.scale.setScalar(1.04);
  scene.add(wire);

  const hero = document.getElementById("hero");
  function resize() {
    const r = hero.getBoundingClientRect();
    renderer.setSize(r.width, r.height, false);
    camera.aspect = r.width / r.height;
    // push object to the right on wide screens, center on mobile
    mesh.position.x = wire.position.x = r.width > 900 ? 1.25 : 0;
    mesh.position.y = wire.position.y = r.width > 900 ? 0.35 : -0.2;
    const s = r.width > 900 ? 1 : 0.7;
    mesh.scale.setScalar(s); wire.scale.setScalar(s * 1.04);
    camera.updateProjectionMatrix();
  }
  resize();
  window.addEventListener("resize", resize);

  const mouse = { x: 0, y: 0, tx: 0, ty: 0 };
  if (!isTouch) {
    window.addEventListener("pointermove", (e) => {
      mouse.tx = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.ty = -((e.clientY / window.innerHeight) * 2 - 1);
    });
  }

  // scroll influence
  ScrollTrigger.create({
    trigger: hero,
    start: "top top",
    end: "bottom top",
    onUpdate: (self) => { uniforms.uScroll.value = self.progress; },
  });

  const clock = new THREE.Clock();
  let visible = true;
  document.addEventListener("visibilitychange", () => { visible = !document.hidden; });

  function tick() {
    requestAnimationFrame(tick);
    if (!visible) return;
    const dt = clock.getDelta();
    uniforms.uTime.value += dt;
    mouse.x += (mouse.tx - mouse.x) * 0.05;
    mouse.y += (mouse.ty - mouse.y) * 0.05;
    uniforms.uMouse.value.set(mouse.x, mouse.y);
    mesh.rotation.y += dt * 0.12 + Math.abs(mouse.x) * dt * 0.4;
    mesh.rotation.x = mouse.y * 0.25;
    mesh.rotation.z += dt * 0.02;
    wire.rotation.copy(mesh.rotation);
    mesh.position.y = (hero.getBoundingClientRect().width > 900 ? 0.35 : -0.2) + Math.sin(uniforms.uTime.value * 0.6) * 0.05;
    wire.position.y = mesh.position.y;
    renderer.render(scene, camera);
  }
  tick();
}

/* =========================================================
   2. PRELOADER
   ========================================================= */
function initPreloader(onDone) {
  const pre = document.getElementById("preloader");
  const countEl = document.getElementById("preCount");
  const bar = document.getElementById("preBar");
  const words = pre.querySelectorAll("[data-pre]");
  document.body.classList.add("loading");

  // onDone must run exactly once, whichever path triggers it.
  let doneCalled = false;
  const runDone = () => { if (doneCalled) return; doneCalled = true; onDone(); };

  // Guarantee the page becomes usable even if the animation loop is
  // throttled (e.g. background tab) or GSAP fails to tick.
  const finish = () => {
    document.body.classList.remove("loading");
    pre.style.transition = "transform .6s cubic-bezier(.7,0,.3,1), opacity .4s";
    pre.style.transform = "translateY(-100%)";
    setTimeout(() => { pre.style.display = "none"; }, 650);
    runDone();
  };
  // hard fallback timer (independent of requestAnimationFrame)
  const fallback = setTimeout(finish, 3800);

  if (reduceMotion) {
    clearTimeout(fallback);
    pre.style.display = "none";
    document.body.classList.remove("loading");
    runDone();
    return;
  }

  const state = { v: 0 };
  const tl = gsap.timeline({
    onComplete: () => { clearTimeout(fallback); },
  });

  // cycle the three words
  gsap.set(words, { yPercent: 120 });
  words.forEach((w, i) => {
    tl.to(w, { yPercent: 0, duration: 0.4, ease: "power3.out" }, i * 0.5)
      .to(w, { yPercent: -120, duration: 0.4, ease: "power3.in" }, i * 0.5 + 0.45);
  });

  tl.to(state, {
    v: 100, duration: 1.8, ease: "power2.inOut",
    onUpdate: () => {
      const val = Math.round(state.v);
      countEl.textContent = val;
      bar.style.width = val + "%";
    },
  }, 0);

  tl.to(pre, {
    yPercent: -100, duration: 0.9, ease: "expo.inOut",
    onStart: () => { clearTimeout(fallback); document.body.classList.remove("loading"); },
  }, "+=0.15");
  tl.add(runDone, "-=0.5");
}

/* =========================================================
   3. SPLIT TEXT helpers
   ========================================================= */
// Word-level split that preserves <em> accents and never breaks mid-word.
function splitWords(el) {
  el.setAttribute("aria-label", el.textContent.replace(/\s+/g, " ").trim());
  const nodes = [...el.childNodes];
  el.innerHTML = "";
  const words = [];
  const makeWord = (text, isEm) => {
    const w = document.createElement("span");
    w.className = "word-anim";
    w.setAttribute("aria-hidden", "true");
    if (isEm) {
      const e = document.createElement("em");
      e.textContent = text;
      w.appendChild(e);
    } else {
      w.textContent = text;
    }
    return w;
  };
  nodes.forEach((node) => {
    if (node.nodeType === 1 && node.tagName === "BR") {
      el.appendChild(document.createElement("br"));
      return;
    }
    // preserve any other element (links, nested blocks) untouched
    if (node.nodeType === 1 && node.tagName !== "EM") {
      el.appendChild(node.cloneNode(true));
      return;
    }
    const isEm = node.nodeType === 1 && node.tagName === "EM";
    const parts = node.textContent.split(/(\s+)/);
    parts.forEach((p) => {
      if (p === "") return;
      if (/^\s+$/.test(p)) { el.appendChild(document.createTextNode(" ")); return; }
      const w = makeWord(p, isEm);
      el.appendChild(w);
      words.push(w);
    });
  });
  return words;
}

/* removed: legacy char-splitter
function __deadSplit(el) {
  const text = el.textContent;
  el.textContent = "";
  el.setAttribute("aria-label", text);
  const frag = document.createDocumentFragment();
  [...text].forEach((ch) => {
    const span = document.createElement("span");
    span.className = "char";
    span.setAttribute("aria-hidden", "true");
    span.style.display = "inline-block";
    span.textContent = ch === " " ? " " : ch;
    frag.appendChild(span);
  });
  el.appendChild(frag);
  return el.querySelectorAll(".char");
}
*/

/* =========================================================
   4. HERO INTRO
   ========================================================= */
function heroIntro() {
  const words = document.querySelectorAll(".hero__title .word");
  const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
  gsap.set(words, { yPercent: 110 });
  tl.fromTo(".hero__eyebrow span", { yPercent: 110 }, { yPercent: 0, duration: 0.9 }, 0)
    .to(words, { yPercent: 0, duration: 1.2, stagger: 0.07 }, 0.15)
    .fromTo(".hero .reveal-fade", { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 1, stagger: 0.12 }, 0.55);
}

/* =========================================================
   5. SCROLL REVEALS
   ========================================================= */
function scrollReveals() {
  // generic fade
  gsap.utils.toArray(".reveal-fade").forEach((el) => {
    if (el.closest(".hero")) return;
    gsap.fromTo(el, { opacity: 0, y: 30 }, {
      opacity: 1, y: 0, duration: 1, ease: "power3.out",
      scrollTrigger: { trigger: el, start: "top 88%" },
    });
  });

  // cards
  gsap.utils.toArray(".reveal-card").forEach((el) => {
    gsap.fromTo(el, { opacity: 0, y: 40 }, {
      opacity: 1, y: 0, duration: 1.1, ease: "power3.out",
      scrollTrigger: { trigger: el, start: "top 90%" },
    });
  });

  // staggered headings (split into words via existing markup or chars)
  gsap.utils.toArray(".reveal-stagger").forEach((el) => {
    const words = splitWords(el);
    gsap.fromTo(words, { opacity: 0, yPercent: 100 }, {
      opacity: 1, yPercent: 0, duration: 0.9, ease: "power4.out", stagger: 0.04,
      scrollTrigger: { trigger: el, start: "top 85%" },
    });
  });

  // agent rows slide in
  gsap.utils.toArray(".agent").forEach((el, i) => {
    gsap.fromTo(el, { opacity: 0, x: -30 }, {
      opacity: 1, x: 0, duration: 0.9, ease: "power3.out",
      scrollTrigger: { trigger: el, start: "top 92%" },
    });
  });
}

/* =========================================================
   6. MARQUEE
   ========================================================= */
function marquee() {
  const track = document.getElementById("marquee");
  if (!track) return;
  const half = track.scrollWidth / 2;
  gsap.to(track, { x: -half, duration: 28, ease: "none", repeat: -1 });
}

/* =========================================================
   7. WORKFLOW pinned cycle
   ========================================================= */
function workflowCycle() {
  const section = document.getElementById("workflow");
  const phases = gsap.utils.toArray(".phase");
  const bar = document.getElementById("wfBar");
  if (!phases.length) return;
  if (window.innerWidth <= 880) { phases.forEach(p => p.classList.add("is-active")); return; }

  const setActive = (idx) => phases.forEach((p, i) => p.classList.toggle("is-active", i === idx));
  setActive(0);

  ScrollTrigger.create({
    trigger: section,
    start: "top top",
    end: "+=300%",
    pin: ".workflow__sticky",
    scrub: 0.6,
    onUpdate: (self) => {
      const p = self.progress;
      if (bar) bar.style.width = (p * 100) + "%";
      const idx = Math.min(phases.length - 1, Math.floor(p * phases.length));
      setActive(idx);
    },
  });
}

/* =========================================================
   8. COUNTERS
   ========================================================= */
function counters() {
  gsap.utils.toArray("[data-count]").forEach((el) => {
    const end = parseFloat(el.dataset.count);
    const suffix = el.dataset.suffix || "";
    const obj = { v: 0 };
    ScrollTrigger.create({
      trigger: el, start: "top 90%", once: true,
      onEnter: () => gsap.to(obj, {
        v: end, duration: 1.6, ease: "power2.out",
        onUpdate: () => { el.textContent = Math.round(obj.v) + suffix; },
      }),
    });
  });
}

/* =========================================================
   9. NAV hide/show + section accent
   ========================================================= */
function navBehaviour() {
  const nav = document.getElementById("nav");
  let last = 0;
  ScrollTrigger.create({
    start: 0, end: "max",
    onUpdate: (self) => {
      const y = self.scroll();
      if (y > 200 && y > last) nav.classList.add("is-hidden");
      else nav.classList.remove("is-hidden");
      last = y;
    },
  });
}

/* =========================================================
   10. CUSTOM CURSOR
   ========================================================= */
function customCursor() {
  if (isTouch || reduceMotion) return;
  const cur = document.getElementById("cursor");
  const pos = { x: innerWidth / 2, y: innerHeight / 2 };
  const ring = { x: pos.x, y: pos.y };
  window.addEventListener("pointermove", (e) => { pos.x = e.clientX; pos.y = e.clientY; });
  gsap.ticker.add(() => {
    ring.x += (pos.x - ring.x) * 0.18;
    ring.y += (pos.y - ring.y) * 0.18;
    cur.style.transform = `translate(${ring.x}px,${ring.y}px)`;
    cur.querySelector(".cursor__dot").style.transform = `translate(${pos.x - ring.x - 3}px,${pos.y - ring.y - 3}px)`;
  });
  document.querySelectorAll("[data-cursor],a,button").forEach((el) => {
    el.addEventListener("mouseenter", () => cur.classList.add("is-hover"));
    el.addEventListener("mouseleave", () => cur.classList.remove("is-hover"));
  });
}

/* =========================================================
   11. COPY + APPROVE interactions
   ========================================================= */
function interactions() {
  document.querySelectorAll("#copyCmd, #copyCmd2").forEach((btn) => {
    btn.addEventListener("click", async () => {
      try { await navigator.clipboard.writeText("npx pds-stack install"); } catch (e) {}
      btn.classList.add("is-copied");
      setTimeout(() => btn.classList.remove("is-copied"), 1600);
    });
  });

  const approve = document.getElementById("approveBtn");
  if (approve) {
    approve.addEventListener("click", () => {
      approve.classList.add("is-approved");
      approve.querySelector("span").textContent = "Direction approved ✓";
      const status = document.querySelector(".brief__status");
      if (status) { status.textContent = "validated"; status.style.color = "#27d98a"; }
    });
  }
}

/* =========================================================
   BOOT
   ========================================================= */
// smooth anchor scrolling (kept in JS so global scroll-behavior:smooth
// doesn't fight ScrollTrigger's scrubbed pin)
function smoothAnchors() {
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener("click", (e) => {
      const id = a.getAttribute("href");
      if (id === "#" || id === "#top") {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
        return;
      }
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      const y = target.getBoundingClientRect().top + window.scrollY - 10;
      window.scrollTo({ top: y, behavior: reduceMotion ? "auto" : "smooth" });
    });
  });
}

function boot() {
  initThree();
  customCursor();
  interactions();
  smoothAnchors();
  marquee();

  // Build scroll-driven animations only once layout is final (fonts loaded),
  // so pin/trigger positions are measured correctly.
  const setupScroll = () => {
    scrollReveals();
    workflowCycle();
    counters();
    navBehaviour();
    requestAnimationFrame(() => ScrollTrigger.refresh());
  };

  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(() => requestAnimationFrame(setupScroll));
  } else {
    setupScroll();
  }
}

initPreloader(() => {
  heroIntro();
  boot();
});

// safety net: recalc once everything (images etc.) has loaded
window.addEventListener("load", () => setTimeout(() => ScrollTrigger.refresh(), 500));
