export type WesternElement = 'Огонь' | 'Вода' | 'Земля' | 'Воздух'

export type ChineseAnimal =
  | 'Крыса' | 'Бык' | 'Тигр' | 'Кролик'
  | 'Дракон' | 'Змея' | 'Лошадь' | 'Коза'
  | 'Обезьяна' | 'Петух' | 'Собака' | 'Свинья'

export type ChineseElement = 'Огонь' | 'Вода' | 'Дерево' | 'Металл' | 'Земля'

export interface AstroResult {
  western: {
    sign: string
    element: WesternElement
  }
  chinese: {
    animal: ChineseAnimal
    element: ChineseElement
    label: string
  }
}

interface ZodiacBound {
  sign: string
  element: WesternElement
  cutoff: [number, number] // [month, day] — последний день предыдущего знака
}

// Границы знаков: элемент + последний день предыдущего знака
const ZODIAC: ZodiacBound[] = [
  { sign: 'Козерог',    element: 'Земля',  cutoff: [12, 31] },
  { sign: 'Водолей',    element: 'Воздух', cutoff: [1, 19] },
  { sign: 'Рыбы',       element: 'Вода',   cutoff: [2, 18] },
  { sign: 'Овен',       element: 'Огонь',  cutoff: [3, 20] },
  { sign: 'Телец',      element: 'Земля',  cutoff: [4, 19] },
  { sign: 'Близнецы',   element: 'Воздух', cutoff: [5, 20] },
  { sign: 'Рак',        element: 'Вода',   cutoff: [6, 20] },
  { sign: 'Лев',        element: 'Огонь',  cutoff: [7, 22] },
  { sign: 'Дева',       element: 'Земля',  cutoff: [8, 22] },
  { sign: 'Весы',       element: 'Воздух', cutoff: [9, 22] },
  { sign: 'Скорпион',   element: 'Вода',   cutoff: [10, 22] },
  { sign: 'Стрелец',    element: 'Огонь',  cutoff: [11, 21] },
  { sign: 'Козерог',    element: 'Земля',  cutoff: [12, 31] },
]

const ANIMALS: ChineseAnimal[] = [
  'Обезьяна', 'Петух', 'Собака', 'Свинья',
  'Крыса', 'Бык', 'Тигр', 'Кролик',
  'Дракон', 'Змея', 'Лошадь', 'Коза',
]

// Стихия года по последней цифре (небесные стволы)
const ELEMENT_BY_DIGIT: ChineseElement[] = [
  'Металл', 'Металл',
  'Вода',   'Вода',
  'Дерево', 'Дерево',
  'Огонь',  'Огонь',
  'Земля',  'Земля',
]

function westernZodiac(month: number, day: number): { sign: string; element: WesternElement } {
  for (let i = ZODIAC.length - 1; i >= 0; i--) {
    const [cm, cd] = ZODIAC[i].cutoff
    if (month > cm || (month === cm && day > cd)) {
      return { sign: ZODIAC[i].sign, element: ZODIAC[i].element }
    }
  }
  return { sign: 'Козерог', element: 'Земля' }
}

function chineseAnimal(year: number): ChineseAnimal {
  const index = ((year - 4) % 12 + 12) % 12
  return ANIMALS[index]
}

function chineseElement(year: number): ChineseElement {
  return ELEMENT_BY_DIGIT[((year % 10) + 10) % 10]
}

/**
 * Рассчитывает западный зодиак (со стихией) и восточный китайский тотем
 * (животное + цветная стихия года) по дате рождения мастера.
 */
export function calculateAstro(birthDate: Date): AstroResult {
  const month = birthDate.getMonth() + 1
  const day = birthDate.getDate()
  const year = birthDate.getFullYear()

  const western = westernZodiac(month, day)
  const animal = chineseAnimal(year)
  const element = chineseElement(year)

  return {
    western,
    chinese: {
      animal,
      element,
      label: `${element} ${animal}`,
    },
  }
}
