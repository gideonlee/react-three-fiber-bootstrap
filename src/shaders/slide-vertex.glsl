uniform float uFullScreenProgress;
uniform vec2 uZoomScale;
varying vec2 vUv;

void main() {
  vUv = uv;
  vec3 pos = position;
  float angle = uFullScreenProgress * 3.14159 / 2.0;
  float wave = cos(angle);
  float waveCoefficient = sin(length(uv - 0.5) * 10.0 + uFullScreenProgress * 12.0) * 0.5 + 0.5;
  
  pos.x *= mix(1.0, uZoomScale.x + wave * waveCoefficient, uFullScreenProgress);
  pos.y *= mix(1.0, uZoomScale.y + wave * waveCoefficient, uFullScreenProgress);

  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}