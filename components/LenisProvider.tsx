// 'use client'

// import { useEffect } from 'react'
// import Lenis from 'lenis'

// export default function LenisProvider({ children }: { children: React.ReactNode }) {
//   useEffect(() => {
//     const lenis = new Lenis({
//       smooth: true,
//       lerp: 0.1, // adjust for scroll smoothing
//     })

//     function raf(time) {
//       lenis.raf(time)
//       requestAnimationFrame(raf)
//     }

//     requestAnimationFrame(raf)

//     return () => {
//       lenis.destroy()
//     }
//   }, [])

//   return <>{children}</>
// }
