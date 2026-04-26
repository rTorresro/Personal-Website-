import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { Water } from "three/examples/jsm/objects/Water.js";

export default function OceanHero() {
  const canvasRef = useRef(null);
  const [supported, setSupported] = useState(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let raf;
    let disposed = false;

    const cores = navigator.hardwareConcurrency || 4;
    const lowEnd = cores <= 4 || window.innerWidth < 900;
    const dpr = Math.min(window.devicePixelRatio, lowEnd ? 1 : 1.5);
    const reflectionRes = lowEnd ? 256 : 512;

    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({ canvas, antialias: !lowEnd, alpha: true });
    } catch (err) {
      console.warn("Ocean: WebGL init failed", err);
      setSupported(false);
      return;
    }

    const W = window.innerWidth;
    const H = canvas.offsetHeight || window.innerHeight;

    renderer.setPixelRatio(dpr);
    renderer.setSize(W, H);
    renderer.setClearColor(0x000000, 0);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 0.55;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0a141f);
    scene.fog = new THREE.Fog(0x0a141f, 80, 1200);

    const camera = new THREE.PerspectiveCamera(55, W / H, 1, 20000);
    camera.position.set(0, 22, 100);
    camera.lookAt(0, 0, 0);

    const loader = new THREE.TextureLoader();
    let water;
    let normals;

    loader.load(
      "/waternormals.jpg",
      (texture) => {
        if (disposed) {
          texture.dispose();
          return;
        }
        normals = texture;
        normals.wrapS = normals.wrapT = THREE.RepeatWrapping;

        water = new Water(new THREE.PlaneGeometry(10000, 10000), {
          textureWidth: reflectionRes,
          textureHeight: reflectionRes,
          waterNormals: normals,
          sunDirection: new THREE.Vector3(0.3, 0.45, -0.4).normalize(),
          sunColor:     0x9bb4d4,
          waterColor:   0x10283f,
          distortionScale: 3.7,
          fog: true,
          alpha: 1.0
        });
        water.rotation.x = -Math.PI / 2;
        scene.add(water);

        const animate = () => {
          raf = requestAnimationFrame(animate);
          water.material.uniforms["time"].value += 1 / 60;
          renderer.render(scene, camera);
        };
        animate();
      },
      undefined,
      (err) => {
        console.warn("Ocean: water normals failed to load", err);
        if (!disposed) setSupported(false);
      }
    );

    const onResize = () => {
      const w = window.innerWidth;
      const h = canvas.offsetHeight || window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", onResize);

    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      if (water) {
        water.geometry.dispose();
        water.material.dispose();
      }
      if (normals) normals.dispose();
      renderer.dispose();
    };
  }, []);

  if (!supported) {
    return <div className="ocean-fallback" aria-hidden="true" />;
  }

  return <canvas ref={canvasRef} className="ocean-canvas" aria-hidden="true" />;
}
