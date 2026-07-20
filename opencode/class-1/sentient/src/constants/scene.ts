export const COLORS = {
  accent1: '#6366f1',
  accent2: '#06b6d4',
  accent3: '#8b5cf6',
  bg: '#0a0a0f',
  text: '#e4e4e7',
  dim: '#a1a1aa',
}

export const PARTICLE_COUNT = 800

export const SECTION_Z: Record<string, number> = {
  hero: -2,
  features: -10,
  stats: -20,
  testimonials: -28,
  pricing: -36,
  cta: -44,
}

export const SECTION_RANGES = [
  { id: 'hero', start: 0.00, end: 0.15, z: SECTION_Z.hero },
  { id: 'features', start: 0.15, end: 0.35, z: SECTION_Z.features },
  { id: 'stats', start: 0.35, end: 0.50, z: SECTION_Z.stats },
  { id: 'testimonials', start: 0.50, end: 0.65, z: SECTION_Z.testimonials },
  { id: 'pricing', start: 0.65, end: 0.82, z: SECTION_Z.pricing },
  { id: 'cta', start: 0.82, end: 1.00, z: SECTION_Z.cta },
]
