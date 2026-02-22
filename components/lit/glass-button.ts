import { LitElement, html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';

/**
 * Glass Button - Lit Web Component
 * A beautiful glassmorphic button with customizable variants and sizes
 * 
 * @slot - Default slot for button content
 * 
 * @fires click - Emitted when button is clicked
 * 
 * @cssproperty --glass-bg - Background color
 * @cssproperty --glass-border - Border color
 * @cssproperty --glass-glow-cyan - Cyan glow color
 * @cssproperty --glass-glow-blue - Blue glow color
 * @cssproperty --glass-glow-purple - Purple glow color
 */
@customElement('glass-button')
export class GlassButton extends LitElement {
  static styles = css`
    :host {
      display: inline-block;
      --glass-bg: rgba(255, 255, 255, 0.1);
      --glass-border: rgba(255, 255, 255, 0.2);
      --glass-glow-cyan: rgba(6, 182, 212, 0.3);
      --glass-glow-blue: rgba(59, 130, 246, 0.3);
      --glass-glow-purple: rgba(168, 85, 247, 0.3);
    }

    .wrapper {
      position: relative;
      display: inline-block;
    }

    .glow {
      position: absolute;
      inset: -4px;
      border-radius: 0.75rem;
      background: linear-gradient(to right, var(--glass-glow-cyan), var(--glass-glow-blue), var(--glass-glow-purple));
      filter: blur(16px);
      opacity: 0.7;
      transition: opacity 0.3s ease;
    }

    .glow.hidden {
      opacity: 0;
    }

    button {
      position: relative;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      white-space: nowrap;
      border-radius: 0.75rem;
      cursor: pointer;
      font-size: 0.875rem;
      font-weight: 500;
      transition: all 0.3s ease-out;
      border: 1px solid;
      color: white;
      font-family: inherit;
    }

    button:focus-visible {
      outline: none;
      box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.5), 0 0 0 4px transparent;
    }

    button:disabled {
      pointer-events: none;
      opacity: 0.5;
    }

    button:hover {
      transform: scale(1.05);
    }

    button:active {
      transform: scale(0.95);
    }

    /* Variants */
    .default {
      background: rgba(255, 255, 255, 0.2);
      backdrop-filter: blur(24px);
      -webkit-backdrop-filter: blur(24px);
      border-color: rgba(255, 255, 255, 0.3);
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
    }

    .default:hover {
      background: rgba(255, 255, 255, 0.3);
      border-color: rgba(255, 255, 255, 0.4);
    }

    .primary {
      background: linear-gradient(to right, rgba(6, 182, 212, 0.8), rgba(59, 130, 246, 0.8), rgba(168, 85, 247, 0.8));
      backdrop-filter: blur(24px);
      -webkit-backdrop-filter: blur(24px);
      border-color: rgba(255, 255, 255, 0.3);
      box-shadow: 0 4px 20px rgba(59, 130, 246, 0.4);
    }

    .primary:hover {
      box-shadow: 0 4px 30px rgba(59, 130, 246, 0.6);
    }

    .outline {
      background: transparent;
      backdrop-filter: blur(4px);
      -webkit-backdrop-filter: blur(4px);
      border-width: 2px;
      border-color: rgba(255, 255, 255, 0.4);
    }

    .outline:hover {
      background: rgba(255, 255, 255, 0.1);
      border-color: rgba(255, 255, 255, 0.6);
    }

    .ghost {
      background: transparent;
      border-color: transparent;
      color: rgba(255, 255, 255, 0.7);
    }

    .ghost:hover {
      background: rgba(255, 255, 255, 0.1);
      color: white;
    }

    .destructive {
      background: rgba(239, 68, 68, 0.3);
      backdrop-filter: blur(24px);
      -webkit-backdrop-filter: blur(24px);
      border-color: rgba(248, 113, 113, 0.4);
      color: rgb(254, 226, 226);
      box-shadow: 0 4px 16px rgba(239, 68, 68, 0.3);
    }

    .destructive:hover {
      background: rgba(239, 68, 68, 0.4);
      border-color: rgba(248, 113, 113, 0.6);
    }

    /* Sizes */
    .size-default {
      height: 2.5rem;
      padding: 0.5rem 1rem;
    }

    .size-sm {
      height: 2rem;
      padding: 0.5rem 0.75rem;
      font-size: 0.75rem;
    }

    .size-lg {
      height: 3rem;
      padding: 0.5rem 1.5rem;
      font-size: 1rem;
    }

    .size-icon {
      height: 2.5rem;
      width: 2.5rem;
      padding: 0;
    }

    /* Glass highlights */
    .before-highlight::before {
      content: '';
      position: absolute;
      inset: 0;
      border-radius: 0.75rem;
      background: linear-gradient(to bottom, rgba(255, 255, 255, 0.2), transparent);
      pointer-events: none;
    }

    .content {
      position: relative;
      z-index: 10;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }
  `;

  @property({ type: String }) variant: 'default' | 'primary' | 'outline' | 'ghost' | 'destructive' = 'default';
  @property({ type: String }) size: 'default' | 'sm' | 'lg' | 'icon' = 'default';
  @property({ type: Boolean }) disabled = false;
  @property({ type: Boolean, attribute: 'glow-effect' }) glowEffect = false;
  @property({ type: String }) type: 'button' | 'submit' | 'reset' = 'button';

  private handleClick(e: MouseEvent) {
    if (!this.disabled) {
      this.dispatchEvent(new CustomEvent('click', {
        detail: { originalEvent: e },
        bubbles: true,
        composed: true
      }));
    }
  }

  render() {
    const classes = {
      [this.variant]: true,
      [`size-${this.size}`]: true,
      'before-highlight': this.variant !== 'ghost',
    };

    return html`
      <div class="wrapper">
        ${this.glowEffect ? html`<div class="glow"></div>` : nothing}
        <button
          class=${classMap(classes)}
          ?disabled=${this.disabled}
          type=${this.type}
          @click=${this.handleClick}
          part="button"
        >
          <span class="content">
            <slot></slot>
          </span>
        </button>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'glass-button': GlassButton;
  }
}
