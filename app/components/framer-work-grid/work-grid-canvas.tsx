"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export function WorkGridCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;

    const width = 1608;
    const height = 1174;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(width, height, false);

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xd9d9d9);

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.z = 4;

    const geometry = new THREE.BoxGeometry(1.2, 1.2, 1.2);
    const material = new THREE.MeshNormalMaterial();
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    let frame = 0;
    const animate = () => {
      frame = requestAnimationFrame(animate);
      mesh.rotation.x += 0.008;
      mesh.rotation.y += 0.012;
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(frame);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <canvas
      data-engine="three.js r136"
      width={1608}
      height={1174}
      ref={ref}
      style={{
        display: "block",
        width: "804px",
        height: "587px",
      }}
    />
  );
}
