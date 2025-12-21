import Link from "next/link";
import {
  Square,
  LayoutGrid,
  MessageSquare,
  TextCursorInput,
  Layers,
  Info,
  User,
  CheckCircle,
  ToggleLeft,
  Sliders,
  Command,
  Bell,
  MousePointer,
  Droplets,
  Clock,
  Gauge,
  Dock,
  Sparkles,
  Calendar,
  TrendingUp,
  Trophy,
  CloudSun,
} from "lucide-react";
import { GlassBadge } from "@/registry/liquid-glass/glass-badge";

const baseComponents = [
  { title: "Cards", href: "/docs/components/cards", icon: Square },
  { title: "Buttons", href: "/docs/components/buttons", icon: LayoutGrid },
  { title: "Dialogs", href: "/docs/components/dialogs", icon: MessageSquare },
  { title: "Inputs", href: "/docs/components/inputs", icon: TextCursorInput },
  { title: "Tabs", href: "/docs/components/tabs", icon: Layers },
  { title: "Badge", href: "/docs/components/badge", icon: Info },
  { title: "Avatar", href: "/docs/components/avatar", icon: User },
  { title: "Progress", href: "/docs/components/progress", icon: CheckCircle },
  { title: "Switch", href: "/docs/components/switch", icon: ToggleLeft },
  { title: "Slider", href: "/docs/components/slider", icon: Sliders },
];

const advancedComponents = [
  {
    title: "Command Palette",
    href: "/docs/components/command-palette",
    icon: Command,
    isNew: true,
  },
  { title: "Notifications", href: "/docs/components/notifications", icon: Bell, isNew: true },
  { title: "Morph Card", href: "/docs/components/morph-card", icon: MousePointer, isNew: true },
  { title: "Ripple", href: "/docs/components/ripple", icon: Droplets },
  { title: "Timeline", href: "/docs/components/timeline", icon: Clock },
  { title: "Gauge", href: "/docs/components/gauge", icon: Gauge },
  { title: "Dock", href: "/docs/components/dock", icon: Dock },
  { title: "Spotlight", href: "/docs/components/spotlight", icon: Sparkles },
];

const widgetTypes = [
  { title: "Calendar", href: "/docs/components/widgets/calendar", icon: Calendar },
  { title: "Clock", href: "/docs/components/widgets/clock", icon: Clock },
  { title: "Weather", href: "/docs/components/widgets/weather", icon: CloudSun },
  { title: "Stocks", href: "/docs/components/widgets/stocks", icon: TrendingUp },
  { title: "Sports", href: "/docs/components/widgets/sports", icon: Trophy },
  { title: "Productivity", href: "/docs/components/widgets/productivity", icon: CheckCircle },
];

export function ComponentGrid() {
  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Base Components */}
      <div>
        <h3 className="text-sm font-medium text-white/40 uppercase tracking-wider mb-4">
          Base Components
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
          {baseComponents.map((component) => (
            <Link key={component.href} href={component.href} className="group">
              <div className="p-3 rounded-xl bg-white/2 border border-white/5 hover:bg-white/5 hover:border-white/10 transition-all text-center">
                <component.icon className="w-4 h-4 text-white/40 mx-auto mb-1.5 group-hover:text-cyan-400 transition-colors" />
                <span className="text-white/70 text-sm">{component.title}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Advanced Components */}
      <div>
        <h3 className="text-sm font-medium text-white/40 uppercase tracking-wider mb-4">
          Advanced
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {advancedComponents.map((component) => (
            <Link key={component.href} href={component.href} className="group">
              <div className="p-3 rounded-xl bg-white/2 border border-white/5 hover:bg-white/5 hover:border-white/10 transition-all text-center relative">
                <component.icon className="w-4 h-4 text-white/40 mx-auto mb-1.5 group-hover:text-purple-400 transition-colors" />
                <span className="text-white/70 text-sm">{component.title}</span>
                {component.isNew && (
                  <GlassBadge
                    variant="primary"
                    size="sm"
                    className="absolute -top-1.5 -right-1.5 text-[10px] px-1.5 py-0"
                  >
                    New
                  </GlassBadge>
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Widgets */}
      <div>
        <h3 className="text-sm font-medium text-white/40 uppercase tracking-wider mb-4">Widgets</h3>
        <div className="grid grid-cols-2 sm:grid-cols-6 gap-2">
          {widgetTypes.map((widget) => (
            <Link key={widget.href} href={widget.href} className="group">
              <div className="p-3 rounded-xl bg-linear-to-br from-cyan-500/5 to-purple-500/5 border border-white/5 hover:border-cyan-500/20 transition-all text-center">
                <widget.icon className="w-4 h-4 text-white/40 mx-auto mb-1.5 group-hover:text-cyan-400 transition-colors" />
                <span className="text-white/70 text-sm">{widget.title}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
