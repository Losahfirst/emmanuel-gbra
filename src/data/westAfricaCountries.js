/**
 * Liste des pays d'Afrique de l'Ouest avec leurs informations
 */

export const westAfricaCountries = [
  {
    code: 'CI',
    name: 'Côte d\'Ivoire',
    flag: '🇨🇮',
    flagColors: {
      orange: '#FF8200',
      white: '#FFFFFF',
      green: '#009A44'
    },
    hasData: true,
    currency: 'XOF',
    capital: 'Abidjan'
  },
  {
    code: 'SN',
    name: 'Sénégal',
    flag: '🇸🇳',
    flagColors: {
      red: '#CE1126',
      yellow: '#FCD116',
      green: '#009E49'
    },
    hasData: false,
    currency: 'XOF',
    capital: 'Dakar'
  },
  {
    code: 'GH',
    name: 'Ghana',
    flag: '🇬🇭',
    flagColors: {
      red: '#CE1126',
      yellow: '#FCD116',
      green: '#007A33',
      black: '#000000'
    },
    hasData: false,
    currency: 'GHS',
    capital: 'Accra'
  },
  {
    code: 'NG',
    name: 'Nigeria',
    flag: '🇳🇬',
    flagColors: {
      green: '#008751',
      white: '#FFFFFF'
    },
    hasData: false,
    currency: 'NGN',
    capital: 'Abuja'
  },
  {
    code: 'ML',
    name: 'Mali',
    flag: '🇲🇱',
    flagColors: {
      green: '#14B53A',
      yellow: '#FCD116',
      red: '#CE1126'
    },
    hasData: false,
    currency: 'XOF',
    capital: 'Bamako'
  },
  {
    code: 'BF',
    name: 'Burkina Faso',
    flag: '🇧🇫',
    flagColors: {
      red: '#EF2B2D',
      green: '#009639',
      yellow: '#FCD116'
    },
    hasData: false,
    currency: 'XOF',
    capital: 'Ouagadougou'
  },
  {
    code: 'NE',
    name: 'Niger',
    flag: '🇳🇪',
    flagColors: {
      orange: '#F77F00',
      white: '#FFFFFF',
      green: '#009639'
    },
    hasData: false,
    currency: 'XOF',
    capital: 'Niamey'
  },
  {
    code: 'TG',
    name: 'Togo',
    flag: '🇹🇬',
    flagColors: {
      green: '#006233',
      yellow: '#FCD116',
      red: '#CE1126',
      white: '#FFFFFF'
    },
    hasData: false,
    currency: 'XOF',
    capital: 'Lomé'
  },
  {
    code: 'BJ',
    name: 'Bénin',
    flag: '🇧🇯',
    flagColors: {
      green: '#008751',
      yellow: '#FCD116',
      red: '#E8112D'
    },
    hasData: false,
    currency: 'XOF',
    capital: 'Porto-Novo'
  },
  {
    code: 'GN',
    name: 'Guinée',
    flag: '🇬🇳',
    flagColors: {
      red: '#CE1126',
      yellow: '#FCD116',
      green: '#009639'
    },
    hasData: false,
    currency: 'GNF',
    capital: 'Conakry'
  },
  {
    code: 'GW',
    name: 'Guinée-Bissau',
    flag: '🇬🇼',
    flagColors: {
      red: '#CE1126',
      yellow: '#FCD116',
      green: '#009639',
      black: '#000000'
    },
    hasData: false,
    currency: 'XOF',
    capital: 'Bissau'
  },
  {
    code: 'LR',
    name: 'Liberia',
    flag: '🇱🇷',
    flagColors: {
      red: '#BF0A30',
      white: '#FFFFFF',
      blue: '#002868'
    },
    hasData: false,
    currency: 'LRD',
    capital: 'Monrovia'
  },
  {
    code: 'SL',
    name: 'Sierra Leone',
    flag: '🇸🇱',
    flagColors: {
      green: '#1EB53A',
      white: '#FFFFFF',
      blue: '#0072C6'
    },
    hasData: false,
    currency: 'SLL',
    capital: 'Freetown'
  },
  {
    code: 'GM',
    name: 'Gambie',
    flag: '🇬🇲',
    flagColors: {
      red: '#CE1126',
      blue: '#0C1C8C',
      green: '#3A7728',
      white: '#FFFFFF'
    },
    hasData: false,
    currency: 'GMD',
    capital: 'Banjul'
  },
  {
    code: 'MR',
    name: 'Mauritanie',
    flag: '🇲🇷',
    flagColors: {
      green: '#00A859',
      yellow: '#FFD700',
      red: '#E8112D'
    },
    hasData: false,
    currency: 'MRU',
    capital: 'Nouakchott'
  },
  {
    code: 'CV',
    name: 'Cap-Vert',
    flag: '🇨🇻',
    flagColors: {
      blue: '#003F87',
      white: '#FFFFFF',
      red: '#CF0921',
      yellow: '#FCD116'
    },
    hasData: false,
    currency: 'CVE',
    capital: 'Praia'
  }
]

/**
 * Obtenir un pays par son code
 */
export function getCountryByCode(code) {
  return westAfricaCountries.find(country => country.code === code)
}

/**
 * Obtenir le drapeau SVG d'un pays
 */
export function getCountryFlagSVG(country) {
  if (!country || !country.flagColors) return null

  const colors = country.flagColors
  const colorKeys = Object.keys(colors)

  if (colorKeys.length === 3) {
    // Drapeau tricolore vertical (comme Côte d'Ivoire)
    return {
      type: 'vertical',
      colors: [colors[colorKeys[0]], colors[colorKeys[1]], colors[colorKeys[2]]]
    }
  } else if (colorKeys.length === 3 && country.code === 'GH') {
    // Ghana - tricolore horizontal
    return {
      type: 'horizontal',
      colors: [colors.red, colors.yellow, colors.green]
    }
  } else if (colorKeys.length === 2) {
    // Drapeau bicolore (comme Nigeria)
    return {
      type: 'vertical',
      colors: [colors[colorKeys[0]], colors[colorKeys[1]]]
    }
  }

  return null
}
