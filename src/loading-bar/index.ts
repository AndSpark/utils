type Options = {
	color?: string
	position?: 'top' | 'bottom'
}

const loadingBar = {
	el:null as HTMLElement | null,
	isInit: false,
	timerList: [] as any[],
	color: 'red',
	position:'top',
	get style() {
		return	`
		#loading-bar {
			position: fixed;
			background-color: ${this.color};
			transition:0.5s;
			top: ${this.position === 'top' ? '0' : 'initial'};
			bottom:${this.position === 'bottom' ? '0' : 'initial'};
			left: 0;
			height: 2px;
			width: 0%;
		}
		`
	}
	,
	init(options: Options = {color:"red",position:"top"}) {
		this.color = options.color || 'red';
		this.position = options.position || 'top'
		let el = document.getElementById('loading-bar')
		if (!el) {
			el = document.createElement('div')
			el.id = 'loading-bar'
			const styles = document.createElement('style')
			styles.innerHTML = this.style
			document.body.appendChild(el)
			document.body.appendChild(styles)
		}
		this.el = el
	},
	length(length:string,timeOut:number)  {
		return new Promise(res => {
			let timer = setTimeout(() => {
				(this.el as HTMLElement ).setAttribute('style',`width:${length};`)
				res('')
			}, timeOut);
			this.timerList.push(timer)
		})
	},
	async start() {
		if (!this.isInit) {
			this.init()
			this.isInit = true
		}
		await this.length('20%',0)
		await this.length('60%',500)
		await this.length('90%',1000)
	},
	end(){
		this.timerList.forEach(v => clearTimeout(v))
		this.timerList = []
		this.length('100%', 0);
		setTimeout(() => {
			(this.el as HTMLElement).setAttribute('style', `width:0;transition:0s;`)
		}, 500)
	}
}

export  {loadingBar}