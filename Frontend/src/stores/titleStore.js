import { defineStore } from 'pinia';
import pinia from './piniaInstance';

const useTitleStore = defineStore('titleStore', {
    state: () => ({
        current: '',
        last: '',
        ticks: 0,
        hold: 10,
        typing: 12,
        interval: null,
    }),
    actions: {
        startClock() {
            if (!this.interval) {
                this.interval = setInterval(this.clock, 500)
            }
        },
        stopClock() {
            if (this.interval) {
                this.interval = clearInterval(this.interval)
            }
        },
        clock() {
            this.ticks++
            if (this.ticks < this.hold) return

            const offset = this.hold + this.typing
            if (this.ticks > offset) {
                this.hold = 10 + Math.floor(Math.random() * 6)
                this.typing = 6 + Math.floor(Math.random() * 6)
                return this.randomTitle()
            }

            const typing = new Array((this.ticks - this.hold + 1) % 4).fill('.').join(' ')

            this.changeTitle(typing)
        },
        randomTitle() {
            const options = ['rock', 'paper', 'scissors', 'infinite'].filter(o => o !== this.last)
            const newTitle = options[Math.floor(options.length * Math.random())]
            this.last = newTitle
            this.changeFavicon(newTitle)
            this.changeTitle(newTitle)
            this.ticks = 0
        },
        changeFavicon(to) {
            var link = document.querySelector("link[rel~='icon']");
            if (!link) {
                link = document.createElement('link');
                link.rel = 'icon';
                document.head.appendChild(link);
            }
            link.href = `/favicon-${to}.ico`;
        },
        changeTitle(to) {
            this.current = to;
            document.title = `I am: ${to}`
        }
    }
});

export const titleStore = useTitleStore(pinia);