import { useEffect, useRef, useState } from 'react';

export default function ThreeScene() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [webglAvailable, setWebglAvailable] = useState<boolean | null>(null);

  useEffect(() => {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    if (!gl) {
      setWebglAvailable(false);
      return;
    }
    setWebglAvailable(true);

    if (!containerRef.current) return;
    const container = containerRef.current;

    let animFrameId: number;

    const initThree = async () => {
      const THREE = await import('three');

      const scene = new THREE.Scene();
      scene.fog = new THREE.FogExp2(0x080b12, 0.0015);

      const camera = new THREE.PerspectiveCamera(
        75,
        container.clientWidth / container.clientHeight,
        0.1,
        1000
      );
      camera.position.z = 300;

      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setSize(container.clientWidth, container.clientHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      container.appendChild(renderer.domElement);

      const orbGroup = new THREE.Group();
      scene.add(orbGroup);

      const geometry = new THREE.IcosahedronGeometry(100, 2);

      const pointMaterial = new THREE.PointsMaterial({
        color: 0x00f0ff,
        size: 3,
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending,
      });
      const points = new THREE.Points(geometry, pointMaterial);
      orbGroup.add(points);

      const lineMaterial = new THREE.LineBasicMaterial({
        color: 0x9d4edd,
        transparent: true,
        opacity: 0.15,
        blending: THREE.AdditiveBlending,
      });
      const wireframe = new THREE.WireframeGeometry(geometry);
      const lines = new THREE.LineSegments(wireframe, lineMaterial);
      orbGroup.add(lines);

      const particlesGeometry = new THREE.BufferGeometry();
      const particleCount = 700;
      const posArray = new Float32Array(particleCount * 3);
      for (let i = 0; i < particleCount * 3; i++) {
        posArray[i] = (Math.random() - 0.5) * 800;
      }
      particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
      const particlesMaterial = new THREE.PointsMaterial({
        size: 1.5,
        color: 0xffffff,
        transparent: true,
        opacity: 0.3,
        blending: THREE.AdditiveBlending,
      });
      const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
      scene.add(particlesMesh);

      let mouseX = 0;
      let mouseY = 0;
      const windowHalfX = window.innerWidth / 2;
      const windowHalfY = window.innerHeight / 2;

      const onMouseMove = (event: MouseEvent) => {
        mouseX = (event.clientX - windowHalfX) * 0.1;
        mouseY = (event.clientY - windowHalfY) * 0.1;
      };
      document.addEventListener('mousemove', onMouseMove);

      const startTime = performance.now();

      const animate = () => {
        animFrameId = requestAnimationFrame(animate);
        const elapsed = (performance.now() - startTime) / 1000;

        orbGroup.rotation.y += 0.002;
        orbGroup.rotation.x += 0.001;
        camera.position.x += (mouseX - camera.position.x) * 0.02;
        camera.position.y += (-mouseY - camera.position.y) * 0.02;
        camera.lookAt(scene.position);

        const scale = 1 + Math.sin(elapsed * 2) * 0.05;
        orbGroup.scale.set(scale, scale, scale);
        particlesMesh.rotation.y = -elapsed * 0.02;

        renderer.render(scene, camera);
      };
      animate();

      const handleResize = () => {
        if (!containerRef.current) return;
        camera.aspect = containerRef.current.clientWidth / containerRef.current.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
      };
      window.addEventListener('resize', handleResize);

      return () => {
        cancelAnimationFrame(animFrameId);
        window.removeEventListener('resize', handleResize);
        document.removeEventListener('mousemove', onMouseMove);
        try { if (container && renderer.domElement) container.removeChild(renderer.domElement); } catch {}
        geometry.dispose();
        pointMaterial.dispose();
        lineMaterial.dispose();
        wireframe.dispose();
        particlesGeometry.dispose();
        particlesMaterial.dispose();
        renderer.dispose();
      };
    };

    let cleanup: (() => void) | undefined;
    initThree().then(fn => { cleanup = fn; }).catch(() => setWebglAvailable(false));

    return () => {
      cancelAnimationFrame(animFrameId);
      cleanup?.();
    };
  }, []);

  if (webglAvailable === false) {
    return (
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/10 via-transparent to-purple-900/10" />
        {Array.from({ length: 60 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              width: (Math.random() * 3 + 1) + 'px',
              height: (Math.random() * 3 + 1) + 'px',
              backgroundColor: i % 2 === 0 ? 'rgba(0,240,255,0.3)' : 'rgba(157,78,221,0.3)',
              left: (Math.random() * 100) + '%',
              top: (Math.random() * 100) + '%',
              animationDuration: (2 + Math.random() * 4) + 's',
            }}
          />
        ))}
      </div>
    );
  }

  return <div ref={containerRef} className="absolute inset-0 z-0 pointer-events-none opacity-70" />;
}
