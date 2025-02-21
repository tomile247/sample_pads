import {LitElement, html, css} from "lit";
import {customElement, property} from "lit/decorators.js";

@customElement('sample-pad')
export class SamplePad extends LitElement {

    protected audio: HTMLAudioElement;
    protected pad: HTMLElement;

    @property() key: string = '';
    @property() sound: string = '';

    static styles = css`
        .pad__button {
            border: 1px solid red;
            width: 200px;
            height: 200px;
            display: flex;
            justify-content: center;
            align-items: center;
            border-radius: 5px;
            
        }

        .pad__button[active] {
            background-color: navajowhite;
        }
    `

    protected firstUpdated() {
        this.audio = this.shadowRoot!.querySelector('audio') as HTMLAudioElement;
        this.pad = this.shadowRoot!.querySelector('.pad__button') as HTMLElement;

        this.addEventListener('touchstart',  (event) => {
            event.preventDefault();
            this.play();
        });

        this.addEventListener('touchend',  (event) => {
            event.preventDefault();
            this.pause();
        });

        window.addEventListener('keydown', event => {
            if (event.key.toUpperCase() === this.key.toUpperCase() && this.sound.length > 0) {
                this.play();
            }
        })

        window.addEventListener('keyup', event => {
            if (event.key.toUpperCase() === this.key.toUpperCase()) {
                this.pause();
            }
        })
    }

    protected render() {
        return html`
            <div class="pad__button" @click="${this.play}" >
                    ${this.key}
                <audio>
                    <source src="${this.sound}">
                </audio>
            </div>
        `
    }

    protected play(): void {
        this.audio.play()
        this.pad.setAttribute('active', '');
    }

    protected pause(): void {
        this.audio.pause();
        this.pad.removeAttribute('active');
    }
}