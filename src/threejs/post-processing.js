import {useThree} from '@react-three/fiber'
import * as React from 'react'
import * as THREE from 'three'
import {MeshTransmissionMaterial} from '@react-three/drei'
import { useLocation } from 'react-router-dom'
const PostProcessing = React.forwardRef((_, ref) => {
  const {viewport} = useThree()
  const location = useLocation()

  return viewport.width > 5.6 && location.pathname === "/" ? (
    <mesh position={[0, 0, 0]}>
      <planeGeometry args={[viewport.width, viewport.height]}/>
      <MeshTransmissionMaterial
        ref={ref}
        toneMapped={false}
        background={new THREE.Color('#fff')}
        transmission={1}
        roughness={0}
        thickness={0}
        chromaticAberration={0.02}
        anisotropy={0}
        ior={0.9}
      />
    </mesh>
  ) : null
})

export {PostProcessing}