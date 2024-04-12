/** @jsxImportSource @emotion/react */
import * as React from 'react'
import {Environment} from '@react-three/drei'
import {useControls} from 'leva'

// Background Environment
function EnvironmentBlur() {
  const [preset, setPreset] = React.useState('sunset')
  // You can use the "transition" boolean to react to the loading in-between state,
  // For instance by showing a message
  const [, setTransition] = React.useTransition()
  const {blur} = useControls({
    blur: { value: 0.65, min: 0, max: 1 },
    preset: {
      value: preset,
      options: ['sunset', 'dawn', 'night', 'warehouse', 'forest', 'apartment', 'studio', 'city', 'park', 'lobby'],
      // If onChange is present the value will not be reactive, see https://github.com/pmndrs/leva/blob/main/docs/advanced/controlled-inputs.md#onchange
      // Instead we transition the preset value, which will prevents the suspense bound from triggering its fallback
      // That way we can hang onto the current environment until the new one has finished loading ...
      onChange: (value) => setTransition(() => setPreset(value))
    }
  })
  return (
    <Environment preset={preset} background blur={blur}/>
  )
}

//Get Pyramidal Index
// Returns an array of decreasing index values in a pyramid shape, starting from the specified index with the highest value. These indices are often used to create overlapping effects among elements.
// [array.length-1, array.length-2, ... 1, 0]
const getPyramidalIndex = (array, index) => (
  array.map((_, i) => (
    index === i ? array.length : array.length - Math.abs(index - i)
  ))
)

//Lerp
const lerp = (v0, v1, t) => v0 * (1 - t) + v1 * t

// Store and retrieve previous state
function usePrevious(state) {
  // Generic ref object container that can hold any value
  const ref = React.useRef()

  React.useEffect(() => {
    ref.current = state
  }, [state])

  return ref.current
}

export {EnvironmentBlur, usePrevious, getPyramidalIndex, lerp}