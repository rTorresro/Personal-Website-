import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { Water } from "three/examples/jsm/objects/Water.js";
import { Sky } from "three/examples/jsm/objects/Sky.js";

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
    renderer.toneMappingExposure = 0.5;

    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0x1a2030, 120, 1500);

    const camera = new THREE.PerspectiveCamera(55, W / H, 1, 20000);
    camera.position.set(0, 22, 100);
    camera.lookAt(0, 0, 0);

    const sky = new Sky();
    sky.scale.setScalar(450000);
    sky.material.uniforms["turbidity"].value = 10;
    sky.material.uniforms["rayleigh"].value = 2;
    sky.material.uniforms["mieCoefficient"].value = 0.005;
    sky.material.uniforms["mieDirectionalG"].value = 0.85;
    scene.add(sky);

    const sun = new THREE.Vector3();
    const phi = THREE.MathUtils.degToRad(90 - 2);
    const theta = THREE.MathUtils.degToRad(180);
    sun.setFromSphericalCoords(1, phi, theta);
    sky.material.uniforms["sunPosition"].value.copy(sun);

    const loader = new THREE.TextureLoader();
    let water;
    let normals;

    loader.load(
      `${import.meta.env.BASE_URL}waternormals.jpg`,
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
          sunDirection: sun.clone().normalize(),
          sunColor:     0xffd9b0,
          waterColor:   0x0e2238,
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
      sky.geometry.dispose();
      sky.material.dispose();
      if (normals) normals.dispose();
      renderer.dispose();
    };
  }, []);

  if (!supported) {
    return <div className="ocean-fallback" aria-hidden="true" />;
  }

  return <canvas ref={canvasRef} className="ocean-canvas" aria-hidden="true" />;
}
