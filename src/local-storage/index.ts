const localGet = (key:string) => {
	const value = window.localStorage.getItem(key)
  try {
    return JSON.parse(localStorage.getItem(key) as string)
  } catch (error) {
    return value
  } 
}

const localSet = (key: string, value: string) => {
  window.localStorage.setItem(key, JSON.stringify(value))
}

const localRemove = (key: string) => {
  window.localStorage.removeItem(key)
}



export {
	localGet,
	localSet,
	localRemove,
}