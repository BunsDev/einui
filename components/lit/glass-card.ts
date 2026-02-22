import { LitElement, html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';

/**
 * Glass Card - Lit Web Component
 * A beautiful glassmorphic card with optional glow effect
 * 
 * @slot - Default slot for card content
 * @slot header - Slot for card header
 * @slot title - Slot for card title
 * @slot description - Slot for card description
 * @slot content - Slot for main card content
 * @slot footer - Slot for card footer
 * 
 * @cssproperty --glass-bg - Background color
 * @cssproperty --glass-border - Border color
 * @cssproperty --glass-shadow - Shadow color
 * @cssproperty --glass-glow-cyan - Cyan glow color
 * @cssproperty --glass-glow-blue - Blue glow color
 * @cssproperty --glass-glow-purple - Purple glow color
 */
@customElement('glass-card')
export class GlassCard extends LitElement {
  static styles = css`
    :host {
      display: block;
      --glass-bg: rgba(255, 255, 255, 0.1);
      --glass-border: rgba(255, 255, 255, 0.2);
      --glass-shadow: rgba(0, 0, 0, 0.37);
      --glass-glow-cyan: rgba(6, 182, 212, 0.3);
      --glass-glow-blue: rgba(59, 130, 246, 0.3);
      --glass-glow-purple: rgba(168, 85, 247, 0.3);
    }

    .wrapper {
      position: relative;
    }

    .glow {
      position: absolute;
      inset: -4px;
      border-radius: 1rem;
      background: linear-gradient(to right, var(--glass-glow-cyan), var(--glass-glow-blue), var(--glass-glow-purple));
      filter: blur(24px);
      opacity: 0.7;
    }

    .card {
      position: relative;
      border-radius: 1rem;
      border: 1px solid var(--glass-border);
      background: var(--glass-bg);
      backdrop-filter: blur(24px);
      -webkit-backdrop-filter: blur(24px);
      box-shadow: 0 8px 32px var(--glass-shadow);
    }

    .card::before {
      content: '';
      position: absolute;
      inset: 0;
      border-radius: 1rem;
      background: linear-gradient(to bottom, rgba(255, 255, 255, 0.2), transparent);
      pointer-events: none;
    }

    .card::after {
      content: '';
      position: absolute;
      inset: 1px;
      border-radius: calc(1rem - 1px);
      box-shadow: inset 0 1px 1px rgba(255, 255, 255, 0.1);
      pointer-events: none;
    }

    .content {
      position: relative;
      z-index: 10;
    }

    .header {
      display: flex;
      flex-direction: column;
      gap: 0.375rem;
      padding: 1.5rem;
    }

    .title {
      font-size: 1.25rem;
      font-weight: 600;
      color: white;
      line-height: 1;
      letter-spacing: -0.025em;
    }

    .description {
      font-size: 0.875rem;
      color: rgba(255, 255, 255, 0.6);
    }

    .main-content {
      padding: 1.5rem;
      padding-top: 0;
    }

    .footer {
      display: flex;
      align-items: center;
      padding: 1.5rem;
      padding-top: 0;
    }

    .default-slot {
      padding: 1.5rem;
    }
  `;

  @property({ type: Boolean, attribute: 'glow-effect' }) glowEffect = true;

  private hasSlot(name: string): boolean {
    const slot = this.shadowRoot?.querySelector(`slot[name="${name}"]`) as HTMLSlotElement;
    return slot?.assignedNodes().length > 0;
  }

  render() {
    return html`
      <div class="wrapper">
        ${this.glowEffect ? html`<div class="glow"></div>` : nothing}
        <div class="card" part="card">
          <div class="content">
            <div class="header" part="header">
              <slot name="header"></slot>
              <div class="title" part="title">
                <slot name="title"></slot>
              </div>
              <div class="description" part="description">
                <slot name="description"></slot>
              </div>
            </div>
            
            <div class="main-content" part="content">
              <slot name="content"></slot>
            </div>
            
            <div class="footer" part="footer">
              <slot name="footer"></slot>
            </div>
            
            <div class="default-slot">
              <slot></slot>
            </div>
          </div>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'glass-card': GlassCard;
  }
}
