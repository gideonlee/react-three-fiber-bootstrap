/** @jsxImportSource @emotion/react */
import * as React from 'react'
import * as THREE from 'three'
import * as mq from 'utils/media-queries'
import {useFrame, useThree} from '@react-three/fiber'
import {Html, useTexture} from '@react-three/drei'
import profile from 'assets/profile.jpg'
import gsap from 'gsap'
import {usePrevious} from 'utils/lib'
// https://github.com/codrops/CoverPageTransition/blob/main/src/js/textLinesReveal.js

function About() {
  const texture = useTexture(profile)
  const shutterTopRef = React.useRef() 
  const shutterBottomRef = React.useRef()

  const path = window.location.pathname
  const previousPath = usePrevious(path)

  const profileCoverShowRef = React.useRef()
  const profileCoverHideRef = React.useRef()
  const profileRef = React.useRef()
  const nameRef = React.useRef()
  const bodyContainerRef = React.useRef()
  const body1Ref = React.useRef()
  const body2Ref = React.useRef()
  const body3Ref = React.useRef()
  const body4Ref = React.useRef()
  const opacityAlphaRef = React.useRef(-0.4)

  const {viewport} = useThree()
  const shutterLambda = 5
  const hiddenYPosition = (viewport.height / 2 + viewport.height / 4)

  React.useEffect(() => {
    // Resets profile cover show position. Hiding animation.
    if (path !== '/about' && previousPath === '/about') {
      profileCoverShowRef.current.position.y = (viewport.height / 1.25 + viewport.height / 4)
      
      // Name
      if (nameRef.current !== undefined) {
        gsap.to(nameRef.current?.style, {
          opacity: 0,
          duration: 0.5,
          transform: `translateY(${-70}px)`,
          ease: 'Power4.easeOut',
        })
      }
      
      // Bio (4 parts)
      if (body1Ref.current !== undefined) {
        gsap.to(body1Ref.current.style, {
          duration: 0.5,
          transform: `translateY(${-60}px)`,
          ease: 'Power4.easeOut',
          onComplete: () => {
            body1Ref.current.style.display = 'none'
          }
        })
      }
      if (body2Ref.current !== undefined) {
        gsap.to(body2Ref.current.style, {
          duration: 0.5,
          transform: `translateY(${-60}px)`,
          ease: 'Power4.easeOut',
          onComplete: () => {
            body2Ref.current.style.display = 'none'
          }
        })
      }
      if (body3Ref.current !== undefined) {
        gsap.to(body3Ref.current?.style, {
          duration: 0.5,
          transform: `translateY(${-60}px)`,
          ease: 'Power4.easeOut',
          onComplete: () => {
            body3Ref.current.style.display = 'none'
          }
        })
      }
      if (body4Ref.current !== undefined) {
        gsap.to(body4Ref.current?.style, {
          duration: 0.5,
          transform: `translateY(${-60}px)`,
          ease: 'Power4.easeOut',
          onComplete: () => {
            body4Ref.current.style.display = 'none'
            bodyContainerRef.current.style.display = 'none'

            if (nameRef.current !== undefined) {
              nameRef.current.style.display = 'none'
            }
          }
        })
      }

      // Reset opacity
      opacityAlphaRef.current = -0.4
    }

    // Show name and bio elements (display: flex and block)
    if (path === '/about') {
      if (nameRef.current !== undefined) {
        nameRef.current.style.display = 'flex'
      }

      if (bodyContainerRef.current !== undefined) {
        bodyContainerRef.current.style.display = 'block'
      }
      if (body1Ref.current !== undefined) {
        body1Ref.current.style.display = 'flex'
      }
      if (body2Ref.current !== undefined) {
        body2Ref.current.style.display = 'flex'
      }
      if (body3Ref.current !== undefined) {
        body3Ref.current.style.display = 'flex'
      }
      if (body4Ref.current !== undefined) {
        body4Ref.current.style.display = 'flex'
      }
    }
  }, [path, previousPath, viewport.height])

  const shaderArgs = React.useMemo(() => ({
    uniforms: {
      uTexture: {value: texture}
    },
    vertexShader: `
      varying vec2 vUv;

      void main() {
        vUv = uv;
        vec3 pos = position;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
      }
    `,
    fragmentShader: `
      uniform sampler2D uTexture;
      varying vec2 vUv;

      void main() {
        vec4 texture = texture2D(uTexture, vUv);
        // gl_FragColor = vec4(vUv, 1.0, 1.0);
        gl_FragColor = vec4(texture);
      }
    `
  }), [texture])

  useFrame((state, delta) => {
    if (path === '/about') {
      // Reset cover hide position
      profileCoverHideRef.current.position.y = hiddenYPosition
      profileCoverHideRef.current.vislble = true 
      
      // Animating about before cover show reaches the center
      if (profileCoverShowRef.current.position.y > viewport.height/4-0.9) {
        // Move shutter top to center
        shutterTopRef.current.position.y = THREE.MathUtils.damp(shutterTopRef.current.position.y, viewport.height/4, shutterLambda, delta)

        // Move shutter bottom to center
        shutterBottomRef.current.position.y = THREE.MathUtils.damp(shutterBottomRef.current.position.y, -viewport.height/4, shutterLambda, delta)

        // Move profile cover show to center.
        profileCoverShowRef.current.position.y = THREE.MathUtils.damp(profileCoverShowRef.current.position.y, viewport.height/4-1.02, shutterLambda, delta)
      } else {
        // Shutter top and bottom lock into center position
        shutterTopRef.current.position.y = viewport.height/4
        shutterBottomRef.current.position.y = -viewport.height/4

        // Show profile texture
        profileRef.current.visible = true

        // Move profile cover show to bottom revealing profile texture
        profileCoverShowRef.current.position.y = THREE.MathUtils.damp(profileCoverShowRef.current.position.y, -(viewport.height/2 + viewport.height/4), 4, delta)

        if (opacityAlphaRef.current < 1) {
          opacityAlphaRef.current += 0.1
        } else {
          opacityAlphaRef.current = 1
        }
        
        // Show name
        nameRef.current.style.opacity = opacityAlphaRef.current
        nameRef.current.style.transform = `translateY(${60 - 60 * opacityAlphaRef.current}px)`

        if (body1Ref.current !== undefined) {
          body1Ref.current.style.transform = `translateY(${60 - 60 * opacityAlphaRef.current}px)`
        }
        if (body2Ref.current !== undefined) {
          body2Ref.current.style.transform = `translateY(${60 - 60 * opacityAlphaRef.current}px)`
        }
        if (body3Ref.current !== undefined) {
          body3Ref.current.style.transform = `translateY(${60 - 60 * opacityAlphaRef.current}px)`
        }
        if (body4Ref.current !== undefined) {
          body4Ref.current.style.transform = `translateY(${60 - 60 * opacityAlphaRef.current}px)`
        }
      }
    } else {
      profileCoverHideRef.current.visible = true

      if (profileCoverHideRef.current.position.y > viewport.height/4-0.95) {
        // Move profile cover hide to block out the profile texture
        profileCoverHideRef.current.position.y = THREE.MathUtils.damp(profileCoverHideRef.current.position.y, viewport.height/4-1.02, shutterLambda + 5, delta)
      } else {
        // Hide profile texture
        profileRef.current.visible = false

        // Hide profile cover hide
        profileCoverHideRef.current.visible = false 

        // Hide shutter top  8
        shutterTopRef.current.position.y = THREE.MathUtils.damp(shutterTopRef.current.position.y, hiddenYPosition, shutterLambda, delta)

        // Hide shutter bottom 8
        shutterBottomRef.current.position.y = THREE.MathUtils.damp(shutterBottomRef.current.position.y, -(viewport.height/2+viewport.height/4), shutterLambda, delta)
      }
    }
  })


  return (
    <group>
      {/* Shutters */}
      <mesh 
        ref={shutterTopRef}
        position={[0, hiddenYPosition, 0.01]}
        onClick={null}
      >
        <planeGeometry args={[viewport.width, viewport.height/2]}/>
        <meshBasicMaterial color={'#000'} toneMapped={false}/>
      </mesh>  
      <mesh
        ref={shutterBottomRef}
        position={[0,-hiddenYPosition, 0.01]}
        onClick={null}
      >
        <planeGeometry args={[viewport.width, viewport.height/2]}/>
        <meshBasicMaterial color={'#000'} toneMapped={false}/>
      </mesh>

      <group>
        {/* Profile cover show */}
        <mesh
          ref={profileCoverShowRef}
          position={[0, hiddenYPosition, 0.02]}
          onClick={null}
        >
          <planeGeometry args={[viewport.width, viewport.height/2]}/>
          <meshBasicMaterial color={'#000'} toneMapped={false}/>
        </mesh>

        {/* Profile cover hide */}
        <mesh
          ref={profileCoverHideRef}
          position={[0, hiddenYPosition, 0.03]}
          onClick={null}
        >
          <planeGeometry args={[viewport.width, viewport.height/2]}/>
          <meshBasicMaterial color={'#000'} toneMapped={false}/>
        </mesh>

        {/* Profile texture */}
        <mesh 
          ref={profileRef}
          visible={false}
          position={[0, 0.92, 0.01]}
          onClick={null}
          onUpdate={(self) => {
            // Scale texture based on size.
            if (viewport.width < 6.15) {
              self.scale.set(0.75, 0.75, 1)
            } else {
              self.scale.set(1, 1, 1)
            }
          }}
        >
          <planeGeometry args={[3.5, 4, 60, 60]}/>
          <shaderMaterial args={[shaderArgs]}/>
        </mesh>
      </group>

      <Html
        fullscreen
        zIndexRange={[8 , 1]}
      > 
        {/* Center name */}
        <div
          css={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
            textAlign: 'center',
          }}
        >
          {/* Hide overflow of name to allow slide in text */}
          <div
            css={{
              overflow: 'hidden',
              lineHeight: '1',
            }}
          >
            {/* Name */}
            <div
              ref={nameRef}
              css={{
                width: '100%',
                fontSize: '5em',
                color: '#fff',
                fontFamily: 'Playfair Display, serif',
                overflow: 'hidden',
                display: 'none',
                transform: `translateY(${70}px)`,
                opacity: '1',
                transition: '0.3 ease',
                [mq.extraSmall]: {
                  fontSize: '3.5rem',
                },
                [mq.small]: {
                  fontSize: '5rem',
                },
              }}
            >GIDEON</div> 
          </div>
        </div>
        
        {/* Bio Container */}
        <div
          css={{
            fontFamily: 'Barlow Condensed, sans-serif',
            fontWeight: '400',
            color: '#fff',
            position: 'absolute',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            textAlign: 'center',
            margin: '0 auto',
            width: '100%',
            top: '70%',
            [mq.extraSmall]: {
              top: '60%',
            },
          }}
        >
          <div
            ref={bodyContainerRef}
            css={{ 
              display: 'none',
              maxWidth: '365px',
              textAlign: 'left',
              fontSize: '1.5rem',
              [mq.extraSmall]: {
                maxWidth: '255px',
                fontSize: '1.25rem',
              },
            }}
          >
            <div
              css={{
                overflow: 'hidden',
                marginBottom: '0.5rem',
              }}
            >
              <div
                ref={body1Ref}
                css={{
                  transform: `translateY(${60}px)`,
                  transition: '0.3s ease',
                  display: 'none',
                }}
              >Stopping my dog from heists and</div>
            </div>

            <div
              css={{
                overflow: 'hidden',
                marginBottom: '0.5rem',
              }}
            >
              <div
                ref={body2Ref}
                css={{
                  transform: `translateY(${60}px)`,
                  transition: '0.5s ease',
                  display: 'none',
                }}
              >jailbreaks and making cool things,</div>
            </div>

            <div
              css={{
                overflow: 'hidden',
                marginBottom: '0.5rem',
              }}
            >
              <div
                ref={body3Ref}
                css={{
                  transform: `translateY(${60}px)`,
                  transition: '0.7s ease',
                  display: 'none',
                }}
              >I'm available for full-time roles,</div>
            </div>

            <div
              css={{
                overflow: 'hidden',
                marginBottom: '0.5rem',
              }}
            >
              <div
                ref={body4Ref}
                css={{
                  transform: `translateY(${60}px)`,
                  transition: '0.9s ease',
                  display: 'none',
                }}
              >freelancing, and digital consulting.</div>
            </div>
          </div>
        </div>
      </Html>
    </group>
  )
}

export {About}
