-- Script SQL pour créer les tables dans Supabase
-- Exécutez ce script dans l'éditeur SQL de votre dashboard Supabase

-- 1. Table articles
CREATE TABLE IF NOT EXISTS articles (
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
CREATE INDEX IF NOT EXISTS idx_articles_country_code ON articles(country_code);
CREATE INDEX IF NOT EXISTS idx_articles_date ON articles(date DESC);

-- 2. Table flash_info
CREATE TABLE IF NOT EXISTS flash_info (
  id BIGSERIAL PRIMARY KEY,
  country_code VARCHAR(2) NOT NULL,
  date TIMESTAMP WITH TIME ZONE NOT NULL,
  text TEXT NOT NULL,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index
CREATE INDEX IF NOT EXISTS idx_flash_info_country_code ON flash_info(country_code);
CREATE INDEX IF NOT EXISTS idx_flash_info_active ON flash_info(is_active);

-- 3. Table regulators
CREATE TABLE IF NOT EXISTS regulators (
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
CREATE INDEX IF NOT EXISTS idx_regulators_country_code ON regulators(country_code);

-- 4. Table producers
CREATE TABLE IF NOT EXISTS producers (
  id BIGSERIAL PRIMARY KEY,
  country_code VARCHAR(2) NOT NULL,
  name TEXT NOT NULL,
  type VARCHAR(100),
  capacity VARCHAR(100),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index
CREATE INDEX IF NOT EXISTS idx_producers_country_code ON producers(country_code);

-- Politique RLS (Row Level Security) - Accès public
-- Articles
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow public read access" ON articles;
DROP POLICY IF EXISTS "Allow public insert" ON articles;
DROP POLICY IF EXISTS "Allow public update" ON articles;
DROP POLICY IF EXISTS "Allow public delete" ON articles;
CREATE POLICY "Allow public read access" ON articles FOR SELECT USING (true);
CREATE POLICY "Allow public insert" ON articles FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update" ON articles FOR UPDATE USING (true);
CREATE POLICY "Allow public delete" ON articles FOR DELETE USING (true);

-- Flash Info
ALTER TABLE flash_info ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow public read access" ON flash_info;
DROP POLICY IF EXISTS "Allow public insert" ON flash_info;
DROP POLICY IF EXISTS "Allow public update" ON flash_info;
DROP POLICY IF EXISTS "Allow public delete" ON flash_info;
CREATE POLICY "Allow public read access" ON flash_info FOR SELECT USING (true);
CREATE POLICY "Allow public insert" ON flash_info FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update" ON flash_info FOR UPDATE USING (true);
CREATE POLICY "Allow public delete" ON flash_info FOR DELETE USING (true);

-- Regulators
ALTER TABLE regulators ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow public read access" ON regulators;
DROP POLICY IF EXISTS "Allow public insert" ON regulators;
DROP POLICY IF EXISTS "Allow public update" ON regulators;
DROP POLICY IF EXISTS "Allow public delete" ON regulators;
CREATE POLICY "Allow public read access" ON regulators FOR SELECT USING (true);
CREATE POLICY "Allow public insert" ON regulators FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update" ON regulators FOR UPDATE USING (true);
CREATE POLICY "Allow public delete" ON regulators FOR DELETE USING (true);

-- Producers
ALTER TABLE producers ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow public read access" ON producers;
DROP POLICY IF EXISTS "Allow public insert" ON producers;
DROP POLICY IF EXISTS "Allow public update" ON producers;
DROP POLICY IF EXISTS "Allow public delete" ON producers;
CREATE POLICY "Allow public read access" ON producers FOR SELECT USING (true);
CREATE POLICY "Allow public insert" ON producers FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update" ON producers FOR UPDATE USING (true);
CREATE POLICY "Allow public delete" ON producers FOR DELETE USING (true);
