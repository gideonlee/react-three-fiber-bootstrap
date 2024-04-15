/** @jsxImportSource @emotion/react */
import * as React from 'react'
import {useTitle} from 'context/title'
import {useParams} from 'react-router-dom'
import {useActiveIndex} from 'context/active-index'
import {data} from 'data/data'
import {Lenis as ReactLenis, useLenis} from '@studio-freight/react-lenis'
import {AboutHeaderProject, AboutTagline, ProjectContainer, TitleMixBlendModeBanner, TitleChar, AboutFlexContainer, AboutBio, AboutDetailsContainer, AboutDetailLabel, AboutDetail, ProjectImage, ProjectImagesContainer, UnderConstruction} from 'utils/project-lib'

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

function ProjectScreen(props) {
  const [project, setProject] = React.useState(null)
  const [title, setTitle] = useTitle()
  const {name} = useParams()
  const titleRef = React.useRef(title !== undefined ? title.split('') : [])
  const [showTitle, setShowTitle] = React.useState(false)
  const [activeIndex, setActiveIndex] = useActiveIndex()
  const timeout = React.useRef()
  const lenisRef = React.useRef()
  const bannerElement = document.getElementsByClassName('banner')
  
  const [showHeader, setShowHeader] = React.useState(false)
  const [showTagline, setShowTagline] = React.useState(false)
  const [showBio, setShowBio] = React.useState(false)
  const [showDetailLabel, setShowDetailLabel] = React.useState(false)
  const [showDetail, setShowDetail] = React.useState(false)
  const year = new Date().getFullYear()
  const [, setLoaded] = React.useState(0)

  const imagesRef = React.useRef([])
  const showAboutRef = React.useRef(false)
  const showDetailsRef = React.useRef(false)

  // Scroll to bottom eventlistener.
  // window.onscroll = function(ev) {
  //   if ((window.innerHeight + window.scrollY) >= document.body.scrollHeight) {
  //     // you're at the bottom of the page
  //     console.log("Bottom of page");
  //   }
  // };

  // Scroll Effects
  useLenis((lenis) => {
    // console.log(lenis)
    // Parallax title element on scroll 
    if (bannerElement && bannerElement.length > 0) {
      bannerElement[0].style.top = `${50 + lenis.scroll * 0.05}%`
    }

    // Show About Project information
    if (lenis.scroll > 400 && !showAboutRef.current) {
      showAboutRef.current = true
      setShowHeader(true)
      setShowTagline(true)
      setShowBio(true)
    }
    
    // Show Date Details and Roles
    if (lenis.scroll > 500 && !showDetailsRef.current) {
      showDetailsRef.current = true
      setShowDetailLabel(true)
      setShowDetail(true)
    }

    // Show images on scroll
    // if (imagesRef.current.length > 0) {
    //   imagesRef.current.forEach((image, i) => {
    //     if (lenis.scroll > image[1].y - 250) {
    //       image[0].style.opacity = 1
    //       image[0].style.transition = '0.3s ease-in-out'
    //       image[0].style.transform = 'translateY(0px)'
    //     }
    //   })
    // }
  })

  // Scroll to top. 
  React.useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  // Set project, title, and index.
  React.useEffect(() => {
    document.body.style.cursor ='auto'

    // If initialized on project, identify and set activeIndex and title.
    data.forEach((project, i) => {      
      if (project.path === `/projects/${name}`) {     
        // If no activeIndex, find activeIndex and set title
        if (!activeIndex) {
          setActiveIndex(i)
          setTitle(project.title)
        }
          // Set titleRef to split each letter of the title
          titleRef.current = project.title.split('')

          // Set project
          setProject(project)
        }
      }
    )

    // Show centered title after 500ms
    if (!showTitle) {
      clearTimeout(timeout)
      timeout.current = setTimeout(() => {
        setShowTitle(true)
      }, 500)
    }
  }, [name, activeIndex, setActiveIndex, showTitle, title, setTitle])

  return (
    <ReactLenis root options={{...options}} ref={lenisRef}>
      <div 
        className='project'
        css={{
          maxWidth: '1280px',
          display: 'flex',
          justifyContent: 'centered',
          margin: '0 auto',
        }}
      >
        <TitleMixBlendModeBanner className='banner'>
          {titleRef.current?.map((char, i) => (
            <TitleChar 
              showTitle={showTitle}
              key={`title-char-${i}`}
              index={i}
            >{char}</TitleChar>
          ))}
        </TitleMixBlendModeBanner>
        {project ?
          <ProjectContainer>
            <AboutHeaderProject show={project.aboutTag !== '' ? showHeader : false}/> 
            <AboutTagline show={showTagline}>{project.aboutTag}</AboutTagline>     
            
            <UnderConstruction show={project.about !== '' ? false : true}/>

            <AboutFlexContainer show={project.link !== '' ? true : false}>
              <AboutBio 
                show={project.link !== '' ? showBio : false}
                about={project.about} 
                link={project.link} 
              />
              <AboutDetailsContainer>
                <AboutDetailLabel show={project.date !== '' ? showDetailLabel : false}>DATE</AboutDetailLabel>
                  <AboutDetail show={showDetail}>{project.date}</AboutDetail>

                  <AboutDetailLabel show={project.clients.length > 0 ? showDetailLabel : false}>CLIENT</AboutDetailLabel>
                  <AboutDetail show={showDetail}>
                    {project.clients.map((client, i) => (
                      <div key={`${client}-${i}`}>{client}</div>
                    ))}
                  </AboutDetail>

                  <AboutDetailLabel show={project.roles.length > 0 ? showDetailLabel : false}>ROLE</AboutDetailLabel>
                  <AboutDetail show={showDetail}>
                    {project.roles.map((role, i) => (
                      <div key={`${role}-${i}`}>{role}</div>
                    ))}
                  </AboutDetail>
              </AboutDetailsContainer>
            </AboutFlexContainer>
            <ProjectImagesContainer>
              {project.images.map((src, i) => 
                <ProjectImage
                  key={`${project.title}-${i}`}
                  src={src}
                  title={project.title}
                  className={`${project.title}-image-${i}`}
                  onLoad={() => {
                    const element = document.getElementsByClassName(`${project.title}-image-${i}`)

                    // Get bounding box to show image when in viewport.
                    const rect = element[0].getBoundingClientRect()
                    const image = [element[0], rect]

                    imagesRef.current.push(image)

                    // increment loaded
                    setLoaded(imagesRef.current.length)
                  }}
                />
              )}
            </ProjectImagesContainer>
            <div 
              css={{
                margin: '0 auto',
                fontFamily: 'Open Sans',
                marginTop: '2rem',
                marginBottom: '1rem',
              }}
            >Gidzilla, {year}</div>
          </ProjectContainer>
          : null
        } 
      </div>
    </ReactLenis>
  )
}

export {ProjectScreen}