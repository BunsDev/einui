'use client';

import { useEffect } from 'react';

/**
 * Lit Components Demo Page
 * 
 * This page demonstrates all Lit-based web components created for OpenClaw.
 * The components are fully encapsulated custom elements that work independently
 * of the React framework.
 */
export default function LitDemoPage() {
  useEffect(() => {
    // Dynamically import Lit components on the client side
    import('@/components/lit');
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-8">
      <div className="mx-auto max-w-7xl space-y-12">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-5xl font-bold text-white">OpenClaw Lit Components</h1>
          <p className="text-xl text-white/70">
            Fully encapsulated web components built with Lit
          </p>
        </div>

        {/* Glass Button Section */}
        <section className="space-y-6">
          <div>
            <h2 className="text-3xl font-semibold text-white mb-2">Glass Buttons</h2>
            <p className="text-white/60">Beautiful glassmorphic buttons with multiple variants</p>
          </div>
          
          <div className="flex flex-wrap gap-4">
            <glass-button variant="default">Default Button</glass-button>
            <glass-button variant="primary">Primary Button</glass-button>
            <glass-button variant="outline">Outline Button</glass-button>
            <glass-button variant="ghost">Ghost Button</glass-button>
            <glass-button variant="destructive">Destructive</glass-button>
          </div>

          <div className="flex flex-wrap gap-4">
            <glass-button size="sm">Small</glass-button>
            <glass-button size="default">Default</glass-button>
            <glass-button size="lg">Large</glass-button>
            <glass-button size="icon">🚀</glass-button>
          </div>

          <div className="flex flex-wrap gap-4">
            <glass-button variant="primary" glow-effect>With Glow Effect</glass-button>
            <glass-button disabled>Disabled</glass-button>
          </div>
        </section>

        {/* Glass Card Section */}
        <section className="space-y-6">
          <div>
            <h2 className="text-3xl font-semibold text-white mb-2">Glass Cards</h2>
            <p className="text-white/60">Elegant glassmorphic cards with glow effects</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <glass-card glow-effect>
              <div slot="title">Card Title</div>
              <div slot="description">This is a beautiful glass card with glow effect</div>
              <div slot="content">
                <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.875rem' }}>
                  Card content goes here. This component uses Lit for better performance and encapsulation.
                </p>
              </div>
              <div slot="footer">
                <glass-button size="sm">Action</glass-button>
              </div>
            </glass-card>

            <glass-card>
              <div slot="title">No Glow Effect</div>
              <div slot="description">This card has the glow disabled</div>
              <div slot="content">
                <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.875rem' }}>
                  You can control the glow effect with the glow-effect attribute.
                </p>
              </div>
            </glass-card>

            <glass-card glow-effect>
              <div slot="title">Feature Card</div>
              <div slot="description">Showcase your features</div>
              <div slot="content">
                <ul style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.875rem', listStyle: 'disc', paddingLeft: '1.5rem' }}>
                  <li>Reactive properties</li>
                  <li>Shadow DOM encapsulation</li>
                  <li>Custom events</li>
                  <li>Framework agnostic</li>
                </ul>
              </div>
            </glass-card>
          </div>
        </section>

        {/* Glass Input Section */}
        <section className="space-y-6">
          <div>
            <h2 className="text-3xl font-semibold text-white mb-2">Glass Inputs</h2>
            <p className="text-white/60">Glassmorphic form inputs with focus effects</p>
          </div>

          <div className="max-w-2xl space-y-4">
            <div>
              <label className="block text-sm font-medium text-white mb-2">Default Input</label>
              <glass-input 
                type="text" 
                placeholder="Enter your name..."
                glow-on-focus
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-2">Email Input</label>
              <glass-input 
                type="email" 
                placeholder="your@email.com"
                glow-on-focus
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-2">Password Input</label>
              <glass-input 
                type="password" 
                placeholder="••••••••"
                glow-on-focus
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-2">Disabled Input</label>
              <glass-input 
                type="text" 
                value="Disabled input"
                disabled
              />
            </div>
          </div>
        </section>

        {/* Glass Dock Section */}
        <section className="space-y-6">
          <div>
            <h2 className="text-3xl font-semibold text-white mb-2">Glass Dock</h2>
            <p className="text-white/60">macOS-style dock with magnification effect</p>
          </div>

          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-medium text-white mb-4">Horizontal Dock</h3>
              <div className="flex justify-center">
                <glass-dock
                  id="horizontal-dock"
                  orientation="horizontal"
                  magnification="1.5"
                  base-size="48"
                  max-size="72"
                  glass-intensity="high"
                />
              </div>
            </div>

            <div>
              <h3 className="text-xl font-medium text-white mb-4">Vertical Dock</h3>
              <div className="flex justify-center">
                <glass-dock
                  id="vertical-dock"
                  orientation="vertical"
                  magnification="1.5"
                  base-size="48"
                  max-size="72"
                  glass-intensity="high"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Component Features */}
        <section className="space-y-6">
          <div>
            <h2 className="text-3xl font-semibold text-white mb-2">Component Features</h2>
          </div>

          <glass-card glow-effect>
            <div slot="title">Built with Lit Best Practices</div>
            <div slot="content">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4" style={{ color: 'rgba(255,255,255,0.8)' }}>
                <div>
                  <h4 className="font-semibold text-white mb-2">🎨 Styling</h4>
                  <ul className="space-y-1 text-sm">
                    <li>• Shadow DOM encapsulation</li>
                    <li>• CSS custom properties</li>
                    <li>• Constructable stylesheets</li>
                    <li>• Part-based styling API</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-2">⚡ Reactivity</h4>
                  <ul className="space-y-1 text-sm">
                    <li>• Reactive properties with decorators</li>
                    <li>• Efficient re-rendering</li>
                    <li>• State management</li>
                    <li>• Lifecycle methods</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-2">🔧 Architecture</h4>
                  <ul className="space-y-1 text-sm">
                    <li>• Custom element registration</li>
                    <li>• TypeScript decorators</li>
                    <li>• Event dispatching</li>
                    <li>• Template directives</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-2">♿ Accessibility</h4>
                  <ul className="space-y-1 text-sm">
                    <li>• ARIA attributes</li>
                    <li>• Keyboard navigation</li>
                    <li>• Focus management</li>
                    <li>• Semantic HTML</li>
                  </ul>
                </div>
              </div>
            </div>
          </glass-card>
        </section>

        {/* Usage Example */}
        <section className="space-y-6 pb-12">
          <div>
            <h2 className="text-3xl font-semibold text-white mb-2">Usage Example</h2>
            <p className="text-white/60">How to use these components in your project</p>
          </div>

          <glass-card>
            <div slot="content">
              <pre className="text-sm text-white/90 overflow-x-auto">
                <code>{`// Import all components
import '@/components/lit';

// Or import individual components
import '@/components/lit/glass-button';
import '@/components/lit/glass-card';
import '@/components/lit/glass-input';
import '@/components/lit/glass-dock';

// Use in HTML
<glass-button variant="primary" size="lg">
  Click Me
</glass-button>

<glass-card glow-effect>
  <div slot="title">My Card</div>
  <div slot="content">Card content here</div>
</glass-card>

<glass-input 
  type="email" 
  placeholder="Email..." 
  glow-on-focus
/>

// Listen to events
const button = document.querySelector('glass-button');
button.addEventListener('click', (e) => {
  console.log('Button clicked!', e.detail);
});`}</code>
              </pre>
            </div>
          </glass-card>
        </section>
      </div>

      {/* Script to initialize dock items */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
            if (typeof window !== 'undefined') {
              setTimeout(() => {
                const horizontalDock = document.getElementById('horizontal-dock');
                const verticalDock = document.getElementById('vertical-dock');
                
                const dockItems = [
                  { id: '1', icon: '🏠', label: 'Home', active: true },
                  { id: '2', icon: '📧', label: 'Messages' },
                  { id: '3', icon: '📁', label: 'Files' },
                  { id: '4', icon: '⚙️', label: 'Settings' },
                  { id: '5', icon: '👤', label: 'Profile' },
                  { id: '6', icon: '🔍', label: 'Search' },
                ];

                if (horizontalDock) {
                  horizontalDock.items = dockItems;
                }
                
                if (verticalDock) {
                  verticalDock.items = dockItems;
                }

                // Listen to dock item clicks
                [horizontalDock, verticalDock].forEach(dock => {
                  if (dock) {
                    dock.addEventListener('item-click', (e) => {
                      console.log('[v0] Dock item clicked:', e.detail);
                      
                      // Update active state
                      const items = dock.items.map(item => ({
                        ...item,
                        active: item.id === e.detail.item.id
                      }));
                      dock.items = items;
                    });
                  }
                });
              }, 100);
            }
          `,
        }}
      />
    </main>
  );
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'glass-button': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & {
        variant?: 'default' | 'primary' | 'outline' | 'ghost' | 'destructive';
        size?: 'default' | 'sm' | 'lg' | 'icon';
        disabled?: boolean;
        'glow-effect'?: boolean;
      }, HTMLElement>;
      'glass-card': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & {
        'glow-effect'?: boolean;
      }, HTMLElement>;
      'glass-input': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & {
        type?: string;
        value?: string;
        placeholder?: string;
        disabled?: boolean;
        'glow-on-focus'?: boolean;
      }, HTMLElement>;
      'glass-dock': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & {
        orientation?: 'horizontal' | 'vertical';
        magnification?: string;
        'base-size'?: string;
        'max-size'?: string;
        'glass-intensity'?: 'low' | 'medium' | 'high';
        items?: Array<{
          id: string;
          icon: string;
          label: string;
          href?: string;
          active?: boolean;
        }>;
      }, HTMLElement>;
    }
  }
}
