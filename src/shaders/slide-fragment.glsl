uniform sampler2D uTexture;
uniform vec2 uResolution;
uniform vec2 uZoomScale;
uniform vec2 uImageResolution;
varying vec2 vUv;
uniform float uProgress;

// Fullscreen Background Cover UV
vec2 coverUV(vec2 cUv, vec2 screenSize, vec2 imageSize) {
  float screenAspectRatio = screenSize.x / screenSize.y;
  float imageAspectRatio = imageSize.x / imageSize.y;
  vec2 st = screenAspectRatio < imageAspectRatio ? 
    vec2(imageSize.x * screenSize.y / imageSize.y, screenSize.y) 
    :
    vec2(screenSize.x, imageSize.y * screenSize.x / imageSize.x); 
  
  vec2 offset = (screenAspectRatio < imageAspectRatio ? 
    vec2((st.x - screenSize.x) / 2.0 * (1.0 + uProgress/100.0), 0.0) 
    :
    vec2(0.0, (st.y - screenSize.y) / 2.0)
  ) / st;

  return cUv * screenSize / st + offset; 
}

void main() {
  vec2 newUv = coverUV(vUv, uResolution, uImageResolution);
  vec3 texture = texture2D(uTexture, newUv).rgb;
  gl_FragColor = vec4(texture, 1.0);
}