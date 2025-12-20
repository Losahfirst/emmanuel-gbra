/**
 * Données sur les interconnexions électriques entre pays d'Afrique de l'Ouest
 * Inspiré de la carte WAPP (West African Power Pool)
 */

export const networkInterconnections = [
  // Interconnexions Côte d'Ivoire
  {
    from: { country: 'CI', city: 'Abidjan', coords: [5.3600, -4.0083] },
    to: { country: 'GH', city: 'Kumasi', coords: [6.6833, -1.6167] },
    capacity: '200 MW',
    voltage: '225 kV',
    status: 'operational',
    name: 'CI-GH Interconnection'
  },
  {
    from: { country: 'CI', city: 'Abidjan', coords: [5.3600, -4.0083] },
    to: { country: 'BF', city: 'Ouagadougou', coords: [12.3667, -1.5333] },
    capacity: '100 MW',
    voltage: '225 kV',
    status: 'operational',
    name: 'CI-BF Interconnection'
  },
  {
    from: { country: 'CI', city: 'Abidjan', coords: [5.3600, -4.0083] },
    to: { country: 'ML', city: 'Bamako', coords: [12.6500, -8.0000] },
    capacity: '50 MW',
    voltage: '225 kV',
    status: 'operational',
    name: 'CI-ML Interconnection'
  },
  {
    from: { country: 'CI', city: 'Abidjan', coords: [5.3600, -4.0083] },
    to: { country: 'TG', city: 'Lomé', coords: [6.1333, 1.2167] },
    capacity: '80 MW',
    voltage: '161 kV',
    status: 'operational',
    name: 'CI-TG Interconnection'
  },
  {
    from: { country: 'CI', city: 'Abidjan', coords: [5.3600, -4.0083] },
    to: { country: 'BJ', city: 'Cotonou', coords: [6.3667, 2.4333] },
    capacity: '60 MW',
    voltage: '161 kV',
    status: 'operational',
    name: 'CI-BJ Interconnection'
  },

  // Interconnexions Sénégal
  {
    from: { country: 'SN', city: 'Dakar', coords: [14.7167, -17.4833] },
    to: { country: 'ML', city: 'Bamako', coords: [12.6500, -8.0000] },
    capacity: '150 MW',
    voltage: '225 kV',
    status: 'operational',
    name: 'SN-ML Interconnection (Manantali)'
  },
  {
    from: { country: 'SN', city: 'Dakar', coords: [14.7167, -17.4833] },
    to: { country: 'GM', city: 'Banjul', coords: [13.4500, -16.5667] },
    capacity: '30 MW',
    voltage: '90 kV',
    status: 'operational',
    name: 'SN-GM Interconnection'
  },
  {
    from: { country: 'SN', city: 'Dakar', coords: [14.7167, -17.4833] },
    to: { country: 'MR', city: 'Nouakchott', coords: [18.0833, -15.9667] },
    capacity: '50 MW',
    voltage: '225 kV',
    status: 'operational',
    name: 'SN-MR Interconnection'
  },

  // Interconnexions Ghana
  {
    from: { country: 'GH', city: 'Kumasi', coords: [6.6833, -1.6167] },
    to: { country: 'TG', city: 'Lomé', coords: [6.1333, 1.2167] },
    capacity: '100 MW',
    voltage: '161 kV',
    status: 'operational',
    name: 'GH-TG Interconnection'
  },
  {
    from: { country: 'GH', city: 'Accra', coords: [5.5500, -0.2167] },
    to: { country: 'BF', city: 'Ouagadougou', coords: [12.3667, -1.5333] },
    capacity: '50 MW',
    voltage: '161 kV',
    status: 'operational',
    name: 'GH-BF Interconnection'
  },

  // Interconnexions Nigeria
  {
    from: { country: 'NG', city: 'Lagos', coords: [6.4333, 3.2833] },
    to: { country: 'BJ', city: 'Cotonou', coords: [6.3667, 2.4333] },
    capacity: '100 MW',
    voltage: '330 kV',
    status: 'operational',
    name: 'NG-BJ Interconnection'
  },
  {
    from: { country: 'NG', city: 'Lagos', coords: [6.4333, 3.2833] },
    to: { country: 'TG', city: 'Lomé', coords: [6.1333, 1.2167] },
    capacity: '80 MW',
    voltage: '330 kV',
    status: 'operational',
    name: 'NG-TG Interconnection'
  },
  {
    from: { country: 'NG', city: 'Lagos', coords: [6.4333, 3.2833] },
    to: { country: 'NE', city: 'Niamey', coords: [13.5167, 2.1167] },
    capacity: '50 MW',
    voltage: '330 kV',
    status: 'operational',
    name: 'NG-NE Interconnection'
  },

  // Interconnexions Mali
  {
    from: { country: 'ML', city: 'Bamako', coords: [12.6500, -8.0000] },
    to: { country: 'BF', city: 'Ouagadougou', coords: [12.3667, -1.5333] },
    capacity: '75 MW',
    voltage: '225 kV',
    status: 'operational',
    name: 'ML-BF Interconnection'
  },
  {
    from: { country: 'ML', city: 'Bamako', coords: [12.6500, -8.0000] },
    to: { country: 'SN', city: 'Dakar', coords: [14.7167, -17.4833] },
    capacity: '150 MW',
    voltage: '225 kV',
    status: 'operational',
    name: 'ML-SN Interconnection (Manantali)'
  },

  // Interconnexions Togo-Bénin
  {
    from: { country: 'TG', city: 'Lomé', coords: [6.1333, 1.2167] },
    to: { country: 'BJ', city: 'Cotonou', coords: [6.3667, 2.4333] },
    capacity: '120 MW',
    voltage: '161 kV',
    status: 'operational',
    name: 'TG-BJ Interconnection'
  },

  // Interconnexions Guinée
  {
    from: { country: 'GN', city: 'Conakry', coords: [9.5167, -13.7167] },
    to: { country: 'SL', city: 'Freetown', coords: [8.4833, -13.2333] },
    capacity: '50 MW',
    voltage: '225 kV',
    status: 'operational',
    name: 'GN-SL Interconnection'
  },
  {
    from: { country: 'GN', city: 'Conakry', coords: [9.5167, -13.7167] },
    to: { country: 'GW', city: 'Bissau', coords: [11.8667, -15.6000] },
    capacity: '30 MW',
    voltage: '90 kV',
    status: 'operational',
    name: 'GN-GW Interconnection'
  },

  // Interconnexions Liberia-Sierra Leone
  {
    from: { country: 'LR', city: 'Monrovia', coords: [6.3167, -10.3500] },
    to: { country: 'SL', city: 'Freetown', coords: [8.4833, -13.2333] },
    capacity: '50 MW',
    voltage: '225 kV',
    status: 'planned',
    name: 'LR-SL Interconnection'
  }
]

/**
 * Obtenir les interconnexions pour un pays donné
 */
export function getInterconnectionsForCountry(countryCode) {
  return networkInterconnections.filter(
    conn => conn.from.country === countryCode || conn.to.country === countryCode
  )
}

/**
 * Obtenir toutes les interconnexions
 */
export function getAllInterconnections() {
  return networkInterconnections
}

/**
 * Obtenir les interconnexions entre deux pays spécifiques
 */
export function getInterconnectionBetween(country1, country2) {
  return networkInterconnections.find(
    conn =>
      (conn.from.country === country1 && conn.to.country === country2) ||
      (conn.from.country === country2 && conn.to.country === country1)
  )
}
