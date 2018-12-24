import template from './template.js'

class MAudio {
    constructor(options = {}) {
        if (!options.container) 
            throw new Error("'container' attribute for MAudio Plugin is required")
        if (!options.audioSrc) 
            throw new Error("'audioSrc' attribute for MAudio Plugin is required")
        this._options = Object.assign({}, 
            {
                container: document.querySelector(options.container),
                audioSrc: options.audioSrc,
                bgColor: options.bgColor || '#f2f2f2'
            }
        )
        this.init()
    }
    
    IS_TAPPED = true

    get Verion() {
        return '1.0.0'
    }

    init() {
        this.render()
        this.bindEvent()
    }

    getDom(selector) {
        return document.querySelector(selector)
    }

    transSecToMin(sec) {
        let h
        h = Math.floor(sec / 60)
        sec = sec % 60
        sec = sec.toFixed(0)
        h += ''
        sec += ''
        h = (h.length == 1) ? '0' + h : h
        sec = (sec.length == 1) ? '0' + sec : sec
        return h + ':' + sec
    }

    toggleAudioPlay(isEnd) {
        if (this.domAudio.paused && !isEnd) {
            this.domAudio.play()
            this.domPlayBtn.classList.add('icon-pause2')
            this.domPlayBtn.classList.remove('icon-play3')
        } else {
            this.domAudio.pause()
            this.domPlayBtn.classList.remove('icon-pause2')
            this.domPlayBtn.classList.add('icon-play3')
        }
    }

    updateProgressbar(percent) {
        this.domProgressBar.style.width = `${percent}%`
    }

    render() {
        const { container } = this._options
        container.innerHTML = template

        this.domAudio = this.getDom('.auo__audio-ele')
        this.domTotalTime = this.getDom('.auo__time-total')
        this.domCurrentTime = this.getDom('.auo__time-current')
        this.domPlayer = this.getDom('.auo')
        this.domPlayBtn = this.getDom('.auo__play-button')
        this.domProgressBar = this.getDom('.auo__progress-bar')
        this.domProgressMask = this.getDom('.auo__progress-mask')
        this.muteBtn = this.getDom('.auo__mute-button')

        this.domAudio.src = this._options.audioSrc
        this.getDom('.auo__box').style.backgroundColor = this._options.bgColor
        this.progressMaskWidth = parseInt(getComputedStyle(this.domProgressMask).width)
        this.progressMaskLeft = this.domProgressMask.getBoundingClientRect().left
    }

    toggleAudioSound() {
        const audio = this.domAudio
        if (audio.volume) {
            audio.volume = 0
            this.muteBtn.classList.remove('icon-volume-high')
            this.muteBtn.classList.add('icon-volume-mute2')
        } else {
            audio.volume = 1
            this.muteBtn.classList.remove('icon-volume-mute2')
            this.muteBtn.classList.add('icon-volume-high')
        }
    }

    bindEvent() {
        this.domPlayer.addEventListener('click', (e) => {
            if (e.target === this.domPlayBtn) {
                this.toggleAudioPlay()
            } else if (e.target === this.domProgressMask) {
                const { offsetX } = e
                const percent = offsetX / this.progressMaskWidth
                this.domAudio.currentTime = percent * this.domAudio.duration
                this.updateProgressbar(percent * 100)
            } else if (e.target === this.muteBtn) {
                this.toggleAudioSound()
            }
        }, false)

        this.domProgressMask.addEventListener('touchstart', () => {
            this.IS_TAPPED = true
        })

        this.domProgressMask.addEventListener('touchmove', (e) => {
            const pageX = e.touches[0].pageX
            const offsetX = pageX - this.progressMaskLeft
            const percent = offsetX / this.progressMaskWidth
            this.updateProgressbar(percent * 100)
        })

        this.domProgressMask.addEventListener('touchend', (e) => {
            this.IS_TAPPED = false
            const pageX = e.changedTouches[0].pageX
            const offsetX = pageX - this.progressMaskLeft
            const percent = offsetX / this.progressMaskWidth
            this.domAudio.currentTime = percent * this.domAudio.duration
        })

        this.domAudio.addEventListener('loadeddata', () => {
            this.domTotalTime.textContent = this.transSecToMin(this.domAudio.duration)
        }, false)

        this.domAudio.addEventListener('timeupdate', () => {
            const { currentTime, duration } = this.domAudio
            !this.IS_TAPPED && this.updateProgressbar(currentTime / duration * 100)
            this.domCurrentTime.textContent = this.transSecToMin(currentTime)
        })

        this.domAudio.addEventListener("ended", function () {
            const IS_END = true
            toggleAudioPlay(IS_END)
        }, false)
    }

}

export default MAudio