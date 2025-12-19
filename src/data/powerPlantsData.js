/**
 * Base de données complète des centrales électriques d'Afrique de l'Ouest
 */

export const allPowerPlants = [
  // ========== CÔTE D'IVOIRE ==========
  // Centrales Hydrauliques
  {
    id: 'ayame1',
    name: 'AYAME 1',
    type: 'hydraulic',
    capacity: 30, // MW
    installationDate: '1959',
    location: 'Ayamé',
    operator: 'CIE',
    status: 'operational',
    hasData: true,
    countryCode: 'CI'
  },
  {
    id: 'ayame2',
    name: 'AYAME 2',
    type: 'hydraulic',
    capacity: 30, // MW
    installationDate: '1965',
    location: 'Ayamé',
    operator: 'CIE',
    status: 'operational',
    hasData: true,
    countryCode: 'CI'
  },
  {
    id: 'kossou',
    name: 'KOSSOU',
    type: 'hydraulic',
    capacity: 174, // MW
    installationDate: '1972',
    location: 'Kossou',
    operator: 'CIE',
    status: 'operational',
    hasData: true,
    countryCode: 'CI'
  },
  {
    id: 'taabo',
    name: 'TAABO',
    type: 'hydraulic',
    capacity: 210, // MW
    installationDate: '1979',
    location: 'Taabo',
    operator: 'CIE',
    status: 'operational',
    hasData: true,
    countryCode: 'CI'
  },
  {
    id: 'buyo',
    name: 'BUYO',
    type: 'hydraulic',
    capacity: 165, // MW
    installationDate: '1980',
    location: 'Buyo',
    operator: 'CIE',
    status: 'operational',
    hasData: true,
    countryCode: 'CI'
  },
  {
    id: 'faye',
    name: 'FAYE',
    type: 'hydraulic',
    capacity: 25, // MW
    installationDate: '1990',
    location: 'Fayé',
    operator: 'CIE',
    status: 'operational',
    hasData: true,
    countryCode: 'CI'
  },
  {
    id: 'soubre',
    name: 'SOUBRE',
    type: 'hydraulic',
    capacity: 275, // MW
    installationDate: '2017',
    location: 'Soubré',
    operator: 'CIE',
    status: 'operational',
    hasData: false,
    countryCode: 'CI'
  },
  {
    id: 'gribo-popoli',
    name: 'GRIBO-POPOLI',
    type: 'hydraulic',
    capacity: 112, // MW
    installationDate: '2019',
    location: 'Gribo-Popoli',
    operator: 'CIE',
    status: 'operational',
    hasData: false,
    countryCode: 'CI'
  },
  {
    id: 'singrobo',
    name: 'SINGROBO',
    type: 'hydraulic',
    capacity: 44, // MW
    installationDate: '2021',
    location: 'Singrobo',
    operator: 'CIE',
    status: 'operational',
    hasData: false,
    countryCode: 'CI'
  },

  // Centrales Thermiques
  {
    id: 'vridi1',
    name: 'VRIDI 1',
    type: 'thermal',
    capacity: 210, // MW
    installationDate: '1956',
    location: 'Vridi, Abidjan',
    operator: 'CIE',
    status: 'operational',
    hasData: true,
    countryCode: 'CI'
  },
  {
    id: 'vridi-vapeur',
    name: 'VRIDI Vapeur',
    type: 'thermal',
    capacity: 110, // MW
    installationDate: '1960',
    location: 'Vridi, Abidjan',
    operator: 'CIE',
    status: 'operational',
    hasData: true,
    countryCode: 'CI'
  },
  {
    id: 'azito',
    name: 'AZITO',
    type: 'thermal',
    capacity: 430, // MW
    installationDate: '1999',
    location: 'Azito, Abidjan',
    operator: 'Azito Energie',
    status: 'operational',
    hasData: true,
    countryCode: 'CI'
  },
  {
    id: 'ciprel',
    name: 'CIPREL',
    type: 'thermal',
    capacity: 556, // MW
    installationDate: '1994',
    location: 'Vridi, Abidjan',
    operator: 'Ciprel',
    status: 'operational',
    hasData: true,
    countryCode: 'CI'
  },
  {
    id: 'aggreko',
    name: 'AGGREKO',
    type: 'thermal',
    capacity: 200, // MW
    installationDate: '2010',
    location: 'Vridi, Abidjan',
    operator: 'Aggreko',
    status: 'operational',
    hasData: true,
    countryCode: 'CI'
  },
  {
    id: 'atinkou',
    name: 'ATINKOU',
    type: 'thermal',
    capacity: 390, // MW
    installationDate: '2023',
    location: 'Taboth, Jacqueville',
    operator: 'Eranove',
    status: 'operational',
    hasData: false,
    countryCode: 'CI'
  },
  {
    id: 'songon',
    name: 'SONGON',
    type: 'thermal',
    capacity: 372, // MW
    installationDate: '2025', // Prévu
    location: 'Songon',
    operator: 'CIE',
    status: 'planned',
    hasData: false,
    countryCode: 'CI'
  },

  // Centrales Solaires
  {
    id: 'boundiali-solar',
    name: 'Boundiali Solaire',
    type: 'solar',
    capacity: 30, // MWc
    installationDate: '2020',
    location: 'Boundiali',
    operator: 'CIE',
    status: 'operational',
    hasData: false,
    countryCode: 'CI'
  },
  {
    id: 'bondoukou-solar',
    name: 'Bondoukou Solaire',
    type: 'solar',
    capacity: 50, // MWc
    installationDate: '2026', // Prévu
    location: 'Bondoukou',
    operator: 'CIE',
    status: 'planned',
    hasData: false,
    countryCode: 'CI'
  },

  // Centrales Biomasse
  {
    id: 'biovea',
    name: 'BIOVEA',
    type: 'biomass',
    capacity: 46, // MW
    installationDate: '2025',
    location: 'Ayébo, Aboisso',
    operator: 'Biovea Energie',
    status: 'operational',
    hasData: false,
    countryCode: 'CI'
  },

  // ========== SÉNÉGAL ==========
  {
    id: 'cap-des-biches',
    name: 'Centrale de Cap des Biches',
    type: 'thermal',
    capacity: 652, // MW
    installationDate: '2018',
    location: 'Cap des Biches',
    operator: 'Senelec',
    status: 'operational',
    hasData: false,
    countryCode: 'SN'
  },
  {
    id: 'bel-air',
    name: 'Centrale de Bel Air',
    type: 'thermal',
    capacity: 134, // MW
    installationDate: '2015',
    location: 'Bel Air',
    operator: 'Senelec',
    status: 'operational',
    hasData: false,
    countryCode: 'SN'
  },
  {
    id: 'kahone',
    name: 'Centrale de Kahône',
    type: 'thermal',
    capacity: 116, // MW
    installationDate: '2010',
    location: 'Kahône',
    operator: 'Senelec',
    status: 'operational',
    hasData: false,
    countryCode: 'SN'
  },
  {
    id: 'sendou',
    name: 'Centrale de Sendou',
    type: 'thermal',
    capacity: 125, // MW
    installationDate: '2011',
    location: 'Sendou',
    operator: 'Senelec',
    status: 'operational',
    hasData: false,
    countryCode: 'SN'
  },
  {
    id: 'tobene',
    name: 'Centrale de Tobène',
    type: 'thermal',
    capacity: 118, // MW
    installationDate: '2016',
    location: 'Tobène',
    operator: 'Senelec',
    status: 'operational',
    hasData: false,
    countryCode: 'SN'
  },
  {
    id: 'manantali',
    name: 'Barrage de Manantali',
    type: 'hydraulic',
    capacity: 200, // MW
    installationDate: '2002',
    location: 'Manantali',
    operator: 'Senelec',
    status: 'operational',
    hasData: false,
    countryCode: 'SN'
  },
  {
    id: 'gouina',
    name: 'Barrage de Gouina',
    type: 'hydraulic',
    capacity: 140, // MW
    installationDate: '2021',
    location: 'Gouina',
    operator: 'Senelec',
    status: 'operational',
    hasData: false,
    countryCode: 'SN'
  },
  {
    id: 'mekhe-solar',
    name: 'Centrale Solaire de Mékhé',
    type: 'solar',
    capacity: 30, // MWc
    installationDate: '2016',
    location: 'Mékhé',
    operator: 'Senelec',
    status: 'operational',
    hasData: false,
    countryCode: 'SN'
  },
  {
    id: 'niakhar-solar',
    name: 'Centrale Solaire de Niakhar',
    type: 'solar',
    capacity: 20, // MWc
    installationDate: '2017',
    location: 'Niakhar',
    operator: 'Senelec',
    status: 'operational',
    hasData: false,
    countryCode: 'SN'
  },
  {
    id: 'kolda-solar',
    name: 'Centrale Solaire de Kolda',
    type: 'solar',
    capacity: 60, // MWc
    installationDate: '2025',
    location: 'Kolda',
    operator: 'Senelec',
    status: 'planned',
    hasData: false,
    countryCode: 'SN'
  },
  {
    id: 'taiba-ndiaye-wind',
    name: 'Parc Éolien de Taïba Ndiaye',
    type: 'wind',
    capacity: 158, // MW
    installationDate: '2020',
    location: 'Taïba Ndiaye',
    operator: 'Lekela Power',
    status: 'operational',
    hasData: false,
    countryCode: 'SN'
  },

  // ========== GHANA ==========
  {
    id: 'akosombo',
    name: 'Barrage d\'Akosombo',
    type: 'hydraulic',
    capacity: 1020, // MW
    installationDate: '1965',
    location: 'Akosombo',
    operator: 'Volta River Authority',
    status: 'operational',
    hasData: false,
    countryCode: 'GH'
  },
  {
    id: 'takoradi',
    name: 'Centrale Thermique de Takoradi',
    type: 'thermal',
    capacity: 550, // MW
    installationDate: '2000',
    location: 'Takoradi',
    operator: 'Volta River Authority',
    status: 'operational',
    hasData: false,
    countryCode: 'GH'
  },
  {
    id: 'kpone-2',
    name: 'Centrale Thermique Kpone II',
    type: 'thermal',
    capacity: 340, // MW
    installationDate: '2015',
    location: 'Kpone',
    operator: 'Volta River Authority',
    status: 'operational',
    hasData: false,
    countryCode: 'GH'
  },
  {
    id: 'karpower',
    name: 'Karpower',
    type: 'thermal',
    capacity: 450, // MW
    installationDate: '2015',
    location: 'Tema',
    operator: 'Karpower',
    status: 'operational',
    hasData: false,
    countryCode: 'GH'
  },
  {
    id: 'sunon-asogli',
    name: 'Sunon Asogli',
    type: 'thermal',
    capacity: 560, // MW
    installationDate: '2010',
    location: 'Tema',
    operator: 'Sunon Asogli',
    status: 'operational',
    hasData: false,
    countryCode: 'GH'
  },
  {
    id: 'ghana-nuclear',
    name: 'Centrale Nucléaire',
    type: 'nuclear',
    capacity: 0, // À définir
    installationDate: '2030-2035',
    location: 'À déterminer',
    operator: 'Ghana Nuclear Power',
    status: 'planned',
    hasData: false,
    countryCode: 'GH'
  },

  // ========== NIGERIA ==========
  {
    id: 'kainji',
    name: 'Barrage de Kainji',
    type: 'hydraulic',
    capacity: 760, // MW
    installationDate: '1968',
    location: 'Kainji, État de Niger',
    operator: 'Nigerian Electricity Supply Company',
    status: 'operational',
    hasData: false,
    countryCode: 'NG'
  },
  {
    id: 'egbin',
    name: 'Centrale Thermique d\'Egbin',
    type: 'thermal',
    capacity: 1320, // MW
    installationDate: '1985',
    location: 'Lagos',
    operator: 'Egbin Power',
    status: 'operational',
    hasData: false,
    countryCode: 'NG'
  },
  {
    id: 'calabar',
    name: 'Centrale de Calabar (NIPP)',
    type: 'thermal',
    capacity: 561, // MW
    installationDate: '2013',
    location: 'Calabar',
    operator: 'Nigerian Electricity Supply Company',
    status: 'operational',
    hasData: false,
    countryCode: 'NG'
  },
  {
    id: 'geregu-1',
    name: 'Centrale de Geregu I',
    type: 'thermal',
    capacity: 414, // MW
    installationDate: '2007',
    location: 'Geregu',
    operator: 'Nigerian Electricity Supply Company',
    status: 'operational',
    hasData: false,
    countryCode: 'NG'
  },
  {
    id: 'geregu-2',
    name: 'Centrale de Geregu II (NIPP)',
    type: 'thermal',
    capacity: 434, // MW
    installationDate: '2013',
    location: 'Geregu',
    operator: 'Nigerian Electricity Supply Company',
    status: 'operational',
    hasData: false,
    countryCode: 'NG'
  },
  {
    id: 'jebba',
    name: 'Barrage de Jebba',
    type: 'hydraulic',
    capacity: 540, // MW
    installationDate: '1985',
    location: 'Jebba, État de Kwara',
    operator: 'Nigerian Electricity Supply Company',
    status: 'operational',
    hasData: false,
    countryCode: 'NG'
  },
  {
    id: 'shiroro',
    name: 'Barrage de Shiroro',
    type: 'hydraulic',
    capacity: 600, // MW
    installationDate: '1990',
    location: 'Shiroro, État de Niger',
    operator: 'Nigerian Electricity Supply Company',
    status: 'operational',
    hasData: false,
    countryCode: 'NG'
  },
  {
    id: 'okpai',
    name: 'Centrale Thermique d\'Okpai',
    type: 'thermal',
    capacity: 480, // MW
    installationDate: '2005',
    location: 'Okpai',
    operator: 'Agip',
    status: 'operational',
    hasData: false,
    countryCode: 'NG'
  },
  {
    id: 'ihovbor',
    name: 'Centrale Thermique d\'Ihovbor',
    type: 'thermal',
    capacity: 450, // MW
    installationDate: '2013',
    location: 'Ihovbor',
    operator: 'Nigerian National Integrated Power Project',
    status: 'operational',
    hasData: false,
    countryCode: 'NG'
  },
  {
    id: 'olorunsogo',
    name: 'Centrale Thermique d\'Olorunsogo',
    type: 'thermal',
    capacity: 336, // MW
    installationDate: '2007',
    location: 'Olorunsogo',
    operator: 'Olorunsogo Power',
    status: 'operational',
    hasData: false,
    countryCode: 'NG'
  },

  // ========== MALI ==========
  {
    id: 'selingue',
    name: 'Barrage de Sélingué',
    type: 'hydraulic',
    capacity: 46, // MW
    installationDate: '1982',
    location: 'Sélingué, Région de Sikasso',
    operator: 'Énergie du Mali',
    status: 'operational',
    hasData: false,
    countryCode: 'ML'
  },
  {
    id: 'taoussa',
    name: 'Barrage de Taoussa',
    type: 'hydraulic',
    capacity: 25, // MW
    installationDate: '2025',
    location: 'Bourem',
    operator: 'Énergie du Mali',
    status: 'planned',
    hasData: false,
    countryCode: 'ML'
  },
  {
    id: 'felou',
    name: 'Barrage de Félou',
    type: 'hydraulic',
    capacity: 60, // MW
    installationDate: '2013',
    location: 'Félou',
    operator: 'Énergie du Mali',
    status: 'operational',
    hasData: false,
    countryCode: 'ML'
  },

  // ========== BURKINA FASO ==========
  {
    id: 'zagtouli',
    name: 'Centrale Solaire de Zagtouli',
    type: 'solar',
    capacity: 33, // MWc
    installationDate: '2017',
    location: 'Zagtouli, Ouagadougou',
    operator: 'SONABEL',
    status: 'operational',
    hasData: false,
    countryCode: 'BF'
  },
  {
    id: 'kossodo',
    name: 'Centrale Thermique de Kossodo',
    type: 'thermal',
    capacity: 50, // MW
    installationDate: '2010',
    location: 'Kossodo, Ouagadougou',
    operator: 'SONABEL',
    status: 'operational',
    hasData: false,
    countryCode: 'BF'
  },

  // ========== NIGER ==========
  {
    id: 'gorou-banda',
    name: 'Centrale Solaire de Gorou Banda',
    type: 'solar',
    capacity: 7, // MWc
    installationDate: '2017',
    location: 'Gorou Banda, Niamey',
    operator: 'NIGELEC',
    status: 'operational',
    hasData: false,
    countryCode: 'NE'
  },
  {
    id: 'malbaza',
    name: 'Centrale Solaire de Malbaza',
    type: 'solar',
    capacity: 7, // MWc
    installationDate: '2018',
    location: 'Malbaza',
    operator: 'NIGELEC',
    status: 'operational',
    hasData: false,
    countryCode: 'NE'
  },

  // ========== TOGO ==========
  {
    id: 'kekeli',
    name: 'KEKELI Efficient Power',
    type: 'thermal',
    capacity: 65, // MW
    installationDate: '2010',
    location: 'Zone portuaire, Lomé',
    operator: 'KEKELI Efficient Power (Eranove)',
    status: 'operational',
    hasData: false,
    countryCode: 'TG'
  },
  {
    id: 'kara',
    name: 'Centrale Thermique de Kara',
    type: 'thermal',
    capacity: 100, // MW
    installationDate: '2010',
    location: 'Kara',
    operator: 'CEET',
    status: 'operational',
    hasData: false,
    countryCode: 'TG'
  },
  {
    id: 'lome-thermal',
    name: 'Centrale Thermique de Lomé',
    type: 'thermal',
    capacity: 80, // MW
    installationDate: '2000',
    location: 'Lomé',
    operator: 'CEET',
    status: 'operational',
    hasData: false,
    countryCode: 'TG'
  },

  // ========== BÉNIN ==========
  {
    id: 'maria-gleta',
    name: 'Centrale Thermique de Maria Gléta',
    type: 'thermal',
    capacity: 127, // MW
    installationDate: '2008',
    location: 'Maria Gléta, Cotonou',
    operator: 'SBEE',
    status: 'operational',
    hasData: false,
    countryCode: 'BJ'
  },
  {
    id: 'pobe',
    name: 'Centrale Thermique de Pobè',
    type: 'thermal',
    capacity: 25, // MW
    installationDate: '2010',
    location: 'Pobè',
    operator: 'SBEE',
    status: 'operational',
    hasData: false,
    countryCode: 'BJ'
  },

  // ========== GUINÉE ==========
  {
    id: 'garafiri',
    name: 'Barrage de Garafiri',
    type: 'hydraulic',
    capacity: 75, // MW
    installationDate: '1999',
    location: 'Garafiri',
    operator: 'EDG',
    status: 'operational',
    hasData: false,
    countryCode: 'GN'
  },
  {
    id: 'kaleta',
    name: 'Barrage de Kaléta',
    type: 'hydraulic',
    capacity: 240, // MW
    installationDate: '2015',
    location: 'Kaléta',
    operator: 'EDG',
    status: 'operational',
    hasData: false,
    countryCode: 'GN'
  },
  {
    id: 'souapiti',
    name: 'Barrage de Souapiti',
    type: 'hydraulic',
    capacity: 450, // MW
    installationDate: '2020',
    location: 'Souapiti',
    operator: 'EDG',
    status: 'operational',
    hasData: false,
    countryCode: 'GN'
  },

  // ========== GUINÉE-BISSAU ==========
  {
    id: 'bissau-thermal',
    name: 'Centrale Thermique de Bissau',
    type: 'thermal',
    capacity: 20, // MW
    installationDate: '2000',
    location: 'Bissau',
    operator: 'EAGB',
    status: 'operational',
    hasData: false,
    countryCode: 'GW'
  },

  // ========== LIBERIA ==========
  {
    id: 'mount-coffee',
    name: 'Barrage de Mount Coffee',
    type: 'hydraulic',
    capacity: 88, // MW
    installationDate: '1966',
    location: 'Mount Coffee',
    operator: 'LEC',
    status: 'operational',
    hasData: false,
    countryCode: 'LR'
  },

  // ========== SIERRA LEONE ==========
  {
    id: 'bumbuna',
    name: 'Barrage de Bumbuna',
    type: 'hydraulic',
    capacity: 50, // MW
    installationDate: '2009',
    location: 'Bumbuna',
    operator: 'EDSA',
    status: 'operational',
    hasData: false,
    countryCode: 'SL'
  },
  {
    id: 'bumbuna-2',
    name: 'Barrage de Bumbuna II',
    type: 'hydraulic',
    capacity: 143, // MW
    installationDate: '2024',
    location: 'Bumbuna',
    operator: 'EDSA',
    status: 'operational',
    hasData: false,
    countryCode: 'SL'
  },

  // ========== GAMBIE ==========
  {
    id: 'kotu-thermal',
    name: 'Centrale Thermique de Kotu',
    type: 'thermal',
    capacity: 15, // MW
    installationDate: '2000',
    location: 'Kotu',
    operator: 'NAWEC',
    status: 'operational',
    hasData: false,
    countryCode: 'GM'
  },

  // ========== MAURITANIE ==========
  {
    id: 'nouakchott-thermal',
    name: 'Centrale Thermique de Nouakchott',
    type: 'thermal',
    capacity: 180, // MW
    installationDate: '2010',
    location: 'Nouakchott',
    operator: 'SOMELEC',
    status: 'operational',
    hasData: false,
    countryCode: 'MR'
  },
  {
    id: 'nouakchott-solar',
    name: 'Centrale Solaire de Nouakchott',
    type: 'solar',
    capacity: 15, // MWc
    installationDate: '2016',
    location: 'Nouakchott',
    operator: 'SOMELEC',
    status: 'operational',
    hasData: false,
    countryCode: 'MR'
  },

  // ========== CAP-VERT ==========
  {
    id: 'praia-thermal',
    name: 'Centrale Thermique de Praia',
    type: 'thermal',
    capacity: 20, // MW
    installationDate: '2000',
    location: 'Praia',
    operator: 'ELECTRA',
    status: 'operational',
    hasData: false,
    countryCode: 'CV'
  },
  {
    id: 'mindelo-wind',
    name: 'Parc Éolien de Mindelo',
    type: 'wind',
    capacity: 5, // MW
    installationDate: '2010',
    location: 'Mindelo',
    operator: 'ELECTRA',
    status: 'operational',
    hasData: false,
    countryCode: 'CV'
  }
]

/**
 * Obtenir toutes les centrales par type
 */
export function getPowerPlantsByType(type) {
  if (!type || type === 'all') {
    return allPowerPlants
  }
  return allPowerPlants.filter(plant => plant.type === type)
}

/**
 * Obtenir toutes les centrales par pays
 */
export function getPowerPlantsByCountry(countryCode) {
  if (!countryCode) {
    return allPowerPlants
  }
  return allPowerPlants.filter(plant => plant.countryCode === countryCode)
}

/**
 * Obtenir une centrale par ID
 */
export function getPowerPlantById(id) {
  return allPowerPlants.find(plant => plant.id === id)
}

/**
 * Obtenir les statistiques par type
 */
export function getStatisticsByType() {
  const stats = {
    hydraulic: { count: 0, totalCapacity: 0, operational: 0 },
    thermal: { count: 0, totalCapacity: 0, operational: 0 },
    solar: { count: 0, totalCapacity: 0, operational: 0 },
    biomass: { count: 0, totalCapacity: 0, operational: 0 }
  }

  allPowerPlants.forEach(plant => {
    if (stats[plant.type]) {
      stats[plant.type].count++
      stats[plant.type].totalCapacity += plant.capacity
      if (plant.status === 'operational') {
        stats[plant.type].operational++
      }
    }
  })

  return stats
}
