export const flameVertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

export const flameFragmentShader = `
  uniform float uTime;
  varying vec2 vUv;

  float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
  }

  void main() {
    float flicker = random(vec2(vUv.x * 4.0, uTime * 2.0)) * 0.25;
    float flame = smoothstep(0.82, 0.12, vUv.y) * smoothstep(0.0, 0.42, vUv.y);
    vec3 color = mix(vec3(1.0, 0.18, 0.04), vec3(1.0, 0.78, 0.18), vUv.y + flicker);
    gl_FragColor = vec4(color, flame * (0.72 + flicker));
  }
`;
