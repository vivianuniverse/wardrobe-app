export type Category = 'blazer' | 'pants' | 'top' | 'jacket'
export type ColorFamily = 'black' | 'grey' | 'brown' | 'neutral' | 'burgundy'

export interface ItemImage {
  label: string
  src: string
}

export interface WardrobeItem {
  id: number
  brand: string
  name: string
  category: Category
  colorFamily: ColorFamily
  color: string
  size: string
  price?: string
  fabric?: string
  fit?: string
  style?: string
  images: ItemImage[]
  wornCount: number
  inWishlist: boolean
}

export interface GapItem {
  name: string
  reason: string
  priority: 'high' | 'medium' | 'low'
}

export type FilterType = 'all' | Category | 'black' | 'grey' | 'neutral'
