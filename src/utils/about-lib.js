/** @jsxImportSource @emotion/react */
import * as React from 'react'
import * as mq from 'utils/media-queries'

function Email({show, children, ...props}) {
  return (
    <div
      css={{
        display: 'flex',
        justifyContent: 'center',
        paddingBottom: '3em',
      }}
      {...props}
    >
      <div
        css={{
          display: 'inline-block',
          color: '#fff',
          padding: '1rem 1rem',
          borderRadius: '40px',
          backgroundColor: '#B8B1A3',
          cursor: 'pointer',
          fontWeight: '600',
          fontFamily: 'Open Sans, sans-serif',
          opacity: show ? '1' : '0',
          transform: show ? 'translateY(0px)' : 'translateY(20px)',
          transition: '0.3s ease',
        }}
      >{children}</div>
    </div>
  )
}

function AboutSection(props) {
  return (
    <div
      css={{
        margin: '0 auto',
        textAlign: 'left',
        display: 'flex',
        padding: '0 6.25%',
        marginTop: '80px',
        marginBottom: '80px',
        [mq.extraSmall]: {
          marginTop: '40px',
          marginBottom: '40px',
        },
        [mq.small]: {
          marginTop: '40px',
          marginBottom: '40px',
        }
      }}
      {...props}
    />
  )
}

function AtWorkInLifeSection(props) {
  return (
    <div
      css={{
        textAlign: 'left',
        display: 'flex',
        [mq.extraSmall]: {
          flexDirection:' column',
        },
        [mq.small]: {
          flexDirection:' column',
        },
      }}
      {...props}
    />
  )
}

function AtWorkInLifeHeader({show, ...props}) {
  return (
    <div
      css={{
        fontFamily: 'Barlow Condensed',
        fontSize: '1.25rem',
        textAlign: 'left',
        marginBottom: '15px',
        [mq.medium]: {
          display: 'flex',
          flexDirection: 'column',        
          flex: '0 0 8.33%',
          marginLeft: '16.66%',
          paddingLeft: '22.5px',
          paddingRight: '22.5px',
        },
        [mq.large]: {
          display: 'flex',
          flexDirection: 'column',
          flex: '0 0 8.33%',
          marginLeft: '16.66%',
          paddingLeft: '22.5px',
          paddingRight: '22.5px',
        },
      }}
    >
      <div
        css={{
          transition: '0.8s ease',
          opacity: show ? '1' : '0',
          transform: show ? `translateY(0px)` : `translateY(80px)`
        }}
        {...props}
      />
    </div>
  )
}

function AtWorkInLifeContent({show, ...props}) {
  return (
    <div
      css={{
        display: 'flex',
        fontWeight: '600',
        fontFamily: 'Barlow Condensed',
        fontSize: '1.75rem',
        [mq.extraSmall]: {
          marginBottom: '20px',
        },
        [mq.small]: {
          marginBottom: '20px',
        },
        [mq.medium]: {
          flexDirection: 'row',
          flex: '0 0 50%',
          paddingLeft: '22.5px',
          paddingRight: '22.5px',
        },
        [mq.large]: {
          flexDirection: 'row',
          flex: '0 0 50%',
          paddingLeft: '22.5px',
          paddingRight: '22.5px',
        },
      }}
    >
      <div
        css={{
          transition: '1s 0.5s ease',
          opacity: show ? '1' : '0',
          transform: show ? `translateY(0px)` : `translateY(80px)`
        }}
        {...props}
      />
    </div>
  )
}

function SocialMediaContainer(props) {
  return (
    <div
      css={{
        backgroundColor: '#000',
        height: '40px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        margin: '0 auto',
        paddingBottom: '5rem',
        maxWidth: '365px',
        [mq.extraSmall]: {
          maxWidth: '300px',
        },
      }}
      {...props}
    />
  )
}

function SocialMediaIcon({src, srcHovered, show, href, ...props}) {
  const [isHovered, setIsHovered] = React.useState(false)

  return (
    <div
      css={{
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        transition: '0.3s ease-in-out 0.3s',
        opacity: show ? '1' : '0',
        transform: show ? 'translateY(0px)' : 'translateY(20px)',
      }}
    >
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        css={{
          position: 'relative',
          cursor: 'pointer',
          display: 'flex',
          justifyContent: 'center',
        }}
        onMouseOver={() => setIsHovered(true)}
        onMouseOut={() => setIsHovered(false)}
      >
        <img
          css={{
            position: 'absolute',
            transition: '0.3s ease-in-out',
            width: '40px',
            opacity: isHovered ? 0 : 1,
          }}
          src={src}
          alt={'social-unhovered'}
        />
        <img
          css={{
            position: 'absolute',
            transition: '0.3s ease-in-out',
            width: '40px',
            opacity: isHovered ? 1 : 0,
          }}
          src={srcHovered}
          alt={'social-hovered'}
        />
      </a>
    </div>
  )
}

function HorizontalBox({src, alt, label, xOffset, ...props}) {
  const boxRef = React.useRef()

  return (
    <div
      css={{
        transform: `translate(-${xOffset}vw, 0)`,
        [mq.extraSmall]: {
          marginBottom: '40px',
        },
        [mq.small]: {
          marginBottom: '40px',
        },
      }}
      {...props}
      ref={boxRef}
    >
      <div
        css={{
          borderRadius: '20px',
          overflow: 'hidden',
          marginTop: '22px',
          marginBottom: '22px',
          marginLeft: '22px',
          marginRight: '22px',
          maxWidth: '300px',
          width: '300px',
        }}
      >
        <img
          css={{
            borderRadius: '20px',
            width: '100%',
            display: 'inline-block',
            transition: '0.5s ease',
            cursor: 'pointer',
            maxWidth: '300px',
          }}
          src={src}
          alt={alt}
        />
        <div
          css={{
            margin: '0 auto',
            textAlign:'center',
            maxWidth: '300px',
          }}
        >{label}</div>
      </div>
    </div>
  )
}

export {Email, AboutSection, AtWorkInLifeSection, AtWorkInLifeHeader, AtWorkInLifeContent, SocialMediaContainer, SocialMediaIcon, HorizontalBox}