declare module 'react-use-geolocation' {
  type position = {coords: {latitude: number; longitude: number}}

  export function useCurrentPosition(): [position | null, Error | null]
}
