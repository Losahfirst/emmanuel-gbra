/**
 * Données sur les régulateurs, producteurs, transport et distribution d'énergie par pays
 */

export const countryEnergyData = {
  CI: {
    regulator: {
      name: 'Autorité Nationale de Régulation du Secteur de l\'Électricité (ANARE)',
      website: 'https://anare.ci',
      description: 'Organisme de régulation du secteur électrique en Côte d\'Ivoire',
      logo: '/logos/regulators/anare.png'
    },
    producers: [
      { name: 'Compagnie Ivoirienne d\'Électricité (CIE)', type: 'Mixte', capacity: '2200 MW' },
      { name: 'AZITO Energie', type: 'Thermique', capacity: '430 MW' },
      { name: 'CIPREL', type: 'Thermique', capacity: '556 MW' },
      { name: 'AGGREKO', type: 'Thermique', capacity: '200 MW' },
      { name: 'Biovea Energie', type: 'Biomasse', capacity: '46 MW' },
      { name: 'Atinkou', type: 'Thermique', capacity: '390 MW' }
    ],
    transport: {
      name: 'Compagnie Ivoirienne d\'Électricité (CIE)',
      description: 'Gestion du réseau de transport haute tension',
      length: '4500 km'
    },
    distribution: {
      name: 'Compagnie Ivoirienne d\'Électricité (CIE)',
      description: 'Distribution d\'électricité aux clients finaux',
      subscribers: '2.5 millions'
    }
  },
  SN: {
    regulator: {
      name: 'Commission de Régulation du Secteur de l\'Électricité (CRSE)',
      website: 'https://crse.sn',
      description: 'Organisme de régulation du secteur électrique au Sénégal',
      logo: '/logos/regulators/crse.png'
    },
    producers: [
      { name: 'Senelec', type: 'Mixte', capacity: '800 MW' },
      { name: 'Centrale de Cap des Biches', type: 'Thermique', capacity: '652 MW' },
      { name: 'Centrale de Bel Air', type: 'Thermique', capacity: '134 MW' },
      { name: 'Barrage de Manantali', type: 'Hydraulique', capacity: '200 MW' },
      { name: 'Barrage de Gouina', type: 'Hydraulique', capacity: '140 MW' }
    ],
    transport: {
      name: 'Senelec',
      description: 'Gestion du réseau de transport',
      length: '3500 km'
    },
    distribution: {
      name: 'Senelec',
      description: 'Distribution d\'électricité',
      subscribers: '1.8 millions'
    }
  },
  GH: {
    regulator: {
      name: 'Energy Commission of Ghana',
      website: 'https://energycom.gov.gh',
      description: 'Organisme de régulation du secteur énergétique au Ghana',
      logo: '/logos/regulators/energy-commission-ghana.png'
    },
    producers: [
      { name: 'Volta River Authority (VRA)', type: 'Mixte', capacity: '2500 MW' },
      { name: 'Barrage d\'Akosombo', type: 'Hydraulique', capacity: '1020 MW' },
      { name: 'Centrale de Takoradi', type: 'Thermique', capacity: '550 MW' },
      { name: 'Sunon Asogli', type: 'Thermique', capacity: '560 MW' },
      { name: 'Karpower', type: 'Thermique', capacity: '450 MW' }
    ],
    transport: {
      name: 'Ghana Grid Company (GRIDCo)',
      description: 'Gestion du réseau de transport national',
      length: '6000 km'
    },
    distribution: {
      name: 'Electricity Company of Ghana (ECG)',
      description: 'Distribution d\'électricité dans le sud',
      subscribers: '5 millions'
    }
  },
  NG: {
    regulator: {
      name: 'Nigerian Electricity Regulatory Commission (NERC)',
      website: 'https://nerc.gov.ng',
      description: 'Organisme de régulation du secteur électrique au Nigeria'
    },
    producers: [
      { name: 'Egbin Power', type: 'Thermique', capacity: '1320 MW' },
      { name: 'Barrage de Kainji', type: 'Hydraulique', capacity: '760 MW' },
      { name: 'Barrage de Shiroro', type: 'Hydraulique', capacity: '600 MW' },
      { name: 'Centrale de Calabar', type: 'Thermique', capacity: '561 MW' },
      { name: 'Centrale de Geregu', type: 'Thermique', capacity: '414 MW' }
    ],
    transport: {
      name: 'Transmission Company of Nigeria (TCN)',
      description: 'Gestion du réseau de transport',
      length: '20000 km'
    },
    distribution: {
      name: 'Distribution Companies (DISCOs)',
      description: '11 compagnies de distribution',
      subscribers: '12 millions'
    }
  },
  ML: {
    regulator: {
      name: 'Autorité de Régulation de l\'Électricité et de l\'Eau (AREA)',
      website: '#',
      description: 'Organisme de régulation du secteur énergétique au Mali',
      logo: '/logos/regulators/area.png'
    },
    producers: [
      { name: 'Énergie du Mali (EDM)', type: 'Mixte', capacity: '500 MW' },
      { name: 'Barrage de Sélingué', type: 'Hydraulique', capacity: '46 MW' },
      { name: 'Barrage de Félou', type: 'Hydraulique', capacity: '60 MW' }
    ],
    transport: {
      name: 'Énergie du Mali (EDM)',
      description: 'Gestion du réseau de transport',
      length: '2500 km'
    },
    distribution: {
      name: 'Énergie du Mali (EDM)',
      description: 'Distribution d\'électricité',
      subscribers: '500 000'
    }
  },
  BF: {
    regulator: {
      name: 'Autorité de Régulation du Secteur de l\'Électricité (ARSE)',
      website: '#',
      description: 'Organisme de régulation du secteur électrique au Burkina Faso',
      logo: '/logos/regulators/arse-bf.png'
    },
    producers: [
      { name: 'SONABEL', type: 'Mixte', capacity: '489 MW' },
      { name: 'Centrale de Zagtouli', type: 'Solaire', capacity: '33 MW' }
    ],
    transport: {
      name: 'SONABEL',
      description: 'Gestion du réseau de transport',
      length: '2000 km'
    },
    distribution: {
      name: 'SONABEL',
      description: 'Distribution d\'électricité',
      subscribers: '800 000'
    }
  },
  NE: {
    regulator: {
      name: 'Autorité de Régulation de l\'Électricité (ARE)',
      website: '#',
      description: 'Organisme de régulation du secteur électrique au Niger'
    },
    producers: [
      { name: 'NIGELEC', type: 'Mixte', capacity: '200 MW' },
      { name: 'Centrale de Gorou Banda', type: 'Solaire', capacity: '7 MW' }
    ],
    transport: {
      name: 'NIGELEC',
      description: 'Gestion du réseau de transport',
      length: '1500 km'
    },
    distribution: {
      name: 'NIGELEC',
      description: 'Distribution d\'électricité',
      subscribers: '400 000'
    }
  },
  TG: {
    regulator: {
      name: 'Autorité de Régulation du Secteur de l\'Électricité (ARSE)',
      website: '#',
      description: 'Organisme de régulation du secteur électrique au Togo',
      logo: '/logos/regulators/arse-togo.png'
    },
    producers: [
      { name: 'CEET', type: 'Mixte', capacity: '200 MW' },
      { name: 'KEKELI Efficient Power', type: 'Thermique', capacity: '65 MW' },
      { name: 'Centrale de Kara', type: 'Thermique', capacity: '100 MW' }
    ],
    transport: {
      name: 'CEET',
      description: 'Gestion du réseau de transport',
      length: '1800 km'
    },
    distribution: {
      name: 'CEET',
      description: 'Distribution d\'électricité',
      subscribers: '600 000'
    }
  },
  BJ: {
    regulator: {
      name: 'Autorité de Régulation de l\'Électricité (ARE)',
      website: '#',
      description: 'Organisme de régulation du secteur électrique au Bénin',
      logo: '/logos/regulators/are-benin.png'
    },
    producers: [
      { name: 'SBEE', type: 'Mixte', capacity: '300 MW' },
      { name: 'Centrale de Maria Gléta', type: 'Thermique', capacity: '127 MW' }
    ],
    transport: {
      name: 'SBEE',
      description: 'Gestion du réseau de transport',
      length: '2200 km'
    },
    distribution: {
      name: 'SBEE',
      description: 'Distribution d\'électricité',
      subscribers: '700 000'
    }
  },
  GN: {
    regulator: {
      name: 'Autorité de Régulation du Secteur de l\'Électricité (ARSE)',
      website: '#',
      description: 'Organisme de régulation du secteur électrique en Guinée'
    },
    producers: [
      { name: 'EDG', type: 'Mixte', capacity: '400 MW' },
      { name: 'Barrage de Kaléta', type: 'Hydraulique', capacity: '240 MW' }
    ],
    transport: {
      name: 'EDG',
      description: 'Gestion du réseau de transport',
      length: '3000 km'
    },
    distribution: {
      name: 'EDG',
      description: 'Distribution d\'électricité',
      subscribers: '500 000'
    }
  },
  GW: {
    regulator: {
      name: 'Autorité de Régulation de l\'Électricité',
      website: '#',
      description: 'Organisme de régulation du secteur électrique en Guinée-Bissau',
      logo: '/logos/regulators/regulator-guinee-bissau.png'
    },
    producers: [
      { name: 'EAGB', type: 'Mixte', capacity: '50 MW' }
    ],
    transport: {
      name: 'EAGB',
      description: 'Gestion du réseau de transport',
      length: '800 km'
    },
    distribution: {
      name: 'EAGB',
      description: 'Distribution d\'électricité',
      subscribers: '150 000'
    }
  },
  LR: {
    regulator: {
      name: 'Liberia Electricity Regulatory Commission (LERC)',
      website: '#',
      description: 'Organisme de régulation du secteur électrique au Liberia'
    },
    producers: [
      { name: 'LEC', type: 'Mixte', capacity: '126 MW' }
    ],
    transport: {
      name: 'LEC',
      description: 'Gestion du réseau de transport',
      length: '1200 km'
    },
    distribution: {
      name: 'LEC',
      description: 'Distribution d\'électricité',
      subscribers: '200 000'
    }
  },
  SL: {
    regulator: {
      name: 'Electricity and Water Regulatory Commission (EWRC)',
      website: '#',
      description: 'Organisme de régulation du secteur électrique en Sierra Leone',
      logo: '/logos/regulators/ewrc.png'
    },
    producers: [
      { name: 'EGTC', type: 'Mixte', capacity: '150 MW' }
    ],
    transport: {
      name: 'EGTC',
      description: 'Gestion du réseau de transport',
      length: '1500 km'
    },
    distribution: {
      name: 'EGTC',
      description: 'Distribution d\'électricité',
      subscribers: '300 000'
    }
  },
  GM: {
    regulator: {
      name: 'Public Utilities Regulatory Authority (PURA)',
      website: '#',
      description: 'Organisme de régulation du secteur électrique en Gambie',
      logo: '/logos/regulators/pura.png'
    },
    producers: [
      { name: 'NAWEC', type: 'Mixte', capacity: '100 MW' }
    ],
    transport: {
      name: 'NAWEC',
      description: 'Gestion du réseau de transport',
      length: '1000 km'
    },
    distribution: {
      name: 'NAWEC',
      description: 'Distribution d\'électricité',
      subscribers: '250 000'
    }
  },
  MR: {
    regulator: {
      name: 'Autorité de Régulation de l\'Électricité',
      website: '#',
      description: 'Organisme de régulation du secteur électrique en Mauritanie'
    },
    producers: [
      { name: 'SOMELEC', type: 'Mixte', capacity: '300 MW' },
      { name: 'Centrale solaire', type: 'Solaire', capacity: '15 MW' }
    ],
    transport: {
      name: 'SOMELEC',
      description: 'Gestion du réseau de transport',
      length: '2000 km'
    },
    distribution: {
      name: 'SOMELEC',
      description: 'Distribution d\'électricité',
      subscribers: '400 000'
    }
  },
  CV: {
    regulator: {
      name: 'Agência de Regulação Económica (ARE)',
      website: '#',
      description: 'Organisme de régulation du secteur électrique au Cap-Vert',
      logo: '/logos/regulators/are-cap-vert.png'
    },
    producers: [
      { name: 'Electra', type: 'Mixte', capacity: '120 MW' },
      { name: 'Parc éolien de Mindelo', type: 'Éolien', capacity: '25 MW' }
    ],
    transport: {
      name: 'Electra',
      description: 'Gestion du réseau de transport',
      length: '1500 km'
    },
    distribution: {
      name: 'Electra',
      description: 'Distribution d\'électricité',
      subscribers: '200 000'
    }
  }
}

/**
 * Obtenir les données énergétiques d'un pays
 */
export function getCountryEnergyData(countryCode) {
  return countryEnergyData[countryCode] || null
}
