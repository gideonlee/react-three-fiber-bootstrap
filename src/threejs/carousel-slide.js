import * as React from 'react'
import * as THREE from 'three'
import {useFrame, useThree} from '@react-three/fiber'
import {Slide} from './slide'
import gsap from 'gsap'
import {useTitle} from 'context/title'
import {useNavigate} from 'react-router-dom'
import {data} from 'data/data'
import {useLenis} from '@studio-freight/react-lenis'

function CarouselSlide({index, width, height, activeIndex, setActiveIndex, progress, slide}) {
  const ref = React.useRef()
  const lineRef = React.useRef()
  const [isHovered, setIsHovered] = React.useState(false)
  const [isActive, setIsActive] = React.useState(false)
  const [isCloseActive, setIsCloseActive] = React.useState(false)
  const [, setTitle] = useTitle()
  const {viewport} = useThree()
  const navigate = useNavigate()
  const timeout = React.useRef()
  const path = window.location.pathname

  const hoveredLineGeometry = React.useMemo(() => new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(-0.1, 0, 0), new THREE.Vector3(0.1, 0, 0)]), [])

  const lineMaterial = React.useMemo(() => new THREE.LineBasicMaterial({color: '#000'}), [])

  // Sets activeIndex and pushes the invisible closeActive mesh to the front
  // closeActive mesh is closed when clicked.
  React.useEffect(() => {
    if (activeIndex === index) {
      setActiveIndex(index)
      setIsActive(true)
      setIsCloseActive(true)
    } else {
      setIsActive(null)
      clearTimeout(timeout.current)

      timeout.current = setTimeout(() => {
        setIsCloseActive(false)
      }, 1500)
    }
  }, [index, setActiveIndex, activeIndex])

  // Sends individual slide slightly back (z axis: -0.01) if it's not active  
  // Selected slide is pushed to the front (z axis: 0)
  React.useEffect(() => {
    gsap.killTweensOf(ref.current.position)
    gsap.to(ref.current.position, {
      z: isActive ? 0 : -0.01,
      duration: 0.2,
      ease: 'power3.out',
      // delay depends on how long it takes the active slide to revert back to normal
      delay: isActive ? 0 : 2,
    })
  }, [isActive])

  // Hover zoom in
  React.useEffect(() => {
    const path = window.location.pathname
    // Set the title context if there is not activeIndex
    if (isHovered && activeIndex === null) {
      setTitle(slide.title)
    } 
    
    // Cursor as a pointer if hovering
    if (activeIndex === null && path !== '/about') {
      document.body.style.cursor = isHovered ? 'pointer' : 'auto'
    }

    if (path === '/') {
      // Ignore scale if active
      const scale = isHovered && !isActive ? 1.1 : 1
      gsap.to(ref.current.scale, {
        x: scale,
        y: scale,
        duration: 0.5,
        ease: 'power3.out',
      })
    }
  }, [setTitle, path, activeIndex, slide.title, isHovered, isActive])

  // Open slide
  const handleOpen = (e) => {
    if (path !== '/about') {
      setActiveIndex(index)
      setTitle(data[index].title)
      navigate(slide.path)
    }
  }

  // Close slide
  const handleClose = (e) => {
    e.stopPropagation()
    if (!isActive) return

    if (path !== '/about') {
      navigate('/')
  
      setActiveIndex(null)
      setIsHovered(false)
      clearTimeout(timeout.current)
  
      // Delays isCloseActive mesh to be hidden, which prevents clicking/enablings clicking on other slides. 
      timeout.current = setTimeout(() => {
        setIsCloseActive(false)
      }, 1500)
    }
  }

  useLenis(({scroll}) => {
    // viewport.height is measured in units, scroll is measured by window.innerHeight (pixels). Do not scale once it's off screen.
    if (scroll < viewport.height * 100) {
      ref.current.scale.x = 1 + scroll * 0.001
      ref.current.scale.y = 1 + scroll * 0.001
    }
  })


  // RAF animate hovered line
  useFrame((state, delta) => {
    // Cap delta at 0.1 because now it can't accumulate while the user changes the tab, it will simply stop
    if (delta < 0.1) {
      const path = window.location.pathname
      if (path === '/') {
        if (isHovered) {
          lineRef.current.scale.x = THREE.MathUtils.damp(lineRef.current.scale.x, 2, 8, delta)    
        } else {
          lineRef.current.scale.x = THREE.MathUtils.damp(lineRef.current.scale.x, 0, 8, delta)    
        }
      } else if (path.split('/')[1] === 'projects' && path.split('/')[2] !== undefined) {
        if (activeIndex === index) {
          lineRef.current.scale.x = 0
        }
      }
    }
  })

  return (
    <group
      ref={ref}
      onClick={handleOpen}
      onPointerEnter={() => setIsHovered(true)}
      onPointerLeave={() => setIsHovered(false)}
    >
      <line
        ref={lineRef}
        position={[0, width + 0.6, 0]}
        geometry={hoveredLineGeometry}
        material={lineMaterial}
        scale={[0, 0, 0]}
      />
      <Slide
        position={[0, 0, 0]}
        width={width}
        height={height}
        src={slide.src}
        isActive={isActive}
        progress={progress}
      />
      
      {/* Invisible plane that will cover the viewport and allow you close upon click */}
      {/* When routes are implemented, can remove this and let react routes handle this. */}
      {isCloseActive ? (
        <mesh
          position={[0, 0, 0.01]}
          onClick={handleClose}
        >
          <planeGeometry args={[viewport.width, viewport.height]}/>
          <meshBasicMaterial transparent={true} opacity={0}/>
        </mesh>
      ) : null}
    </group>
  )
}

export {CarouselSlide}