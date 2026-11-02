export type BrandTier = 'white' | 'embossed' | 'gold'

export interface BrandLetter {
  char: string
  tier: BrandTier
  color: string
  textShadow: string
  background: string | null
}

const LETTERS = ['M', 'A', 'S', 'T', 'E', 'R'] as const

const WHITE_COLOR = '#ffffff'
const CHARCOAL_COLOR = '#1a1a1a'
const EMBoss_SHADOW = '0 1px 0 rgba(255,255,255,0.35), 0 -1px 1px rgba(255,255,255,0.12)'

const GOLD_GRADIENT = 'linear-gradient(180deg, #f0c75e 0%, #d9a843 45%, #b8860b 70%, #f4d97a 100%)'
const GOLD_GLOW = '0 0 12px rgba(217,168,67,0.55), 0 0 4px rgba(240,199,94,0.4)'

/**
 * Разбивает слово MASTER на буквы и определяет визуальный «клеймёж» каждой
 * буквы в зависимости от стажа мастера (в годах).
 *
 * 0 лет        — все буквы белые
 * 1–6 лет      — по одной букве за год становятся угольно-чёрными
 *                с эффектом блинтового тиснения (белая тень снизу)
 * 7–12 лет     — буквы сверх порога 6 куются в золото
 *                (янтарно-золотой градиент + свечение)
 * > 12 лет     — вся надпись золотая
 */
export function renderMasterBrand(years: number): BrandLetter[] {
  const y = Math.max(0, Math.floor(years))

  return LETTERS.map((char, i) => {
    if (y === 0) {
      return { char, tier: 'white' as const, color: WHITE_COLOR, textShadow: 'none', background: null }
    }

    if (y >= 1 && y <= 6) {
      const embossed = i < y
      return {
        char,
        tier: 'embossed' as const,
        color: embossed ? CHARCOAL_COLOR : WHITE_COLOR,
        textShadow: embossed ? EMBoss_SHADOW : 'none',
        background: null,
      }
    }

    // 7–12 лет: первые 6 букв — уголь, остальные куются в золото
    if (y >= 7 && y <= 12) {
      const goldCount = y - 6
      if (i < 6) {
        return {
          char,
          tier: 'embossed' as const,
          color: CHARCOAL_COLOR,
          textShadow: EMBoss_SHADOW,
          background: null,
        }
      }
      const isGold = i - 6 < goldCount
      return {
        char,
        tier: isGold ? ('gold' as const) : ('embossed' as const),
        color: isGold ? '#f0c75e' : CHARCOAL_COLOR,
        textShadow: isGold ? GOLD_GLOW : EMBoss_SHADOW,
        background: isGold ? GOLD_GRADIENT : null,
      }
    }

    // > 12 лет: всё золото
    return {
      char,
      tier: 'gold' as const,
      color: '#f0c75e',
      textShadow: GOLD_GLOW,
      background: GOLD_GRADIENT,
    }
  })
}
