import * as React from 'react'

const ActiveIndexContext = React.createContext('')
ActiveIndexContext.display = 'ActiveContext'

function ActiveIndexProvider(props) {
  const [state, setState] = React.useState(null)
  const value = [state, setState]
  return <ActiveIndexContext.Provider value={value} {...props}/>
}

function useActiveIndex() {
  const context = React.useContext(ActiveIndexContext)
  if (context === undefined) {
    throw new Error(`useActiveIndex must be used within a ActiveIndexProvider.`)
  }
  return context
}

export {ActiveIndexProvider, useActiveIndex}