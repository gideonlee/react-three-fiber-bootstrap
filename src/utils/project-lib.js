/** @jsxImportSource @emotion/react */
import * as React from 'react'
import * as mq from 'utils/media-queries'

// Title mix blend mode banner
function TitleMixBlendModeBanner(props) {
  return (
    <div
      css={{
        position: 'fixed',
        zIndex: '1',
        color: '#fff',
        mixBlendMode: 'difference',
        top: '50%',
        left: '50%',
        width: '100%',
        transform: `translate(-50%, -50%)`
      }}
      {...props}
    />
  )
}

function TitleChar({showTitle, index, children, ...props}) {
  return (
    <span
      arial-hidden='true'
      css={{
        fontFamily: 'Lora, serif',
        fontSize: '2rem',
        display: 'inline-block',
        textTransform: 'uppercase',
        transformOrigin: 'center center 0.47em',
        transition: showTitle ? '0.3s' : '0',
        transform: showTitle ? 'rotate(0)' : 'rotate(-4deg) rotateY(4deg) rotateX(90deg)',
        transitionDelay: showTitle ? index * 0.0175 + 's' : '0',
        transitionTimingFunction: 'ease-in-out',
        width: children === ' ' ? '1rem' : 'auto',
        marginLeft: '1px',
        marginRight: '1px',
        userSelect: 'none',
        [mq.extraSmall]: {
          fontSize: '2.25rem',
        },
        [mq.small]: {
          fontSize: '4rem',
        },
        [mq.medium]: {
          fontSize: '5.5rem',
        },
        [mq.large]: {
          fontSize: '7.5rem',
        },
      }}
      {...props}
    >{children}</span>
  )
}

// All Project information
function ProjectContainer({children, ...props}) {
  return (
    <div
      css={{
        display: 'flex',
        paddingTop: '192px',
        position: 'relative',
        zIndex: '2',
        flexDirection: 'column',
        marginLeft: '22.5px',
        marginRight: '22.5px',
      }}
      {...props}
    >
      <div
        css={{
          marginLeft: '8.33%',
          marginRight: '8.33%',
        }}
      >
        {children}
      </div>
    </div>
  )
}

function UnderConstruction({show, ...props}) {
  return (
    <div
      css={{
        fontWeight: '600',
        letterSpacing: '2px',
        display: show ? 'block' : 'none',
        flex: '1',
        width: '100%',
        textAlign: 'center',
        // height: '100%',
        [mq.extraSmall]: {
          fontSize: '1.1rem',
        },
        [mq.small]: {
          fontSize: '1.5rem',
        },
        [mq.medium]: {
          fontSize: '1.75rem',
        },
        [mq.large]: {
          fontSize: '1.75rem',
        },
      }}
      {...props}
    >UNDER CONSTRUCTION 👻</div>
  )
}

// "About The Project"
function AboutHeaderProject({show, ...props}) {
  return (
    <div
      css={{
        textAlign: 'left',
        fontWeight: '600',
        fontSize: '1.0rem',
        letterSpacing: '2px',
        fontFamily: 'Zen Kurenaido, Barlow Condensed, sans-serif',
        transform: show ? 'translateY(0px)' : 'translateY(40px)',
        opacity: show ? '1' : '0',
        transition: '0.3s ease-in-out',
      }}
      {...props}
    >
      ABOUT THE PROJECT
    </div>
  )
}

// Tagline bold and loud
function AboutTagline({show, ...props}) {
  return (
    <div
      css={{
        marginTop: '1rem',
        marginBottom: '1rem',
        textAlign: 'left',
        fontSize: '4rem',
        fontWeight: '600',
        fontFamily: 'Arvo, serif',
        transform: show ? 'translateY(0px)' : 'translateY(40px)',
        opacity: show ? '1' : '0',
        transition: '0.3s 0.2s ease-in-out',
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
      {...props}
    />
  )
}

function AboutFlexContainer({show, ...props}) {
  return (
    <div
      css={{
        display: show ? 'flex' : 'none',
        marginBottom: '60px',
        [mq.extraSmall]: {
          flexDirection: 'column', 
        },
        [mq.small]: {
          flexDirection: 'column',
        },
        [mq.medium]: {
          flexDirection: 'row',
        },
        [mq.large]: {
          flexDirection: 'row',
        },
      }}
      {...props}
    />
  )
}

function AboutBio({about, link, show, ...props}) {
  return (
    <div
      css={{
        textAlign: 'left',
        display: 'flex',
        flexDirection: 'column',
        fontFamily: 'Open Sans, sans-serif',
        marginBottom: '48px',
        transform: show ? 'translateY(0px)' : 'translateY(40px)',
        opacity: show ? 1 : 0,
        transition: '0.3s 0.4s ease-in-out',
        [mq.medium]: {
          flex: '3',
        },
        [mq.large]: {
          flex: '3',
        },
      }}
      {...props}
    > 
      {about}
      <ProjectLink show={show} href={link}/> 
    </div>
  )
}

function ProjectLink({href, show, ...props}) {
  const [isHovered, setIsHovered] = React.useState(false)
  return (
    <div 
      css={{ 
        marginTop: '60px',
        transform: show ? 'translateY(0px)' : 'translateY(40px)',
        opacity: show ? '1' : '0',
        transition: '0.3s 0.6s ease-in-out',
      }}
      onPointerEnter={() => setIsHovered(true)}
      onPointerLeave={() => setIsHovered(false)}
    >
      <a 
        href={href} 
        target='_blank' 
        rel='noreferrer'
        css={{
          textDecoration: 'none',
          color: '#000',
          fontFamily: 'Open Sans, sans-serif',
          letterSpacing: '1px',
          cursor: 'pointer',
          fontWeight: '500',
        }}
      >
        CHECK IT OUT 
        <svg 
          className='arrow-right-svg'
          css={{
            position: 'absolute',
            width: '20px',
            height: '20px',
            marginTop: '0.25rem',
            transition: '0.3s ease-in-out',
            marginLeft: isHovered ? '0.5rem' : '0.25rem',
          }}
        >
          <path 
            css={{
            }}
            d="M0,7.5v-1C0,6.2,0.2,6,0.5,6h13.2L9.2,1.6C9.1,1.5,9.1,1.3,9.1,1.2s0.1-0.3,0.1-0.4l0.7-0.7 C10,0.1,10.2,0,10.3,0s0.3,0.1,0.4,0.1l6.1,6.1C16.9,6.4,17,6.6,17,6.8v0.4c0,0.2-0.1,0.4-0.2,0.5l-6.1,6.1 c-0.1,0.1-0.2,0.1-0.4,0.1s-0.3-0.1-0.4-0.1l-0.7-0.7c-0.1-0.1-0.1-0.2-0.1-0.4c0-0.1,0.1-0.3,0.1-0.3L13.7,8H0.5 C0.2,8,0,7.8,0,7.5z"
          />
        </svg>
      </a>
    </div>  
  )
}

function AboutDetailsContainer({...props}) {
  return (
    <div
      css={{
        [mq.medium]: {
          textAlign: 'left',
          flex: '2',
          marginLeft: '8.33%',
          marginRight: '8.33%',
        },
        [mq.large]: {
          textAlign: 'left',
          flex: '2',
          marginLeft: '8.33%',
          marginRight: '8.33%',
        },
      }}
    >
      <div
        css={{
          display: 'flex',
          textAlign: 'right', 
          flexDirection: 'column',
          [mq.extraSmall]: {
            textAlign: 'left',
          },
          [mq.small]: {
            textAlign: 'left',
          },
          [mq.medium]: {
            textAlign: 'right', 
          },
          [mq.large]: {
            textAlign: 'right', 
          },
        }}
        {...props}
      />
  </div>
  )
}

function AboutDetailLabel({show, ...props}) {
  return (
    <div
      css={{
        transform: show ? 'translateY(0px)' : 'translateY(40px)',
        opacity: show ? '1' : '0',
        transition: '0.3s ease-in-out',
        fontWeight: '600',
        fontSize: '1.0rem',
        letterSpacing: '2px',
        fontFamily: 'Zen Kurenaido, Barlow Condensed, sans-serif',
        marginBottom: '0.25rem',
      }}
      {...props}
    />
  )
}

function AboutDetail({show, ...props}) {
  return (
    <div
      css={{
        marginBottom: '1rem',
        fontFamily: 'Open Sans, sans-serif',
        transform: show ? 'translateY(0px)' : 'translateY(40px)',
        opacity: show ? '1' : '0',
        transition: '0.3s 0.2s ease-in-out',
      }}
      {...props}
    />
  )
}

function ProjectImagesContainer({...props}) {
  return (
    <div
      css={{
        marginBottom: '60px',
        // height: 'auto',
      }}
      {...props}
    />
  )
}

// Sizes are predefined for Lenis, which struggles with dynamic resizing.
function ProjectImage({src, title, onLoad, ...props}) {
  return (
    <div
      css={{
        marginTop: '80px',
        marginBottom: '80px',
        opacity: '1',
        transform: 'translateY(20px)',
        [mq.extraSmall]: {
          minHeight: '160px',
          maxHeight: '355px',
        },
        [mq.small]: {
          minHeight: '337px',
          maxHeight: '580px',
        },
        [mq.medium]: {
          minHeight: '582px',
          maxHeight: '710px'
        },
        [mq.large]: {
          maxHeight: '772px',
        },
      }}
      {...props}
    >
      <img
        css={{
          width: '100%',
          outline: '1px solid #e5e5e5',

          [mq.extraSmall]: {
            minHeight: '160px',
            maxHeight: '355px',
          },
          [mq.small]: {
            minHeight: '337px',
            maxHeight: '580px',
          },
          [mq.medium]: {
            minHeight: '582px',
            maxHeight: '710px'
          },
          [mq.large]: {
            maxHeight: '772px',
          },
        }}
        src={src}
        alt={`project-${title}`}
        onLoad={onLoad}
      />
    </div>
  )
}

export {TitleMixBlendModeBanner, TitleChar, ProjectContainer, AboutHeaderProject, AboutTagline, AboutFlexContainer, AboutBio, AboutDetailsContainer, AboutDetailLabel, AboutDetail, ProjectImagesContainer, ProjectImage, ProjectLink, UnderConstruction}