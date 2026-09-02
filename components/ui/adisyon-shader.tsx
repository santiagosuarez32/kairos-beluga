"use client";

import { useEffect, useRef } from "react";

const VERTEX_SHADER = `
attribute vec2 position;
void main() { gl_Position = vec4(position, 0.0, 1.0); }
`;

// Waves shader palette from the supplied component.
const FRAGMENT_SHADER = `
precision mediump float;
uniform vec2 resolution;
uniform float time;

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
}

float noise(vec2 p) {
  vec2 i = floor(p), f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1., 0.)), f.x),
             mix(hash(i + vec2(0., 1.)), hash(i + vec2(1., 1.)), f.x), f.y);
}

float fbm(vec2 p) {
  float value = 0.0;
  float amplitude = 0.5;
  for (int i = 0; i < 5; i++) {
    value += noise(p) * amplitude;
    p = p * 2.04 + vec2(13.4, 7.8);
    amplitude *= 0.5;
  }
  return value;
}

void main() {
  vec2 uv = gl_FragCoord.xy / resolution.xy;
  vec2 p = (gl_FragCoord.xy - .5 * resolution.xy) / min(resolution.x, resolution.y);
  float t = time * -.18;
  // Soft, expansive wave fields, matching the supplied shader's cloudy motion.
  float wave = sin(p.x * 2.25 + t) * .18 + sin(p.x * 4.7 - t * .55) * .075;
  wave += (fbm(p * 1.35 + vec2(t * .11, -t * .06)) - .5) * .20;
  // Tilt the light field so it forms the broad diagonal planes from the reference.
  float field = smoothstep(.18, .88, uv.y + wave + p.x * .18 + .17);
  vec3 ink = vec3(.012, .110, .149);
  vec3 graphite = vec3(.106, .424, .659);
  vec3 cyan = vec3(.353, .824, .957);
  vec3 bone = vec3(.918, .976, 1.0);
  vec3 color = mix(ink, graphite, field);
  color = mix(color, cyan, smoothstep(.28, .72, field));
  color = mix(color, bone, smoothstep(.64, 1.0, field));
  float vignette = 1.0 - length(uv - vec2(.5, .57)) * .18;
  float grain = (hash(gl_FragCoord.xy + time) - .5) * .101;
  gl_FragColor = vec4(clamp(color * vignette + grain, 0., 1.), 1.);
}
`;

export function ShaderBackground({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const gl = canvas?.getContext("webgl", { antialias: false });
    if (!canvas || !gl) return;

    const compile = (type: number, source: string) => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      return shader;
    };

    const vertex = compile(gl.VERTEX_SHADER, VERTEX_SHADER);
    const fragment = compile(gl.FRAGMENT_SHADER, FRAGMENT_SHADER);
    const program = gl.createProgram();
    if (!vertex || !fragment || !program) return;

    gl.attachShader(program, vertex);
    gl.attachShader(program, fragment);
    gl.linkProgram(program);
    gl.useProgram(program);

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const position = gl.getAttribLocation(program, "position");
    gl.enableVertexAttribArray(position);
    gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);

    const resolution = gl.getUniformLocation(program, "resolution");
    const time = gl.getUniformLocation(program, "time");
    let frame = 0;
    let visible = true;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      const rawWidth = Math.max(1, Math.round(rect.width * ratio));
      const rawHeight = Math.max(1, Math.round(rect.height * ratio));
      // Preserve a crisp image while keeping the shader efficient on 4K screens.
      const scale = Math.min(1, Math.sqrt(3_000_000 / (rawWidth * rawHeight)));
      canvas.width = Math.max(1, Math.round(rawWidth * scale));
      canvas.height = Math.max(1, Math.round(rawHeight * scale));
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    const render = (now: number) => {
      if (!visible) return;
      gl.uniform2f(resolution, canvas.width, canvas.height);
      gl.uniform1f(time, now * .001);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      frame = requestAnimationFrame(render);
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible && !frame) frame = requestAnimationFrame(render);
      if (!visible && frame) { cancelAnimationFrame(frame); frame = 0; }
    });

    observer.observe(canvas);
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);
    resize();
    window.addEventListener("resize", resize);
    frame = requestAnimationFrame(render);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      resizeObserver.disconnect();
      window.removeEventListener("resize", resize);
      gl.deleteBuffer(buffer);
      gl.deleteProgram(program);
      gl.deleteShader(vertex);
      gl.deleteShader(fragment);
    };
  }, []);

  return <canvas aria-hidden="true" ref={canvasRef} className={className} />;
}
