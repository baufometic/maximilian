const GetTimeObj = (date: Date) => ({
	/** getSeconds() */
	seconds      : date.getSeconds(),
	/** getMinutes() */
	minutes      : date.getMinutes(),
	/** getHours() */
	hours        : date.getHours(),
	/** getFullYear() */
	years        : date.getFullYear(),
	/** getMonth() ... beware: January = 0; February = 1, etc */
	months       : date.getMonth(),
	/** getDate() */
	days         : date.getDate(),
	/** getDay() Sunday = 0, Monday = 1, etc */
	dayOfWeek    : date.getDay(),
	/** getMilliseconds() */
	milliSeconds : date.getMilliseconds()
})

const Time = {
	Sleep: (ms: number) => {
		if (ms <= 0) throw new RangeError("[Time.Sleep()] milliseconds must be >0")
		return new Promise(resolve => setTimeout(resolve, ms))
	},

	GetObj: () => GetTimeObj(new Date()),
	
	GetString: () => {
		const date = new Date()
		const tm = GetTimeObj(date)

		return (
			(tm.hours <= 9 ? "0" : "") +
			tm.hours +
			"-" +
			(tm.minutes <= 9 ? "0" : "") +
			tm.minutes +
			"-" +
			(tm.seconds <= 9 ? "0" : "") +
			tm.seconds
		)
	}
}

Object.seal(Time)
export { Time }
