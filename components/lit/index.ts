/**
 * OpenClaw Lit Components
 * 
 * This module exports all Lit-based web components for the OpenClaw project.
 * These components follow Lit best practices with proper encapsulation,
 * reactive properties, and custom element definitions.
 * 
 * Usage:
 * ```typescript
 * import '@/components/lit';
 * ```
 * 
 * Or import individual components:
 * ```typescript
 * import '@/components/lit/glass-button';
 * import '@/components/lit/glass-card';
 * ```
 */

export { GlassButton } from './glass-button';
export { GlassCard } from './glass-card';
export { GlassInput } from './glass-input';
export { GlassDock } from './glass-dock';
export type { DockItem, DockOrientation } from './glass-dock';
