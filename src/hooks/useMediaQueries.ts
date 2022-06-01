/* eslint-disable no-console */
import { useEffect, useState } from "react"
import { Log } from "../base/log"
import { OBJ } from "../base/objects"

// Function to establish min device size in pixels


const queryList = {
	xs            : "(max-width: 576px)", // <
	s             : "(min-width: 576px)", // >=
	m             : "(min-width: 768px)", // >=
	l             : "(min-width: 992px)", // >=
	xl            : "(min-width: 1200px)", // >=
	xxl           : "(min-width: 1400px)", // >=
	desktop_S     : "(min-width: 1024px)", // >=
	desktop_M     : "(min-width: 1440px)", // >=
	desktop_L     : "(min-width: 2560px)", // >=
	portrait      : "(orientation: portrait)",
	landscape     : "(orientation: landscape)",
	mobile        : "only screen and (hover: none) and (pointer: coarse)",
	motionReduced : "(prefers-reduced-motion: no-preference)"
}

type T_obj = {
	[key in keyof typeof queryList]: {
		isActive: boolean;
		AddEventListener: () => void;
		RemoveEventListener: () => void;
	};
};

interface I_useMediaQueries {
	(props: {
		verbose?: boolean;
	}): [ T_obj ];
}

export const useMediaQueries: I_useMediaQueries = ({ verbose=true }) => {
	const [ state, setState ] = useState({} as T_obj)
	
	useEffect(() => {
		//* INTIALISE STATE AS WINDOW EXISTS NOW
		const obj = {} as T_obj

		setState(() => {
			OBJ.Keys(queryList).forEach(key => {
				const Updater = (e: MediaQueryListEvent): void => {
					setState(prev => ({
						...prev,
						[key]: {
							...prev[ key ],
							isActive: e.matches
						}
					}))
				}

				obj[key] = {
					isActive         : window.matchMedia(queryList[key]).matches,
					AddEventListener : function() {
						window.matchMedia(queryList[key]).addEventListener("change", Updater)
						Log.EventListenerAdded(queryList[key])
					},
					RemoveEventListener: function() {
						window.matchMedia(queryList[key]).removeEventListener("change", Updater)
						Log.EventListenerRemoved(queryList[key])
					}
				}
			})
			
			return obj
		})

		//* Initialise event listeners
		OBJ.Keys(obj).forEach(key => obj[key].AddEventListener())

		return () => {
			// TODO test
			Log.Testing("useMediaQueries")
			Log.Testing("WHY?")
			OBJ.Keys(obj).forEach(key => (obj[key].RemoveEventListener()))
		}
	}, [])

	useEffect(() => {
		verbose && Log.StateChange(
			JSON.stringify(state, null, 3),
			"useMediaQueries"
		)
	}, [ state, verbose ])

	return [
		state
	]
}

export const Media = (...queriesToCombine: Array<keyof typeof queryList>) => {
	if (!queriesToCombine.length) throw new Error("[GetQuery] no queries passed in")
	return `@media screen and ${ queriesToCombine.map(query => queryList[query]).join(" and ") }`
}
