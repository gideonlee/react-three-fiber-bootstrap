/** @jsxImportSource @emotion/react */
import * as React from 'react'
import logoBlack from 'assets/g-logo.png'
import logoWhite from 'assets/g-logo-white.png'
import {Link} from 'react-router-dom'
import * as mq from 'utils/media-queries'
import {useTitle} from 'context/title'
import gsap from 'gsap'
import {useActiveIndex} from 'context/active-index'

function Overlay() {
  const [title,] = useTitle()
  const titleRef = React.useRef([])
  const [isHovered, setIsHovered] = React.useState(false) 
  const [, setActiveIndex] = useActiveIndex()
  const path = window.location.pathname
  const [about, setAbout] = React.useState(path === '/about' ? 'BACK' : 'ABOUT')

  // If title is changed
  React.useEffect(() => {
    titleRef.current = title ? title.split('') : []
    
    setIsHovered(false)
    gsap.to({}, {
      duration: 0.2,
      onComplete: () => {
        setIsHovered(true)
      }
    })
  }, [title, titleRef])

  // Update 'ABOUT'/'BACK' depending on path (mainly used for popstate)
  React.useEffect(() => {
    setAbout(path === '/about' ? 'BACK' : 'ABOUT')
  }, [path, about])

	return (
		<div
			css={{
        width: '100%',
				position: 'fixed',
        zIndex: '9',
				top: '0',
				left: '0',
			}}
		>
      <div
        css={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          background: path === '/about' ? 'linear-gradient(rgba(13, 13, 13, 0.9) 0%, rgba(13, 13, 13, 0.737) 19%, rgba(13, 13, 13, 0.54) 34%, rgba(13, 13, 13, 0.38) 47%, rgba(13, 13, 13, 0.28) 56.5%, rgba(13, 13, 13, 0.192) 65%, rgba(13, 13, 13, 0.125) 73%, rgba(13, 13, 13, 0.075) 80.2%, rgba(13, 13, 13, 0.043) 86.1%, rgba(13, 13, 13, 0.02) 91%, rgba(13, 13, 13, 0.008) 95.2%, rgba(13, 13, 13, 0.004) 98.2%, rgba(13, 13, 13, 0) 100%)' : 'inherit', 
        }}
      >
        {/* Logo */}
        <Link
          css={{
            textAlign: 'center',
          }}
          to={'/'}
          onClick={() => {
            setActiveIndex(null)
            setAbout('ABOUT')
          }}
        >
          <img
            css={{
              mixBlendMode: 'difference',
              position: 'fixed',
              transition: '2s ease-in-out',
              top: '1rem',
              width: '50px', 
              userSelect: 'none',
              [mq.extraSmall]: {
                position: 'static',
                marginTop: '1rem',
              },
              [mq.small]: {
                position: 'static',
                marginTop: '1rem',
              },
              [mq.medium]: {
                left: '1rem',
              },
              [mq.large]: {
                left: '1rem',
              },
            }}
            src={path === '/about' ? logoWhite : logoBlack}
            alt="logo"
          />
        </Link>

        {/* ABOUT/BACK  */}
        { path === '/about' ? 
          <Link
            css={{
              color: '#fff',
              textDecoration: 'none',
              position: 'absolute',
              textAlign: 'right',
              fontWeight: '600',
              userSelect: 'none',
              [mq.extraSmall]: {
                top: '1.5rem',
                right: '1.5rem'
              },
              [mq.small]: {
                top: '1.5rem',
                right: '1.5rem'
              },
              [mq.medium]: {
                top: '2rem',
                right: '2rem'
              },
              [mq.large]: {
                top: '2rem',
                right: '2rem'
              },
            }}
            to={'/'}
            onClick={() => {
              setAbout('ABOUT')
              setActiveIndex(null)
            }}
          >
            {about}
          </Link>
        :
          <Link
            css={{
              color: '#000',
              textDecoration: 'none',
              position: 'absolute',
              textAlign: 'right',
              fontWeight: '600',
              userSelect: 'none',
              [mq.extraSmall]: {
                top: '1.5rem',
                right: '1.5rem'
              },
              [mq.small]: {
                top: '1.5rem',
                right: '1.5rem'
              },
              [mq.medium]: {
                top: '2rem',
                right: '2rem'
              },
              [mq.large]: {
                top: '2rem',
                right: '2rem'
              },
            }}
            to={'/about'}
            onClick={() => setAbout('BACK')}
          >
            {about}
          </Link> 
        }
      </div>

      {/* Centered Title */}
      <div
        aria-label='text'
        css={{
          display: 'flex',
          justifyContent: 'center',
          fontSize: '2rem',
          marginTop: '1rem',
        }}
      > 
        {window.location.pathname === '/' ? 
          titleRef.current?.map((char, i) => (
            <span
              arial-hidden='true'
              key={`title-char-${i}`}
              css={{
                fontFamily: 'Neuton, serif',
                fontSize: '2rem',
                display: 'inline-block',
                textTransform: 'uppercase',
                transformOrigin: 'center center 0.47em',
                transition: isHovered ? '0.3s' : '0',
                transform: isHovered ? 'rotate(0)' : 'rotate(-4deg) rotateY(4deg) rotateX(90deg)',
                transitionDelay: isHovered ? i * 0.0175 + 's' : '0',
                transitionTimingFunction: 'ease-in-out',
                width: char === ' ' ? '1rem' : 'auto',
                marginLeft: '1px',
                marginRight: '1px',
                userSelect: 'none',
                [mq.extraSmall]: {
                  fontSize: '2rem',
                },
                [mq.small]: {
                  fontSize: '2rem',
                },
                [mq.medium]: {
                  fontSize: '3rem',
                },
                [mq.large]: {
                  fontSize: '3rem',
                },
              }}
            >{char}</span>
          )) : null
        }
      </div>
		</div>
	)
}

export {Overlay}
