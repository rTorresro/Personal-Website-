import { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import rayquazaUrl from "../assets/rayquaza.glb?url";

const PARTICLE_VERT = /* glsl */ `
  attribute float aOpacityBias;
  varying float vAlpha;
  uniform float uHeight;
  uniform float uPointSize;

  void main() {
    vec4 worldPos = modelMatrix * vec4(position, 1.0);
    vec3 worldNormal = normalize(mat3(modelMatrix) * normalize(position));
    vec3 viewDir = normalize(cameraPosition - worldPos.xyz);

    float facing = max(dot(worldNormal, viewDir), 0.0);
    float edgeFade = smoothstep(0.04, 0.55, facing);
    vAlpha = edgeFade * aOpacityBias;

    vec4 mv = viewMatrix * worldPos;
    gl_PointSize = uPointSize * (uHeight / -mv.z);
    gl_Position = projectionMatrix * mv;
  }
`;

const PARTICLE_FRAG = /* glsl */ `
  varying float vAlpha;
  uniform vec3 uColor;

  void main() {
    vec2 c = gl_PointCoord - vec2(0.5);
    float d = length(c);
    if (d > 0.5) discard;
    float soft = smoothstep(0.5, 0.15, d);
    gl_FragColor = vec4(uColor, vAlpha * soft);
  }
`;

function buildRayquaza(scene, spin, model) {
  const ambient = new THREE.AmbientLight(0xffffff, 1.2);
  const blue = new THREE.PointLight(0x7aa2f7, 60, 30, 1.6);
  blue.position.set(-4, 3, 4);
  const green = new THREE.PointLight(0x00ff88, 45, 30, 1.6);
  green.position.set(4, -2, 3);
  scene.add(ambient, blue, green);

  // Orient: rotate so the model's longest dimension stands along Y (upright).
  model.updateMatrixWorld(true);
  let bb = new THREE.Box3().setFromObject(model);
  let sz = bb.getSize(new THREE.Vector3());

  if (sz.x >= sz.y && sz.x >= sz.z) {
    model.rotation.z = -Math.PI / 2;
  } else if (sz.z >= sz.y && sz.z >= sz.x) {
    model.rotation.x = Math.PI / 2;
  }
  model.updateMatrixWorld(true);

  // Scale so vertical extent ≈ 4.5 units (fills hero, leaves margin for tilt).
  bb = new THREE.Box3().setFromObject(model);
  sz = bb.getSize(new THREE.Vector3());
  if (sz.y > 0) model.scale.setScalar(4.5 / sz.y);
  model.updateMatrixWorld(true);

  // Recenter after rotation + scale so the model sits centered on screen.
  bb = new THREE.Box3().setFromObject(model);
  const center = bb.getCenter(new THREE.Vector3());
  model.position.sub(center);

  // Wrap in a tilter so the dragon stays visually leaned while spin rotates it.
  const tilter = new THREE.Group();
  tilter.rotation.z = THREE.MathUtils.degToRad(18);
  tilter.add(model);
  spin.add(tilter);

  return {
    dispose: () => {
      scene.remove(ambient, blue, green);
      spin.remove(tilter);
      model.traverse((child) => {
        if (child.geometry) child.geometry.dispose();
        if (child.material) {
          const mats = Array.isArray(child.material)
            ? child.material
            : [child.material];
          mats.forEach((mat) => {
            for (const key in mat) {
              const v = mat[key];
              if (v && v.isTexture) v.dispose();
            }
            mat.dispose();
          });
        }
      });
    }
  };
}

function buildParticles(scene, spin, heightPx) {
  const RADIUS = 2;
  const COUNT = 2000;
  const positions = new Float32Array(COUNT * 3);
  const biases = new Float32Array(COUNT);
  const golden = Math.PI * (3 - Math.sqrt(5));

  for (let i = 0; i < COUNT; i++) {
    const y = 1 - (i / (COUNT - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const t = golden * i;
    positions[i * 3]     = Math.cos(t) * r * RADIUS;
    positions[i * 3 + 1] = y * RADIUS;
    positions[i * 3 + 2] = Math.sin(t) * r * RADIUS;
    biases[i] = 0.55 + Math.random() * 0.45;
  }

  const geo = new THREE.BufferGeometry();
  geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  geo.setAttribute("aOpacityBias", new THREE.BufferAttribute(biases, 1));

  const mat = new THREE.ShaderMaterial({
    uniforms: {
      uColor:     { value: new THREE.Color(0x7aa2f7) },
      uHeight:    { value: heightPx },
      uPointSize: { value: 0.022 }
    },
    vertexShader: PARTICLE_VERT,
    fragmentShader: PARTICLE_FRAG,
    transparent: true,
    depthWrite: false,
    blending: THREE.NormalBlending
  });

  const points = new THREE.Points(geo, mat);
  spin.add(points);

  return {
    dispose: () => {
      spin.remove(points);
      geo.dispose();
      mat.dispose();
    },
    onResize: (h, dpr) => {
      mat.uniforms.uHeight.value = h * dpr;
    }
  };
}

export default function GlobeHero() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let raf;
    let initialized = false;
    let content = null;

    function setup() {
      if (initialized || canvas.offsetWidth === 0) return;
      initialized = true;

      const W = canvas.offsetWidth;
      const H = canvas.offsetHeight;
      const dpr = Math.min(window.devicePixelRatio, 2);

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(45, W / H, 0.1, 100);
      camera.position.z = 5.5;

      const renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: true
      });
      renderer.setSize(W, H);
      renderer.setPixelRatio(dpr);
      renderer.setClearColor(0x000000, 0);
      renderer.outputColorSpace = THREE.SRGBColorSpace;

      const root = new THREE.Group();
      const spin = new THREE.Group();
      root.add(spin);
      scene.add(root);

      const target = { x: 0, y: 0 };
      const onMove = (e) => {
        const nx = (e.clientX / window.innerWidth) * 2 - 1;
        const ny = (e.clientY / window.innerHeight) * 2 - 1;
        target.y = nx * 0.35;
        target.x = ny * 0.25;
      };
      window.addEventListener("mousemove", onMove);

      const onResize = () => {
        const w = canvas.offsetWidth;
        const h = canvas.offsetHeight;
        if (!w || !h) return;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
        if (content && content.onResize) content.onResize(h, dpr);
      };
      window.addEventListener("resize", onResize);

      const loader = new GLTFLoader();
      loader.load(
        rayquazaUrl,
        (gltf) => {
          content = buildRayquaza(scene, spin, gltf.scene);
        },
        undefined,
        (err) => {
          console.warn("Rayquaza load failed; using particle sphere", err);
          content = buildParticles(scene, spin, H * dpr);
        }
      );

      const animate = () => {
        raf = requestAnimationFrame(animate);
        spin.rotation.y += 0.003;
        root.rotation.x += (target.x - root.rotation.x) * 0.05;
        root.rotation.y += (target.y - root.rotation.y) * 0.05;
        renderer.render(scene, camera);
      };
      animate();

      canvas._cleanup = () => {
        cancelAnimationFrame(raf);
        window.removeEventListener("mousemove", onMove);
        window.removeEventListener("resize", onResize);
        if (content) content.dispose();
        renderer.dispose();
      };
    }

    const observer = new ResizeObserver(() => {
      if (canvas.offsetWidth > 0) {
        setup();
        observer.disconnect();
      }
    });
    observer.observe(canvas);
    setup();

    return () => {
      observer.disconnect();
      cancelAnimationFrame(raf);
      if (canvas._cleanup) canvas._cleanup();
    };
  }, []);

  return <canvas ref={canvasRef} className="globe-canvas" />;
}
