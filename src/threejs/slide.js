import * as React from 'react'
import {useFrame, useThree} from '@react-three/fiber'
import {useTexture} from '@react-three/drei'
// import vertexShader from 'shaders/slide-vertex.glsl'
// import fragmentShader from 'shaders/slide-fragment.glsl'
import gsap from 'gsap'
import {lerp} from 'utils/lib'

// Custom Slide is more customizable than a drei <Image>
function Slide({src, width, height, isActive, progress, ...props}) {
  const ref = React.useRef()
  const {viewport} = useThree()
  const texture = useTexture(src)

  React.useEffect(() => {
    if (ref.current.material) {
      // Zoom scale along with uProgress is used to interpolate the vertex positions to fit viewport. Currently the vertex shader has a defined width/height and when we multiply it by this proportion, the end result will just be the viewport.
      ref.current.material.uniforms.uZoomScale.value.x = viewport.width / width
      ref.current.material.uniforms.uZoomScale.value.y = viewport.height / height

      // uFullScreenProgress is used to interpolate width to viewport.width
      gsap.to(ref.current.material.uniforms.uFullScreenProgress, {
        value: isActive ? 1 : 0,
      })

      // Adjusts width of texture based on if it's active
      gsap.to(ref.current.material.uniforms.uResolution.value, {
        x: isActive ? viewport.width : width,
        y: isActive ? viewport.height : height
      })
    }
  }, [width, height, viewport, isActive])

  const shaderArgs = React.useMemo(() => ({
    uniforms: {
      // uProgress tracks progress is used for individual slide parallax 
      uProgress: {value: progress.current},
      // uFullScreenProgress interpolates width to viewport.width 
      uFullScreenProgress: {value: 0},
      // uZoomScale holds proportion for full screen verticies
      uZoomScale: {value: {x: 1, y: 1}},
      uTexture: {value: texture},
      // uResolution is size of the plane in pixels
      uResolution: {value: {x: 1, y: 1}},
      // uImageResolution is size of the image in pixels
      uImageResolution: {value: {
        x: texture.source.data.width,
        y: texture.source.data.height
      }}
    },
    vertexShader: `
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
      }`,
    fragmentShader: `
      uniform sampler2D uTexture;
      uniform vec2 uResolution;
      uniform vec2 uZoomScale;
      uniform vec2 uImageResolution;
      varying vec2 vUv;
      uniform float uProgress;

      // Fullscreen Background Cover UV
      vec2 coverUV(vec2 cUv, vec2 screenSize, vec2 imageSize) {
        float slideAspectRatio = screenSize.x / screenSize.y;
        float imageAspectRatio = imageSize.x / imageSize.y;
        
        vec2 st = slideAspectRatio < imageAspectRatio ? 
          vec2(imageSize.x * screenSize.y / imageSize.y, screenSize.y) 
          :
          vec2(screenSize.x, imageSize.y * screenSize.x / imageSize.x); 
        vec2 offset = (slideAspectRatio < imageAspectRatio ? 
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
      }`,
  }), [texture, progress])

  useFrame((state, delta) => {
    // We cap delta at 0.1 because now it can't accumulate while the user changes the tab, it will simply stop
    if (delta < 0.1) {
      // Lerp uProgress from current uProgress to progress. 
      ref.current.material.uniforms.uProgress.value = lerp(
        ref.current.material.uniforms.uProgress.value,
        progress.current,
        0.05
      )
    }
  })

  return (
    <mesh 
      ref={ref} 
      {...props}
    >
      <planeGeometry args={[width, height, 30, 30]}/>
      <shaderMaterial args={[shaderArgs]}/>
    </mesh>
  )
}

export {Slide}