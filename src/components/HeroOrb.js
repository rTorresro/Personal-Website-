const { useEffect, useRef } = React;

function HeroOrb() {
  const mountRef = useRef(null);

  useEffect(() => {
    if (!window.THREE || !mountRef.current) return;

    const container = mountRef.current;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 1000);
    camera.position.z = 3.2;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const geometry = new THREE.IcosahedronGeometry(1, 1);
    const material = new THREE.MeshStandardMaterial({
      color: 0xef4444,
      metalness: 0.45,
      roughness: 0.35,
      emissive: 0x220000
    });
    const orb = new THREE.Mesh(geometry, material);
    scene.add(orb);

    const keyLight = new THREE.PointLight(0xef4444, 1.2, 10);
    keyLight.position.set(2, 2, 2);
    scene.add(keyLight);

    const fillLight = new THREE.PointLight(0xffffff, 0.6, 10);
    fillLight.position.set(-2, -2, 3);
    scene.add(fillLight);

    const ambient = new THREE.AmbientLight(0xffffff, 0.3);
    scene.add(ambient);

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
      orb.rotation.x += 0.003;
      orb.rotation.y += 0.004;
      renderer.render(scene, camera);
      frameId = requestAnimationFrame(animate);
    };
    animate();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(frameId);
      renderer.dispose();
      geometry.dispose();
      material.dispose();
      if (renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div className="hero-3d" ref={mountRef} aria-hidden="true"></div>;
}
