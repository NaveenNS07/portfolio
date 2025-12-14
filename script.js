// ========= THREE.JS 3D BACKGROUND =========
const bgCanvas = document.getElementById("bg-canvas");
const bgRenderer = new THREE.WebGLRenderer({ canvas: bgCanvas, antialias: true, alpha: true });
bgRenderer.setPixelRatio(window.devicePixelRatio);

const bgScene = new THREE.Scene();
const bgCamera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
bgCamera.position.set(0, 0, 10);

// Glow cubes group
const cubeGroup = new THREE.Group();
const cubeGeo = new THREE.BoxGeometry(1, 1, 1);
const cubeMat1 = new THREE.MeshStandardMaterial({ color: 0x6c5ce7, metalness: 0.7, roughness: 0.3, emissive: 0x15163b, emissiveIntensity: 0.6 });
const cubeMat2 = new THREE.MeshStandardMaterial({ color: 0x00d4ff, metalness: 0.7, roughness: 0.35, emissive: 0x051827, emissiveIntensity: 0.7 });
const cubeMat3 = new THREE.MeshStandardMaterial({ color: 0xff6bcb, metalness: 0.6, roughness: 0.3, emissive: 0x2c1023, emissiveIntensity: 0.7 });
const cubeMats = [cubeMat1, cubeMat2, cubeMat3];

for (let i = 0; i < 10; i++) {
  const mat = cubeMats[i % cubeMats.length];
  const mesh = new THREE.Mesh(cubeGeo, mat);
  const radius = 4 + Math.random() * 2;
  const angle = (i / 10) * Math.PI * 2;
  mesh.position.set(Math.cos(angle) * radius, Math.sin(angle) * radius * 0.6, (Math.random() - 0.5) * 4);
  mesh.rotation.x = Math.random() * Math.PI;
  mesh.rotation.y = Math.random() * Math.PI;
  mesh.scale.setScalar(0.8 + Math.random() * 0.5);
  cubeGroup.add(mesh);
}
bgScene.add(cubeGroup);

// Particles
const particleCount = 600;
const positions = new Float32Array(particleCount * 3);
for (let i = 0; i < particleCount * 3; i += 3) {
  positions[i] = (Math.random() - 0.5) * 40;
  positions[i + 1] = (Math.random() - 0.5) * 24;
  positions[i + 2] = (Math.random() - 0.5) * 40;
}
const particleGeo = new THREE.BufferGeometry();
particleGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
const particleMat = new THREE.PointsMaterial({
  size: 0.06,
  transparent: true,
  opacity: 0.6,
  color: 0xffffff
});
const particles = new THREE.Points(particleGeo, particleMat);
bgScene.add(particles);

// Lights
const ambient = new THREE.AmbientLight(0xffffff, 0.65);
bgScene.add(ambient);
const pointA = new THREE.PointLight(0x00d4ff, 1.3);
pointA.position.set(6, 4, 8);
bgScene.add(pointA);
const pointB = new THREE.PointLight(0xff6bcb, 1);
pointB.position.set(-6, -4, -6);
bgScene.add(pointB);

let mouseX = 0, mouseY = 0;
document.addEventListener("mousemove", (e) => {
  const halfX = window.innerWidth / 2;
  const halfY = window.innerHeight / 2;
  mouseX = (e.clientX - halfX) / halfX;
  mouseY = (e.clientY - halfY) / halfY;
});

function onResize() {
  const w = window.innerWidth;
  const h = window.innerHeight;
  bgRenderer.setSize(w, h);
  bgCamera.aspect = w / h;
  bgCamera.updateProjectionMatrix();
}
onResize();
window.addEventListener("resize", onResize);

function renderBg() {
  requestAnimationFrame(renderBg);
  const t = performance.now() * 0.00025;

  cubeGroup.rotation.y = t * 2;
  cubeGroup.rotation.x = Math.sin(t) * 0.3;

  particles.rotation.y -= 0.0008;

  bgCamera.position.x += (mouseX * 2 - bgCamera.position.x) * 0.03;
  bgCamera.position.y += (-mouseY * 1.2 - bgCamera.position.y) * 0.03;
  bgCamera.lookAt(0, 0, 0);

  bgRenderer.render(bgScene, bgCamera);
}
renderBg();

// ========= GSAP ANIMATIONS =========
gsap.registerPlugin(ScrollTrigger);

// Initial Hero section elements fade-in animation
gsap.from(".hero-left .badge, .hero-title, .hero-sub, .hero-highlights, .hero-cta, .hero-metrics", {
  y: 24,
  opacity: 0,
  duration: 1,
  ease: "power3.out",
  stagger: 0.08,
  delay: 0.2
});

gsap.from(".hero-profile-card", {
  y: 30,
  opacity: 0,
  duration: 1,
  ease: "power3.out",
  delay: 0.35
});

// Scroll-triggered animations for cards in all sections
document.querySelectorAll("section").forEach((section) => {
  gsap.from(section.querySelectorAll(".card, .project-card, .cert-card"), {
    scrollTrigger: {
      trigger: section,
      start: "top 70%", // Adjust this value to control when the animation starts
    },
    y: 32,
    opacity: 0,
    duration: 0.9,
    ease: "power3.out",
    stagger: 0.08
  });
});

// ========= NAV ACTIVE STATE =========
const navLinks = document.querySelectorAll(".nav-link");
const sections = [...document.querySelectorAll("section")];

function onScroll() {
  const scrollPos = window.scrollY + 130; // 130px offset for fixed header
  let current = sections[0].id;
  
  // Determine the current section based on scroll position
  sections.forEach(sec => {
    if (scrollPos >= sec.offsetTop) {
      current = sec.id;
    }
  });
  
  // Set the active class on the corresponding nav link
  navLinks.forEach(link => {
    link.classList.toggle("active", link.getAttribute("href") === "#" + current);
  });
}
window.addEventListener("scroll", onScroll);
onScroll(); // Call once on load to set initial active state

// ========= 3D TILT EFFECT (Vanilla JS) =========
const tiltCards = document.querySelectorAll(".tilt");

tiltCards.forEach(card => {
  const height = card.clientHeight;
  const width = card.clientWidth;
  const strength = 12; // Max rotation angle in degrees

  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const xRel = e.clientX - rect.left; // X position within the element
    const yRel = e.clientY - rect.top;  // Y position within the element

    // Calculate rotation angles (in degrees)
    // xRot (rotation around X-axis) is based on Y position (center is 0)
    // yRot (rotation around Y-axis) is based on X position (center is 0), inverted for natural feel
    const xRot = ((yRel - height / 2) / height) * strength;
    const yRot = ((xRel - width / 2) / width) * -strength;

    card.style.transform = `rotateX(${xRot}deg) rotateY(${yRot}deg) translateY(-4px)`;
    card.classList.add("tilt-hover");
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "rotateX(0deg) rotateY(0deg) translateY(0)";
    card.classList.remove("tilt-hover");
  });
});