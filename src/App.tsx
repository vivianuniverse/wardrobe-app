import { useState } from 'react'
import type { WardrobeItem, FilterType } from './types'
import { wardrobeItems, capsuleGaps, paletteSummary } from './data/wardrobe'
import WardrobeCard from './components/WardrobeCard'
import ItemModal from './components/ItemModal'
import styles from './App.module.css'

const FILTERS: { label: string; value: FilterType }[] = [
  { label: 'All',      value: 'all'    },
  { label: 'Blazers',  value: 'blazer' },
  { label: 'Pants',    value: 'pants'  },
  { label: 'Tops',     value: 'top'    },
  { label: 'Jackets',  value: 'jacket' },
  { label: '⬛ Black', value: 'black'  },
  { label: '🩶 Grey',  value: 'grey'   },
  { label: '🤎 Neutrals', value: 'neutral' },
]

const CATEGORY_LABELS: Record<string, string> = {
  blazer: 'Blazers',
  pants:  'Pants',
  top:    'Layering Tops',
  jacket: 'Winter Jackets',
}

const CATEGORY_ORDER = ['blazer', 'pants', 'top', 'jacket'] as const

function matchesFilter(item: WardrobeItem, filter: FilterType): boolean {
  if (filter === 'all')     return true
  if (filter === 'black')   return item.colorFamily === 'black'
  if (filter === 'grey')    return item.colorFamily === 'grey'
  if (filter === 'neutral') return ['neutral', 'brown', 'burgundy'].includes(item.colorFamily)
  return item.category === filter
}

const priorityDot: Record<string, string> = {
  high:   '#c0392b',
  medium: '#e67e22',
  low:    '#8c8880',
}

export default function App() {
  const [activeFilter, setActiveFilter] = useState<FilterType>('all')
  const [selectedItem, setSelectedItem] = useState<WardrobeItem | null>(null)

  const visibleItems = wardrobeItems.filter(i => matchesFilter(i, activeFilter))
  const confirmedCount = wardrobeItems.filter(i => i.images.length > 0).length

  // Group by category for section rendering
  const sections = CATEGORY_ORDER.map(cat => ({
    cat,
    label: CATEGORY_LABELS[cat],
    items: visibleItems.filter(i => i.category === cat),
  })).filter(s => s.items.length > 0)

  return (
    <div className={styles.app}>
      {/* ── Header ─────────────────────────────────────────────────────── */}
      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>
            My <em>Capsule</em> Wardrobe
          </h1>
          <p className={styles.subtitle}>Formal &amp; Business — Inventory</p>
        </div>
        <div className={styles.stats}>
          <Stat value={visibleItems.length} label="Items" />
          <Stat value={4}                   label="Categories" />
          <Stat value={confirmedCount}       label="Confirmed ✓" />
        </div>
      </header>

      {/* ── Filters ────────────────────────────────────────────────────── */}
      <nav className={styles.filters}>
        <span className={styles.filterLabel}>Filter</span>
        {FILTERS.map(f => (
          <button
            key={f.value}
            className={`${styles.filterBtn} ${activeFilter === f.value ? styles.active : ''}`}
            onClick={() => setActiveFilter(f.value)}
          >
            {f.label}
          </button>
        ))}
      </nav>

      {/* ── Palette bar ────────────────────────────────────────────────── */}
      <div className={styles.paletteBar}>
        {paletteSummary.map(p => (
          <div
            key={p.label}
            className={styles.paletteSeg}
            style={{ flex: p.count, background: p.hex }}
            title={`${p.label} (${p.count})`}
          />
        ))}
      </div>
      <div className={styles.paletteLegend}>
        {paletteSummary.map(p => (
          <div key={p.label} className={styles.legendItem}>
            <div className={styles.legendDot} style={{ background: p.hex }} />
            <span>{p.label} ({p.count})</span>
          </div>
        ))}
      </div>

      {/* ── Item sections ──────────────────────────────────────────────── */}
      <main className={styles.main}>
        {sections.map(s => (
          <section key={s.cat} className={styles.section}>
            <div className={styles.sectionHead}>
              <span>{s.label}</span>
              <span className={styles.sectionCount}>{s.items.length} pieces</span>
            </div>
            <div className={styles.grid}>
              {s.items.map(item => (
                <WardrobeCard
                  key={item.id}
                  item={item}
                  onClick={() => setSelectedItem(item)}
                />
              ))}
            </div>
          </section>
        ))}

        {/* ── Capsule gaps ─────────────────────────────────────────────── */}
        <section className={styles.gapSection}>
          <h2 className={styles.gapTitle}>✦ Capsule gaps — what's still needed</h2>
          <div className={styles.gapGrid}>
            {capsuleGaps.map(gap => (
              <div key={gap.name} className={styles.gapItem}>
                <div
                  className={styles.gapDot}
                  style={{ background: priorityDot[gap.priority] }}
                />
                <div>
                  <p className={styles.gapName}>{gap.name}</p>
                  <p className={styles.gapReason}>{gap.reason}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* ── Item modal ─────────────────────────────────────────────────── */}
      {selectedItem && (
        <ItemModal item={selectedItem} onClose={() => setSelectedItem(null)} />
      )}
    </div>
  )
}

function Stat({ value, label }: { value: number; label: string }) {
  return (
    <div className={styles.stat}>
      <span className={styles.statValue}>{value}</span>
      <span className={styles.statLabel}>{label}</span>
    </div>
  )
}
