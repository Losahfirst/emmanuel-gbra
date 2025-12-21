# Configuration Supabase pour KANARI Energy

## Tables à créer dans Supabase

Vous devez créer les tables suivantes dans votre base de données Supabase :

### 1. Table `articles`

```sql
CREATE TABLE articles (
  id BIGSERIAL PRIMARY KEY,
  country_code VARCHAR(2) NOT NULL,
  title TEXT NOT NULL,
  excerpt TEXT,
  category VARCHAR(100),
  date TIMESTAMP WITH TIME ZONE NOT NULL,
  image TEXT,
  source_url TEXT,
  read_time VARCHAR(10),
  content TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index pour améliorer les performances
CREATE INDEX idx_articles_country_code ON articles(country_code);
CREATE INDEX idx_articles_date ON articles(date DESC);
```

### 2. Table `flash_info`

```sql
CREATE TABLE flash_info (
  id BIGSERIAL PRIMARY KEY,
  country_code VARCHAR(2) NOT NULL,
  date TIMESTAMP WITH TIME ZONE NOT NULL,
  text TEXT NOT NULL,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index
CREATE INDEX idx_flash_info_country_code ON flash_info(country_code);
CREATE INDEX idx_flash_info_active ON flash_info(is_active);
```

### 3. Table `regulators`

```sql
CREATE TABLE regulators (
  id BIGSERIAL PRIMARY KEY,
  country_code VARCHAR(2) UNIQUE NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  logo TEXT,
  website TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index
CREATE INDEX idx_regulators_country_code ON regulators(country_code);
```

### 4. Table `producers`

```sql
CREATE TABLE producers (
  id BIGSERIAL PRIMARY KEY,
  country_code VARCHAR(2) NOT NULL,
  name TEXT NOT NULL,
  type VARCHAR(100),
  capacity VARCHAR(100),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index
CREATE INDEX idx_producers_country_code ON producers(country_code);
```

## Politique RLS (Row Level Security)

Pour permettre l'accès public en lecture et écriture (vous pouvez restreindre plus tard) :

```sql
-- Articles
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read access" ON articles FOR SELECT USING (true);
CREATE POLICY "Allow public insert" ON articles FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update" ON articles FOR UPDATE USING (true);
CREATE POLICY "Allow public delete" ON articles FOR DELETE USING (true);

-- Flash Info
ALTER TABLE flash_info ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read access" ON flash_info FOR SELECT USING (true);
CREATE POLICY "Allow public insert" ON flash_info FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update" ON flash_info FOR UPDATE USING (true);
CREATE POLICY "Allow public delete" ON flash_info FOR DELETE USING (true);

-- Regulators
ALTER TABLE regulators ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read access" ON regulators FOR SELECT USING (true);
CREATE POLICY "Allow public insert" ON regulators FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update" ON regulators FOR UPDATE USING (true);
CREATE POLICY "Allow public delete" ON regulators FOR DELETE USING (true);

-- Producers
ALTER TABLE producers ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read access" ON producers FOR SELECT USING (true);
CREATE POLICY "Allow public insert" ON producers FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update" ON producers FOR UPDATE USING (true);
CREATE POLICY "Allow public delete" ON producers FOR DELETE USING (true);
```

## Instructions

1. Connectez-vous à votre dashboard Supabase : https://wpseupypaffxkhxwnzfx.supabase.co
2. Allez dans l'éditeur SQL (SQL Editor)
3. Copiez et exécutez le contenu du fichier `supabase_schema.sql` dans l'éditeur SQL
4. Vérifiez que les tables sont créées dans l'onglet "Table Editor"

**Note importante** : Si la clé API fournie ne fonctionne pas, vous pouvez trouver la vraie clé "anon" dans votre dashboard Supabase :
- Allez dans Settings > API
- Copiez la clé "anon public" (elle commence généralement par `eyJ...`)
- Remplacez `SUPABASE_ANON_KEY` dans `src/services/supabaseService.js`

Une fois les tables créées, l'application pourra sauvegarder et récupérer les données depuis Supabase.
