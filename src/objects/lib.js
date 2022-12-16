/** @jsxImportSource @emotion/react */
import * as React from 'react'
import {useFrame, useLoader} from '@react-three/fiber'
import {useControls} from 'leva'
import {Center} from '@react-three/drei'
import {TextureLoader} from 'three/src/loaders/TextureLoader'
import llama from 'assets/llama.png'

function Box(props) {
  // This reference gives us direct access to the THREE.Mesh object
  const ref = React.useRef()

  // Hold state for hovered and clicked events
  const [isHovered, setIsHovered] = React.useState(false)
  const [isClicked, setIsClicked] = React.useState(false)

  // Subscribe this component to the render-loop, rotate the mesh every frame (requestAnimationFrame)
  useFrame((state, delta) => (ref.current.rotation.y += delta/4))

  // Load texture
  const colorMap = useLoader(TextureLoader, llama)

  // Custom Shader
  const material = React.useMemo(() => ({
    uniforms: {
      time: {value: 1.0},
      colorMap: {value: colorMap},
      isHovered: {value: isHovered}
    },
    vertexShader: `
      varying vec2 vUv; 
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform sampler2D colorMap;
      varying vec2 vUv; 
      uniform bool isHovered;

      
      void main() {
        vec4 texture = texture2D(colorMap, vUv);
        float bw = (texture.r + texture.b + texture.g)/4.0;

        vec4 bwTexture = vec4(bw, bw, bw, 1.0);

        if (isHovered) {
          gl_FragColor = mix(bwTexture, texture, 0.5);
        } else {
          gl_FragColor = texture;
        }
      }
    `
  }), [isHovered, colorMap])

  // Regular Threejs elements expressed in JSX
  return (
    <mesh
      top
      {...props}
      castShadow
      ref={ref}
      scale={isClicked ? 1.5 : 1}
      onClick={(event) => setIsClicked(!isClicked)}
      onPointerOver={(event) => setIsHovered(true)}
      onPointerOut={(event) => setIsHovered(false)}
    >
      <boxGeometry args={[1, 1, 1]} />
      <shaderMaterial 
        attach='material' 
        args={[material]}
      />
    </mesh>
  )
}

function Sphere() {
  
  const {roughness} = useControls({
    roughness: {value: 0.3, min: 0, max: 1}
  })
  return (
    <Center top>
      <mesh castShadow>
        <sphereGeometry args={[0.75, 64, 64]} />
        <meshStandardMaterial 
          metalness={1} 
          roughness={roughness} 
        />
      </mesh>
    </Center>
  )
}


export {Box, Sphere}