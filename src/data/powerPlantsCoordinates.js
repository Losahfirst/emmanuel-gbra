/**
 * Coordonnées GPS des centrales électriques d'Afrique de l'Ouest
 * Format: [latitude, longitude]
 */

export const powerPlantsCoordinates = {
  // ========== CÔTE D'IVOIRE ==========
  'ayame1': [6.1667, -3.1500],
  'ayame2': [6.1667, -3.1500],
  'kossou': [7.0167, -5.4833],
  'taabo': [6.2833, -5.0167],
  'buyo': [6.2667, -7.0500],
  'faye': [7.9500, -6.7000],
  'soubre': [5.7833, -6.6000],
  'gribo-popoli': [6.0833, -6.4167],
  'singrobo': [6.1333, -5.0167],
  'vridi1': [5.2800, -4.0500],
  'vridi-vapeur': [5.2800, -4.0500],
  'azito': [5.2900, -4.0400],
  'ciprel': [5.2800, -4.0500],
  'aggreko': [5.2800, -4.0500],
  'atinkou': [5.3000, -4.0300],
  'boundiali-solar': [9.5167, -6.4833],
  'bondoukou-solar': [8.0333, -2.7833],
  'biovea': [5.4667, -3.2000], // Ayébo, Aboisso

  // ========== SÉNÉGAL ==========
  'cap-des-biches': [14.7167, -17.4833], // Dakar
  'bel-air': [14.7167, -17.4833], // Dakar
  'kahone': [14.1500, -16.0833],
  'sendou': [14.7167, -17.4833], // Dakar
  'tobene': [15.3667, -15.1333],
  'manantali': [13.2000, -10.4000], // Mali mais utilisé par Sénégal
  'gouina': [13.2000, -10.4000], // Mali mais utilisé par Sénégal
  'mekhe-solar': [15.1167, -16.6167],
  'niakhar-solar': [14.4667, -16.1667],
  'kolda-solar': [12.8833, -14.9500],
  'taiba-ndiaye-wind': [15.3667, -16.2167],

  // ========== GHANA ==========
  'akosombo': [6.2833, 0.0667],
  'takoradi': [4.8833, -1.7500],
  'tema': [5.6833, 0.0167],
  'karpower': [5.6833, 0.0167], // Tema
  'bui': [8.2833, -2.3167],
  'kintampo': [8.0500, -1.7333],
  'kpone-1': [5.6833, 0.0167], // Tema
  'kpone-2': [5.6833, 0.0167], // Tema
  'sunon-asogli': [5.6833, 0.0167], // Tema
  'ghana-nuclear': [5.6833, 0.0167], // Tema (approximatif)

  // ========== NIGERIA ==========
  'egbin': [6.4333, 3.2833], // Lagos
  'kainji': [9.8667, 4.6167],
  'jebba': [9.1167, 4.8167],
  'shiroro': [9.9833, 6.8500],
  'calabar': [4.9500, 8.3167],
  'geregu-1': [7.4833, 6.7333],
  'geregu-2': [7.4833, 6.7333],
  'okpai': [5.5167, 6.4167],
  'ihovbor': [6.4333, 3.2833], // Lagos
  'olorunsogo': [7.8500, 4.5500],

  // ========== MALI ==========
  'manantali': [13.2000, -10.4000],
  'selingue': [11.6500, -8.2167],
  'felou': [14.5167, -11.4333],
  'taoussa': [16.9667, -0.0500],

  // ========== BURKINA FASO ==========
  'zagtouli-solar': [12.3667, -1.5333], // Ouagadougou
  'kossodo-thermal': [12.3667, -1.5333], // Ouagadougou
  'kompienga': [11.1333, 0.6167],

  // ========== NIGER ==========
  'gorou-banda-solar': [13.5167, 2.1167], // Niamey
  'malbaza-solar': [13.5167, 2.1167], // Niamey

  // ========== TOGO ==========
  'kekeli': [6.1333, 1.2167], // Lomé
  'kara-thermal': [9.5500, 1.1833],
  'lome-thermal': [6.1333, 1.2167],

  // ========== BÉNIN ==========
  'maria-gleta': [6.3667, 2.4333], // Cotonou
  'pobe-thermal': [6.9833, 2.7000],
  'nangbeto': [7.1833, 1.6167],

  // ========== GUINÉE ==========
  'souapiti': [10.3167, -13.7167],
  'kaleta': [9.8167, -13.2833],
  'garafiri': [10.3167, -13.7167],

  // ========== GUINÉE-BISSAU ==========
  'bissau-thermal': [11.8667, -15.6000],

  // ========== LIBERIA ==========
  'mount-coffee': [6.3167, -10.3500], // Monrovia

  // ========== SIERRA LEONE ==========
  'bumbuna': [9.0500, -11.7333],
  'bumbuna-2': [9.0500, -11.7333],

  // ========== GAMBIE ==========
  'kotu-thermal': [13.4500, -16.5667], // Banjul

  // ========== MAURITANIE ==========
  'nouakchott-thermal': [18.0833, -15.9667],
  'nouakchott-solar': [18.0833, -15.9667],

  // ========== CAP-VERT ==========
  'praia-thermal': [14.9167, -23.5167],
  'mindelo-wind': [16.8833, -25.0000]
}

/**
 * Coordonnées par localisation (fallback)
 */
export const locationCoordinates = {
  // Côte d'Ivoire
  'Abidjan': [5.3600, -4.0083],
  'Vridi': [5.2800, -4.0500],
  'Azito': [5.2900, -4.0400],
  'Ayamé': [6.1667, -3.1500],
  'Kossou': [7.0167, -5.4833],
  'Taabo': [6.2833, -5.0167],
  'Buyo': [6.2667, -7.0500],
  'Fayé': [7.9500, -6.7000],
  'Soubré': [5.7833, -6.6000],
  'Gribo-Popoli': [6.0833, -6.4167],
  'Singrobo': [6.1333, -5.0167],
  'Boundiali': [9.5167, -6.4833],
  'Katiola': [8.1333, -5.1000],
  'Yamoussoukro': [6.8167, -5.2833],
  'Bouaké': [7.6833, -5.0333],
  'San-Pédro': [4.7500, -6.6333],
  'Korhogo': [9.4500, -5.6333],
  'Man': [7.4000, -7.5500],
  'Daloa': [6.8833, -6.4500],
  'Gagnoa': [6.1333, -5.9500],
  'Aboisso': [5.4667, -3.2000],
  'Ayébo': [5.4667, -3.2000],
  'Bondoukou': [8.0333, -2.7833],

  // Sénégal
  'Dakar': [14.7167, -17.4833],
  'Cap des Biches': [14.7167, -17.4833],
  'Bel Air': [14.7167, -17.4833],
  'Kahône': [14.1500, -16.0833],
  'Sendou': [14.7167, -17.4833],
  'Tobène': [15.3667, -15.1333],
  'Manantali': [13.2000, -10.4000],
  'Gouina': [13.2000, -10.4000],
  'Mékhé': [15.1167, -16.6167],
  'Niakhar': [14.4667, -16.1667],
  'Kolda': [12.8833, -14.9500],
  'Taïba Ndiaye': [15.3667, -16.2167],

  // Ghana
  'Akosombo': [6.2833, 0.0667],
  'Takoradi': [4.8833, -1.7500],
  'Tema': [5.6833, 0.0167],
  'Bui': [8.2833, -2.3167],
  'Kintampo': [8.0500, -1.7333],

  // Nigeria
  'Lagos': [6.4333, 3.2833],
  'Egbin': [6.4333, 3.2833],
  'Kainji': [9.8667, 4.6167],
  'Jebba': [9.1167, 4.8167],
  'Shiroro': [9.9833, 6.8500],
  'Afam': [4.9167, 7.3167],
  'Sapele': [5.8833, 5.6833],

  // Mali
  'Sélingué': [11.6500, -8.2167],
  'Félou': [14.5167, -11.4333],
  'Taoussa': [16.9667, -0.0500],
  'Bamako': [12.6500, -8.0000],

  // Burkina Faso
  'Ouagadougou': [12.3667, -1.5333],
  'Zagtouli': [12.3667, -1.5333],
  'Kossodo': [12.3667, -1.5333],
  'Kompénga': [11.1333, 0.6167],

  // Niger
  'Niamey': [13.5167, 2.1167],
  'Gorou Banda': [13.5167, 2.1167],
  'Malbaza': [13.5167, 2.1167],

  // Togo
  'Lomé': [6.1333, 1.2167],
  'KEKELI': [6.1333, 1.2167],
  'Kara': [9.5500, 1.1833],

  // Bénin
  'Cotonou': [6.3667, 2.4333],
  'Maria Gléta': [6.3667, 2.4333],
  'Pobè': [6.9833, 2.7000],
  'Nangbéto': [7.1833, 1.6167],

  // Guinée
  'Souapiti': [10.3167, -13.7167],
  'Kaléta': [9.8167, -13.2833],
  'Garafiri': [10.3167, -13.7167],
  'Conakry': [9.5167, -13.7167],

  // Guinée-Bissau
  'Bissau': [11.8667, -15.6000],

  // Liberia
  'Monrovia': [6.3167, -10.3500],
  'Mount Coffee': [6.3167, -10.3500],

  // Sierra Leone
  'Bumbuna': [9.0500, -11.7333],
  'Freetown': [8.4833, -13.2333],

  // Gambie
  'Banjul': [13.4500, -16.5667],
  'Kotu': [13.4500, -16.5667],

  // Mauritanie
  'Nouakchott': [18.0833, -15.9667],

  // Cap-Vert
  'Praia': [14.9167, -23.5167],
  'Mindelo': [16.8833, -25.0000]
}

/**
 * Obtenir les coordonnées d'une centrale par son ID
 */
export function getCoordinatesByPlantId(plantId) {
  return powerPlantsCoordinates[plantId] || null
}

/**
 * Obtenir les coordonnées par localisation
 */
export function getCoordinatesByLocation(location, countryCode) {
  // Chercher d'abord dans les coordonnées de localisation
  const locationLower = location.toLowerCase()
  for (const [key, coords] of Object.entries(locationCoordinates)) {
    if (locationLower.includes(key.toLowerCase()) || key.toLowerCase().includes(locationLower)) {
      return coords
    }
  }

  // Retourner le centre du pays si aucune correspondance
  return getCountryCenter(countryCode)
}

/**
 * Obtenir le centre géographique d'un pays
 */
export function getCountryCenter(countryCode) {
  const centers = {
    'CI': [7.5399, -5.5471], // Côte d'Ivoire
    'SN': [14.4974, -14.4524], // Sénégal
    'GH': [7.9465, -1.0232], // Ghana
    'NG': [9.0820, 8.6753], // Nigeria
    'ML': [17.5707, -3.9962], // Mali
    'BF': [12.2383, -1.5616], // Burkina Faso
    'NE': [17.6078, 8.0817], // Niger
    'TG': [8.6195, 0.8248], // Togo
    'BJ': [9.3077, 2.3158], // Bénin
    'GN': [9.9456, -9.6966], // Guinée
    'GW': [11.8037, -15.1804], // Guinée-Bissau
    'LR': [6.4281, -9.4295], // Liberia
    'SL': [8.4606, -11.7799], // Sierra Leone
    'GM': [13.4432, -15.3101], // Gambie
    'MR': [21.0079, -10.9408], // Mauritanie
    'CV': [16.5388, -24.0132] // Cap-Vert
  }
  return centers[countryCode] || [7.5399, -5.5471]
}
