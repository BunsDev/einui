import { LitElement, html, css, nothing, PropertyValues } from 'lit';
import { customElement, property, state, query } from 'lit/decorators.js';
import { repeat } from 'lit/directives/repeat.js';
import { styleMap } from 'lit/directives/style-map.js';

export interface DockItem {
  id: string;
  icon: string;
  label: string;
  href?: string;
  active?: boolean;
}

type DockOrientation = 'horizontal' | 'vertical';
type GlassIntensity = 'low' | 'medium' | 'high';

/**
 * Glass Dock - Lit Web Component
 * A beautiful glassmorphic dock with magnification effect
 * 
 * @fires item-click - Emitted when a dock item is clicked
 * 
 * @cssproperty --glass-bg - Background color
 * @cssproperty --glass-border - Border color
 * @cssproperty --glass-glow-cyan - Cyan glow color
 * @cssproperty --glass-glow-blue - Blue glow color
 * @cssproperty --glass-glow-purple - Purple glow color
 */
@customElement('glass-dock')
export class GlassDock extends LitElement {
  static styles = css`
    :host {
      display: block;
      --glass-bg-low: rgba(255, 255, 255, 0.05);
      --glass-bg-medium: rgba(255, 255, 255, 0.1);
      --glass-bg-high: rgba(255, 255, 255, 0.15);
      --glass-border-low: rgba(255, 255, 255, 0.1);
      --glass-border-medium: rgba(255, 255, 255, 0.2);
      --glass-border-high: rgba(255, 255, 255, 0.3);
      --glass-glow-cyan: rgba(6, 182, 212, 0.3);
      --glass-glow-blue: rgba(59, 130, 246, 0.25);
      --glass-glow-purple: rgba(168, 85, 247, 0.3);
    }

    .container {
      position: relative;
    }

    .glow-outer {
      position: absolute;
      border-radius: 1.5rem;
      opacity: 0.6;
      filter: blur(32px);
      background: linear-gradient(to right, var(--glass-glow-cyan), var(--glass-glow-blue), var(--glass-glow-purple));
    }

    .glow-inner {
      position: absolute;
      border-radius: 1.5rem;
      opacity: 0.4;
      filter: blur(24px);
      background: linear-gradient(to right, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.1));
    }

    .horizontal .glow-outer {
      inset: -1rem -1.5rem;
    }

    .horizontal .glow-inner {
      inset: -0.5rem -0.75rem;
    }

    .vertical .glow-outer {
      inset: -1.5rem -1rem;
    }

    .vertical .glow-inner {
      inset: -0.75rem -0.5rem;
    }

    .dock {
      position: relative;
      display: flex;
      gap: 0.5rem;
      padding: 0.75rem 1rem;
      border-radius: 1rem;
      border: 1px solid;
      backdrop-filter: blur(48px);
      -webkit-backdrop-filter: blur(48px);
      box-shadow: 
        0 8px 32px rgba(0, 0, 0, 0.3),
        inset 0 1px 1px rgba(255, 255, 255, 0.2),
        inset 0 -1px 1px rgba(0, 0, 0, 0.1);
    }

    .dock::before {
      content: '';
      position: absolute;
      inset: 0;
      border-radius: 1rem;
      background: linear-gradient(to bottom, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.05), transparent);
      pointer-events: none;
    }

    .dock::after {
      content: '';
      position: absolute;
      inset: 0;
      border-radius: 1rem;
      background: linear-gradient(135deg, transparent, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.15));
      pointer-events: none;
    }

    .dock-top-highlight {
      position: absolute;
      inset: 0 0 auto 0;
      height: 1px;
      background: linear-gradient(to right, transparent, rgba(255, 255, 255, 0.4), transparent);
      pointer-events: none;
    }

    .dock-inner-shadow {
      position: absolute;
      inset: 0;
      border-radius: 1rem;
      box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1);
      pointer-events: none;
    }

    .vertical {
      flex-direction: column;
      align-items: center;
    }

    .horizontal {
      align-items: flex-end;
    }

    .item-wrapper {
      position: relative;
      display: flex;
      transition: all 0.2s ease-out;
    }

    .vertical .item-wrapper {
      flex-direction: row;
      justify-content: flex-end;
    }

    .horizontal .item-wrapper {
      flex-direction: column;
      align-items: center;
    }

    .tooltip {
      position: absolute;
      padding: 0.375rem 0.75rem;
      border-radius: 0.75rem;
      background: rgba(255, 255, 255, 0.15);
      backdrop-filter: blur(48px);
      -webkit-backdrop-filter: blur(48px);
      border: 1px solid rgba(255, 255, 255, 0.3);
      color: white;
      font-size: 0.875rem;
      font-weight: 500;
      white-space: nowrap;
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2), inset 0 1px 1px rgba(255, 255, 255, 0.2);
      transition: all 0.2s ease;
      pointer-events: none;
    }

    .tooltip::before {
      content: '';
      position: absolute;
      inset: 0;
      border-radius: 0.75rem;
      background: linear-gradient(to bottom, rgba(255, 255, 255, 0.15), transparent);
      pointer-events: none;
    }

    .tooltip::after {
      content: '';
      position: absolute;
      width: 0.625rem;
      height: 0.625rem;
      background: rgba(255, 255, 255, 0.15);
      backdrop-filter: blur(48px);
      -webkit-backdrop-filter: blur(48px);
      border: 1px solid rgba(255, 255, 255, 0.3);
      transform: rotate(45deg);
    }

    .vertical .tooltip {
      right: -0.5rem;
      transform: translateX(100%);
    }

    .vertical .tooltip::after {
      left: 0;
      top: 50%;
      transform: translateX(-50%) translateY(-50%) rotate(45deg);
      border-top: 0;
      border-right: 0;
    }

    .horizontal .tooltip {
      top: -3rem;
    }

    .horizontal .tooltip::after {
      left: 50%;
      bottom: -0.375rem;
      transform: translateX(-50%) rotate(45deg);
      border-top: 0;
      border-left: 0;
    }

    .tooltip.hidden {
      opacity: 0;
      transform: translateY(0.5rem);
    }

    .vertical .tooltip.hidden {
      transform: translateX(calc(100% - 0.5rem));
    }

    button {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 0.75rem;
      background: rgba(255, 255, 255, 0.1);
      backdrop-filter: blur(24px);
      -webkit-backdrop-filter: blur(24px);
      border: 1px solid rgba(255, 255, 255, 0.2);
      transition: all 0.2s ease-out;
      cursor: pointer;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15), inset 0 1px 1px rgba(255, 255, 255, 0.15);
    }

    button:hover {
      background: rgba(255, 255, 255, 0.2);
    }

    button::before {
      content: '';
      position: absolute;
      inset: 0;
      border-radius: 0.75rem;
      background: linear-gradient(to bottom, rgba(255, 255, 255, 0.2), transparent);
      pointer-events: none;
    }

    button::after {
      content: '';
      position: absolute;
      inset: 0;
      border-radius: 0.75rem;
      background: linear-gradient(135deg, transparent, rgba(255, 255, 255, 0.1));
      pointer-events: none;
    }

    button.active {
      background: rgba(255, 255, 255, 0.25);
      border-color: rgba(255, 255, 255, 0.4);
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2), inset 0 1px 1px rgba(255, 255, 255, 0.3);
    }

    .active-glow {
      position: absolute;
      inset: -0.375rem;
      border-radius: 1rem;
      background: linear-gradient(to right, rgba(6, 182, 212, 0.4), rgba(59, 130, 246, 0.4));
      filter: blur(12px);
      z-index: -1;
    }

    .icon {
      color: rgba(255, 255, 255, 0.9);
      transition: transform 0.2s ease-out;
      font-size: 1.25rem;
    }

    .active-indicator {
      position: absolute;
      width: 0.375rem;
      height: 0.375rem;
      border-radius: 50%;
      background: linear-gradient(to right, rgb(34, 211, 238), rgb(59, 130, 246));
      box-shadow: 
        0 0 8px rgba(6, 182, 212, 0.8),
        0 0 16px rgba(6, 182, 212, 0.4);
    }

    .vertical .active-indicator {
      left: -0.25rem;
    }

    .horizontal .active-indicator {
      bottom: -0.25rem;
    }
  `;

  @property({ type: Array }) items: DockItem[] = [];
  @property({ type: Number }) magnification = 1.5;
  @property({ type: Number, attribute: 'base-size' }) baseSize = 48;
  @property({ type: Number, attribute: 'max-size' }) maxSize = 72;
  @property({ type: String }) orientation: DockOrientation = 'horizontal';
  @property({ type: String, attribute: 'glass-intensity' }) glassIntensity: GlassIntensity = 'high';

  @state() private hoveredIndex: number | null = null;
  @state() private mousePos: number | null = null;

  @query('.dock') private dockElement!: HTMLElement;

  private getScale(index: number): number {
    if (this.mousePos === null) return 1;

    const itemSize = this.baseSize + 16;
    const itemCenter = index * itemSize + itemSize / 2;
    const distance = Math.abs(this.mousePos - itemCenter);
    const maxDistance = itemSize * 2;

    if (distance > maxDistance) return 1;

    const scale = 1 + (this.magnification - 1) * (1 - distance / maxDistance);
    return Math.min(scale, this.magnification);
  }

  private handleMouseMove(e: MouseEvent) {
    if (!this.dockElement) return;
    const rect = this.dockElement.getBoundingClientRect();
    this.mousePos = this.orientation === 'vertical' 
      ? e.clientY - rect.top 
      : e.clientX - rect.left;
  }

  private handleMouseLeave() {
    this.mousePos = null;
    this.hoveredIndex = null;
  }

  private handleItemClick(item: DockItem, index: number) {
    this.dispatchEvent(new CustomEvent('item-click', {
      detail: { item, index },
      bubbles: true,
      composed: true
    }));

    if (item.href) {
      window.location.href = item.href;
    }
  }

  private getGlassClasses() {
    const intensity = this.glassIntensity;
    return {
      background: `var(--glass-bg-${intensity})`,
      borderColor: `var(--glass-border-${intensity})`,
    };
  }

  protected updated(changedProperties: PropertyValues) {
    super.updated(changedProperties);
    if (changedProperties.has('items')) {
      this.requestUpdate();
    }
  }

  render() {
    const isVertical = this.orientation === 'vertical';
    const glassStyles = this.getGlassClasses();

    return html`
      <div class="container ${this.orientation}">
        <div class="glow-outer"></div>
        <div class="glow-inner"></div>
        
        <div 
          class="dock ${this.orientation}"
          style=${styleMap(glassStyles)}
          @mousemove=${this.handleMouseMove}
          @mouseleave=${this.handleMouseLeave}
          role="toolbar"
          aria-label="Application dock"
        >
          <div class="dock-top-highlight"></div>
          <div class="dock-inner-shadow"></div>
          
          ${repeat(this.items, (item) => item.id, (item, index) => {
            const scale = this.getScale(index);
            const size = this.baseSize * scale;
            const isHovered = this.hoveredIndex === index;
            const offset = isVertical 
              ? (this.maxSize - size) / 2 
              : (this.maxSize - size) / 2;

            const itemStyle = {
              width: `${size}px`,
              height: `${size}px`,
              transform: isVertical 
                ? `translateX(${offset}px)` 
                : `translateY(${offset}px)`,
            };

            const wrapperStyle = {
              [isVertical ? 'width' : 'height']: `${this.maxSize}px`,
            };

            return html`
              <div 
                class="item-wrapper ${this.orientation}"
                style=${styleMap(wrapperStyle)}
                @mouseenter=${() => this.hoveredIndex = index}
              >
                <div class="tooltip ${isHovered ? '' : 'hidden'}">
                  <span>${item.label}</span>
                </div>

                <button
                  class=${item.active ? 'active' : ''}
                  style=${styleMap(itemStyle)}
                  @click=${() => this.handleItemClick(item, index)}
                  aria-label=${item.label}
                  part="item"
                >
                  ${item.active ? html`<div class="active-glow"></div>` : nothing}
                  <span class="icon" style="transform: scale(${scale})">${item.icon}</span>
                </button>

                ${item.active ? html`<div class="active-indicator"></div>` : nothing}
              </div>
            `;
          })}
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'glass-dock': GlassDock;
  }
}
