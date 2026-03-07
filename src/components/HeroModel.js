const { useEffect, useRef } = React;

function HeroModel() {
  const mountRef = useRef(null);

  useEffect(() => {
    if (!window.THREE || !window.THREE.GLTFLoader || !mountRef.current) return;

    const container = mountRef.current;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 1000);
    camera.position.set(0, 0.6, 3.5);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const ambient = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambient);

    const keyLight = new THREE.DirectionalLight(0xffffff, 1.2);
    keyLight.position.set(2, 3, 4);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0xffffff, 0.5);
    fillLight.position.set(-2, 1, 2);
    scene.add(fillLight);

    let model = null;
    const loader = new THREE.GLTFLoader();
    loader.load(
      "the_flash_2023.glb",
      (gltf) => {
        model = gltf.scene;
        model.scale.set(1.2, 1.2, 1.2);
        model.position.set(0, -1.1, 0);
        scene.add(model);
      },
      undefined,
      () => {
        // Silently fail if the model can't be loaded.
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
      if (model) {
        model.rotation.y += 0.004;
        model.rotation.x = Math.sin(Date.now() * 0.0006) * 0.08;
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
