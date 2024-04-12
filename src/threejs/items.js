/** @jsxImportSource @emotion/react */
import * as React from 'react'
import * as THREE from 'three'
import {useFrame, useThree} from '@react-three/fiber'
import {useNavigate} from 'react-router-dom'
import {useScroll, Image, ScrollControls, Scroll} from '@react-three/drei'
import {data} from 'data/data'
import {useControls} from 'leva'

const miniMapGeometry = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(0, -0.05, 0), new THREE.Vector3(0, 0.05, 0)])
const hoveredLineGeometry = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(-0.1, 0, 0), new THREE.Vector3(0.1, 0, 0)])
const lineMaterial = new THREE.LineBasicMaterial({color: '#000'})

function Minimap() {
  const ref = React.useRef()
  const scroll = useScroll()
  const {height} = useThree((state) => state.viewport)

  useFrame((state, delta) => {
    ref.current.children.forEach((child, i) => {
      const y = scroll.curve(i / data.length - 2 / data.length, 5 / data.length) / 2
      child.position.y = THREE.MathUtils.damp(child.position.y, (-height / 2 + 0.6) + y / 10, 8, delta)
    })
  })

  return (
    <group ref={ref}>
      {data.map((url, i) => (
        <line
          key={i}
          geometry={miniMapGeometry}
          material={lineMaterial}
          position={[i * 0.06 - data.length * 0.03, -height / 2 + 0.6, 0]}
        />
      ))}
    </group>
  )
}
let scurve = 0;
let mesh;
window.addEventListener('keydown', (e) => {
  if (e.key === 'a') {
    console.log(scurve)
  } 
  if (e.key === 'b') {
    console.log(mesh)
  }
})



function Item({index, position, linePosition, scale, navigate, ...props}) {
  const imageRef = React.useRef()
  const lineRef = React.useRef()
  const scroll = useScroll()
  const [isHovered, setIsHovered] = React.useState(false)
  
  const {width} = useThree((state) => state.viewport)

  const r = useControls({
    rx: {value: 1, min: 1, max: 50, step: 0.01},
    ry: {value: 0, min: -10, max: 10, step: 0.01},
    pz: {value: 0, min: -10, max: 10, step: 0.01},
  })

  if (index === 0) {
    mesh = imageRef
  }

  React.useEffect(() => {
    document.body.style.cursor = isHovered ? 'pointer' : 'auto'
  }, [isHovered])

  useFrame((state, delta) => {
    const y = scroll.curve(index / data.length - 2 / data.length, 5 / data.length) / 2
    
    // console.log(width)
    const blur = scroll.curve(index / data.length - (width-2.3) / data.length, width / data.length)

    // Increment y position on centered Image
    imageRef.current.position.y = THREE.MathUtils.damp(imageRef.current.position.y, y, 8, delta)

    // Hide the hovered line and set its position
    lineRef.current.scale.set(0, 0, 0)
    lineRef.current.position.y = 2.25 + y

    // If hovered, shift slide upwards, show line.
    if (isHovered && (scroll.delta * 100) < 0.1) {
      imageRef.current.position.y = THREE.MathUtils.damp(imageRef.current.position.y, y + 0.25, 8, delta)
      lineRef.current.scale.x = THREE.MathUtils.damp(lineRef.current.scale.x, y + 5, 8, delta)
    } else {
      imageRef.current.position.y = THREE.MathUtils.damp(imageRef.current.position.y, y, 6, delta)
      lineRef.current.scale.x = THREE.MathUtils.damp(lineRef.current.scale.x, 0, 8, delta)
    }

    // const curve = scroll.curve(0, 1)
    const speed = (scroll.delta * 120) < 0.001 ?  0 : scroll.delta * 120;
    
    scurve = scroll.curve(0, 1)

    imageRef.current.material.uniforms.map.value.offset.set(100, 0);
    // const range = scroll.range(0, 1)
    
    // Postion.z moves back when scrolling
    // imageRef.current.position.z = -(0.5 - y) * speed * 2

    // if (index === 0) {
    //   console.log(Math.max(0, 2 - (1-blur) * speed*3.5))
    // }
  
    // imageRef.current.material.position[0] = THREE.MathUtils.damp(imageRef.current.scale.x, imageRef.current.material.position[0], 6, delta)

    // imageRef.current.position.x = 1 * y;

    imageRef.current.material.scale[0] = Math.max(0.01, 2 - (1-blur) * speed)
    // console.log(imageRef.current.material.scale)
    // console.log(imageRef.current.material)

    // Position.r rotates when scrolling
    // imageRef.current.rotation.y = (1 - curve) * speed * y * 5

    // r.ry = (1 - curve) * speed
    
    // console.log(speed)
    // r.ry *= 

    // r.pz

  })


  return (
    <group>
      <line
        ref={lineRef}
        scale={[0, 0, 0]}
        geometry={hoveredLineGeometry}
        material={lineMaterial}
        position={[linePosition[0], 0, 0]}
      />
      <Image
        ref={imageRef}
        index={index}
        position={[position[0], position[1], r.pz]}
        scale={scale}
        onPointerOver={() => setIsHovered(true)}
        onPointerOut={() => setIsHovered(false)}
        // onClick={navigate}
        rotation-y={r.ry}
        {...props}
      />
    </group>
  )
}

function Items({w = 2}) {
  const {width} = useThree(state => state.viewport)
  const navigate = useNavigate()

  return(
    <ScrollControls 
      horizontal
      distance={0.6}
      pages={(width - w + 0.15 + data.length * (w + 0.15)) / width}
    >
      <Scroll>
        {data.map((project, i) => (
          <Item
            key={i}
            index={i}
            linePosition={[i * w + i * 0.15, 2.75, 0]}
            position={[i * w + i * 0.15, 0, 0]}
            scale={[w, 4, 1]}
            url={project.src}
            navigate={() => navigate(project.link)}
          />
        ))}
      </Scroll>
      <Minimap/>
    </ScrollControls>
  )
}

export {Item, Items}

