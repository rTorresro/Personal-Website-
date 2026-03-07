const { useEffect, useRef } = React;

function HeroModel() {
  const mountRef = useRef(null);

  useEffect(() => {
    if (!mountRef.current) return;

    const container = mountRef.current;
    container.innerHTML = "";

    const status = document.createElement("div");
    status.className = "model-status";
    status.textContent = "Loading 3D model...";
    container.appendChild(status);

    if (!window.THREE || !window.THREE.GLTFLoader) {
      status.textContent = "3D loader unavailable.";
      return;
    }

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 1000);
    camera.position.set(0, 0.2, 3);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const ambient = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambient);

    const keyLight = new THREE.DirectionalLight(0xffffff, 1.2);
    keyLight.position.set(2, 3, 4);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0xffffff, 0.4);
    fillLight.position.set(-2, 0.5, 2);
    scene.add(fillLight);

    const rimLight = new THREE.DirectionalLight(0xef4444, 0.8);
    rimLight.position.set(0, 2, -2);
    scene.add(rimLight);

    let model = null;
    let fallback = null;
    const createFallback = () => {
      if (fallback) return;
      const geometry = new THREE.TorusKnotGeometry(0.6, 0.18, 120, 16);
      const material = new THREE.MeshStandardMaterial({
        color: 0xef4444,
        metalness: 0.35,
        roughness: 0.35
      });
      fallback = new THREE.Mesh(geometry, material);
      scene.add(fallback);
      status.textContent = "Using fallback shape (model not loaded).";
    };

    const clock = new THREE.Clock();
    const loader = new THREE.GLTFLoader();
    const timeoutId = setTimeout(createFallback, 2500);
    loader.load(
      "./the_flash_2023.glb",
      (gltf) => {
        model = gltf.scene;
        const box = new THREE.Box3().setFromObject(model);
        const size = box.getSize(new THREE.Vector3());
        const center = box.getCenter(new THREE.Vector3());
        model.position.sub(center);
        const maxDim = Math.max(size.x, size.y, size.z);
        const scale = maxDim ? 1.6 / maxDim : 1;
        model.scale.setScalar(scale);
        scene.add(model);
        if (fallback) {
          scene.remove(fallback);
          fallback = null;
        }
        status.textContent = "";
        clearTimeout(timeoutId);
      },
      undefined,
      () => {
        createFallback();
        clearTimeout(timeoutId);
      }
    );

    const handleResize = () => {
      const { clientWidth, clientHeight } = container;
      if (!clientWidth || !clientHeight) return;
      camera.aspect = clientWidth / clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(clientWidth, clientHeight);
    };

    handleResize();

    let frameId;
    const animate = () => {
      const elapsed = clock.getElapsedTime();
      if (model) {
        model.rotation.y = elapsed * 0.4;
        model.rotation.x = Math.sin(elapsed * 0.6) * 0.08;
      } else if (fallback) {
        fallback.rotation.y = elapsed * 0.6;
        fallback.rotation.x = elapsed * 0.3;
      }
      renderer.render(scene, camera);
      frameId = requestAnimationFrame(animate);
    };
    animate();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(frameId);
      renderer.dispose();
      if (renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div className="hero-3d" ref={mountRef} aria-hidden="true"></div>;
}
