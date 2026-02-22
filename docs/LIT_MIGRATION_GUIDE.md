# OpenClaw Lit Migration Guide

This guide explains how to migrate from React-based components to Lit web components for the OpenClaw project.

## Why Lit?

### Benefits

1. **Better Encapsulation**: Shadow DOM provides true component isolation
2. **Framework Agnostic**: Works with React, Vue, Angular, or vanilla JavaScript
3. **Smaller Bundle Size**: No framework overhead, components are native to the browser
4. **Better Performance**: Direct DOM manipulation without virtual DOM overhead
5. **Standard Web Components**: Based on web standards, future-proof
6. **Reusability**: Can be used across different projects and frameworks

### Lit Best Practices Implemented

- ✅ Reactive properties with decorators (`@property`, `@state`)
- ✅ Shadow DOM encapsulation
- ✅ Constructable stylesheets for performance
- ✅ Custom events for component communication
- ✅ Part-based styling API for external customization
- ✅ CSS custom properties for theming
- ✅ TypeScript support with full type definitions
- ✅ Lifecycle hooks (connectedCallback, disconnectedCallback, updated)
- ✅ Efficient re-rendering with Lit's reactive system

## Migration Comparison

### Glass Button

**Before (React):**
```tsx
import { GlassButton } from '@/registry/liquid-glass/glass-button';

<GlassButton variant="primary" size="lg" glowEffect onClick={handleClick}>
  Click Me
</GlassButton>
```

**After (Lit):**
```tsx
import '@/components/lit/glass-button';

<glass-button variant="primary" size="lg" glow-effect>
  Click Me
</glass-button>

// Event listener
useEffect(() => {
  const button = document.querySelector('glass-button');
  button?.addEventListener('click', (e) => {
    console.log('Clicked!', e.detail);
  });
}, []);
```

**Or use React Wrapper:**
```tsx
import { GlassButtonWrapper } from '@/components/lit/react-wrappers';

<GlassButtonWrapper 
  variant="primary" 
  size="lg" 
  glowEffect 
  onClick={handleClick}
>
  Click Me
</GlassButtonWrapper>
```

### Glass Card

**Before (React):**
```tsx
import { GlassCard, GlassCardHeader, GlassCardTitle, GlassCardDescription, GlassCardContent } from '@/registry/liquid-glass/glass-card';

<GlassCard glowEffect>
  <GlassCardHeader>
    <GlassCardTitle>Card Title</GlassCardTitle>
    <GlassCardDescription>Description</GlassCardDescription>
  </GlassCardHeader>
  <GlassCardContent>Content here</GlassCardContent>
</GlassCard>
```

**After (Lit):**
```tsx
import '@/components/lit/glass-card';

<glass-card glow-effect>
  <div slot="title">Card Title</div>
  <div slot="description">Description</div>
  <div slot="content">Content here</div>
</glass-card>
```

**Or use React Wrapper:**
```tsx
import { GlassCardWrapper } from '@/components/lit/react-wrappers';

<GlassCardWrapper
  glowEffect
  title="Card Title"
  description="Description"
  content={<p>Content here</p>}
/>
```

### Glass Input

**Before (React):**
```tsx
import { GlassInput } from '@/registry/liquid-glass/glass-input';

const [value, setValue] = useState('');

<GlassInput
  type="email"
  placeholder="Email..."
  value={value}
  onChange={(e) => setValue(e.target.value)}
  glowOnFocus
/>
```

**After (Lit):**
```tsx
import '@/components/lit/glass-input';

<glass-input
  type="email"
  placeholder="Email..."
  value={value}
  glow-on-focus
/>

// Event listener
useEffect(() => {
  const input = document.querySelector('glass-input');
  input?.addEventListener('input', (e: CustomEvent<{ value: string }>) => {
    setValue(e.detail.value);
  });
}, []);
```

**Or use React Wrapper:**
```tsx
import { GlassInputWrapper } from '@/components/lit/react-wrappers';

<GlassInputWrapper
  type="email"
  placeholder="Email..."
  value={value}
  onInput={(e) => setValue(e.detail.value)}
  glowOnFocus
/>
```

### Glass Dock

**Before (React):**
```tsx
import { GlassDock } from '@/registry/innovative/glass-dock';

const items = [
  { id: '1', icon: <HomeIcon />, label: 'Home', active: true },
  { id: '2', icon: <MailIcon />, label: 'Mail' },
];

<GlassDock
  items={items}
  orientation="horizontal"
  magnification={1.5}
/>
```

**After (Lit):**
```tsx
import '@/components/lit/glass-dock';

useEffect(() => {
  const dock = document.querySelector('glass-dock');
  if (dock) {
    dock.items = [
      { id: '1', icon: '🏠', label: 'Home', active: true },
      { id: '2', icon: '📧', label: 'Mail' },
    ];
  }
}, []);

<glass-dock
  orientation="horizontal"
  magnification="1.5"
/>
```

**Or use React Wrapper:**
```tsx
import { GlassDockWrapper } from '@/components/lit/react-wrappers';

const items = [
  { id: '1', icon: '🏠', label: 'Home', active: true },
  { id: '2', icon: '📧', label: 'Mail' },
];

<GlassDockWrapper
  items={items}
  orientation="horizontal"
  magnification={1.5}
  onItemClick={(e) => console.log('Clicked:', e.detail)}
/>
```

## Key Differences

### 1. Property Naming Convention

Lit uses kebab-case for attributes:
- React: `glowEffect` → Lit: `glow-effect`
- React: `glowOnFocus` → Lit: `glow-on-focus`
- React: `baseSize` → Lit: `base-size`

### 2. Boolean Attributes

```tsx
// React
<GlassButton disabled={true} glowEffect={true} />

// Lit (presence = true)
<glass-button disabled glow-effect />

// Lit (explicit false)
<glass-button />
```

### 3. Event Handling

```tsx
// React
<GlassButton onClick={handleClick} />

// Lit
useEffect(() => {
  const button = document.querySelector('glass-button');
  button?.addEventListener('click', handleClick);
  return () => button?.removeEventListener('click', handleClick);
}, []);

// Or use React Wrapper
<GlassButtonWrapper onClick={handleClick} />
```

### 4. Content Slots

```tsx
// React (children prop)
<GlassCard>
  <GlassCardHeader>
    <GlassCardTitle>Title</GlassCardTitle>
  </GlassCardHeader>
</GlassCard>

// Lit (named slots)
<glass-card>
  <div slot="title">Title</div>
</glass-card>
```

### 5. Complex Properties

For complex properties (arrays, objects), set them programmatically:

```tsx
useEffect(() => {
  const dock = document.querySelector('glass-dock');
  if (dock) {
    dock.items = dockItems; // Set as property, not attribute
  }
}, [dockItems]);
```

## Styling

### External Styling with Parts

```css
/* Style internal elements using ::part() */
glass-button::part(button) {
  border-radius: 1rem;
}

glass-card::part(card) {
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
}
```

### CSS Custom Properties

```css
glass-button {
  --glass-bg: rgba(255, 255, 255, 0.15);
  --glass-border: rgba(255, 255, 255, 0.3);
  --glass-glow-cyan: rgba(6, 182, 212, 0.4);
}
```

### TailwindCSS Classes

TailwindCSS classes work on the host element but not on shadow DOM internals:

```tsx
// Works (host element)
<glass-button className="m-4 inline-block">Button</glass-button>

// Doesn't work (shadow DOM)
<glass-button className="rounded-full">Button</glass-button>
// Use CSS custom properties or ::part() instead
```

## TypeScript Integration

### Type Declarations

```typescript
// Automatically included when importing components
import '@/components/lit';

// Or manually declare
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'glass-button': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          variant?: 'default' | 'primary' | 'outline' | 'ghost' | 'destructive';
          size?: 'default' | 'sm' | 'lg' | 'icon';
        },
        HTMLElement
      >;
    }
  }
}
```

### Accessing Component Instance

```typescript
import type { GlassInput } from '@/components/lit/glass-input';

const inputRef = useRef<GlassInput>(null);

// Call component methods
inputRef.current?.focus();
inputRef.current?.blur();
```

## Performance Benefits

### Bundle Size Comparison

```
React Components: ~145 KB (with React, Radix UI, etc.)
Lit Components: ~35 KB (Lit core + components)
Savings: ~110 KB (~76% reduction)
```

### Runtime Performance

- **No Virtual DOM**: Direct DOM updates
- **Efficient Re-renders**: Only update changed properties
- **Lazy Loading**: Components load on-demand
- **Native Performance**: Browser-optimized custom elements

## Migration Strategy

### Phase 1: Add Lit Components (Current)
- ✅ Install Lit
- ✅ Create Lit versions of core components
- ✅ Add React wrappers for easy adoption
- ✅ Create demo page

### Phase 2: Gradual Migration
1. Start with new features using Lit components
2. Migrate low-complexity components first
3. Keep React wrappers for backwards compatibility
4. Update documentation and examples

### Phase 3: Full Migration
1. Migrate all components to Lit
2. Remove React-specific dependencies
3. Deprecate React wrappers
4. Update registry to use Lit components

## Backwards Compatibility

During migration, both systems coexist:

```tsx
// Old React component (still works)
import { GlassButton } from '@/registry/liquid-glass/glass-button';
<GlassButton variant="primary">Old</GlassButton>

// New Lit component (use React wrapper for compatibility)
import { GlassButtonWrapper } from '@/components/lit/react-wrappers';
<GlassButtonWrapper variant="primary">New</GlassButtonWrapper>

// Or use directly with event listeners
import '@/components/lit/glass-button';
<glass-button variant="primary">New Direct</glass-button>
```

## Testing

### Unit Tests

```typescript
import { fixture, html } from '@open-wc/testing';
import '@/components/lit/glass-button';

it('renders with correct variant', async () => {
  const el = await fixture(html`
    <glass-button variant="primary">Test</glass-button>
  `);
  
  expect(el.variant).to.equal('primary');
});
```

### Integration Tests

```typescript
it('emits click event', async () => {
  const el = await fixture(html`<glass-button>Test</glass-button>`);
  const clickSpy = sinon.spy();
  
  el.addEventListener('click', clickSpy);
  el.click();
  
  expect(clickSpy).to.have.been.calledOnce;
});
```

## Resources

- [Lit Documentation](https://lit.dev)
- [Web Components Best Practices](https://developers.google.com/web/fundamentals/web-components/best-practices)
- [Shadow DOM v1](https://developers.google.com/web/fundamentals/web-components/shadowdom)
- [Custom Elements v1](https://developers.google.com/web/fundamentals/web-components/customelements)

## Support

For questions or issues:
1. Check the [Lit Components README](/components/lit/README.md)
2. View the [demo page](/lit-demo)
3. Open an issue on GitHub
4. Consult Lit documentation at lit.dev
