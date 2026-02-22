# OpenClaw Lit Components

This directory contains Lit-based web components for the OpenClaw project. These components are built following Lit best practices with proper encapsulation, reactive updates, and custom element definitions.

## Components

### 🔘 Glass Button (`<glass-button>`)

A beautiful glassmorphic button with multiple variants and sizes.

**Properties:**
- `variant`: `'default' | 'primary' | 'outline' | 'ghost' | 'destructive'` (default: `'default'`)
- `size`: `'default' | 'sm' | 'lg' | 'icon'` (default: `'default'`)
- `disabled`: `boolean` (default: `false`)
- `glow-effect`: `boolean` (default: `false`)
- `type`: `'button' | 'submit' | 'reset'` (default: `'button'`)

**Events:**
- `click`: Emitted when button is clicked

**Example:**
```html
<glass-button variant="primary" size="lg" glow-effect>
  Click Me
</glass-button>
```

### 🃏 Glass Card (`<glass-card>`)

An elegant glassmorphic card with optional glow effect and multiple slots.

**Properties:**
- `glow-effect`: `boolean` (default: `true`)

**Slots:**
- `default`: Default slot for card content
- `header`: Slot for card header
- `title`: Slot for card title
- `description`: Slot for card description
- `content`: Slot for main card content
- `footer`: Slot for card footer

**Example:**
```html
<glass-card glow-effect>
  <div slot="title">Card Title</div>
  <div slot="description">Card description</div>
  <div slot="content">Main content here</div>
  <div slot="footer">
    <glass-button>Action</glass-button>
  </div>
</glass-card>
```

### 📝 Glass Input (`<glass-input>`)

A glassmorphic input with focus glow effect.

**Properties:**
- `type`: `string` (default: `'text'`)
- `value`: `string` (default: `''`)
- `placeholder`: `string` (default: `''`)
- `disabled`: `boolean` (default: `false`)
- `required`: `boolean` (default: `false`)
- `name`: `string` (default: `''`)
- `autocomplete`: `string` (default: `''`)
- `minlength`: `number` (optional)
- `maxlength`: `number` (optional)
- `pattern`: `string` (optional)
- `glow-on-focus`: `boolean` (default: `true`)

**Events:**
- `input`: Emitted when input value changes
- `change`: Emitted when input value is committed
- `focus`: Emitted when input receives focus
- `blur`: Emitted when input loses focus

**Methods:**
- `focus()`: Sets focus on the input
- `blur()`: Removes focus from the input

**Example:**
```html
<glass-input 
  type="email" 
  placeholder="your@email.com"
  glow-on-focus
  required
/>
```

### 🎯 Glass Dock (`<glass-dock>`)

A macOS-style dock with magnification effect.

**Properties:**
- `items`: `DockItem[]` (array of dock items)
- `magnification`: `number` (default: `1.5`)
- `base-size`: `number` (default: `48`)
- `max-size`: `number` (default: `72`)
- `orientation`: `'horizontal' | 'vertical'` (default: `'horizontal'`)
- `glass-intensity`: `'low' | 'medium' | 'high'` (default: `'high'`)

**Events:**
- `item-click`: Emitted when a dock item is clicked

**DockItem Interface:**
```typescript
interface DockItem {
  id: string;
  icon: string;      // Emoji or icon
  label: string;     // Tooltip label
  href?: string;     // Optional link
  active?: boolean;  // Active state
}
```

**Example:**
```javascript
const dock = document.querySelector('glass-dock');
dock.items = [
  { id: '1', icon: '🏠', label: 'Home', active: true },
  { id: '2', icon: '📧', label: 'Messages' },
  { id: '3', icon: '📁', label: 'Files' },
];

dock.addEventListener('item-click', (e) => {
  console.log('Item clicked:', e.detail);
});
```

## Installation

Add Lit to your project:

```bash
pnpm add lit
```

## Usage

### Import Components

Import all components:
```typescript
import '@/components/lit';
```

Or import individual components:
```typescript
import '@/components/lit/glass-button';
import '@/components/lit/glass-card';
import '@/components/lit/glass-input';
import '@/components/lit/glass-dock';
```

### Use in HTML

```html
<glass-button variant="primary">Click Me</glass-button>

<glass-card glow-effect>
  <div slot="title">My Card</div>
  <div slot="content">Content here</div>
</glass-card>

<glass-input type="email" placeholder="Email..." glow-on-focus />
```

### Use with React/Next.js

```tsx
'use client';

import { useEffect } from 'react';

export default function MyPage() {
  useEffect(() => {
    // Import Lit components on the client side
    import('@/components/lit');
  }, []);

  return (
    <div>
      <glass-button variant="primary">Click Me</glass-button>
    </div>
  );
}

// TypeScript declarations
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'glass-button': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          variant?: 'default' | 'primary' | 'outline' | 'ghost' | 'destructive';
          size?: 'default' | 'sm' | 'lg' | 'icon';
          disabled?: boolean;
          'glow-effect'?: boolean;
        },
        HTMLElement
      >;
    }
  }
}
```

## CSS Custom Properties

All components support CSS custom properties for theming:

```css
glass-button {
  --glass-bg: rgba(255, 255, 255, 0.1);
  --glass-border: rgba(255, 255, 255, 0.2);
  --glass-glow-cyan: rgba(6, 182, 212, 0.3);
  --glass-glow-blue: rgba(59, 130, 246, 0.3);
  --glass-glow-purple: rgba(168, 85, 247, 0.3);
}
```

## Part-Based Styling

Components expose parts for external styling:

```css
glass-button::part(button) {
  border-radius: 1rem;
}

glass-card::part(card) {
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
}

glass-input::part(input) {
  font-size: 1rem;
}
```

## Features

✅ **Shadow DOM Encapsulation**: Components are fully encapsulated with Shadow DOM
✅ **Reactive Properties**: Properties update efficiently with Lit's reactive system
✅ **Custom Events**: Components emit standard custom events
✅ **TypeScript Support**: Full TypeScript definitions included
✅ **Framework Agnostic**: Works with any framework or vanilla JavaScript
✅ **Accessibility**: Built with ARIA attributes and keyboard navigation
✅ **Performance**: Optimized rendering with Lit's efficient diffing

## Browser Support

These components work in all modern browsers that support:
- Custom Elements v1
- Shadow DOM v1
- ES2017

For older browsers, use the [web components polyfills](https://github.com/webcomponents/polyfills).

## Demo

Visit `/lit-demo` to see all components in action.

## License

ISC
