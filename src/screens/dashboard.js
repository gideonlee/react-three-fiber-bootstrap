/** @jsxImportSource @emotion/react */
import * as React from 'react'
import {Canvas} from '@react-three/fiber'
import {AccumulativeShadows, RandomizedLight, OrbitControls} from '@react-three/drei'
import * as mq from 'utils/media-queries'
import {Box, Sphere} from 'objects/lib'
import {EnvironmentBlur} from 'utils/lib'

function DashboardScreen() {
  return (
    <div
      css={{
        height: '100vh',
        [mq.extraSmall]: {
          minHeight: '400px'
        },
      }}
    >
      <React.Suspense fallback={null}>
        <Canvas 
          shadows
          camera={{position: [3, 3, 3]}}
        >
          <EnvironmentBlur/>
          <ambientLight intensity={0.5} />
          <spotLight 
            position={[10, 10, 10]} 
            angle={0.15} 
            penumbra={1}
          />
          <group position={[0, -0.65, 0]}>
            <Sphere />
            <AccumulativeShadows temporal frames={200} color="purple" colorBlend={0.5} opacity={1} scale={10} alphaTest={0.85}>
              <RandomizedLight amount={8} radius={5} ambient={0.5} position={[5, 3, 2]} bias={0.001} />
            </AccumulativeShadows>
            <Box 
              position={[1.5, 2, 0]} 
              rotation={[1, 1, 1]}
            />
          </group>

          <pointLight position={[-10, -10, -10]}/>
          <OrbitControls 
            position={[3, 3, 3]}
            rotation={[100, 0, 0]}
            minPolarAngle={Math.PI/2} 
            maxPolarAngle={Math.PI/2}
            autoRotate autoRotateSpeed={4} 
            enablePan={false} 
            enableZoom={false} 
          />
        </Canvas>
      </React.Suspense>
    </div>
  )
}

export {DashboardScreen}
