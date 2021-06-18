export const sleep = (timeout: number) => {
	return new Promise((r) => {
		setTimeout(() => {
			r('')
		}, timeout);
	})
}