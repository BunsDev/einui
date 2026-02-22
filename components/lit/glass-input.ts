import { LitElement, html, css, nothing } from 'lit';
import { customElement, property, state, query } from 'lit/decorators.js';
import { live } from 'lit/directives/live.js';

/**
 * Glass Input - Lit Web Component
 * A beautiful glassmorphic input with focus glow effect
 * 
 * @fires input - Emitted when input value changes
 * @fires change - Emitted when input value is committed
 * @fires focus - Emitted when input receives focus
 * @fires blur - Emitted when input loses focus
 * 
 * @cssproperty --glass-bg - Background color
 * @cssproperty --glass-border - Border color
 * @cssproperty --glass-glow-cyan - Cyan glow color
 * @cssproperty --glass-glow-blue - Blue glow color
 * @cssproperty --glass-glow-purple - Purple glow color
 */
@customElement('glass-input')
export class GlassInput extends LitElement {
  static styles = css`
    :host {
      display: block;
      --glass-bg: rgba(255, 255, 255, 0.1);
      --glass-border: rgba(255, 255, 255, 0.2);
      --glass-glow-cyan: rgba(6, 182, 212, 0.3);
      --glass-glow-blue: rgba(59, 130, 246, 0.3);
      --glass-glow-purple: rgba(168, 85, 247, 0.3);
    }

    .wrapper {
      position: relative;
      display: block;
    }

    .glow {
      position: absolute;
      inset: -2px;
      border-radius: 0.75rem;
      background: linear-gradient(to right, var(--glass-glow-cyan), var(--glass-glow-blue), var(--glass-glow-purple));
      filter: blur(12px);
      opacity: 0;
      transition: opacity 0.3s ease;
    }

    .wrapper.focused .glow {
      opacity: 0.7;
    }

    input {
      position: relative;
      display: flex;
      width: 100%;
      height: 2.5rem;
      border-radius: 0.75rem;
      padding: 0.5rem 1rem;
      font-size: 0.875rem;
      background: var(--glass-bg);
      backdrop-filter: blur(24px);
      -webkit-backdrop-filter: blur(24px);
      border: 1px solid var(--glass-border);
      color: white;
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
      transition: all 0.3s ease;
      font-family: inherit;
    }

    input::placeholder {
      color: rgba(255, 255, 255, 0.4);
    }

    input:focus {
      outline: none;
      border-color: rgba(255, 255, 255, 0.4);
      background: rgba(255, 255, 255, 0.15);
    }

    input:disabled {
      cursor: not-allowed;
      opacity: 0.5;
    }

    input[type="file"] {
      padding-top: 0.375rem;
    }

    input[type="file"]::file-selector-button {
      border: 0;
      background: transparent;
      font-size: 0.875rem;
      font-weight: 500;
      color: white;
      margin-right: 0.5rem;
      cursor: pointer;
    }
  `;

  @property({ type: String }) type: string = 'text';
  @property({ type: String }) value: string = '';
  @property({ type: String }) placeholder: string = '';
  @property({ type: Boolean }) disabled = false;
  @property({ type: Boolean }) required = false;
  @property({ type: String }) name: string = '';
  @property({ type: String }) autocomplete: string = '';
  @property({ type: Number }) minlength?: number;
  @property({ type: Number }) maxlength?: number;
  @property({ type: String }) pattern?: string;
  @property({ type: Boolean, attribute: 'glow-on-focus' }) glowOnFocus = true;

  @state() private focused = false;
  @query('input') private input!: HTMLInputElement;

  private handleInput(e: Event) {
    const target = e.target as HTMLInputElement;
    this.value = target.value;
    this.dispatchEvent(new CustomEvent('input', {
      detail: { value: this.value },
      bubbles: true,
      composed: true
    }));
  }

  private handleChange(e: Event) {
    const target = e.target as HTMLInputElement;
    this.value = target.value;
    this.dispatchEvent(new CustomEvent('change', {
      detail: { value: this.value },
      bubbles: true,
      composed: true
    }));
  }

  private handleFocus(e: FocusEvent) {
    this.focused = true;
    this.dispatchEvent(new CustomEvent('focus', {
      detail: { originalEvent: e },
      bubbles: true,
      composed: true
    }));
  }

  private handleBlur(e: FocusEvent) {
    this.focused = false;
    this.dispatchEvent(new CustomEvent('blur', {
      detail: { originalEvent: e },
      bubbles: true,
      composed: true
    }));
  }

  /**
   * Sets focus on the input
   */
  public focus() {
    this.input?.focus();
  }

  /**
   * Removes focus from the input
   */
  public blur() {
    this.input?.blur();
  }

  render() {
    return html`
      <div class="wrapper ${this.focused && this.glowOnFocus ? 'focused' : ''}">
        ${this.glowOnFocus ? html`<div class="glow"></div>` : nothing}
        <input
          type=${this.type}
          .value=${live(this.value)}
          placeholder=${this.placeholder}
          ?disabled=${this.disabled}
          ?required=${this.required}
          name=${this.name || nothing}
          autocomplete=${this.autocomplete || nothing}
          minlength=${this.minlength ?? nothing}
          maxlength=${this.maxlength ?? nothing}
          pattern=${this.pattern || nothing}
          @input=${this.handleInput}
          @change=${this.handleChange}
          @focus=${this.handleFocus}
          @blur=${this.handleBlur}
          part="input"
        />
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'glass-input': GlassInput;
  }
}
