import Link from "next/link"
import {
  GlassCard,
  GlassCardHeader,
  GlassCardTitle,
  GlassCardDescription,
  GlassCardContent,
} from "@/components/liquid-glass/glass-card"
import { GlassButton } from "@/components/liquid-glass/glass-button"
import { GlassBadge } from "@/components/liquid-glass/glass-badge"
import {
  Square,
  LayoutGrid,
  MessageSquare,
  TextCursorInput,
  Layers,
  PanelLeft,
  Sparkles,
  ArrowRight,
  Package,
  BookOpen,
  Blocks,
} from "lucide-react"

const components = [
  {
    title: "Cards",
    description: "Flexible container components with glass morphism",
    href: "/docs/components/cards",
    icon: Square,
  },
  {
    title: "Buttons",
    description: "Interactive buttons with multiple variants and glow effects",
    href: "/docs/components/buttons",
    icon: LayoutGrid,
  },
  {
    title: "Dialogs",
    description: "Modal dialogs with backdrop blur and animations",
    href: "/docs/components/dialogs",
    icon: MessageSquare,
  },
  {
    title: "Inputs",
    description: "Form inputs with focus glow animations",
    href: "/docs/components/inputs",
    icon: TextCursorInput,
  },
  {
    title: "Tabs",
    description: "Tabbed interfaces with smooth transitions",
    href: "/docs/components/tabs",
    icon: Layers,
  },
]

export default function HomePage() {
  return (
    <main className="min-h-screen relative overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-linear-to-br from-slate-900 via-blue-950 to-slate-900" />

      {/* Animated gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/30 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-purple-500/30 rounded-full blur-3xl animate-pulse" />
      <div className="absolute top-1/2 left-1/2 w-72 h-72 bg-cyan-500/20 rounded-full blur-3xl animate-pulse" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-16 md:py-24">
        {/* Hero Section */}
        <header className="text-center mb-16 md:mb-24">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="relative h-12 w-12 rounded-xl bg-linear-to-br from-cyan-400 via-blue-500 to-purple-500 p-0.5">
              <div className="flex h-full w-full items-center justify-center rounded-[10px] bg-slate-900/90 backdrop-blur-sm">
                <Blocks className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>
          <div className="flex justify-center gap-2 mb-6">
            <GlassBadge variant="primary">
              <Sparkles className="w-3 h-3 mr-1" />
              Tailwind CSS v4
            </GlassBadge>
            <GlassBadge variant="default">Shadcn UI</GlassBadge>
            <GlassBadge variant="outline">
              <Package className="w-3 h-3 mr-1" />
              Ein Registry
            </GlassBadge>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 text-balance tracking-tight">
            Ein UI
            <span className="block bg-linear-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              Liquid Glass Components
            </span>
          </h1>
          <p className="text-white/60 max-w-2xl mx-auto text-lg md:text-xl mb-10 text-balance">
            Beautiful, responsive Shadcn components with frosted glass morphism. Built for modern web applications with
            full dark mode support. Now available as a Shadcn registry.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/docs">
              <GlassButton variant="primary" size="lg">
                <BookOpen className="w-4 h-4 mr-2" />
                Documentation
              </GlassButton>
            </Link>
            <Link href="/docs/components/cards">
              <GlassButton variant="outline" size="lg">
                Browse Components
                <ArrowRight className="w-4 h-4 ml-2" />
              </GlassButton>
            </Link>
            <Link href="/docs/blocks/admin">
              <GlassButton variant="ghost" size="lg">
                View Admin Demo
              </GlassButton>
            </Link>
          </div>
        </header>

        {/* Quick Install */}
        <section className="mb-16 max-w-2xl mx-auto">
          <div className="rounded-2xl border border-white/10 bg-black/40 backdrop-blur-xl p-6">
            <p className="text-sm text-white/60 mb-3">Quick Install</p>
            <code className="block text-sm md:text-base text-cyan-400 font-mono overflow-x-auto">
              npx shadcn@latest add https://ein-ui.vercel.app/r/glass-card.json
            </code>
          </div>
        </section>

        {/* Components Grid */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold text-white mb-8 text-center">Components</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {components.map((component) => (
              <Link key={component.href} href={component.href} className="group">
                <GlassCard className="h-full transition-transform duration-300 group-hover:scale-[1.02]">
                  <GlassCardHeader>
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-xl bg-white/10">
                        <component.icon className="w-5 h-5 text-white" />
                      </div>
                      <GlassCardTitle>{component.title}</GlassCardTitle>
                    </div>
                    <GlassCardDescription className="mt-2">{component.description}</GlassCardDescription>
                  </GlassCardHeader>
                  <GlassCardContent>
                    <span className="text-sm text-cyan-400 flex items-center gap-1 group-hover:gap-2 transition-all">
                      View component <ArrowRight className="w-4 h-4" />
                    </span>
                  </GlassCardContent>
                </GlassCard>
              </Link>
            ))}
          </div>
        </section>

        {/* Sample Pages */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold text-white mb-8 text-center">Blocks</h2>
          <Link href="/docs/blocks/admin" className="block group max-w-2xl mx-auto">
            <GlassCard className="transition-transform duration-300 group-hover:scale-[1.02]">
              <GlassCardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-linear-to-br from-cyan-500/30 to-purple-500/30">
                    <PanelLeft className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <GlassCardTitle>Admin Panel</GlassCardTitle>
                    <GlassCardDescription>
                      Full-featured admin dashboard with analytics, user management, and settings
                    </GlassCardDescription>
                  </div>
                </div>
              </GlassCardHeader>
              <GlassCardContent>
                <span className="text-sm text-cyan-400 flex items-center gap-1 group-hover:gap-2 transition-all">
                  View demo <ArrowRight className="w-4 h-4" />
                </span>
              </GlassCardContent>
            </GlassCard>
          </Link>
        </section>

        {/* Footer */}
        <footer className="text-center pt-8 border-t border-white/10">
          <p className="text-white/40 text-sm">
            Built by <span className="text-white/70 font-medium">Ehsan</span> with Shadcn UI & Tailwind CSS v4
          </p>
        </footer>
      </div>
    </main>
  )
}
