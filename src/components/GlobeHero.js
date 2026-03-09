const { useEffect: useGlobeEffect, useRef: useGlobeRef } = React;

function GlobeHero() {
  const canvasRef = useGlobeRef(null);

  useGlobeEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || typeof THREE === "undefined") return;

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

      // Base dark sphere
      globeGroup.add(new THREE.Mesh(
        new THREE.SphereGeometry(RADIUS, 64, 64),
        new THREE.MeshBasicMaterial({ color: 0x030303, transparent: true, opacity: 0.95 })
      ));

      // Atmosphere glow
      scene.add(new THREE.Mesh(
        new THREE.SphereGeometry(RADIUS * 1.07, 32, 32),
        new THREE.MeshBasicMaterial({ color: 0xff1500, transparent: true, opacity: 0.045, side: THREE.BackSide })
      ));

      // Lat/lng → 3D point on sphere surface
      function ll3(lat, lng, r) {
        const phi   = (90 - lat) * Math.PI / 180;
        const theta = (lng + 180) * Math.PI / 180;
        return new THREE.Vector3(
          -r * Math.sin(phi) * Math.cos(theta),
           r * Math.cos(phi),
           r * Math.sin(phi) * Math.sin(theta)
        );
      }

      // Country borders via topojson
      const borderMat = new THREE.LineBasicMaterial({ color: 0x3a0a0a, transparent: true, opacity: 0.85 });
      fetch("https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json")
        .then((r) => r.json())
        .then((world) => {
          if (typeof topojson === "undefined") return;
          topojson.mesh(world, world.objects.countries).coordinates.forEach((line) => {
            const pts = line.map(([lng, lat]) => ll3(lat, lng, RADIUS + 0.003));
            if (pts.length < 2) return;
            globeGroup.add(new THREE.Line(
              new THREE.BufferGeometry().setFromPoints(pts),
              borderMat
            ));
          });
        })
        .catch(() => {});

      // Cities [lat, lng]
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

      // City dots — Pittsburgh highlighted
      const dotGeo = new THREE.SphereGeometry(0.028, 8, 8);
      Object.entries(CITIES).forEach(([key, [lat, lng]]) => {
        const dot = new THREE.Mesh(dotGeo, new THREE.MeshBasicMaterial({
          color: key === "pittsburgh" ? 0xff6666 : 0xbb2222
        }));
        dot.position.copy(ll3(lat, lng, RADIUS + 0.025));
        globeGroup.add(dot);
      });

      // Arcs + animated pulse dots
      const arcMat = new THREE.LineBasicMaterial({ color: 0xff2d2d, transparent: true, opacity: 0.28 });
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
          new THREE.MeshBasicMaterial({ color: 0xff5555, transparent: true, opacity: 0 })
        );
        pulse.userData = { curve, t: Math.random() };
        globeGroup.add(pulse);
        pulses.push(pulse);
      });

      // Mouse drag to rotate
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
          p.material.opacity = Math.sin(p.userData.t * Math.PI) * 0.95;
        });
        renderer.render(scene, camera);
      };
      animate();

      // Store cleanup on the canvas element for the observer to access
      canvas._globeCleanup = () => {
        cancelAnimationFrame(raf);
        canvas.removeEventListener("mousedown", onDown);
        window.removeEventListener("mouseup",   onUp);
        window.removeEventListener("mousemove", onMove);
        window.removeEventListener("resize",    onResize);
        renderer.dispose();
      };
    }

    // Defer init until the canvas has real dimensions
    // (section is display:none until the terminal sequence ends)
    const observer = new ResizeObserver(() => {
      if (canvas.offsetWidth > 0) {
        setupGlobe();
        observer.disconnect();
      }
    });
    observer.observe(canvas);

    // Also try immediately in case section is already visible
    setupGlobe();

    return () => {
      observer.disconnect();
      cancelAnimationFrame(raf);
      if (canvas._globeCleanup) canvas._globeCleanup();
    };
  }, []);

  return <canvas ref={canvasRef} className="globe-canvas" />;
}
