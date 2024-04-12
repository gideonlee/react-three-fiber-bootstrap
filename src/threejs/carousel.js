import * as React from 'react'
import {useFrame, useThree} from '@react-three/fiber'
import gsap from 'gsap'
import {data} from 'data/data'
import {CarouselSlide} from './carousel-slide'
import {getPyramidalIndex, lerp, usePrevious} from 'utils/lib'
// import {PostProcessing} from './post-processing'
import {useTitle} from 'context/title'
import {useActiveIndex} from 'context/active-index'
import {isMobile, browserName} from 'react-device-detect'

// import { useControls } from 'leva'
// https://tympanus.net/codrops/2023/04/27/building-a-webgl-carousel-with-react-three-fiber-and-gsap/
// https://github.com/supahfunk/webgl-carousel


// https://tympanus.net/Development/ImageTilesMenu/

// Slide width, height, and gap settings
const slideSettings = {
  width: window.innerWidth > 768 ? 1.5 : 1,
  height: window.innerWidth > 768 ? 3.75 : 2.5,
  gap: 0.2,
}

// Default duration and ease on all animations
gsap.defaults({
  duration: 2.5,
  ease: 'power3.out'
})

// Event mesh listens for wheel and pointer events
// It sits behind all of the carousel items (z: -0.01)
function EventListenerMesh({onWheel, onPointerUp, onPointerDown, onPointerMove, onPointerLeave, onPointerCancel, ...props}) {
  const {viewport} = useThree()

  return (
    <mesh
      position={[0, 0, -0.01]}
      onWheel={onWheel}
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      onPointerCancel={onPointerCancel}
    >
      <planeGeometry args={[viewport.width, viewport.height]}/>
      {/* R3F defaults produce the wrong gamma (linear colorspace, tonemapping, etc). Override default with toneMapped to false */}
      <meshBasicMaterial 
        toneMapped={false} 
        color={'white'}   
      />
    </mesh>
  )
}

function Carousel() {
  const postRef = React.useRef()
  const [root, setRoot] = React.useState()
  const [activeIndex, setActiveIndex] = useActiveIndex()
  const [, setTitle] = useTitle()

  // On render, save a reference to previous index
  const previousIndex = usePrevious(activeIndex)

  // Progress keeps track of current carousel scroll 
  // initialValue 35(%) so scroll of the total scroll
  const progress = React.useRef(35)
  const speedWheel = 0.05

  // Drag/Touch 
  const speedDrag = -0.5
  const startX = React.useRef(0)
  const isDown = React.useRef(false)
  
  // oldProgress is calculated in the RAF by lerping progress 
  const oldProgress = React.useRef(0)
  const speed = React.useRef(0)
  const slides = React.useMemo(() => {
    if (root) {
      return root.children
    }
  }, [root])

  // Display slides
  const displaySlides = (slide, index, active) => {
    // getPyramidalIndex returns an array based on the current active and 
    const pyramidalIndex = getPyramidalIndex(slides, active)[index]
    
    // Positions each slide horizontally
    gsap.to(slide.position, {
      x: (index - active) * (slideSettings.width + slideSettings.gap),
      y: slides.length * -0.1 + pyramidalIndex * 0.1
    })
  }
 
  // Wheel event
  const handleWheel = (e) => {
    if (activeIndex !== null) return

    const isVerticalScroll = Math.abs(e.deltaY) > Math.abs(e.deltaX)
    // Determines wheel direction left or right, or up or down. 
    const wheelProgress = isVerticalScroll ? e.deltaY : e.deltaX
    progress.current += wheelProgress * speedWheel
  }

  // Popstate event
  // Minimizes the slides when going back to root.
  React.useEffect(() => {
    function popstateListener() {
      const path = window.location.pathname
      if (path === '/') {
        setActiveIndex(null)
      } else if (path.split('/')[1] === 'projects' && path.split('/')[2] !== undefined) {
        data.forEach((project, i) => {
          if (project.path === path) {
            setActiveIndex(i)
            setTitle(project.title)
          }
        })
      }
    }

    window.addEventListener('popstate', popstateListener)

    return () => window.removeEventListener('popstate', popstateListener)    
  })

  // Initialized project on load instead of root
  React.useEffect(() => {
    const path = window.location.pathname
    if (path.split('/')[1] === 'projects' && path.split('/')[2] !== undefined) {
      // Navigate progress to selected project. 
      if (slides && slides.length > 0) {
        progress.current = (activeIndex / (slides.length - 1)) * 100
      }
    }
  }, [activeIndex, slides])

  // Click event 
  // On click, progress is adjusted so that the active slide will shift over and cover screen when full screen
  // Only allow progress movement when no slides are active (previous index is null)
  React.useEffect(() => {
    if (!slides) return
    if (activeIndex !== null && previousIndex === null) {
      progress.current = (activeIndex / (slides.length - 1)) * 100
    }
  }, [previousIndex, activeIndex, slides])

  // Touch event down
  // Toggles isDown and get starting x position from 0 => width.
  const handleDown = (e) => {
    if (activeIndex !== null) return

    isDown.current = true
    startX.current = e.clientX || (e.touches && e.touches[0].clientX) || 0
  }

  // Touch event up
  // Toggles isDown off and stops recording 
  const handleUp = (e) => {
    isDown.current = false
  }

  // Touch event move, 
  // Gets difference between current x position and starting x position and adds it to progress. 
  const handleMove = (e) => {
    if (activeIndex !== null || !isDown.current) return

    const x = e.clientX || (e.touches && e.touches[0].clientX) || 0
    const dragProgress = (x - startX.current) * speedDrag

    // Drag it to nearest slide. 
    if (isMobile && browserName === 'Chrome') {
      // Mobile Chrome has a different drag strength 
      progress.current += dragProgress * 4
    } else {
      progress.current += dragProgress 
    }

    startX.current = x

    // Set title based progress position.
    const slideIndex = Math.floor((progress.current / 100) * (slides.length - 1))
    const title = slideIndex < 0 ? data[0].title : slideIndex > data.length - 1 ? data[data.length - 1].title : data[slideIndex].title 
    setTitle(title)
  }

  // RAF
  useFrame((state, delta) => {
    // We cap delta at 0.1 because now it can't accumulate while the user changes the tab, it will simply stop
    if (delta < 0.1) {
      // Locks progress between 0 and 100. 
      progress.current = Math.max(0, Math.min(progress.current, 100))
  
      // active takes the percentage of progress and multiplies it with the number of slides to get the active (selected) slide in the center.
      const active = Math.floor((progress.current / 100) * (slides.length - 1))
  
      // Display each slide by order in a pyramid with the active slide elevated. 
      slides.forEach((slide, i) => displaySlides(slide, i, active))
  
      // Speed is lerp'd with alpha determining how long the motion blur duration lasts.
      speed.current = lerp(
        speed.current,
        Math.abs(oldProgress.current - progress.current),
        0.1
      )
  
      // oldProgress(currentX, newX, a): a determines how post processing blur duration. 
      oldProgress.current = lerp(oldProgress.current, progress.current, 0.1)
      
      if (postRef.current) {
        // Send ref with thickness for MeanTransmissionMaterial
        postRef.current.thickness = speed.current / 2
      }
    }

    // About Mesh animation
    if (window.location.pathname === '/about') {
      setTitle('')
    } 
  })

  return (
    <group>
      {/* Events mesh is invisible and behind slides */}
      <EventListenerMesh
        onWheel={handleWheel}
        onPointerDown={handleDown}
        onPointerUp={handleUp}
        onPointerMove={handleMove}
        onPointerLeave={handleUp}
        onPointerCancel={handleUp}
      />

      {/* Slides */}
      <group 
        ref={setRoot}
      >
        {data.map((slide, i) => 
          <CarouselSlide
            key={i}
            index={i}
            width={slideSettings.width}
            height={slideSettings.height}
            activeIndex={activeIndex}
            setActiveIndex={setActiveIndex}
            slide={slide}
            progress={progress}
          />
        )}
      </group>

      {/* Post processing enabled only on large screens */}
      {/* Removed from now because causing issues with other routes */}
      {/* <PostProcessing ref={postRef}/> */}
    </group>
  )
}

export {Carousel}