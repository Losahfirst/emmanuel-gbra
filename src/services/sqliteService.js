import initSqlJs from 'sql.js'

let db = null
let SQL = null

// Initialiser SQLite
export async function initDatabase() {
  if (db) return db

  try {
    if (!SQL) {
      SQL = await initSqlJs({
        locateFile: (file) => `https://sql.js.org/dist/${file}`
      })
    }

    // Charger la base de données depuis localStorage ou créer une nouvelle
    const savedDb = localStorage.getItem('kanari_sqlite_db')

    if (savedDb) {
      try {
        const buffer = JSON.parse(savedDb)
        const uint8Array = new Uint8Array(buffer)
        db = new SQL.Database(uint8Array)
        // Vérifier si les tables existent, sinon les créer
        try {
          db.exec('SELECT 1 FROM flash_info LIMIT 1')
        } catch (e) {
          createTables()
        }
      } catch (e) {
        // Si erreur de chargement, créer une nouvelle base
        db = new SQL.Database()
        createTables()
      }
    } else {
      db = new SQL.Database()
      createTables()
    }

    return db
  } catch (error) {
    console.error('Erreur lors de l\'initialisation de SQLite:', error)
    // Réessayer avec une nouvelle base
    try {
      if (!SQL) {
        SQL = await initSqlJs({
          locateFile: (file) => `https://sql.js.org/dist/${file}`
        })
      }
      db = new SQL.Database()
      createTables()
      return db
    } catch (retryError) {
      console.error('Erreur critique lors de l\'initialisation:', retryError)
      throw retryError
    }
  }
}

// Créer les tables nécessaires
function createTables() {
  if (!db) return

  // Table pour les flash info
  db.run(`
    CREATE TABLE IF NOT EXISTS flash_info (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      country_code TEXT NOT NULL,
      date TEXT NOT NULL,
      text TEXT NOT NULL,
      is_active INTEGER DEFAULT 1,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP
    )
  `)

  // Table pour les actualités (si besoin de migrer depuis localStorage)
  db.run(`
    CREATE TABLE IF NOT EXISTS articles (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      country_code TEXT NOT NULL,
      title TEXT NOT NULL,
      excerpt TEXT,
      category TEXT,
      date TEXT,
      image TEXT,
      source_url TEXT,
      read_time TEXT,
      content TEXT,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP
    )
  `)

  saveDatabase()
}

// Sauvegarder la base de données dans localStorage
export function saveDatabase() {
  if (!db) return

  try {
    const data = db.export()
    const buffer = Array.from(data)
    localStorage.setItem('kanari_sqlite_db', JSON.stringify(buffer))
  } catch (error) {
    console.error('Erreur lors de la sauvegarde:', error)
  }
}

// Flash Info Operations
export async function getFlashInfoByCountry(countryCode) {
  await initDatabase()

  if (!db) {
    throw new Error('Base de données non initialisée')
  }

  const stmt = db.prepare(`
    SELECT * FROM flash_info 
    WHERE country_code = ? AND is_active = 1 
    ORDER BY date DESC, created_at DESC
  `)
  stmt.bind([countryCode])

  const results = []
  while (stmt.step()) {
    const row = stmt.getAsObject()
    results.push(row)
  }
  stmt.free()

  return results
}

export async function getAllFlashInfo() {
  await initDatabase()

  if (!db) {
    throw new Error('Base de données non initialisée')
  }

  const stmt = db.prepare(`
    SELECT * FROM flash_info 
    ORDER BY country_code, date DESC, created_at DESC
  `)

  const results = []
  while (stmt.step()) {
    const row = stmt.getAsObject()
    results.push(row)
  }
  stmt.free()

  return results
}

export async function saveFlashInfo(flashInfo) {
  await initDatabase()

  if (flashInfo.id) {
    // Mise à jour
    db.run(`
      UPDATE flash_info 
      SET country_code = ?, date = ?, text = ?, is_active = ?
      WHERE id = ?
    `, [
      flashInfo.countryCode,
      flashInfo.date,
      flashInfo.text,
      flashInfo.isActive !== undefined ? flashInfo.isActive : 1,
      flashInfo.id
    ])
  } else {
    // Insertion
    db.run(`
      INSERT INTO flash_info (country_code, date, text, is_active)
      VALUES (?, ?, ?, ?)
    `, [
      flashInfo.countryCode,
      flashInfo.date,
      flashInfo.text,
      flashInfo.isActive !== undefined ? flashInfo.isActive : 1
    ])
  }

  saveDatabase()
}

export async function deleteFlashInfo(id) {
  await initDatabase()

  if (!db) {
    throw new Error('Base de données non initialisée')
  }

  const stmt = db.prepare(`DELETE FROM flash_info WHERE id = ?`)
  stmt.bind([id])
  stmt.step()
  stmt.free()

  saveDatabase()
}

// Articles Operations
export async function saveArticle(article) {
  await initDatabase()

  if (!db) {
    throw new Error('Base de données non initialisée')
  }

  if (article.id) {
    const stmt = db.prepare(`
      UPDATE articles 
      SET country_code = ?, title = ?, excerpt = ?, category = ?, 
          date = ?, image = ?, source_url = ?, read_time = ?, content = ?
      WHERE id = ?
    `)
    stmt.bind([
      article.countryCode,
      article.title,
      article.excerpt || '',
      article.category || '',
      article.date || '',
      article.image || '',
      article.sourceUrl || '',
      article.readTime || '',
      JSON.stringify(article.content || []),
      article.id
    ])
    stmt.step()
    stmt.free()
  } else {
    const stmt = db.prepare(`
      INSERT INTO articles (country_code, title, excerpt, category, date, image, source_url, read_time, content)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `)
    stmt.bind([
      article.countryCode,
      article.title,
      article.excerpt || '',
      article.category || '',
      article.date || '',
      article.image || '',
      article.sourceUrl || '',
      article.readTime || '',
      JSON.stringify(article.content || [])
    ])
    stmt.step()
    stmt.free()
  }

  saveDatabase()
}

export async function deleteArticle(articleId) {
  await initDatabase()

  if (!db) {
    throw new Error('Base de données non initialisée')
  }

  const stmt = db.prepare(`DELETE FROM articles WHERE id = ?`)
  stmt.bind([articleId])
  stmt.step()
  stmt.free()

  saveDatabase()
}

export async function getArticlesByCountry(countryCode) {
  await initDatabase()

  if (!db) {
    throw new Error('Base de données non initialisée')
  }

  const stmt = db.prepare(`
    SELECT * FROM articles 
    WHERE country_code = ? 
    ORDER BY date DESC, created_at DESC
  `)
  stmt.bind([countryCode])

  const results = []
  while (stmt.step()) {
    const row = stmt.getAsObject()
    // Parser le contenu JSON si c'est une chaîne
    if (row.content && typeof row.content === 'string') {
      try {
        row.content = JSON.parse(row.content)
      } catch (e) {
        row.content = []
      }
    }
    results.push(row)
  }
  stmt.free()

  return results
}
