import * as React from 'react'

const TitleContext = React.createContext('')
TitleContext.display = 'TitleContext'

function TitleProvider(props) {
  const [state, setState] = React.useState()
  
  const value = [state, setState]
  return <TitleContext.Provider value={value} {...props}/>
}

// Title context hook
function useTitle() {
  const context = React.useContext(TitleContext)
  if (context === undefined) {
    throw new Error(`useTitle must be used with a TitleProvider.`)
  }
  return context
}

export {TitleProvider, useTitle}