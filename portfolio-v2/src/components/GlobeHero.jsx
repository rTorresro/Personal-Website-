import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function GlobeHero() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let raf;
    let initialized = false;

    function setupGlobe() {
      if (initialized || canvas.offsetWidth === 0) return;
      initialized = true;

      const RADIUS = 2;

      const scene = new THREE.Scene();
      const W = canvas.offsetWidth;
      const H = canvas.offsetHeight;

      const camera = new THREE.PerspectiveCamera(45, W / H, 0.1, 100);
      camera.position.z = 5.5;

      const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
      renderer.setSize(W, H);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setClearColor(0x000000, 0);

      const globeGroup = new THREE.Group();
      scene.add(globeGroup);

      globeGroup.add(new THREE.Mesh(
        new THREE.SphereGeometry(RADIUS, 64, 64),
        new THREE.MeshBasicMaterial({ color: 0x030303, transparent: true, opacity: 0.95 })
      ));

      scene.add(new THREE.Mesh(
        new THREE.SphereGeometry(RADIUS * 1.07, 32, 32),
        new THREE.MeshBasicMaterial({ color: 0x7aa2f7, transparent: true, opacity: 0.045, side: THREE.BackSide })
      ));

      function ll3(lat, lng, r) {
        const phi   = (90 - lat) * Math.PI / 180;
        const theta = (lng + 180) * Math.PI / 180;
        return new THREE.Vector3(
          -r * Math.sin(phi) * Math.cos(theta),
           r * Math.cos(phi),
           r * Math.sin(phi) * Math.sin(theta)
        );
      }

      // Country borders rely on window.topojson + world-atlas JSON.
      // If topojson isn't loaded, the globe renders without borders.
      const borderMat = new THREE.LineBasicMaterial({ color: 0x7aa2f7, transparent: true, opacity: 0.15 });
      if (window.topojson) {
        fetch("https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json")
          .then((r) => r.json())
          .then((world) => {
            window.topojson.mesh(world, world.objects.countries).coordinates.forEach((line) => {
              const pts = line.map(([lng, lat]) => ll3(lat, lng, RADIUS + 0.003));
              if (pts.length < 2) return;
              globeGroup.add(new THREE.Line(
                new THREE.BufferGeometry().setFromPoints(pts),
                borderMat
              ));
            });
          })
          .catch(() => {});
      }

      const CITIES = {
        pittsburgh: [40.44,  -79.99],
        newYork:    [40.71,  -74.00],
        london:     [51.50,   -0.12],
        tokyo:      [35.68,  139.69],
        sydney:    [-33.86,  151.20],
        saoPaulo:  [-23.55,  -46.63],
        dubai:      [25.20,   55.27],
        moscow:     [55.75,   37.62],
        singapore:  [ 1.35,  103.82],
        lagos:      [ 6.52,    3.38],
      };

      const CONNECTIONS = [
        ["pittsburgh", "london"],
        ["pittsburgh", "tokyo"],
        ["pittsburgh", "saoPaulo"],
        ["newYork",    "london"],
        ["london",     "dubai"],
        ["london",     "moscow"],
        ["london",     "lagos"],
        ["dubai",      "singapore"],
        ["tokyo",      "sydney"],
        ["singapore",  "sydney"],
      ];

      const dotGeo = new THREE.SphereGeometry(0.028, 8, 8);
      Object.entries(CITIES).forEach(([key, [lat, lng]]) => {
        const dot = new THREE.Mesh(dotGeo, new THREE.MeshBasicMaterial({
          color: 0x7aa2f7,
          transparent: true,
          opacity: key === "pittsburgh" ? 1 : 0.55
        }));
        dot.position.copy(ll3(lat, lng, RADIUS + 0.025));
        globeGroup.add(dot);
      });

      const arcMat = new THREE.LineBasicMaterial({ color: 0x7aa2f7, transparent: true, opacity: 0.28 });
      const pulses = [];

      CONNECTIONS.forEach(([a, b]) => {
        const latA = CITIES[a][0], lngA = CITIES[a][1];
        const latB = CITIES[b][0], lngB = CITIES[b][1];
        const start = ll3(latA, lngA, RADIUS + 0.01);
        const end   = ll3(latB, lngB, RADIUS + 0.01);
        const mid   = start.clone().add(end).normalize().multiplyScalar(RADIUS * 1.6);

        const curve = new THREE.QuadraticBezierCurve3(start, mid, end);
        globeGroup.add(new THREE.Line(
          new THREE.BufferGeometry().setFromPoints(curve.getPoints(64)),
          arcMat
        ));

        const pulse = new THREE.Mesh(
          new THREE.SphereGeometry(0.022, 8, 8),
          new THREE.MeshBasicMaterial({ color: 0x7aa2f7, transparent: true, opacity: 0 })
        );
        pulse.userData = { curve, t: Math.random() };
        globeGroup.add(pulse);
        pulses.push(pulse);
      });

      let drag = false, px = 0, py = 0, vx = 0, vy = 0;
      const onDown = (e) => { drag = true; px = e.clientX; py = e.clientY; };
      const onUp   = ()  => { drag = false; };
      const onMove = (e) => {
        if (!drag) return;
        vy = (e.clientX - px) * 0.006;
        vx = (e.clientY - py) * 0.006;
        px = e.clientX; py = e.clientY;
      };
      canvas.addEventListener("mousedown", onDown);
      window.addEventListener("mouseup",   onUp);
      window.addEventListener("mousemove", onMove);

      const onResize = () => {
        const w = canvas.offsetWidth, h = canvas.offsetHeight;
        if (!w || !h) return;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
      };
      window.addEventListener("resize", onResize);

      const animate = () => {
        raf = requestAnimationFrame(animate);
        if (!drag) {
          globeGroup.rotation.y += 0.0012;
          vx *= 0.9; vy *= 0.9;
        } else {
          globeGroup.rotation.y += vy;
          globeGroup.rotation.x = Math.max(-0.75, Math.min(0.75, globeGroup.rotation.x + vx));
        }
        pulses.forEach((p) => {
          p.userData.t = (p.userData.t + 0.0028) % 1;
          p.position.copy(p.userData.curve.getPoint(p.userData.t));
          p.material.opacity = Math.sin(p.userData.t * Math.PI) * 0.55;
        });
        renderer.render(scene, camera);
      };
      animate();

      canvas._globeCleanup = () => {
        cancelAnimationFrame(raf);
        canvas.removeEventListener("mousedown", onDown);
        window.removeEventListener("mouseup",   onUp);
        window.removeEventListener("mousemove", onMove);
        window.removeEventListener("resize",    onResize);
        renderer.dispose();
      };
    }

    const observer = new ResizeObserver(() => {
      if (canvas.offsetWidth > 0) {
        setupGlobe();
        observer.disconnect();
      }
    });
    observer.observe(canvas);

    setupGlobe();

    return () => {
      observer.disconnect();
      cancelAnimationFrame(raf);
      if (canvas._globeCleanup) canvas._globeCleanup();
    };
  }, []);

  return <canvas ref={canvasRef} className="globe-canvas" />;
}
