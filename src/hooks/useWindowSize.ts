/* eslint-disable no-console */
import { useEffect, useState } from "react"
import { Log } from "../base/log"

const initialData = {
	height  : 0,
	width   : 0,
	centreX : 0,
	centreY : 0
}

interface I_useWindowSize {
	(props: {
		verbose?: boolean;
	}): [ typeof initialData ];
}

export const useWindowSize: I_useWindowSize = ({ verbose=true }) => {
	const [ state, setState ] = useState<typeof initialData>(initialData)

	useEffect(() => {
		const Update = () => {
			setState({
				height  : Math.floor(window.innerHeight),
				width   : Math.floor(window.innerWidth),
				centreX : Math.floor(window.innerWidth / 2),
				centreY : Math.floor(window.innerHeight / 2)
			})
		}

		try { window.addEventListener("resize", Update) }
		catch(e) { throw new Error("Unable to add event listener in useWindowDimensions") }
		return () => (window.removeEventListener("resize", Update))
	}, [])

	useEffect(() => {
		verbose && Log.StateChange(
			JSON.stringify(state, null, 3),
			"useWindowSize"
		)
	}, [ state, verbose ])
	
	return [
		state
	]
}
