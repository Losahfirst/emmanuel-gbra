const projects = [
  {
    id: 'ecobin',
    name: 'ECOBIN',
    description:
      "ECOBIN — projet open-source disponible sur GitHub. Consultez le dépôt pour la documentation complète et les fichiers du projet.",
    repo: 'https://github.com/Losahfirst/ECOBIN',
    docs: [
      {
        name: 'Presentation pitch',
        // dev local path (served by vite in dev sometimes) — fallback to raw GitHub if local not available
        local: '/src/ecobin/Presentation pitch (1).pdf',
        raw: 'https://raw.githubusercontent.com/Losahfirst/ECOBIN/main/Presentation%20pitch%20(1).pdf'
      },
      {
        name: 'ECOBIEN phase3',
        local: '/src/ecobin/ECOBIEN phase3 (3).pptx',
        raw: 'https://raw.githubusercontent.com/Losahfirst/ECOBIN/main/ECOBIEN%20phase3%20(3).pptx'
      },
      {
        name: 'finalpwd',
        local: '/src/ecobin/finalpwd (2).pptx',
        raw: 'https://raw.githubusercontent.com/Losahfirst/ECOBIN/main/finalpwd%20(2).pptx'
      }
    ]
  }
]

export default projects
