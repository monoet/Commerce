'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import type { CSSProperties } from 'react';
import * as THREE from 'three';
import styles from './light-pillar.module.css';

type LightPillarProps = {
  topColor?: string;
  bottomColor?: string;
  accentColor?: string;

  intensity?: number;
  rotationSpeed?: number;
  interactive?: boolean;
  className?: string;

  glowAmount?: number;
  pillarWidth?: number;
  pillarHeight?: number;
  noiseIntensity?: number;

  shimmer?: number;
  opacity?: number;

  mixBlendMode?: CSSProperties['mixBlendMode'];
  pillarRotation?: number;
  respectReducedMotion?: boolean;
};

export default function LightPillar({
  topColor = '#F7F1E9',
  bottomColor = '#D6C4AE',
  accentColor = '#E9D2C5',

  intensity = 0.75,
  rotationSpeed = 0.16,
  interactive = false,
  className = '',

  glowAmount = 0.004,
  pillarWidth = 2.6,
  pillarHeight = 0.55,
  noiseIntensity = 0.22,

  shimmer = 0.18,
  opacity = 1,

  mixBlendMode = 'soft-light',
  pillarRotation = 0,
  respectReducedMotion = true
}: LightPillarProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const rafRef = useRef<number | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const materialRef = useRef<THREE.ShaderMaterial | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.OrthographicCamera | null>(null);
  const geometryRef = useRef<THREE.PlaneGeometry | null>(null);

  const mouseRef = useRef(new THREE.Vector2(0, 0));
  const timeRef = useRef(0);

  const [webGLSupported, setWebGLSupported] = useState(true);

  const prefersReducedMotion = useMemo(() => {
    if (typeof window === 'undefined') return false;
    return (
      window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches ?? false
    );
  }, []);

  const effectiveRotationSpeed = useMemo(() => {
    if (respectReducedMotion && prefersReducedMotion) return 0;
    return rotationSpeed;
  }, [respectReducedMotion, prefersReducedMotion, rotationSpeed]);

  const parseColor = (hex: string) => {
    const c = new THREE.Color(hex);
    return new THREE.Vector3(c.r, c.g, c.b);
  };

  const topVec = useMemo(() => parseColor(topColor), [topColor]);
  const bottomVec = useMemo(() => parseColor(bottomColor), [bottomColor]);
  const accentVec = useMemo(() => parseColor(accentColor), [accentColor]);

  useEffect(() => {
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) setWebGLSupported(false);
    } catch {
      setWebGLSupported(false);
    }
  }, []);

  useEffect(() => {
    if (!containerRef.current || !webGLSupported) return;

    const container = containerRef.current;

    const getSize = () => ({
      w: Math.max(1, container.clientWidth),
      h: Math.max(1, container.clientHeight)
    });

    const { w: width, h: height } = getSize();

    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    cameraRef.current = camera;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: false,
        alpha: true,
        depth: false,
        stencil: false,
        powerPreference: 'high-performance',
        premultipliedAlpha: false
      });
    } catch {
      setWebGLSupported(false);
      return;
    }

    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    if (renderer.outputColorSpace !== undefined) {
      renderer.outputColorSpace = THREE.SRGBColorSpace;
    }

    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    const vertexShader = `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = vec4(position, 1.0);
      }
    `;

    const fragmentShader = `
      uniform float uTime;
      uniform vec2  uResolution;
      uniform vec2  uMouse;
      uniform vec3  uTopColor;
      uniform vec3  uBottomColor;
      uniform vec3  uAccentColor;
      uniform float uIntensity;
      uniform bool  uInteractive;
      uniform float uGlowAmount;
      uniform float uPillarWidth;
      uniform float uPillarHeight;
      uniform float uNoiseIntensity;
      uniform float uPillarRotation;
      uniform float uShimmer;
      uniform float uOpacity;
      varying vec2 vUv;

      const float PI = 3.141592653589793;
      const float EPSILON = 0.001;
      const float E = 2.71828182845904523536;
      const float HALF = 0.5;

      mat2 rot(float a) {
        float s = sin(a), c = cos(a);
        return mat2(c, -s, s, c);
      }

      float noise(vec2 coord) {
        float G = E;
        vec2 r = (G * sin(G * coord));
        return fract(r.x * r.y * (1.0 + coord.x));
      }

      vec3 applyWaveDeformation(vec3 pos, float timeOffset) {
        float frequency = 1.0;
        float amplitude = 1.0;
        vec3 d = pos;
        for (float i = 0.0; i < 4.0; i++) {
          d.xz *= rot(0.4);
          float phase = timeOffset * i * 2.0;
          vec3 osc = cos(d.zxy * frequency - phase);
          d += osc * amplitude;
          frequency *= 2.0;
          amplitude *= HALF;
        }
        return d;
      }

      float blendMin(float a, float b, float k) {
        float scaledK = k * 4.0;
        float h = max(scaledK - abs(a - b), 0.0);
        return min(a, b) - h * h * 0.25 / scaledK;
      }
      float blendMax(float a, float b, float k) { return -blendMin(-a, -b, k); }

      void main() {
        vec2 fragCoord = vUv * uResolution;
        vec2 uv = (fragCoord * 2.0 - uResolution) / uResolution.y;

        float rotAngle = uPillarRotation * PI / 180.0;
        uv *= rot(rotAngle);

        vec3 origin = vec3(0.0, 0.0, -10.0);
        vec3 dir = normalize(vec3(uv, 1.0));

        float maxDepth = 50.0;
        float depth = 0.1;

        mat2 rotX = rot(uTime * 0.3);
        if (uInteractive && length(uMouse) > 0.0) {
          rotX = rot(uMouse.x * PI * 2.0);
        }

        vec3 col = vec3(0.0);

        for (float i = 0.0; i < 100.0; i++) {
          vec3 pos = origin + dir * depth;
          pos.xz *= rotX;

          vec3 d = pos;
          d.y *= uPillarHeight;
          d = applyWaveDeformation(d + vec3(0.0, uTime, 0.0), uTime);

          vec2 cosinePair = cos(d.xz);
          float dist = length(cosinePair) - 0.2;

          float radialBound = length(pos.xz) - uPillarWidth;
          dist = blendMax(radialBound, dist, 1.0);
          dist = abs(dist) * 0.15 + 0.01;

          vec3 grad = mix(uBottomColor, uTopColor, smoothstep(15.0, -15.0, pos.y));

          float rnd = noise(gl_FragCoord.xy * 0.35 + uTime);
          float sh = (sin(pos.y * 0.35 + uTime * 1.8 + rnd * 2.5) * 0.5 + 0.5);
          grad = mix(grad, uAccentColor, sh * uShimmer);

          col += grad * pow(1.0 / dist, 1.0);

          if (dist < EPSILON || depth > maxDepth) break;
          depth += dist;
        }

        float widthNorm = uPillarWidth / 3.0;
        col = tanh(col * uGlowAmount / widthNorm);

        float rnd2 = noise(gl_FragCoord.xy);
        col -= rnd2 / 15.0 * uNoiseIntensity;

        float lum = dot(col, vec3(0.2126, 0.7152, 0.0722));
        float a = clamp(lum * 3.0, 0.0, 1.0) * uOpacity;

        gl_FragColor = vec4(col * uIntensity, a);
      }
    `;

    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uResolution: { value: new THREE.Vector2(width, height) },
        uMouse: { value: mouseRef.current },

        uTopColor: { value: topVec.clone() },
        uBottomColor: { value: bottomVec.clone() },
        uAccentColor: { value: accentVec.clone() },

        uIntensity: { value: intensity },
        uInteractive: { value: interactive },

        uGlowAmount: { value: glowAmount },
        uPillarWidth: { value: pillarWidth },
        uPillarHeight: { value: pillarHeight },
        uNoiseIntensity: { value: noiseIntensity },
        uPillarRotation: { value: pillarRotation },

        uShimmer: { value: shimmer },
        uOpacity: { value: opacity }
      },
      transparent: true,
      depthWrite: false,
      depthTest: false
    });

    materialRef.current = material;

    const geometry = new THREE.PlaneGeometry(2, 2);
    geometryRef.current = geometry;

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    let pointerCleanup: (() => void) | null = null;
    if (interactive) {
      const onMove = (event: PointerEvent) => {
        const rect = container.getBoundingClientRect();
        const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        const y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
        mouseRef.current.set(x, y);
      };
      container.addEventListener('pointermove', onMove, { passive: true });
      pointerCleanup = () => container.removeEventListener('pointermove', onMove);
    }

    const ro = new ResizeObserver(() => {
      if (!rendererRef.current || !materialRef.current) return;
      const { w: nextWidth, h: nextHeight } = getSize();
      rendererRef.current.setSize(nextWidth, nextHeight);
      materialRef.current.uniforms.uResolution.value.set(nextWidth, nextHeight);
    });
    ro.observe(container);

    let last = performance.now();
    const targetFPS = 60;
    const frame = 1000 / targetFPS;

    const animate = (now: number) => {
      const renderer = rendererRef.current;
      const material = materialRef.current;
      const scene = sceneRef.current;
      const camera = cameraRef.current;
      if (!renderer || !material || !scene || !camera) return;

      const dt = now - last;
      if (dt >= frame) {
        timeRef.current += 0.016 * effectiveRotationSpeed;
        material.uniforms.uTime.value = timeRef.current;
        renderer.render(scene, camera);
        last = now - (dt % frame);
      }
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      ro.disconnect();
      pointerCleanup?.();

      if (rafRef.current) cancelAnimationFrame(rafRef.current);

      if (rendererRef.current) {
        rendererRef.current.dispose();
        if (container.contains(rendererRef.current.domElement)) {
          container.removeChild(rendererRef.current.domElement);
        }
      }
      materialRef.current?.dispose();
      geometryRef.current?.dispose();

      rendererRef.current = null;
      materialRef.current = null;
      sceneRef.current = null;
      cameraRef.current = null;
      geometryRef.current = null;
      rafRef.current = null;
    };
  }, [
    webGLSupported,
    effectiveRotationSpeed,
    interactive,
    topVec,
    bottomVec,
    accentVec,
    intensity,
    glowAmount,
    pillarWidth,
    pillarHeight,
    noiseIntensity,
    pillarRotation,
    shimmer,
    opacity
  ]);

  useEffect(() => {
    const material = materialRef.current;
    if (!material) return;

    material.uniforms.uTopColor.value.copy(topVec);
    material.uniforms.uBottomColor.value.copy(bottomVec);
    material.uniforms.uAccentColor.value.copy(accentVec);

    material.uniforms.uIntensity.value = intensity;
    material.uniforms.uGlowAmount.value = glowAmount;
    material.uniforms.uPillarWidth.value = pillarWidth;
    material.uniforms.uPillarHeight.value = pillarHeight;
    material.uniforms.uNoiseIntensity.value = noiseIntensity;
    material.uniforms.uPillarRotation.value = pillarRotation;
    material.uniforms.uShimmer.value = shimmer;
    material.uniforms.uOpacity.value = opacity;
    material.uniforms.uInteractive.value = interactive;
  }, [
    topVec,
    bottomVec,
    accentVec,
    intensity,
    glowAmount,
    pillarWidth,
    pillarHeight,
    noiseIntensity,
    pillarRotation,
    shimmer,
    opacity,
    interactive
  ]);

  if (!webGLSupported) {
    return (
      <div
        className={`${styles.fallback} ${className}`}
        style={{ mixBlendMode }}
      >
        WebGL not supported
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={`${styles.container} ${className}`}
      style={{ mixBlendMode }}
      aria-hidden="true"
    />
  );
}
