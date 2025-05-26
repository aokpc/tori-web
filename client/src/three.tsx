import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { STLLoader } from "three/examples/jsm/loaders/STLLoader";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useMediaQuery } from "./media.ts";

import "./three.css";

export function GLBViewer({ src }: { src?: string | null }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const modelRef = useRef<THREE.Object3D>();
  const requestAnimate = useRef<() => void>();
  const rendererRef = useRef<THREE.WebGLRenderer>();
  const isMobile = useMediaQuery();
  const [quality, setQuality] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!src) return;
    let isChanged = true;

    if (!canvasRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      canvasRef.current.clientWidth / canvasRef.current.clientHeight,
      0.1,
      1000,
    );
    camera.position.set(0, 0, 40);

    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true,
    });
    rendererRef.current = renderer;
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(
      canvasRef.current.clientWidth,
      canvasRef.current.clientHeight,
    );
    scene.background = new THREE.Color(0xeeeeee);

    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(5, 5, 5);
    scene.add(light);

    const loader = new GLTFLoader() as any;
    loader.load(
      src,
      (gltf: any) => {
        const model = gltf.scene;
        gltf.scene.traverse((child: any) => {
          if (child instanceof THREE.Mesh) {
            const mat = child.material;
            if (mat.transmission) {
              mat.transmission = 0;
              mat.roughness = 0;
              mat.transparent = true;
              mat.opacity = 0.5;
            }
          }
        });
        model.scale.set(10, 10, 10);
        model.position.set(0, 0, 0);
        model.rotation.set(Math.PI / 6, Math.PI / 6, 0);
        scene.add(model);
        modelRef.current = model;
        isChanged = true;
      },
      undefined,
      (error: any) => {
        console.error("Error loading GLB file:", error);
      },
    );

    let lastX = 0;
    let lastY = 0;
    let isDragging = false;

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      lastX = e.clientX;
      lastY = e.clientY;
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging || !modelRef.current) return;
      const deltaX = e.clientX - lastX;
      const deltaY = e.clientY - lastY;
      lastX = e.clientX;
      lastY = e.clientY;

      modelRef.current.rotation.y += deltaX * 0.01;
      modelRef.current.rotation.x += deltaY * 0.01;
      isChanged = true;
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    const onMouseWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (!modelRef.current) return;
      const scale = modelRef.current.scale.x + e.deltaY * 0.01;
      if (scale <= 0) return;
      modelRef.current.scale.set(scale, scale, scale);
      isChanged = true;
    };

    const onTouchStart = (e: TouchEvent) => {
      for (const touch of e.touches) {
        lastX = touch.clientX;
        lastY = touch.clientY;
        isDragging = true;
      }
    };
    const onTouchMove = (e: TouchEvent) => {
      if (isDragging && modelRef.current) {
        e.preventDefault();
        const deltaX = e.touches[0].clientX - lastX;
        const deltaY = e.touches[0].clientY - lastY;
        lastX = e.touches[0].clientX;
        lastY = e.touches[0].clientY;
        modelRef.current.rotation.y += deltaX * 0.01;
        modelRef.current.rotation.x += deltaY * 0.01;
        isChanged = true;
      }
    };
    const onTouchEnd = () => {
      isDragging = false;
    };

    const onHashChange = () => {
      const hash = window.location.hash;
      if (!hash) return;
      if (!modelRef.current) return;
      const param = new URLSearchParams(hash.slice(1));

      if (param.has("x") && param.has("y")) {
        const x = parseFloat(param.get("x") || "0");
        const y = parseFloat(param.get("y") || "0");
        modelRef.current.rotation.y = y / 180 * Math.PI;
        modelRef.current.rotation.x = x / 180 * Math.PI;
        isChanged = true;
      }
      if (param.has("s")) {
        const scale = parseFloat(param.get("s") || "1");
        if (scale > 0) {
          modelRef.current.scale.set(scale, scale, scale);
          isChanged = true;
        }
      }
    };

    window.addEventListener("hashchange", onHashChange);

    canvasRef.current.addEventListener("mousedown", onMouseDown);
    canvasRef.current.addEventListener("mousemove", onMouseMove);
    canvasRef.current.addEventListener("mouseup", onMouseUp);
    canvasRef.current.addEventListener("mouseleave", onMouseUp);
    canvasRef.current.addEventListener("wheel", onMouseWheel);
    canvasRef.current.addEventListener("touchstart", onTouchStart);
    canvasRef.current.addEventListener("touchmove", onTouchMove);
    canvasRef.current.addEventListener("touchend", onTouchEnd);
    canvasRef.current.addEventListener("touchcancel", onTouchEnd);
    canvasRef.current.addEventListener("contextmenu", (e) => {
      e.preventDefault();
    });

    requestAnimate.current = () => {
      isChanged = true;
    };

    const animate = () => {
      if (!canvasRef.current) return;
      requestAnimationFrame(animate);
      if (!isChanged || !modelRef.current) return;
      modelRef.current.rotation.x = modelRef.current.rotation.x % (Math.PI * 2);
      modelRef.current.rotation.y = modelRef.current.rotation.y % (Math.PI * 2);
      renderer.render(scene, camera);
      isChanged = false;
      location.hash = `#x=${
        (modelRef.current.rotation.x ?? 0) / Math.PI * 180
      }&y=${(modelRef.current.rotation.y ?? 0) / Math.PI * 180}&s=${
        modelRef.current.scale.x ?? 1
      }`;
    };
    animate();
    setIsLoading(false);

    return () => {
      canvasRef.current?.removeEventListener("mousedown", onMouseDown);
      canvasRef.current?.removeEventListener("mousemove", onMouseMove);
      canvasRef.current?.removeEventListener("mouseup", onMouseUp);
      canvasRef.current?.removeEventListener("mouseleave", onMouseUp);
      canvasRef.current?.removeEventListener("wheel", onMouseWheel);
      canvasRef.current?.removeEventListener("touchstart", onTouchStart);
      canvasRef.current?.removeEventListener("touchmove", onTouchMove);
      canvasRef.current?.removeEventListener("touchend", onTouchEnd);
      canvasRef.current?.removeEventListener("touchcancel", onTouchEnd);
      window.removeEventListener("hashchange", onHashChange);
      renderer.dispose();
    };
  }, [src]);

  return (
    <div>
      {isLoading && <h1 className="loading">Loading...</h1>}
      <canvas
        ref={canvasRef}
        className={isMobile ? "three-mobile" : "three"}
      />
      <button
        type="button"
        onClick={() => {
          setQuality(!quality);
          if (rendererRef.current && requestAnimate.current) {
            rendererRef.current.setPixelRatio(
              quality ? 1 : window.devicePixelRatio,
            );
            requestAnimate.current();
          }
        }}
      >
        {quality ? "解像度:高" : "解像度:低"}
      </button>
      <button
        type="button"
        onClick={() => {
          location.hash = "#x=30&y=30&s=10";
        }}
      >
        正面
      </button>
      <button
        type="button"
        onClick={() => {
          const scale = modelRef.current?.scale.x ?? 1;
          location.hash = "#s="+ (scale ** 1.1);
        }}
      >
        拡大
      </button>
      <button
        type="button"
        onClick={() => {
          const scale = modelRef.current?.scale.x ?? 1;
          if (scale > 1) {
            location.hash = "#s=" + (scale ** 0.9);
          }
        }}
      >
        縮小
      </button>
    </div>
  );
}

/**
 * @deprecated
 */
export function STLViewer({ src }: { src: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const meshRef = useRef<THREE.Mesh>();

  useEffect(() => {
    if (!canvasRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      canvasRef.current.clientWidth / canvasRef.current.clientHeight,
      0.1,
      1000,
    );
    camera.position.set(
      0,
      0,
      40,
    ); // カメラ固定

    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true,
    });
    renderer.setSize(
      canvasRef.current.clientWidth,
      canvasRef.current.clientHeight,
    );
    scene.background = new THREE.Color(0xeeeeee);

    // ライト（必要なら）
    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(5, 5, 5);
    scene.add(light);

    const loader = new STLLoader();
    (loader as any).load(src, (geometry: any) => {
      const material = new THREE.MeshStandardMaterial({ color: 0xffaa22 });
      const mesh = new THREE.Mesh(geometry, material);
      mesh.scale.set(10, 10, 10);
      console.log(mesh);
      mesh.position.set(0, 0, 0);
      scene.add(mesh);
      meshRef.current = mesh;
      mesh.rotation.x = -Math.PI / 2;
    });

    let lastX = 0;
    let lastY = 0;
    let isDragging = false;

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      lastX = e.clientX;
      lastY = e.clientY;
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging || !meshRef.current) return;
      const deltaX = e.clientX - lastX;
      const deltaY = e.clientY - lastY;
      lastX = e.clientX;
      lastY = e.clientY;

      meshRef.current.rotation.y += deltaX * 0.01;
      meshRef.current.rotation.x += deltaY * 0.01;
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    canvasRef.current.addEventListener("mousedown", onMouseDown);
    canvasRef.current.addEventListener("mousemove", onMouseMove);
    canvasRef.current.addEventListener("mouseup", onMouseUp);
    canvasRef.current.addEventListener("mouseleave", onMouseUp);

    const animate = () => {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      canvasRef.current?.removeEventListener("mousedown", onMouseDown);
      canvasRef.current?.removeEventListener("mousemove", onMouseMove);
      canvasRef.current?.removeEventListener("mouseup", onMouseUp);
      canvasRef.current?.removeEventListener("mouseleave", onMouseUp);
      renderer.dispose();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="three"
    />
  );
}
