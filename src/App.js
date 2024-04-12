/** @jsxImportSource @emotion/react */
import * as React from 'react'
import {Routes, Navigate, Route, BrowserRouter} from 'react-router-dom'
import {DashboardScreen} from './screens/dashboard.js'
import {AboutScreen} from './screens/about.js'
import {Overlay} from 'components/overlay'
import {Canvas} from '@react-three/fiber'
import * as mq from 'utils/media-queries'
import {ProjectScreen} from 'screens/project';
import {Carousel} from 'threejs/carousel.js'
import {TitleProvider} from 'context/title.js'
import {ActiveIndexProvider, useActiveIndex} from 'context/active-index.js'
import {useProgress, Html} from '@react-three/drei'
import {About} from 'threejs/about.js'
import logoWhite from 'assets/g-logo-white.png'

function Loader() { 
  const {progress} = useProgress() 

  return (
    <Html 
      center
      css={{ 
        color: '#fff',
      }}
    >
      <div
        css={{
          width: '50px',
          margin: '10px auto',
        }}
      >
        <img
          css={{
            width: '100%'
          }}
          src={logoWhite}
          alt='logo'
        />
      </div>
      <div>
        { progress !== 100 ? 
          <div 
            css={{
              fontFamily: 'Open Sans',
            }}
          >
            {Math.floor(progress)}% Loaded
          </div>
        : 
          <div
            css={{
              fontFamily: 'Open Sans',
            }}
          >Initializing ...</div>
        }
      </div>
    </Html> 
  )
}

function App() {
  const [, setActiveIndex] = useActiveIndex()

  return (
    <div
      className="App"
      css={{
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        // Don't need to blend background if postprocessing is removed.
        // backgroundColor: '#000',
      }}  
    >
      <div
        css={{
          height: '100vh',
          [mq.extraSmall]: {
            minHeight: '400px',
            minWidth: '300px',
          },
        }}
      >
        <TitleProvider>
          <BrowserRouter>
            <ActiveIndexProvider>
              <Overlay setActiveIndex={setActiveIndex}/>
              <Canvas 
                dpr={[1, 2]} 
                css={{ 
                  minHeight: '500px',
                  minWidth: '300px',
                }}
                // override r3f sRGB encoding and gamma 
                // linear={true}
              >
                <React.Suspense fallback={<Loader/>}>
                  <Carousel/>
                  <About/>
                </React.Suspense>
              </Canvas>
              <AppRoutes/>
            </ActiveIndexProvider>
          </BrowserRouter>
        </TitleProvider>
      </div>
    </div>
  )
}

function AppRoutes() {
  return (
    <Routes>
      <Route path='/' element={<DashboardScreen/>}/>
      <Route path='/projects/:name' element={<ProjectScreen/>}/>
      <Route path='/about' element={<AboutScreen/>}/>
      <Route path='*' element={<Navigate to='/'/>}/>
    </Routes>
  )
}

export default App;
