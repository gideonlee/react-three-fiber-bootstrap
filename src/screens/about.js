/** @jsxImportSource @emotion/react */
import {ReactLenis, useLenis} from '@studio-freight/react-lenis'
import * as React from 'react'
import * as mq from 'utils/media-queries'
import {AboutSection, AtWorkInLifeContent, AtWorkInLifeHeader, AtWorkInLifeSection, Email, HorizontalBox, SocialMediaContainer, SocialMediaIcon} from 'utils/about-lib'
import linkedIn from 'assets/linkedin.png'
import linkedInHover from 'assets/linkedin-hover.png'
import instagram from 'assets/instagram.png'
import instagramHover from 'assets/instagram-hover.png'
import barker from 'assets/barker.jpg'
import nhtBox from 'assets/nht-0.2-box.jpg'

const options = {
  lerp: 0.1,
  smoothWheel: true,
  orientation: "vertical",
  gestureOrientation: "vertical", // vertical, horizontal, both
  smoothTouch: false,
  normalizeWheel: true,
  touchMultiplier: 4,
  inifinite: false,
}

// Horizontal and Vertical Scrolling
// https://www.youtube.com/watch?v=yXnK8ND76z8

function AboutScreen() {
  const [showEmail, setShowEmail] = React.useState(false)
  const [showSocials, setShowSocials] = React.useState(false)
  const [showAboutTag, setShowAboutTag] = React.useState(false)
  const [showAtWork, setShowAtWork] = React.useState(false)
  const [showInLife, setShowInLife] = React.useState(false)
  const [showSlideshow, setShowSlideshow] = React.useState(false)
  const lenisRef = React.useRef()

  const [horizontalBoxPosition, setHorizontalBoxPosition] = React.useState(0)
  const horizontalBoxRef =  React.useRef()

  React.useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  // Animated on scroll
  useLenis((lenis) => {
    // horizontalBoxPosition.current = lenis.scroll

    if (lenis.scroll > 100) {
      setShowEmail(true)
      setShowSocials(true)
    }
    if (lenis.scroll >= 450) {
      setShowAboutTag(true)
    }
    if (lenis.scroll >= 500) {
      setShowAtWork(true)
    }
    if (lenis.scroll >= 900) {
      setShowInLife(true)
    }
    if (lenis.scroll >= 1350) {
      setShowSlideshow(true)
    }
    // console.log(lenisRef?.current)
    if (lenis.scroll >= 1300) {
      // console.log(lenisRef)
      // lenis.scroll = 0
      let offset = (horizontalBoxRef.current.parentElement.offsetTop)
      let position = (lenis.scroll - offset) / window.innerHeight * 100
      position = position < 0 ? 0 : position > 200 ? 200 : position
      // console.log(position)
      setHorizontalBoxPosition(position)
    } 
  })

  return (
    <ReactLenis root options={{...options}} ref={lenisRef}>
      <div
        css={{
          backgroundColor: '#000',
          color: '#fff',
        }}
      >
        <Email show={showEmail}>Gideonmlee@gmail.com</Email>
        <SocialMediaContainer>
          <SocialMediaIcon
            src={linkedIn}
            srcHovered={linkedInHover}
            show={showSocials}
            href='https://www.linkedin.com/in/leegideon/'
          />

          <SocialMediaIcon
            src={instagram}
            srcHovered={instagramHover}
            show={showSocials}
            href='https://www.instagram.com/peterpuppybarker/'
          />
        </SocialMediaContainer>

        <AboutSection>
          <div
            css={{
              display: 'flex',
              fontSize: '3.5rem',
              fontFamily: 'Playfair Display, serif',
              transition: '0.3s ease',
              overflow: 'hidden',
              [mq.extraSmall]: {
                fontSize: '2rem',
                flex: '0 0 100%',         
              },
              [mq.small]: {
                fontSize: '3rem',
                flex: '0 0 100%',
              },
              [mq.medium]: {
                flex: '0 0 66%',
                marginLeft: '8.33%',
                paddingLeft: '22.5px',
                paddingRight: '22.5px',
              },
              [mq.large]: {
                flex: '0 0 66%',
                marginLeft: '8.33%',
                paddingLeft: '22.5px',
                paddingRight: '22.5px',
              },
            }}
          >
            <div
              css={{
                transition: '1s ease',
                opacity: showAboutTag ? '1' : '0',
                transform: showAboutTag ? `translateY(0px)` : `translateY(80px)`
              }}
            >
              I design digital products and web apps for brands, businesses, and entrepreneurs.
            </div>
          </div>
        </AboutSection>
        
        <AboutSection>
          <AtWorkInLifeSection>
            <AtWorkInLifeHeader show={showAtWork}>AT WORK</AtWorkInLifeHeader>
            <AtWorkInLifeContent show={showAtWork}>
              When engaging with clients, I ask a lot of questions to understand their goals. When they don't have templates of their vision, I craft robust wireframes that blueprint their project's objectives and scope. These collaborations are then launched as digital apps and products, tested thoroughly and ready to be explored.
            </AtWorkInLifeContent>
          </AtWorkInLifeSection>
        </AboutSection>
        
        <AboutSection
        >
          <AtWorkInLifeSection>
            <AtWorkInLifeHeader show={showInLife}>IN LIFE</AtWorkInLifeHeader>
            <AtWorkInLifeContent show={showInLife}> 
              I'm an adventurous sports loving foodie. My superpowers include drinking coffee after hours and never having experienced jetlag. When I'm not training for my amateur Muay Thai debut, I can be found rock climbing indoors. My mantra is that dessert should be shared evenly because then it's only half the guilt. 
            </AtWorkInLifeContent>
          </AtWorkInLifeSection>
        </AboutSection>
          
        <AboutSection
          css={{
            // paddingTop: '200px',
            // marginTop: '200px',
            marginBottom: '0',
            paddingBottom: '80px',
            height: '100vh',
          }}
        >
          <div
            css={{
              // outline: '1px solid red',
              fontFamily: 'Barlow Condensed',
              fontSize: '1.5rem',
              display: 'flex',
              transition: '0.8s ease',
              opacity: showSlideshow ? '1' : '0',
              position: 'sticky',
              // top: '10%',
              top: '0',
              height: '400px',
              flexDirection: 'row',
              overflow: 'hidden',
              // paddingTop: '200px',
              width: '200vw',
              // justifyContent: 'space-between',
              // alignItems: 'center',
              // padding: '0 5vw',
            }}
            ref={horizontalBoxRef}
          >
            <HorizontalBox
              // transform={`translateX(${horizontalBoxPosition}px)`}
              xOffset={horizontalBoxPosition}
              alt='nht-box'
              src={nhtBox}
              label='Designed earbud box (Adobe Illustrator)' 
            />

            <HorizontalBox
              xOffset={horizontalBoxPosition}
              alt='doggy'
              src={barker}
              label='Peter Barker' 
            />

            {/* <HorizontalBox
              xOffset={horizontalBoxPosition}
              alt='doggy'
              src={barker}
              label='Peter Barker2' 
            />
            <HorizontalBox
              xOffset={horizontalBoxPosition}
              alt='doggy'
              src={barker}
              label='Peter Barker3' 
            />
            <HorizontalBox
              xOffset={horizontalBoxPosition}
              alt='doggy'
              src={barker}
              label='Peter Barker4' 
            /> */}
          </div>
        </AboutSection>
        
        {/* <AboutSection>
          <AtWorkInLifeSection>
            <AtWorkInLifeHeader show={showInLife}>IN LIFE</AtWorkInLifeHeader>
            <AtWorkInLifeContent show={showInLife}> 
              I'm a basketball podcast loving foodie. My superpowers include drinking coffee after hours and never having experienced jetlag. When I'm not training for my amateur Muay Thai debut, I can be found rock climbing indoors. My mantra is that dessert should be shared evenly because then it's only half the guilt. 
            </AtWorkInLifeContent>
          </AtWorkInLifeSection>
        </AboutSection>

        <AboutSection>
          <AtWorkInLifeSection>
            <AtWorkInLifeHeader show={showInLife}>IN LIFE</AtWorkInLifeHeader>
            <AtWorkInLifeContent show={showInLife}> 
              I'm a basketball podcast loving foodie. My superpowers include drinking coffee after hours and never having experienced jetlag. When I'm not training for my amateur Muay Thai debut, I can be found rock climbing indoors. My mantra is that dessert should be shared evenly because then it's only half the guilt. 
            </AtWorkInLifeContent>
          </AtWorkInLifeSection>
        </AboutSection> */}
      </div>
    </ReactLenis>
  )
}

export {AboutScreen}