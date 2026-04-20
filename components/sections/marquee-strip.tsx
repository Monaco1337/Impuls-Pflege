'use client'

import { Marquee } from '@/components/animations/marquee'
import { Heart, Shield, Clock, Users, Star, Home } from 'lucide-react'

const items = [
  { icon: Heart,  text: 'Pflege mit Herz',       accent: true  },
  { icon: Shield, text: 'Sicherheit & Vertrauen', accent: false },
  { icon: Clock,  text: '24/7 Erreichbarkeit',    accent: false },
  { icon: Users,  text: 'Erfahrenes Team',         accent: false },
  { icon: Star,   text: 'Höchste Qualität',        accent: true  },
  { icon: Home,   text: 'Pflege zuhause',          accent: false },
]

export function MarqueeStrip() {
  return (
    <section className="relative overflow-hidden border-y border-warm-100/70 bg-white py-4">
      <Marquee speed={75}>
        {items.map((item) => {
          const Icon = item.icon
          return (
            <div key={item.text} className="flex items-center gap-3 px-6">
              <Icon
                className="h-3 w-3 shrink-0"
                style={{ color: '#F24B6A' }}
                strokeWidth={1.6}
              />
              <span className="whitespace-nowrap text-[12.5px] font-[540] tracking-[0.01em] text-warm-600">
                {item.text}
              </span>
            </div>
          )
        })}
      </Marquee>
    </section>
  )
}
