import type { WardrobeItem } from '../types'
import styles from './WardrobeCard.module.css'

interface Props {
  item: WardrobeItem
  onClick: () => void
}

const colorTagClass: Record<string, string> = {
  black:    styles.tagBlack,
  grey:     styles.tagGrey,
  brown:    styles.tagBrown,
  neutral:  styles.tagTaupe,
  burgundy: styles.tagBurgundy,
}

export default function WardrobeCard({ item, onClick }: Props) {
  const confirmed = item.images.length > 0

  return (
    <div className={styles.card} onClick={onClick}>
      {/* Thumbnail */}
      {item.images[0] ? (
        <img
          className={styles.img}
          src={item.images[0].src}
          alt={item.name}
        />
      ) : (
        <div className={styles.placeholder}>
          {item.category === 'pants' ? '👖' : item.category === 'jacket' ? '🧥' : '👕'}
        </div>
      )}

      {/* Confirmed badge */}
      {confirmed && <span className={styles.badge}>✓</span>}

      {/* Price tag */}
      {item.price && <span className={styles.price}>{item.price}</span>}

      {/* Info */}
      <div className={styles.body}>
        <p className={styles.brand}>{item.brand}</p>
        <p className={styles.name}>{item.name}</p>
        <div className={styles.tags}>
          <span className={`${styles.tag} ${colorTagClass[item.colorFamily] ?? ''}`}>
            {item.color}
          </span>
          <span className={styles.tag}>Size {item.size}</span>
        </div>
      </div>
    </div>
  )
}
