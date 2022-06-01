import { useEffect, useRef, useState } from "react"

export const useIntersectionObserver = () => {
	const [ isIntersecting, setIsIntersecting ] = useState<boolean>(false)
	const node = useRef(null)
	
	useEffect(() => {
		const ref = node.current || null

		const observer = new IntersectionObserver(entries => {
			const [ entry ] = entries
			setIsIntersecting(entry.isIntersecting)
		},
		{
			root       : null,
			rootMargin : "100px",
			threshold  : 1
		})

		if (ref) observer.observe(ref)
		
		return() => {
			if (ref) observer.unobserve(ref)
		}
	}, [])

	return { node, isIntersecting }
}
