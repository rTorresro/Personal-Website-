import { useEffect, useRef } from "react";
import * as THREE from "three";

const VERT = /* glsl */ `
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

const FRAG = /* glsl */ `
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

export default function GlobeHero() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let raf;
    let initialized = false;

    function setup() {
      if (initialized || canvas.offsetWidth === 0) return;
      initialized = true;

      const RADIUS = 2;
      const COUNT = 2000;

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

      const root = new THREE.Group();
      const spin = new THREE.Group();
      root.add(spin);
      scene.add(root);

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
          uHeight:    { value: H * dpr },
          uPointSize: { value: 0.022 }
        },
        vertexShader: VERT,
        fragmentShader: FRAG,
        transparent: true,
        depthWrite: false,
        blending: THREE.NormalBlending
      });

      const points = new THREE.Points(geo, mat);
      spin.add(points);

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
        mat.uniforms.uHeight.value = h * dpr;
      };
      window.addEventListener("resize", onResize);

      const animate = () => {
        raf = requestAnimationFrame(animate);
        spin.rotation.y += 0.0015;
        root.rotation.x += (target.x - root.rotation.x) * 0.05;
        root.rotation.y += (target.y - root.rotation.y) * 0.05;
        renderer.render(scene, camera);
      };
      animate();

      canvas._cleanup = () => {
        cancelAnimationFrame(raf);
        window.removeEventListener("mousemove", onMove);
        window.removeEventListener("resize", onResize);
        geo.dispose();
        mat.dispose();
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
