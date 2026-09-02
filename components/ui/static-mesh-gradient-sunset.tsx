"use client";

import { useEffect, useRef } from "react";

const vertexShader = `attribute vec2 position; void main() { gl_Position = vec4(position, 0., 1.); }`;

const fragmentShader = `
precision mediump float;
uniform vec2 resolution;
float hash(vec2 p) { return fract(sin(dot(p, vec2(41.0, 289.0))) * 15731.743); }

void main() {
  vec2 p = (gl_FragCoord.xy - .5 * resolution.xy) / min(resolution.x, resolution.y);
  vec3 mint = vec3(.584, .835, .698);
  vec3 sun = vec3(1.0, .953, .690);
  vec3 forest = vec3(.031, .110, .082);
  vec3 green = vec3(.176, .416, .310);
  vec2 a = vec2(-.42, .42), b = vec2(.48, .34), c = vec2(-.20, -.42), d = vec2(.58, -.28);
  float wa = exp(-dot(p-a, p-a) * 3.2);
  float wb = exp(-dot(p-b, p-b) * 4.4);
  float wc = exp(-dot(p-c, p-c) * 3.7);
  float wd = exp(-dot(p-d, p-d) * 3.0);
  vec3 col = (mint * wa + sun * wb + forest * wc + green * wd) / (wa + wb + wc + wd);
  gl_FragColor = vec4(clamp(col, 0., 1.), 1.);
}`;

export function StaticMeshGradientSunset({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const gl = canvas?.getContext("webgl", { antialias: false });
    if (!canvas || !gl) return;
    const compile = (type: number, source: string) => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      return shader;
    };
    const vertex = compile(gl.VERTEX_SHADER, vertexShader);
    const fragment = compile(gl.FRAGMENT_SHADER, fragmentShader);
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

    const draw = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rawWidth = Math.max(1, Math.round(rect.width * dpr));
      const rawHeight = Math.max(1, Math.round(rect.height * dpr));
      const scale = Math.min(1, Math.sqrt(6_000_000 / (rawWidth * rawHeight)));
      canvas.width = Math.max(1, Math.round(rawWidth * scale));
      canvas.height = Math.max(1, Math.round(rawHeight * scale));
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform2f(resolution, canvas.width, canvas.height);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };
    const observer = new ResizeObserver(draw);
    observer.observe(canvas);
    draw();
    return () => {
      observer.disconnect();
      gl.deleteBuffer(buffer);
      gl.deleteProgram(program);
      gl.deleteShader(vertex);
      gl.deleteShader(fragment);
    };
  }, []);

  return <canvas ref={ref} aria-hidden="true" className={className} style={{ display: "block", width: "100%", height: "100%" }} />;
}
