import { useEffect, useState } from 'react'

export const useMediaQuery = (query: string = "width < 1000px") => {
  const formattedQuery = `(${query})`
  const [match, setMatch] = useState(matchMedia(formattedQuery).matches)

  useEffect(() => {
    const mql = matchMedia(formattedQuery)
    if (mql.media === 'not all' || mql.media === 'invalid') {
      console.error(`useMediaQuery Error: Invalid media query`)
    }

    mql.onchange = (e) => {
      setMatch(e.matches)
    }

    return () => {
      mql.onchange = null
    }
  }, [formattedQuery, setMatch])

  return match
}