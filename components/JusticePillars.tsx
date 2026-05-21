"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function JusticePillars() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const targetMouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    // 1. Initialize Scene, Camera, and Renderer
    const scene = new THREE.Scene();
    
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 15);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // 2. Build the Architectural Pillars Group
    const pillarsGroup = new THREE.Group();
    scene.add(pillarsGroup);

    const columnCount = 5;
    const spacing = 2.8;
    const columns: THREE.Mesh[] = [];

    // Golden wireframe styling to convey structure, blueprint precision, and prestige
    const material = new THREE.MeshBasicMaterial({
      color: 0xb45309, // Gold Accent
      wireframe: true,
      transparent: true,
      opacity: 0.1,
    });

    for (let i = 0; i < columnCount; i++) {
      // Create cylinders with varying elegant heights representing structured strength
      const pillarHeight = 6 + Math.sin(i * 1.5) * 1.5;
      const geometry = new THREE.CylinderGeometry(0.35, 0.35, pillarHeight, 8, 12, true);
      const mesh = new THREE.Mesh(geometry, material);

      // Offset horizontally to create a colonnade layout
      const posX = (i - (columnCount - 1) / 2) * spacing;
      mesh.position.set(posX, -1.5 + (pillarHeight - 6) / 2, 0);
      
      pillarsGroup.add(mesh);
      columns.push(mesh);
    }

    // Add a circular pediment architrave wireframe representing supreme unity
    const domeGeom = new THREE.RingGeometry(5.2, 5.3, 32);
    const domeMesh = new THREE.Mesh(domeGeom, material);
    domeMesh.position.set(0, 3, -1);
    domeMesh.rotation.x = Math.PI / 2;
    pillarsGroup.add(domeMesh);

    // 3. Render and Cursor Tracking Loop
    const handleMouseMove = (event: MouseEvent) => {
      // Normalize mouse coordinates (-1 to 1)
      targetMouseRef.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      targetMouseRef.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener("mousemove", handleMouseMove);

    let animationFrameId: number;

    const animate = () => {
      // Smooth linear interpolation (lerp) for organic movement response
      mouseRef.current.x += (targetMouseRef.current.x - mouseRef.current.x) * 0.05;
      mouseRef.current.y += (targetMouseRef.current.y - mouseRef.current.y) * 0.05;

      // Base rotation (slow architectural spin)
      pillarsGroup.rotation.y = Date.now() * 0.00015;
      
      // Cursor responsive tilt
      pillarsGroup.rotation.x = mouseRef.current.y * 0.15;
      pillarsGroup.rotation.y += mouseRef.current.x * 0.25;

      // Subtle breath-like pulsing animation for active visual interest
      const pulseFactor = Math.sin(Date.now() * 0.001) * 0.02 + 0.1;
      material.opacity = pulseFactor;

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    // 4. Responsive Resizing
    const handleResize = () => {
      if (!containerRef.current) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener("resize", handleResize);

    // 5. Complete Cleanup to Prevent Memory Leaks
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);

      // Recursive object disposal
      columns.forEach((col) => {
        col.geometry.dispose();
      });
      domeGeom.dispose();
      material.dispose();
      renderer.dispose();
      
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="absolute inset-0 w-full h-full pointer-events-none opacity-50 z-0 select-none"
      aria-hidden="true" 
    />
  );
}
