import { useEffect } from 'react'
import type { WardrobeItem } from '../types'
import styles from './ItemModal.module.css'

interface Props {
  item: WardrobeItem | null
  onClose: () => void
}

export default function ItemModal({ item, onClose }: Props) {
  // Close on Escape key
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  if (!item) return null

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={e => e.stopPropagation()}>
        <button className={styles.close} onClick={onClose}>✕</button>

        {/* Header */}
        <div className={styles.header}>
          <p className={styles.brand}>{item.brand}</p>
          <h2 className={styles.name}>{item.name}</h2>
          <div className={styles.tags}>
            <span className={styles.tag}>{item.color}</span>
            <span className={styles.tag}>Size {item.size}</span>
            {item.price && <span className={styles.tag}>{item.price}</span>}
          </div>
        </div>

        {/* Images */}
        {item.images.length > 0 ? (
          <div
            className={styles.images}
            style={{ gridTemplateColumns: `repeat(${item.images.length}, 1fr)` }}
          >
            {item.images.map((img) => (
              <div key={img.label} className={styles.imgSlot}>
                <img src={img.src} alt={img.label} />
                <span className={styles.imgLabel}>{img.label}</span>
              </div>
            ))}
          </div>
        ) : (
          <div className={styles.noImages}>
            <p>No photos yet — upload images to add them here.</p>
          </div>
        )}

        {/* Details */}
        <div className={styles.details}>
          {item.fabric && <div className={styles.detail}><strong>Fabric</strong>{item.fabric}</div>}
          {item.fit    && <div className={styles.detail}><strong>Fit</strong>{item.fit}</div>}
          {item.style  && <div className={styles.detail}><strong>Style</strong>{item.style}</div>}
          <div className={styles.detail}><strong>Worn</strong>{item.wornCount}×</div>
        </div>
      </div>
    </div>
  )
}
